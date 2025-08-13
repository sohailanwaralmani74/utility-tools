
document.getElementById('file-input').addEventListener('change', function (e) {
     document.getElementById('editorWrapper').style.display = 'none';
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
  
function convertToXML() {
  const table = document.querySelector("#table-container table");
  if (!table) return alert("No table found!");

  const rows = table.rows;
  if (rows.length < 2) return alert("Table has no data");
  document.getElementById('editorWrapper').style.display = 'flex';
     document.getElementById('loader').style.display = 'none';
     document.getElementById('exportOptions').style.display = 'none';
     document.getElementById('exportButtons').style.display = 'flex';
     document.getElementById('table-container').style.display ='none';

  const headers = [...rows[0].cells].map(cell => cell.textContent.trim());

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<rows>\n';

  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].cells;
    xml += "  <row>\n";
    for (let j = 0; j < cells.length; j++) {
      const key = headers[j] || `Column${j + 1}`;
      const value = cells[j].textContent.trim();
      xml += `    <${key}>${escapeXml(value)}</${key}>\n`;
    }
    xml += "  </row>\n";
  }

  xml += "</rows>";

  // Set XML in your editable textarea
  document.getElementById("uploadedFiles").value = xml;
  initXmlEditor();
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      "'": '&apos;',
      '"': '&quot;'
    }[c];
  });
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

function initXmlEditor() {
  // Check if CodeMirror is already loaded
  if (typeof CodeMirror === 'undefined') {
    // Load CodeMirror CSS and JS dynamically
    const css1 = document.createElement('link');
    css1.rel = 'stylesheet';
    css1.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.css';

    const css2 = document.createElement('link');
    css2.rel = 'stylesheet';
    css2.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/theme/eclipse.min.css';

    const js1 = document.createElement('script');
    js1.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/codemirror.min.js';

    const js2 = document.createElement('script');
    js2.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.13/mode/xml/xml.min.js';

    document.head.appendChild(css1);
    document.head.appendChild(css2);
    document.head.appendChild(js1);
    document.head.appendChild(js2);

    // Wait for CodeMirror to load before initializing
    js2.onload = () => setupXmlEditor();
  } else {
    setupXmlEditor();
  }

  function setupXmlEditor() {
    const textarea = document.getElementById('uploadedFiles');
    if (!textarea) return;

    // Prevent duplicate initialization
    if (textarea.classList.contains('cm-initialized')) return;

    const cm = CodeMirror.fromTextArea(textarea, {
      mode: 'application/xml',
      theme: 'eclipse',
      lineNumbers: true,
      lineWrapping: true,
      readOnly: false
    });
    const cmWrapper = cm.getWrapperElement();
    cmWrapper.style.width = '100%';
    textarea.classList.add('cm-initialized');
    textarea._cmInstance = cm;
  }
}
function exportToXML() {
  const xmlContent = document.getElementById("uploadedFiles").value.trim();
  
  if (!xmlContent) {
    alert("XML content is empty.");
    return;
  }

  const blob = new Blob([xmlContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "converted.xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
}
