// Handle JSON file upload
document.getElementById('json-file').addEventListener('change', function (event) {
    // Show loader
  document.getElementById('loader').style.display = 'block';
    const file = event.target.files[0];
    if (!file) return;
    const fullName = file.name;
    const baseName = fullName.replace(/\.[^/.]+$/, ""); // removes file extension
    window.baseFileName = baseName;
    console.log("Base file name set to:", window.baseFileName);
    const reader = new FileReader();

    reader.onload = function (e) {
        try {
            const jsonText = e.target.result;
            const json = JSON.parse(jsonText);
            const pretty = JSON.stringify(json, null, 2);
            document.getElementById("json-editor").textContent = pretty;
            // Set editor value

            // Display in viewer
            displayJsonInTreeView(json);

            // Hide upload button, show export options
            document.getElementById('exportOptions').style.display = 'flex';
            // Show loader
            document.getElementById('loader').style.display = 'none';

        } catch (err) {
            console.log(err)
            // Show loader
            document.getElementById('loader').style.display = 'none';
        }
    };

    reader.readAsText(file);
});

function escapeHTML(str) {
    return str.replace(/&/g, "&amp;")
              .replace(/</g, "&lt;")
              .replace(/>/g, "&gt;")
              .replace(/"/g, "&quot;")
              .replace(/'/g, "&#039;");
  }

// Handle paste or input in editor
document.getElementById('json-editor').addEventListener('input', function () {
    const editorContent = document.getElementById('json-editor').value;

    try {
        const json = JSON.parse(editorContent);

        // Display in viewer
        displayJsonInTreeView(json);

        // Hide upload button and show export options
        document.getElementById('exportOptions').style.display = 'flex';
    } catch (err) {
        console.log(err);
        // Invalid JSON - optionally show error in viewer
        document.getElementById('json-tree-viewer').innerText = 'Invalid JSON';
    }
});

// Tree view rendering
function displayJsonInTreeView(json) {
    const viewer = document.getElementById('json-tree-viewer');
    viewer.innerHTML = '';
    try {
        $('#json-tree-viewer').empty().JSONView(json, { collapsed: false });
    } catch (e) {
        viewer.innerText = 'Failed to render JSON';
    }
}

function convertToSQL() {
    const jsonText = document.getElementById('json-editor').value.trim();

    if (!jsonText) {
        alert("Please paste or upload valid JSON first.");
        return;
    }

    let jsonData;
    try {
        jsonData = JSON.parse(jsonText);
    } catch (e) {
        alert("Invalid JSON format.");
        return;
    }

    if (!Array.isArray(jsonData)) {
        alert("JSON must be an array of objects.");
        return;
    }

    if (jsonData.length === 0) {
        alert("JSON array is empty.");
        return;
    }

    const tableName = (window.baseFileName || "data"); // You can make this dynamic later
    const records = jsonData;
    const columns = Object.keys(records[0]);

    const sqlStatements = records.map(record => {
        const values = columns.map(key => {
            const value = record[key];
            if (value === null || value === undefined) return "NULL";
            if (typeof value === "number") return value;
            return `'${String(value).replace(/'/g, "''")}'`;
        });
        return `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});`;
    });

    // Join all statements into a single string
    const finalSQL = sqlStatements.join("\n");
    // Display
    document.getElementById("sql-viewer").style.display = 'flex';
    document.getElementById("sql-viewer").textContent = finalSQL;
    document.getElementById("exportButtons").style.display = 'flex';
    document.getElementById("json-tool-wrapper").style.display = 'none';
    document.getElementById('exportOptions').style.display = 'none';
}

function exportToSQL() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const tableName = (window.baseFileName || "data"); // you can let user choose this in future

        const records = Array.isArray(json) ? json : [json];
        const originalKeys = Object.keys(records[0]);
        const columns = originalKeys.map(key => key.trim().replace(/\s+/g, "_"));

        const sqlStatements = records.map(record => {
            const values = columns.map(key => {
                const value = record[key];
                if (value === null || value === undefined) return "NULL";
                if (typeof value === "number") return value;
                return `'${String(value).replace(/'/g, "''")}'`;
            });
            return `INSERT INTO ${tableName} (${columns.join(", ")}) VALUES (${values.join(", ")});`;
        });

        const blob = new Blob([sqlStatements.join("\n")], { type: "text/sql" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = (window.baseFileName || "data") + ".sql";
        link.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Invalid JSON");
        console.log(err);
    }
}

function showJson(){
    document.getElementById("json-tool-wrapper").style.display = 'flex';
    document.getElementById('exportOptions').style.display = 'flex';
}