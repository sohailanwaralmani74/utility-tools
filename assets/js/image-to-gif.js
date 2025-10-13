// to-gif.js
// Requires gif.js: <script src="https://cdn.jsdelivr.net/npm/gif.js.optimized/dist/gif.js"></script>

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("imageUpload");
  const convertBtn = document.getElementById("convertButton");
  const exportOptions = document.getElementById("exportOptions");
  let uploadedImages = [];

  // Update button text
  convertBtn.innerHTML = `<u>Convert Images to GIF</u>`;

  // File selection
  fileInput.addEventListener("change", e => {
    const files = Array.from(e.target.files).filter(f =>
      /\.(png|jpg|jpeg|webp|bmp|tiff?)$/i.test(f.name)
    );
    if (!files.length) return alert(`Please upload valid images.`);

    uploadedImages = files;
    previewImages(files);
    exportOptions.style.display = "flex";
  });

  // Conversion click
  convertBtn.addEventListener("click", () => {
    if (!uploadedImages.length) return alert("Upload at least one image.");
    exportToGIF(uploadedImages);
  });
});

// Preview logic
function previewImages(files) {
  const container = document.getElementById("uploadedFiles");
  container.innerHTML = "";
  container.style.cssText = `
    border:2px solid #ccc;
    padding:10px;
    border-radius:5px;
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    min-height:100px;
    align-items:flex-start;
    overflow:auto;
  `;

  const fragment = document.createDocumentFragment();
  files.forEach(file => {
    const objectUrl = URL.createObjectURL(file);
    const wrapper = document.createElement("div");
    wrapper.style = "position:relative;display:inline-block;margin:5px;";

    const img = document.createElement("img");
    img.src = objectUrl;
    img.style = "max-width:200px;max-height:200px;border:1px solid #ddd;border-radius:3px;object-fit:contain;";
    img.loading = "lazy";

    const info = document.createElement("div");
    info.style = "text-align:center;color:#555;";
    info.innerHTML = `
      <div style="font-size:12px;">${file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name}</div>
      <div style="font-size:11px;color:#888;">${(file.size / 1048576).toFixed(2)} MB</div>
    `;

    wrapper.appendChild(img);
    wrapper.appendChild(info);
    fragment.appendChild(wrapper);
    img.onload = () => URL.revokeObjectURL(objectUrl);
  });
  container.appendChild(fragment);
}

// GIF Conversion
function exportToGIF(files) {
  const gif = new GIF({
    workers: 2,
    quality: 10,
    workerScript: 'https://cdn.jsdelivr.net/npm/gif.js.optimized/dist/gif.worker.js'
  });

  let loadedCount = 0;

  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function() {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        gif.addFrame(ctx, { copy: true, delay: 500 });
        loadedCount++;

        // Render GIF after last image is added
        if (loadedCount === files.length) {
          gif.on('finished', function(blob) {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "animated.gif";
            link.click();
          });
          gif.render();
        }
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}
