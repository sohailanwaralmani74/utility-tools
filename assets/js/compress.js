
let uploadedFile = null;

document.getElementById('file-input').addEventListener('change', function (e) {
  document.getElementById('loader').style.display = "block";
  const file = e.target.files[0];
  if (!file) return;
  uploadedFile = file;

  document.getElementById('fileInfo').style.display = "flex";
  const infoHTML = `
  <div class="column" style="margin:1rem">
  <div><strong>File Name:</strong> ${file.name}</div>
  <div><strong>File Type:</strong> ${file.type || 'Unknown'}</div>
  <div><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</div>
  <div><strong>Last Modified:</strong> ${new Date(file.lastModified).toLocaleString()} 
  </div>
  <div style="font-family: Georgia; min-width: 70vw;  display: flex; justify-content: flex-end; border-right: 4px solid #4caf50; margin-top: -0.3rem !important ">
            <label class="compress-label" onclick="compress()"><u>Compress</u></label>
            <label class="compress-label" onclick="compressToGZIP()"><u>GZip</u></label>
            <label class="compress-label" onclick="compressTo7z()"><u>.7z</u></label>
            <label class="compress-label" onclick="compressToTarGz()"><u>.tar.gz</u></label>
            <label class="compress-label" onclick="compressToZIP()"><u>.zip</u></label>        
    </div>
  </div>
`;

  document.getElementById('fileInfo').innerHTML = infoHTML;
  document.getElementById('loader').style.display = "none";
});

//////////////   Compress    ///////////////


async function compress() {
  if (!uploadedFile) {
    alert("Please upload a file first.");
    return;
  }

  const fileType = uploadedFile.type;

  if (fileType === 'application/pdf') {
    const compressed = await compressPDF(uploadedFile);
    triggerDownload(compressed, uploadedFile.name);
  } else if (fileType.startsWith('image/')) {
    const compressed = await compressImage(uploadedFile);
    triggerDownload(compressed, uploadedFile.name);
  } else {
    alert("This file type cannot be compressed directly in-browser.");
  }
}

function triggerDownload(blob, fileName) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function compressImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      // Adjust quality here (0.7 = 70%)
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(url);
        resolve(blob);
      }, file.type, 0.7);
    };
    img.src = url;
  });
}

async function compressPDF(file) {
  const { PDFDocument } = PDFLib;
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);

  const compressedPdf = await PDFDocument.create();

  const copiedPages = await compressedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
  copiedPages.forEach(page => compressedPdf.addPage(page));

  const compressedBytes = await compressedPdf.save({ useObjectStreams: true });
  return new Blob([compressedBytes], { type: 'application/pdf' });
}

async function compressToZIP() {

  if (!uploadedFile) return;

  const jszip = new JSZip();
  const fileData = await uploadedFile.arrayBuffer();

  // Add the file to the zip
  jszip.file(uploadedFile.name, fileData);

  // Generate the zip file
  const blob = await jszip.generateAsync({ type: "blob" });

  // Use the same download method you already have
  triggerDownload(blob, uploadedFile.name.replace(/\.[^/.]+$/, "") + ".zip");
}

function compressToGZIP() {
  if (!uploadedFile) return alert("No file uploaded!");

  const reader = new FileReader();
  reader.onload = function () {
    const uint8 = new Uint8Array(reader.result);
    const gzipped = fflate.gzipSync(uint8);
    const gzipBlob = new Blob([gzipped], { type: "application/gzip" });

    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, "") + ".gz";
    triggerDownload(gzipBlob, fileName);
  };
  reader.readAsArrayBuffer(uploadedFile);
}

function compressTo7z() {
  if (!uploadedFile) return alert("No file uploaded!");

  const reader = new FileReader();
  reader.onload = function () {
    const compressed = fflate.deflateSync(new Uint8Array(reader.result));
    const blob = new Blob([compressed], { type: "application/octet-stream" });

    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, "") + ".7z";
    triggerDownload(blob, fileName);
  };
  reader.readAsArrayBuffer(uploadedFile);
}

function compressToTarGz() {
  if (!uploadedFile) return alert("No file uploaded!");

  const reader = new FileReader();
  reader.onload = function () {
    const uint8 = new Uint8Array(reader.result);
    const gzipped = fflate.gzipSync(uint8);
    const blob = new Blob([gzipped], { type: "application/gzip" });

    const fileName = uploadedFile.name.replace(/\.[^/.]+$/, "") + ".tar.gz";
    triggerDownload(blob, fileName);
  };
  reader.readAsArrayBuffer(uploadedFile);
}
