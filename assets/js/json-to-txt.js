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

function convertToCSV(){
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

     const json = JSON.parse(jsonText);
        const lines = Array.isArray(json)
            ? json.map(obj => JSON.stringify(obj)).join("\n")
            : JSON.stringify(json, null, 2);

    document.getElementById("csv-viewer").style.display = 'flex';
    document.getElementById("csv-viewer").textContent = lines;
    document.getElementById("exportButtons").style.display = 'flex';
    document.getElementById("json-tool-wrapper").style.display = 'none';
    document.getElementById('exportOptions').style.display = 'none';

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

function showJson(){
    document.getElementById("json-tool-wrapper").style.display = 'flex';
    document.getElementById('exportOptions').style.display = 'flex';
}