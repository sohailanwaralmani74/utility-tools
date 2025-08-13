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

function convertJSONToExcel(){
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) {  alert("Invalid JSON"); return; }
   try{
    const json = JSON.parse(jsonText);
    const ws = XLSX.utils.json_to_sheet(json);
    const html = XLSX.utils.sheet_to_html(ws, {
      header: '',
      editable: false,
      id: 'excel-table'
    });
    document.getElementById("table-container").innerHTML = html;
    document.getElementById("exportButtons").style.display = 'flex';
    document.getElementById("json-tool-wrapper").style.display = 'none';
    document.getElementById('exportOptions').style.display = 'none';
   } catch(err) {
    alert('Invalid JSON');
   }  
}
function showJson(){
    document.getElementById("json-tool-wrapper").style.display = 'flex';
    document.getElementById('exportOptions').style.display = 'flex';
}