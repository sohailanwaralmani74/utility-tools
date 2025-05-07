let uploadedPDF = null;
let uploadedImages = [];

document.getElementById('pdfUpload').addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file || file.type !== "application/pdf") return;
  document.getElementById("exportOptions").style.display="flex";
  document.getElementById("pdf").style.display="none";
  document.getElementById("multi-pdf").style.display="none";
  uploadedPDF = file;
  uploadedImages = []; // Clear any previously uploaded images
  
  previewPDF(file);
});

document.getElementById('imageUpload').addEventListener('change', function (e) {
  const files = Array.from(e.target.files).filter(file => file.type.startsWith('image/'));
  if (files.length === 0) return;
  document.getElementById("exportOptions").style.display="flex";
  document.getElementById("pdf").style.display="flex";
  if (files.length === 1)
  document.getElementById("multi-pdf").style.display="none";
  else
  document.getElementById("multi-pdf").style.display="flex";
  uploadedImages = files;
  uploadedPDF = null; // Clear any previously uploaded PDF

  previewImages(files);
});

function previewPDF(file) {
  const fileURL = URL.createObjectURL(file);
  const pdfHTML = `<embed src="${fileURL}" type="application/pdf" width="100%" height="600px" />`;

  document.getElementById('uploadedFiles').innerHTML = pdfHTML;
  document.getElementById('uploadedFiles').style.border="2px solid";
}

function previewImages(files) {
  const imageHTML = files
    .map(file => {
      const url = URL.createObjectURL(file);
      return `<img src="${url}" style="max-width: 200px; margin: 10px; border: 1px solid #ccc;" />`;
    })
    .join("");

  document.getElementById('uploadedFiles').innerHTML = imageHTML;
  document.getElementById('uploadedFiles').style.border="2px solid";
}

// Method to convert PDF to JPG using PDF.js
function exportToImage(desiredFormat) {
    const supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif', 'tiff', 'tif', 'heic', 'heif', 'svg', 'eps'];
    desiredFormat = (desiredFormat || '').toLowerCase();

    if (!supportedFormats.includes(desiredFormat)) {
        console.error(`Unsupported format: ${desiredFormat}`);
        return;
    }

    const mimeMap = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        webp: 'image/webp',
        avif: 'image/avif',
        tiff: 'image/tiff',
        tif: 'image/tiff',
        heic: 'image/heic',
        heif: 'image/heif',
        svg: 'image/svg+xml',
        eps: 'application/postscript'
    };

    const mimeType = mimeMap[desiredFormat];

    const zip = new JSZip();

    if (uploadedPDF) {
        pdfjsLib.getDocument(URL.createObjectURL(uploadedPDF)).promise.then(pdf => {
            const pagePromises = [];
            for (let i = 1; i <= pdf.numPages; i++) {
                pagePromises.push(
                    pdf.getPage(i).then(page => {
                        const viewport = page.getViewport({ scale: 2 });
                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.width = viewport.width;
                        canvas.height = viewport.height;
                        return page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                            return canvas.toDataURL(mimeType);
                        });
                    })
                );
            }
            Promise.all(pagePromises).then(dataUrls => {
                dataUrls.forEach((dataUrl, idx) => {
                    const blob = dataURItoBlob(dataUrl);
                    const fileName = uploadedPDF.name.replace(/\.[^/.]+$/, "") + `_page${idx + 1}.${desiredFormat}`;
                    zip.file(fileName, blob);
                });
                zip.generateAsync({ type: 'blob' }).then(zipFile => {
                    saveAs(zipFile, `converted_images_${desiredFormat}.zip`);
                });
            });
        }).catch(err => console.error('PDF conversion error:', err));

    } else if (uploadedImages.length > 0) {
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
                        ctx.drawImage(img, 0, 0);
                        resolve({
                            name: file.name.replace(/\.[^/.]+$/, "") + `.${desiredFormat}`,
                            dataUrl: canvas.toDataURL(mimeType)
                        });
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
        }).catch(err => console.error('Image conversion error:', err));
    }
}

///////////////////    PDF Exporter   ////////////////////

function exportImagesToSinglePDF() {
    if (!uploadedImages.length) return alert("No image uploaded.");

    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');

    const processImage = (file, index, callback) => {
        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                const ratio = Math.min(210 / img.width, 297 / img.height);
                const width = img.width * ratio;
                const height = img.height * ratio;
                const x = (210 - width) / 2;
                const y = (297 - height) / 2;

                if (index !== 0) pdf.addPage();
                pdf.addImage(img, 'PNG', x, y, width, height);
                callback();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    let currentIndex = 0;
    const next = () => {
        if (currentIndex < uploadedImages.length) {
            processImage(uploadedImages[currentIndex], currentIndex, () => {
                currentIndex++;
                next();
            });
        } else {
            const fileName = uploadedImages.length === 1
                ? uploadedImages[0].name.replace(/\.[^/.]+$/, "") + ".pdf"
                : "combined.pdf";
            pdf.save(fileName);
        }
    };

    next();
}

function exportImagesToMultiplePDFs() {
    if (!uploadedImages.length) return alert("No image uploaded.");

    if (uploadedImages.length === 1) {
        // Export single image as single PDF (no zip)
        exportImagesToSinglePDF();
        return;
    }

    const zip = new JSZip();

    const processImage = (file, index, callback) => {
        const reader = new FileReader();
        reader.onload = function () {
            const img = new Image();
            img.onload = function () {
                const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
                const ratio = Math.min(210 / img.width, 297 / img.height);
                const width = img.width * ratio;
                const height = img.height * ratio;
                const x = (210 - width) / 2;
                const y = (297 - height) / 2;

                pdf.addImage(img, 'PNG', x, y, width, height);
                const pdfBlob = pdf.output('blob');
                const name = file.name.replace(/\.[^/.]+$/, "") + ".pdf";
                zip.file(name, pdfBlob);
                callback();
            };
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    };

    let currentIndex = 0;
    const next = () => {
        if (currentIndex < uploadedImages.length) {
            processImage(uploadedImages[currentIndex], currentIndex, () => {
                currentIndex++;
                next();
            });
        } else {
            zip.generateAsync({ type: "blob" }).then(function (blob) {
                saveAs(blob, "multiple-pdfs.zip");
            });
        }
    };

    next();
}


// Helper function to convert Data URL to Blob
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
