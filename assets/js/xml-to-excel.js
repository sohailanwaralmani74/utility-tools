// DOM references
const xmlInput = document.getElementById('xml-file');
const xmlDisplay = document.getElementById('xmlDisplay');
const loader = document.getElementById('loader');
const exportOptions = document.getElementById('exportOptions');
const exportButtons = document.getElementById('exportButtons');
const tableContainer = document.getElementById('table-container');
const excelContainer = document.getElementById('excel-container');

// File upload + Prism + escaped preview
xmlInput.addEventListener('change', function (e) {
  loader.style.display = 'block';
  const file = e.target.files[0];
  if (!file) return;

  const fullName = file.name;
  const baseName = fullName.replace(/\.[^/.]+$/, "");
  window.baseFileName = baseName;

  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const xmlContent = event.target.result;
      const escapedXML = xmlContent
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      xmlDisplay.innerHTML = escapedXML;
      Prism.highlightElement(xmlDisplay);

      exportOptions.style.display = 'flex';
      exportButtons.style.display = 'none';
      tableContainer.innerHTML = '';
      excelContainer.style.display = 'block';
      loader.style.display = 'none';
    } catch (err) {
      console.error("Error displaying XML:", err);
      loader.style.display = 'none';
    }
  };

  reader.onerror = function () {
    console.error("Failed to read the file.");
    loader.style.display = 'none';
  };

  reader.readAsText(file);
});

// Convert to Excel (from raw text)
function convertToExcel() {
  try {
    // Unescape XML for parsing
    const rawEscaped = xmlDisplay.innerText;
    const xmlText = rawEscaped
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&');

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, "text/xml");

    const rows = [];
    const root = xmlDoc.documentElement;
    const children = root.children;

    if (!children || children.length === 0) {
      alert("XML is empty or unstructured.");
      return;
    }

    const firstChild = children[0];
    const headers = Array.from(firstChild.children).map(child => child.nodeName);
    rows.push(headers);

    Array.from(children).forEach(item => {
      const row = headers.map(header => {
        const el = item.getElementsByTagName(header)[0];
        return el ? el.textContent.trim() : '';
      });
      rows.push(row);
    });

    renderExcelTable(rows);

    // Switch view
    exportOptions.style.display = 'none';
    exportButtons.style.display = 'flex';
    excelContainer.style.display = 'none';
    tableContainer.style.display = 'block';

  } catch (err) {
    console.error("Conversion error:", err);
    alert("Unable to convert XML.");
  }
}

// Render HTML table
function renderExcelTable(data) {
  let html = '<table contenteditable="true" style="width:100%; border-collapse: collapse;">';
  data.forEach(row => {
    html += '<tr>';
    row.forEach(cell => {
      html += `<td style="border:1px solid #ccc; padding: 0.5rem;">${cell}</td>`;
    });
    html += '</tr>';
  });
  html += '</table>';
  tableContainer.innerHTML = html;
}

// Export table to XLSX or XLS
function exportExcelFile(type) {
  const table = tableContainer.querySelector('table');
  const data = [];

  for (let row of table.rows) {
    const rowData = [];
    for (let cell of row.cells) {
      rowData.push(cell.innerText.trim());
    }
    data.push(rowData);
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  const fileName = (window.baseFileName || 'converted') + '.' + type;
  XLSX.writeFile(workbook, fileName, { bookType: type });
}

function exportToXLSX() {
  exportExcelFile('xlsx');
}

function exportToXLS() {
  exportExcelFile('xls');
}

function showXML() {
  exportOptions.style.display = 'flex';
  excelContainer.style.display = 'block';
}
