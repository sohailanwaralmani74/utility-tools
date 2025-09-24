---
layout: main
title: JPG To JPEG - Convert .jpg to .jpeg
keywords: jpg to jpeg, .jpg to .jpeg, convert jpg to jpeg, jpg image to jpeg, convert .jpg to .jpeg online
description: Convert JPG to JPEG instantly in your browser. Fast, secure, and private — no file upload required.
---

<section class="tool-section container">
  <div class="upload-section">
    <label for="jpgUpload" class="upload-label"
           style="background:orange;color:#fff;padding:10px 14px;border-radius:6px;cursor:pointer;user-select:none;">
      Upload JPG(s)
    </label>
    <input type="file" id="jpgUpload" accept="image/jpeg,image/jpg" multiple style="display:none;" />
  </div>
</section>

<section class="tool-section container">
  <div id="uploadedImages" class="uploadedImages"
       style="display:flex;flex-wrap:wrap;gap:12px;max-height:220px;border-radius:8px;padding:12px;
              border:1px dashed #eee;background:#fafafa;"></div>
</section>

<section class="tool-section container" style="position:relative;">
  <div class="upload-section">
    <label id="convertToJpeg" class="upload-label" 
           style="display:none;right:16px;top:16px;background:orange;color:#fff;
                  padding:10px 14px;border-radius:6px;cursor:pointer;user-select:none;box-shadow:0 3px 8px rgba(0,0,0,0.08);">
      Convert to JPEG
    </label>
  </div>
  <div id="loader" style="display:none;margin-top:1rem;">⏳ Converting... please wait</div>

  <!-- libraries (kept inside a section as requested) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>

  <!-- external JS file -->
  <script src="assets/js/jpg-to-jpeg.js"></script>
</section>
