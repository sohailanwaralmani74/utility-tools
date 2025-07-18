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
  // Clear previous content but maintain container styling
  const container = document.getElementById('uploadedFiles');
  container.innerHTML = '';
  container.style.border = "2px solid #ccc";
  container.style.padding = "10px";
  container.style.borderRadius = "5px";
  container.style.display = "flex";
  container.style.flexWrap = "wrap";
  container.style.gap = "10px";
  container.style.minHeight = "100px";
  container.style.alignItems = "flex-start";

  // Create document fragment for better performance
  const fragment = document.createDocumentFragment();

  files.forEach(file => {
    const url = URL.createObjectURL(file);
    
    // Create image container div
    const imgContainer = document.createElement('div');
    imgContainer.style.position = 'relative';
    imgContainer.style.display = 'inline-block';
    imgContainer.style.margin = '5px';
    
    // Create image element
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '200px';
    img.style.maxHeight = '200px';
    img.style.border = '1px solid #ddd';
    img.style.borderRadius = '3px';
    img.style.objectFit = 'contain';
    img.loading = 'lazy'; // Lazy loading for better performance
    
    // Create filename label
    const fileName = document.createElement('div');
    fileName.textContent = file.name.length > 20 
      ? file.name.substring(0, 17) + '...' 
      : file.name;
    fileName.style.fontSize = '12px';
    fileName.style.textAlign = 'center';
    fileName.style.marginTop = '5px';
    fileName.style.color = '#555';
    fileName.style.width = '200px';
    fileName.style.overflow = 'hidden';
    fileName.style.textOverflow = 'ellipsis';
    fileName.style.whiteSpace = 'nowrap';
    
    // Create file size indicator
    const fileSize = document.createElement('div');
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    fileSize.textContent = `${sizeInMB} MB`;
    fileSize.style.fontSize = '11px';
    fileSize.style.color = '#888';
    fileSize.style.textAlign = 'center';
    
    // Assemble the elements
    imgContainer.appendChild(img);
    imgContainer.appendChild(fileName);
    imgContainer.appendChild(fileSize);
    fragment.appendChild(imgContainer);
    
    // Clean up object URLs when images are loaded
    img.onload = function() {
      URL.revokeObjectURL(url);
    };
  });
  
  // Append all at once for better performance
  container.appendChild(fragment);
  
  // Show message if no images
  if (files.length === 0) {
    container.innerHTML = '<p style="color:#666; width:100%; text-align:center;">No images to display</p>';
    container.style.border = "none";
  }
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
