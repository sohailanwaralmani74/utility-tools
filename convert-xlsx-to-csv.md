---
layout: main
title: Convert XLSX To CSV Offline
description: Converter and metadata scrubber, Along with png to jpeg, wav to mp3, Recet Image & Much more;
keywords: 
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>

<!-- JSONView (depends on jQuery) -->


<h1>Convert XLSX To CSV Free And Offline</h1>


<section class="tool-section container" style="width: 99%; overflow-y: hidden;">
    <div class="upload-section">
        <label for="file-input" class="upload-label">Upload Excel File</label>
        <input type="file" id="file-input" accept=".xlsx,.xls">
    </div>
 <div id="loader" style="display:none;">⏳ Loading file...</div>
<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportOptions">
        <label class="export-label" onclick="convertToCSV()" ><u>Convert To CSV</u></label>
    </div>
<div id="table-container" style="  max-height: 78vh; overflow: auto; margin-top: 1rem;" contenteditable></div>

<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportButtons">
 <label class="export-label" onclick="exportToCSV()" ><u>Exoprt To -> .csv</u></label>
 <label class="export-label" onclick="showExcel()" ><u>Show Excel</u></label>
</div>
   <textarea id="json-editor" placeholder="Data Will Be Displayed Here" style="display:none; height: 75vh"></textarea>
<script src="/assets/js/xlsx-to-csv.js"></script>