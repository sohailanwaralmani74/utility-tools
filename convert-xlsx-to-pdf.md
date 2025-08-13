---
layout: main
title: Convert XLSX To PDF Offline Free
description: Converter and metadata scrubber, Along with png to jpeg, wav to mp3, Recet Image & Much more;
keywords: 
---
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.26/jspdf.plugin.autotable.min.js"></script>
<!-- JSONView (depends on jQuery) -->
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jsonview@1.2.0/dist/jquery.jsonview.min.js"></script>
<link href="https://cdn.jsdelivr.net/npm/jsonview@1.2.0/dist/jquery.jsonview.min.css" rel="stylesheet">

<h1>Convert XLSX To PDF | Preview And Download</h1>


<section class="tool-section container" style="width: 99%; overflow-y: hidden;">
    <div class="upload-section">
        <label for="file-input" class="upload-label">Upload Excel File</label>
        <input type="file" id="file-input" accept=".xlsx,.xls">
    </div>
 <div id="loader" style="display:none;">⏳ Loading file...</div>
<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportOptions">
        <label class="export-label" onclick="convertTableToPDF()" ><u>Convert To PDF</u></label>
    </div>
<div id="table-container" style="  max-height: 78vh; overflow: auto; margin-top: 1rem;" contenteditable></div>

<div style="min-width: 100%; display:none; justify-content: flex-end; margin-top: 1rem; margin-bottom: 1rem;" id="exportButtons">
 <label class="export-label" onclick="exportToPDF()" ><u>Exoprt To -> .pdf</u></label>
 <label class="export-label" onclick="showExcel()" ><u>Show Excel</u></label>
</div>
     <div id="uploadedFiles" style="margin-top: 2px; min-height: 75vh; overflow: hidden; width: 100%;"></div>

<script src="/assets/js/xlsx-to-pdf.js"></script>