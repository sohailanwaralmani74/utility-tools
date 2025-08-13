
document.getElementById('file-input').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;
  const fullName = file.name;
  const baseName = fullName.replace(/\.[^/.]+$/, ""); // removes file extension
  window.baseFileName = baseName;

  const isCSV = file.name.toLowerCase().endsWith('.csv');

  // Show loader
  document.getElementById('loader').style.display = 'block';

  const reader = new FileReader();

  reader.onload = function (e) {
    let workbook;

    if (isCSV) {
      // For CSV
      const csvText = e.target.result;
      workbook = XLSX.read(csvText, { type: 'string' });
    } else {
      // For Excel
      const data = new Uint8Array(e.target.result);
      workbook = XLSX.read(data, { type: 'array' });
    }

    const firstSheet = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheet];
    const html = XLSX.utils.sheet_to_html(worksheet, {
      header: '',
      editable: false,
      id: 'excel-table'
    });

    // Hide loader and upload UI
    document.getElementById('loader').style.display = 'none';
    // Show table
   
    document.getElementById('table-container').innerHTML = html;
  };

  // Read file
  if (isCSV) {
    reader.readAsText(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
  document.getElementById('table-container').style.display= 'flex';
  document.getElementById('exportOptions').style.display = 'flex';
  $('#json-editor').empty().JSONView('', { collapsed: false });
});

// Export to JSON

function convertToJSON() {
     document.getElementById('loader').style.display = 'block';

  const data = getTableData();
  const rawHeaders = data.shift();
const headers = rawHeaders.map(header => {
  return header
    .trim()
    .replace(/\s+([a-zA-Z])/g, (_, chr) => chr.toUpperCase()) // Convert to camelCase
    .replace(/\s+/g, '') // Just in case
    .replace(/^[A-Z]/, ch => ch.toLowerCase()); // Lowercase first char
});
  const jsonData = data.map(row => {
    return headers.reduce((obj, header, i) => {
      obj[header] = row[i];
      return obj;
    }, {});
  });
  const pretty = JSON.stringify(jsonData, null, 2);
   document.getElementById('json-editor').style.display = 'flex';
    try {
        document.getElementById("json-editor").textContent = pretty;
        document.getElementById('table-container').style.display ='none';
    } catch (e) {
        console.log(e)
        document.getElementById("json-editor").textContent = 'Failed to render JSON';
    }
     document.getElementById('loader').style.display = 'none';
     document.getElementById('exportOptions').style.display = 'none';
     document.getElementById('exportButtons').style.display = 'flex';
}
// Function to extract table data
function getTableData() {
  const table = document.querySelector("#table-container table");
  const rows = Array.from(table.rows);
  return rows.map(row =>
    Array.from(row.cells).map(cell => cell.innerText.trim())
  );
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

function showExcel(){
    document.getElementById('table-container').style.display= 'flex';
    document.getElementById('exportOptions').style.display= 'flex';
}

function exportToJSON() {
  // 1. Grab & trim the JSON text
  const jsonText = document
    .getElementById('json-editor')
    .value
    .trim();

  // 2. Validate it’s valid JSON
  try {
    JSON.parse(jsonText);
  } catch (err) {
    return alert('Invalid JSON:\n' + err.message);
  }

  // 3. Create a Blob and object URL
  const blob = new Blob([jsonText], { type: 'application/json' });
  const url  = URL.createObjectURL(blob);

  // 4. Create a temporary <a> to trigger download
  const a = document.createElement('a');
  a.href         = url;
  a.download     = 'data.json';   // default filename
  document.body.appendChild(a);   // Firefox needs it in the DOM
  a.click();                      // start download
  a.remove();                     // clean up
  URL.revokeObjectURL(url);       // free memory
}
