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
function convertToJSON() {
  const xmlContent = document.getElementById('xmlDisplay').textContent.trim();
  if (!xmlContent) return;

  try {
    const parser = new DOMParser();
    const safeXML = xmlContent.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9A-Fa-f]+;)/g, '&amp;');

    const xmlDoc = parser.parseFromString(safeXML, "application/xml");
    
    // Find the first repeating element
    const allElements = Array.from(xmlDoc.documentElement.children);
    const tagCounts = {};
    allElements.forEach(el => {
      const name = el.nodeName;
      tagCounts[name] = (tagCounts[name] || 0) + 1;
    });

    const repeatingTag = Object.entries(tagCounts).find(([, count]) => count > 1)?.[0];

    if (!repeatingTag) {
      alert("No repeating structure found to export JSON.");
      return;
    }

    const records = Array.from(xmlDoc.getElementsByTagName(repeatingTag));
    const headers = Array.from(records[0].children).map(child => child.nodeName);

    const jsonData = records.map(record => {
      const obj = {};
      headers.forEach(tag => {
        const el = record.getElementsByTagName(tag)[0];
        obj[tag] = el ? el.textContent.trim() : "";
      });
      return obj;
    });

    jsonEditor.value = JSON.stringify(jsonData, null, 2);

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

async function exportToJSON(ext) {
  const xmlContent = document.getElementById('xmlDisplay').textContent.trim();
  if (!xmlContent) return;

  try {
    const parser = new DOMParser();
    const safeXML = xmlContent.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9A-Fa-f]+;)/g, '&amp;');

    const xmlDoc = parser.parseFromString(safeXML, "application/xml");
    
    // Find the first repeating element
    const allElements = Array.from(xmlDoc.documentElement.children);
    const tagCounts = {};
    allElements.forEach(el => {
      const name = el.nodeName;
      tagCounts[name] = (tagCounts[name] || 0) + 1;
    });

    const repeatingTag = Object.entries(tagCounts).find(([, count]) => count > 1)?.[0];

    if (!repeatingTag) {
      alert("No repeating structure found to export JSON.");
      return;
    }

    const records = Array.from(xmlDoc.getElementsByTagName(repeatingTag));
    const headers = Array.from(records[0].children).map(child => child.nodeName);

    const jsonData = records.map(record => {
      const obj = {};
      headers.forEach(tag => {
        const el = record.getElementsByTagName(tag)[0];
        obj[tag] = el ? el.textContent.trim() : "";
      });
      return obj;
    });

    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const fileName = (window.baseFileName || "data") + ext;
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(a.href);

  } catch (err) {
    console.error("Error:", err);
    alert("Failed to convert XML to JSON. See console for details.");
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
