
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
    document.getElementById('exportOptions').style.display = 'flex';

    // Show table
   
    document.getElementById('table-container').innerHTML = html;
  };

  // Read file
  if (isCSV) {
    reader.readAsText(file);
  } else {
    reader.readAsArrayBuffer(file);
  }
});

// Function to extract table data
function getTableData() {
  const table = document.querySelector("#table-container table");
  const rows = Array.from(table.rows);
  return rows.map(row =>
    Array.from(row.cells).map(cell => cell.innerText.trim())
  );
}

// Export to CSV
function exportToCSV() {
  const data = getTableData();
  let csv = data.map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = (window.baseFileName || "table") +".csv";
  link.click();
  URL.revokeObjectURL(url);
}

// Export to XLSX
function exportToXLSX() {
  const data = getTableData();
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, (window.baseFileName || "table") +".xlsx");
}

// Export to XLS
function exportToXLS() {
  const data = getTableData();
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const wopts = { bookType: 'xls', type: 'array' };
  const xlsData = XLSX.write(wb, wopts);
  const blob = new Blob([xlsData], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = (window.baseFileName || "table") +".xls";
  link.click();
  URL.revokeObjectURL(url);
}

// Export to JSON
function exportToJSON() {
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

  const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(jsonBlob);
  const link = document.createElement("a");
  link.href = url;
  link.download = (window.baseFileName || "table") +".json";
  link.click();
  URL.revokeObjectURL(url);
}

// Export to TXT
function exportToTXT() {
  const data = getTableData();
  let txt = data.map(row => row.join("\t")).join("\n");

  const blob = new Blob([txt], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "table.txt";
  link.click();
  URL.revokeObjectURL(url);
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

// Export to PDF (using html2pdf.js)
function exportToPDF() {
  // Ensure jsPDF and autoTable are correctly loaded
  const { jsPDF } = window.jspdf;
  if (!jsPDF) {
    console.error('jsPDF is not available');
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');  // Create a new jsPDF instance
  const table = document.querySelector("#table-container table");

  if (!table) {
    console.error('Table not found in #table-container');
    return;
  }

  const rows = Array.from(table.rows).map(row => Array.from(row.cells).map(cell => cell.innerText));

  // Define the columns (headers from the first row of the table)
  const columns = rows.shift();  // First row is used for headers

  // Add the table content using autoTable
  doc.autoTable({
    head: [columns],  // Header row
    body: rows,       // Table rows
    theme: 'grid',    // Optional: Add a grid style
    margin: { top: 10 },
  });

  // Save the generated PDF
  doc.save((window.baseFileName || "table") +".pdf");
}

function exportToXML() {
  const data = getTableData();
  if (data.length === 0) return;

  const headers = data[0];
  const rows = data.slice(1);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n`;

  rows.forEach(row => {
    xml += `  <row>\n`;
    row.forEach((cell, i) => {
      const tag = headers[i].replace(/\s+/g, "_").replace(/[^\w\-.:]/g, ""); // Safe tag
      xml += `    <${tag}>${cell}</${tag}>\n`;
    });
    xml += `  </row>\n`;
  });

  xml += `</rows>`;

  const blob = new Blob([xml], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "table.xml";
  link.click();
  URL.revokeObjectURL(url);
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

