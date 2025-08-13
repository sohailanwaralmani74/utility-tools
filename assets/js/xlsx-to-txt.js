
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

function convertToTXT() {
     document.getElementById('loader').style.display = 'block';

  const data = getTableData();
  let txt = data.map(row => row.join("\t")).join("\n");

   document.getElementById('json-editor').style.display = 'flex';
    try {
        document.getElementById("json-editor").textContent = txt;
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

function showExcel(){
    document.getElementById('table-container').style.display= 'flex';
    document.getElementById('exportOptions').style.display= 'flex';
}

// Export to TXT
function exportToTXT() {
    const jsonText = document.getElementById("json-editor").value.trim();
    if (!jsonText) return;

    try {
        const blob = new Blob([jsonText], { type: "text/plain" });
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