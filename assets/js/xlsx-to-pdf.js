
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

// Export to PDF

async function convertTableToPDF() {
  const table = document.querySelector('#table-container table');
  if (!table) {
    alert("No table found inside #table-container.");
    return;
  }
     document.getElementById('loader').style.display = 'none';
     document.getElementById('exportOptions').style.display = 'none';
     document.getElementById('exportButtons').style.display = 'flex';
     document.getElementById('table-container').style.display ='none';
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.autoTable({ html: table });

  // Create a PDF Blob and preview it in <iframe> inside #uploadedFiles
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  // Inject the PDF viewer into #uploadedFiles
  const uploadedDiv = document.getElementById('uploadedFiles');
  uploadedDiv.innerHTML = `
    <iframe src="${url}" width="100%" style="border: none; min-height: 75vh;"></iframe>
  `;
}
function convertToPDF() {
  const table = document.querySelector('#table-container table');
  if (!table) {
    alert("No table found inside #table-container.");
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.autoTable({ html: table });

  const pdfBlob = doc.output("blob");
  const url = URL.createObjectURL(pdfBlob);
  document.getElementById("uploadedFiles").src = url;
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