---
layout: main
title: Convert CSV To XML
description: Converter and metadata scrubber, Along with png to jpeg, wav to mp3, Recet Image & Much more;
keywords: 
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>


<h1>Convert CSV To XML | Edit And Export</h1>


<section class="tool-section container" style="width: 99%; overflow-y: hidden;">
    <div class="upload-section">
        <label for="file-input" class="upload-label">Upload Excel File</label>
        <input type="file" id="file-input" accept=".csv">
    </div>
 <div id="loader" style="display:none;">⏳ Loading file...</div>
<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportOptions">
        <label class="export-label" onclick="convertToXML()" ><u>Convert To XML</u></label>
    </div>
<div id="table-container" style="  max-height: 78vh; overflow: auto; margin-top: 1rem;" contenteditable></div>

<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportButtons">
 <label class="export-label" onclick="exportToXML()" ><u>Exoprt To -> .xml</u></label>
 <label class="export-label" onclick="showExcel()" ><u>Show CSV</u></label>
</div>
  <div id="editorWrapper" style="display:none">
    <textarea id="uploadedFiles" style="height:70vh"></textarea>
  </div>

<script src="/assets/js/xlsx-to-xml.js"></script>