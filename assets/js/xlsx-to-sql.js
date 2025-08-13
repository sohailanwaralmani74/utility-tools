
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
});

function getTableData() {
  const table = document.querySelector("#table-container table");
  const rows = Array.from(table.rows);
  return rows.map(row =>
    Array.from(row.cells).map(cell => cell.innerText.trim())
  );
}

function exportToSQL() {
  const table = document.querySelector("#table-container table");
  if (!table) {
    console.error("Table not found");
    return;
  }

  const rows = Array.from(table.rows);
  if (rows.length < 2) {
    console.error("Not enough data to export");
    return;
  }

  const tableName = window.baseFileName || "my_table";
  //const headers = Array.from(rows[0].cells).map(cell => cell.innerText.trim());
  const headers = Array.from(rows[0].cells).map(cell => cell.innerText.trim().replace(/\s+/g, "_")
  );
  const insertStatements = rows.slice(1).map(row => {
    const values = Array.from(row.cells).map(cell => {
      const val = cell.innerText.trim().replace(/'/g, "''"); // Escape single quotes
      return `'${val}'`;
    });
    return `INSERT INTO ${tableName} (${headers.join(", ")}) VALUES (${values.join(", ")});`;
  });

  const fullSQL = insertStatements.join("\n");

  const blob = new Blob([fullSQL], { type: "text/sql" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${tableName}.sql`;
  link.click();
  URL.revokeObjectURL(url);
}
