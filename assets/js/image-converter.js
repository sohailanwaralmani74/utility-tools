let uploadedImages = [];

document.addEventListener("DOMContentLoaded", () => {
  const config = document.getElementById("converter");
  const inputFormat = config.dataset.input.toLowerCase();
  const outputFormat = config.dataset.output.toLowerCase();
  const fileInput = document.getElementById("imageUpload");
  const convertBtn = document.getElementById("convertButton");
  const exportOptions = document.getElementById("exportOptions");

  // Update file accept filter dynamically
  fileInput.accept = `.${inputFormat}`;

  // Update button text
  convertBtn.innerHTML = `<u>Convert ${inputFormat.toUpperCase()} to ${outputFormat.toUpperCase()}</u>`;

  // File selection
  fileInput.addEventListener("change", e => {
    const files = Array.from(e.target.files).filter(f => f.name.toLowerCase().endsWith(`.${inputFormat}`));
    if (!files.length) return alert(`Please upload ${inputFormat.toUpperCase()} images only.`);

    uploadedImages = files;
    previewImages(files);
    exportOptions.style.display = "flex";
  });

  // Conversion
  convertBtn.addEventListener("click", () => exportToImage(outputFormat, inputFormat));
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

// Conversion logic
function exportToImage(format, inputFormat) {
  if (!uploadedImages.length) return alert(`Please upload at least one ${inputFormat.toUpperCase()} image.`);

  const mime = `image/${format}`;
  const zip = new JSZip();

  const promises = uploadedImages.map(file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function() {
      const img = new Image();
      img.onload = function() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(blob => {
          const filename = file.name.replace(/\.[^/.]+$/, "") + "." + format;
          zip.file(filename, blob);
          resolve();
        }, mime);
      };
      img.onerror = reject;
      img.src = reader.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  }));

  Promise.all(promises)
    .then(() => zip.generateAsync({ type: "blob" }))
    .then(content => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(content);
      link.download = `converted_images_${format}.zip`;
      link.click();
    })
    .catch(err => console.error("Image conversion error:", err));
}
