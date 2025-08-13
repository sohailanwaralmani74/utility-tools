document.getElementById('xml-file').addEventListener('change', function (e) {
    // Show loader
  document.getElementById('loader').style.display = 'block';
    const file = e.target.files[0];
    if (!file) return;
    const fullName = file.name;
    const baseName = fullName.replace(/\.[^/.]+$/, ""); // removes file extension
    window.baseFileName = baseName;
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const xmlContent = event.target.result;
            const escapedXML = xmlContent
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
            document.getElementById('xmlDisplay').innerHTML = escapedXML;
            Prism.highlightElement(document.getElementById('xmlDisplay'));
            // Hide upload button, show export options
            document.getElementById('exportOptions').style.display = 'flex';
            // Show loader
            document.getElementById('loader').style.display = 'none';

        } catch (err) {
            console.error("Error displaying XML:", err);
            // Show loader
            document.getElementById('loader').style.display = 'none';
        }
    };

    reader.onerror = function () {
        console.error("Failed to read the file.");
    };

    reader.readAsText(file);
});


///////////////////         SQL            ////////////////////

function exportToSQL() {
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
        let sqlQuery = "INSERT INTO table_name (" + headers.join(", ") + ") VALUES ";
        const values = data.map(row => "(" + row.map(val => `'${val.replace(/'/g, "''")}'`).join(", ") + ")").join(", ");
        sqlQuery += values + ";";

        // Display or download the SQL query
        console.log(sqlQuery);  // For testing
        alert("SQL Query Generated: \n\n" + sqlQuery);

        // Optionally, download the SQL as a .sql file
        const blob = new Blob([sqlQuery], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.sql";
        link.click();
        URL.revokeObjectURL(url);

    } catch (err) {
        console.error("Error generating SQL:", err);
    }
} 

//////-----------------------PDF Conversion -------------------------//////

async function exportToPDF() {
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

      doc.save((window.baseFileName || "data") + ".pdf");

    } catch (err) {
      console.error("Error:", err);
      alert("Failed to convert XML to PDF. See console for details.");
    }
  }


///////////////   Export to JSON   ////////////////

async function exportToJSON() {
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
    const fileName = (window.baseFileName || "data") + ".json";
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

//////////////////    XLXS   ///////////////////


async function exportToXLSX() {
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
        alert("No repeating structure found to export XLSX.");
        return;
      }
  
      const records = Array.from(xmlDoc.getElementsByTagName(repeatingTag));
      const headers = Array.from(records[0].children).map(child => child.nodeName);
  
      const data = records.map(record => {
        const row = {};
        headers.forEach(tag => {
          const el = record.getElementsByTagName(tag)[0];
          row[tag] = el ? el.textContent.trim() : "";
        });
        return row;
      });
  
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      const fileName = (window.baseFileName || "data") + ".xlsx";
      XLSX.writeFile(workbook, fileName);
  
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to convert XML to XLSX. See console for details.");
    }
  }

  /////////////////////   Export to XLS    ///////////////////


  function exportToXLS() {
    const xmlContent = document.getElementById('xmlDisplay').textContent.trim();
    if (!xmlContent) return;
  
    try {
      // Escape unsafe ampersands properly
      const safeXML = xmlContent.replace(/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;|#x[0-9A-Fa-f]+;)/g, '&amp;');
  
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(safeXML, "application/xml");
  
      // Find first repeating tag
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
  
      // Create worksheet
      const worksheetData = [headers, ...data];
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  
      // Export as XLS
      XLSX.writeFile(workbook, (window.baseFileName || "data") + ".xls", { bookType: "xls" });
  
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to convert XML to XLS. See console for details.");
    }
  }
  //////////////////////    Raw PDF    ///////////////////////


  async function exportRawXMLToPDF() {
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
  
      doc.save((window.baseFileName || "raw-xml") + "_RAW.pdf");
    } catch (err) {
      console.error("Failed to export RAW XML to PDF:", err);
      alert("Export failed. See console for details.");
    }
  }
  
  function exportToCSV() {
    // Get the XML content from the div
    const xmlContent = document.getElementById("xmlDisplay").innerText.trim();
  
    // Parse the XML content into a DOM object
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlContent, "application/xml");
  
    // Convert XML data to an array of objects (assuming simple XML structure with uniform tags)
    const rows = Array.from(xmlDoc.getElementsByTagName("row")); // Assuming <row> is the root element for each record
    const headers = []; // To store column headers
    const data = []; // To store the CSV data
  
    // Iterate over each row and extract data
    rows.forEach((row, index) => {
      const rowData = [];
      const columns = row.children; // Get child elements of <row> (columns)
  
      Array.from(columns).forEach((col) => {
        if (index === 0) {
          // First row: Collect headers from the element names
          headers.push(col.nodeName);
        }
        // Collect data for each column
        rowData.push(col.textContent.trim());
      });
  
      // Add the row data to the data array
      data.push(rowData);
    });
  
    // Create CSV string from headers and data
    const csvContent = [headers.join(","), ...data.map(row => row.join(","))].join("\n");
  
    // Trigger file download
    downloadCSV(csvContent);
  }
  
  // Function to trigger a download of the CSV file
  function downloadCSV(csvContent) {
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "exported_data.csv";
    link.click();
  }
  