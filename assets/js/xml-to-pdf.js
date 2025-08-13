// Global references
const xmlDisplay = document.getElementById('xmlDisplay');
const loader = document.getElementById('loader');
const exportOptions = document.getElementById('exportOptions');
const exportButtons = document.getElementById('exportButtons');
const xmlContainer = document.getElementById('XML-container');
const uploadedDiv = document.getElementById('uploadedFiles');

// File upload listener
document.getElementById('xml-file').addEventListener('change', function (e) {
  loader.style.display = 'block';
  const file = e.target.files[0];
  if (!file) return;
  uploadedDiv.style.display = 'none';
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

//////-----------------------PDF Conversion -------------------------//////

async function convertToPDFTable() {
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

      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "landscape",   // or "portrait"
      });
      doc.autoTable({
        head: [headers],
        body: data
      });

 // Create a PDF Blob and preview it in <iframe> inside #uploadedFiles
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  // Inject the PDF viewer into #uploadedFiles

  xmlContainer.style.display= 'none';
  exportOptions.style.display= 'none';
  uploadedDiv.style.display= 'block';
  exportButtons.style.display= 'flex';
  uploadedDiv.innerHTML = `
    <iframe src="${url}" width="100%" style="border: none; min-height: 75vh;"></iframe>
  `;
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to convert XML to PDF. See console for details.");
    }
  }
//////////////////////    Raw PDF    ///////////////////////


  async function convertRawXMLToPDF() {
    const xmlContent = document.getElementById('xmlDisplay').textContent.trim();
    if (!xmlContent) return;
  
    try {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({
        orientation: "portrait", // Portrait for raw content readability
      });
  
      const lineHeight = 1.2;
      const maxWidth = 180; // adjust according to page size and margins
      const margin = 10;
  
      // Convert raw XML into an array of lines for wrapping
      const lines = doc.splitTextToSize(xmlContent, maxWidth);
      let y = margin;
  
      doc.setFont("Courier", "normal");
      doc.setFontSize(10);
  
      lines.forEach((line) => {
        if (y > 280) { // Check for page overflow
          doc.addPage();
          y = margin;
        }
        doc.text(line, margin, y);
        y += lineHeight * 4;
      });
   // Create a PDF Blob and preview it in <iframe> inside #uploadedFiles
  const blob = doc.output('blob');
  const url = URL.createObjectURL(blob);

  
  xmlContainer.style.display= 'none';
  exportOptions.style.display= 'none';
  uploadedDiv.style.display= 'block';
  exportButtons.style.display= 'flex';

  uploadedDiv.innerHTML = `
    <iframe src="${url}" width="100%" style="border: none; min-height: 75vh;"></iframe>
  `;
    } catch (err) {
      console.error("Failed to export RAW XML to PDF:", err);
      alert("Export failed. See console for details.");
    }
  }

  // Show XML again
function showXML() {
  xmlContainer.style.display = 'block';
  exportOptions.style.display = 'flex';
}
