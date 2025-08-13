// Global references
const xmlDisplay = document.getElementById('xmlDisplay');
const loader = document.getElementById('loader');
const exportOptions = document.getElementById('exportOptions');
const exportButtons = document.getElementById('exportButtons');
const jsonEditor = document.getElementById('json-editor');
const xmlContainer = document.getElementById('XML-container');

let baseFileName = 'converted';

// Convert to JSON and show textarea
function convertToSQL() {
  const xmlContent = document.getElementById("xmlDisplay").innerText.trim();  // Get the XML content from the editor
    
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
            alert("No repeating structure found to build a table.");
            return;
        }

        const records = Array.from(xmlDoc.getElementsByTagName(repeatingTag));
        const headers = Array.from(records[0].children).map(child => child.nodeName);
        const data = records.map(record =>
            headers.map(tag => {
                const el = record.getElementsByTagName(tag)[0];
                return el ? el.textContent.trim() : "";
            })
        );

        // Build the SQL query
        let sqlQuery = "";
        const values =  data.map(row => "INSERT INTO table_name (" + headers.join(", ") + ") VALUES " + "(" + row.map(val => `'${val.replace(/'/g, "''")}'`).join(", ") + ")").join(";\n");
        sqlQuery += values + ";";

    jsonEditor.value = sqlQuery;

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

function exportToSQL(ext) {
  const content = document.getElementById('json-editor').value;
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `converted${ext}`;
  link.click();
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
