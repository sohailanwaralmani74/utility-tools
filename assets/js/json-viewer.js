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
        console.log(e)
        viewer.innerText = 'Failed to render JSON';
    }
}

function exportToCSV() {
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

    const headers = Object.keys(jsonData[0]);
    const csvRows = [
        headers.join(","),
        ...jsonData.map(row => headers.map(field => {
            const val = row[field] !== null && row[field] !== undefined ? row[field] : '';
            return `"${String(val).replace(/"/g, '""')}"`;
        }).join(","))
    ];

    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const fileName = (window.baseFileName || "data") + ".csv";

    link.setAttribute("href", URL.createObjectURL(blob));
    link.setAttribute("download", fileName);
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportToXLSX() {
    const text = document.getElementById("json-editor").value.trim();
    if (!text) return alert("No JSON data to export!");

    let jsonData;
    try {
        jsonData = JSON.parse(text);
    } catch (e) {
        return alert("Invalid JSON format!");
    }

    if (!Array.isArray(jsonData)) jsonData = [jsonData];

    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const filename = (window.baseFileName || "data") + ".xlsx";
    XLSX.writeFile(workbook, filename);
}
function exportToXLS() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const ws = XLSX.utils.json_to_sheet(json);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        XLSX.writeFile(wb, (window.baseFileName || "data") + ".xls");
    } catch (err) {
        alert("Invalid JSON");
    }
}
function exportToTXT() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const lines = Array.isArray(json)
            ? json.map(obj => JSON.stringify(obj)).join("\n")
            : JSON.stringify(json, null, 2);

        const blob = new Blob([lines], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = (window.baseFileName || "data") + ".txt";
        link.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Invalid JSON");
    }
}

function exportToHTML() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const html = `<pre>${JSON.stringify(json, null, 2)}</pre>`;

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = (window.baseFileName || "data") + ".html";
        link.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Invalid JSON");
    }
}

async function exportToPDF() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;
  
    try {
      const json = JSON.parse(jsonText);
      const doc = new jspdf.jsPDF();
      const rows = Array.isArray(json) ? json : [json];
      const columns = Object.keys(rows[0]);
  
      const data = rows.map(obj => columns.map(col => obj[col] ?? ""));
  
      doc.autoTable({
        head: [columns],
        body: data,
      });
  
      doc.save((window.baseFileName || "data") + ".pdf");
    } catch (err) {
      alert("Invalid JSON");
    }
  }
  function exportToXML() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const items = Array.isArray(json) ? json : [json];

        const xml = items.map(obj => {
            const item = Object.entries(obj).map(([key, value]) => {
                return `  <${key}>${String(value).replace(/[<>&'"]/g, c => ({
                    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
                })[c])}</${key}>`;
            }).join('\n');
            return `<item>\n${item}\n</item>`;
        }).join('\n');

        const finalXML = `<root>\n${xml}\n</root>`;

        const blob = new Blob([finalXML], { type: "application/xml" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = (window.baseFileName || "data") + ".xml";
        link.click();
        URL.revokeObjectURL(url);
    } catch (err) {
        alert("Invalid JSON");
    }
}

function exportToSQL() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const json = JSON.parse(jsonText);
        const tableName = "my_table"; // you can let user choose this in future

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
