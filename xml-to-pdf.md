---
layout: main
title: Free Online XML Editor & Converter To Any Formats
description: Easily convert XML files to various formats like XLSX, XLS, JSON, PDF (RAW), PDF (Table), and CSV. Free online XML converter.
keywords: convert xml to xlsx, convert xml to xls, convert xml to json, convert xml to pdf raw, convert xml to pdf table, convert xml to csv, xml to xlsx, xml to xls, xml to json, xml to pdf raw, xml to pdf table, xml to csv, online xml converter, xml file converter, free xml converter
---

<!-- jsPDF CDN -->
<!-- Include jsPDF -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-xml-doc.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.26/jspdf.plugin.autotable.min.js"></script>


<!-- Tool section -->
<section class="tool-section container">
  <div class="upload-section">
    <label for="xml-file" class="upload-label">Upload XML File</label>
    <input type="file" id="xml-file" accept=".xml">
  </div>

  <div id="loader" style="display:none;">⏳ Loading file...</div>
  <div style="width: 99%; justify-content: flex-end; margin-top: 1rem; position: sticky; display:none;"
    id="exportOptions">
    <label class="export-label" onclick="convertRawXMLToPDF()"><u>Convert To Raw PDF</u></label>
    <label class="export-label" onclick="convertToPDFTable()"><u>Convert To PDF Table</u></label>
  </div>
</section>

<div id="XML-container" style="margin-top: 10px; max-height: 78vh; overflow: auto; width: 100%; ">
  <pre><code id="xmlDisplay" contenteditable="true" ></code></pre>
</div>

<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportButtons">
 <label class="export-label" onclick="showXML()" ><u>Show XML</u></label>
</div>
<div id="uploadedFiles" style="margin-top: 2px; max-height: 75vh; overflow: hidden; width: 100%;"></div>

<script src="/assets/js/xml-to-pdf.js"></script>