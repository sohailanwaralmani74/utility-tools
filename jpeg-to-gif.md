

<script src="https://cdn.jsdelivr.net/npm/gif.js.optimized/dist/gif.js"></script>
<script src="/assets/js/jszip.min.js"></script>
<section class="tool-section container">
  <div class="upload-section">
    <label for="imageUpload" class="upload-label" style="margin-left: 1rem;">Upload Image(s)</label>
    <input type="file" id="imageUpload" multiple />
  </div>

  <div id="loader" style="display:none;">⏳ Loading files...</div>

  <div id="exportOptions" style="width:100%; justify-content:end; margin-top:1rem; position:sticky; display:none;">
    <label id="convertButton" class="export-label" style="cursor:pointer;">
      <u>Convert</u>
    </label>
  </div>
</section>

<div id="uploadedFiles" style="margin-top:2px; max-height:85vh; overflow:hidden; width:100%;"></div>

<!-- Main converter config -->
<div id="converter" data-input="avif" data-output="webp"></div>

<script src="/assets/js/image-to-gif.js"></script>