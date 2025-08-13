// Global references
const xmlDisplay = document.getElementById('xmlDisplay');
const loader = document.getElementById('loader');
const exportOptions = document.getElementById('exportOptions');
const exportButtons = document.getElementById('exportButtons');
const jsonEditor = document.getElementById('json-editor');
const xmlContainer = document.getElementById('XML-container');

let baseFileName = 'converted';
let parsedJSON = null;
let cleanJson = null;

// Convert to JSON and show textarea
function convertToCSV() {
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
        return el  ? el.textContent.trim() : '';
      });
      rows.push('\n' + row);
    });
  
    // Create CSV string from headers and data
    //const csvContent = [headers.join(","), ...data.map(row => row.join(","))].join("\n");
    jsonEditor.value = rows;

    jsonEditor.style.display = 'block';
    exportButtons.style.display = 'flex';
    xmlContainer.style.display = 'none';
    exportOptions.style.display = 'none';
  } catch (err) {
    alert("Failed to convert XML to JSON");
    console.error(err);
  }
}

// Show XML again
function showXML() {
  xmlContainer.style.display = 'block';
  exportOptions.style.display = 'flex';
}

///////////////   Export to JSON   ////////////////

async function exportToCSV(ext) {
    try{
  const content = document.getElementById('json-editor').value;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `converted${ext}`;
  link.click();
  } catch (err) {
    console.error("Error:", err);
    alert("Failed to convert XML to CSV. See console for details.");
  }
}



// File upload listener
document.getElementById('xml-file').addEventListener('change', function (e) {
  loader.style.display = 'block';
  const file = e.target.files[0];
  if (!file) return;

  const fullName = file.name;
  baseFileName = fullName.replace(/\.[^/.]+$/, "");

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
      loader.style.display = 'none';
    } catch (err) {
      console.error("Error displaying XML:", err);
      loader.style.display = 'none';
    }
  };

  reader.onerror = function () {
    console.error("Failed to read the file.");
  };

  reader.readAsText(file);
});
