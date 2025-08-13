
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

function getTableData() {
  const table = document.querySelector("#table-container table");
  const rows = Array.from(table.rows);
  return rows.map(row =>
    Array.from(row.cells).map(cell => cell.innerText.trim())
  );
}

// Export to HTML
function exportToHTML() {
  const data = getTableData();
  let html = '<table border="1">';
  html += data.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
  html += '</table>';

  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = (window.baseFileName || "table") +".html";
  link.click();
  URL.revokeObjectURL(url);
}