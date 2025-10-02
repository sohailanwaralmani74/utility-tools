let uploadedImages = [];

document.getElementById('imageUpload').addEventListener('change', function (e) {
  const files = Array.from(e.target.files).filter(file => file.type === "image/png");
  if (files.length === 0) return;

  uploadedImages = files;

  // Show export options (JPG/JPEG only)
  document.getElementById("exportOptions").style.display = "flex";

  // Preview uploaded PNGs
  previewImages(files);
});

function previewImages(files) {
  const container = document.getElementById('uploadedFiles');
  container.innerHTML = '';
  container.style.border = "2px solid #ccc";
  container.style.padding = "10px";
  container.style.borderRadius = "5px";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.minHeight = "100px";

  const fragment = document.createDocumentFragment();

  files.forEach(file => {
    const url = URL.createObjectURL(file);

    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.style.display = 'inline-block';

    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '200px';
    img.style.maxHeight = '200px';
    img.style.border = '1px solid #ddd';
    img.style.borderRadius = '3px';
    img.style.objectFit = 'contain';
    img.loading = 'lazy';

    imgContainer.appendChild(img);
    fragment.appendChild(imgContainer);

    img.onload = function () {
      URL.revokeObjectURL(url);
    };
  });

  container.appendChild(fragment);
}

// === Export PNGs → JPG/JPEG ===
function exportToImage(desiredFormat) {
  desiredFormat = desiredFormat.toLowerCase();
  if (desiredFormat !== "jpg" && desiredFormat !== "jpeg") {
    alert("Only JPG or JPEG export is supported.");
    return;
  }

  if (!uploadedImages.length) {
    alert("No PNGs uploaded.");
    return;
  }

  const zip = new JSZip();

  const convertPromises = uploadedImages.map(file => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        const img = new Image();
        img.onload = function () {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;

          // Fill background white (avoid transparency turning black)
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.drawImage(img, 0, 0);

          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          const fileName = file.name.replace(/\.png$/i, `.${desiredFormat}`);

          resolve({ name: fileName, dataUrl });
        };
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  });

  Promise.all(convertPromises).then(results => {
    results.forEach(item => {
      zip.file(item.name, dataURItoBlob(item.dataUrl));
    });

    zip.generateAsync({ type: 'blob' }).then(zipFile => {
      saveAs(zipFile, `converted_images_${desiredFormat}.zip`);
    });
  });
}

// Helper: DataURL → Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    uint8Array[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeString });
}
