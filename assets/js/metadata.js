let uploadedFile = null;

const removableFields = {
  image: ['GPSLatitude', 'GPSLongitude', 'DateTime', 'Make', 'Model', 'Software'],
  pdf: ['Author', 'Creator', 'Producer', 'Title', 'CreationDate', 'ModDate']
};

document.getElementById('file-input').addEventListener('change', async function(e) {
  const loader = document.getElementById('loader');
  const fileInfo = document.getElementById('fileInfo');
  
  try {
    loader.style.display = "block";
    fileInfo.style.display = "none";
    
    const file = e.target.files[0];
    if (!file) return;
    uploadedFile = file;

    const metadata = await getRemovableMetadata(file);
    renderFileInfo(file, metadata);
    
  } catch (error) {
    console.error('Error processing file:', error);
    showError(`Failed to process file: ${error.message}`);
  } finally {
    loader.style.display = "none";
  }
});

async function getRemovableMetadata(file) {
  const metadata = [];
  
  try {
    if (file.type.startsWith('image/')) {
      const exifData = await new Promise((resolve, reject) => {
        EXIF.getData(file, function() {
          try {
            resolve(EXIF.getAllTags(this));
          } catch (error) {
            reject(error);
          }
        });
      });

      for (const [tag, value] of Object.entries(exifData)) {
        if (removableFields.image.includes(tag) && value && !tag.toLowerCase().includes('copyright')) {
          metadata.push({
            name: tag.replace(/([A-Z])/g, ' $1').trim(),
            value: value
          });
        }
      }
    } 
    else if (file.type === 'application/pdf') {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      
      const pdfMetadata = {
        Author: pdfDoc.getAuthor(),
        Creator: pdfDoc.getCreator(),
        Producer: pdfDoc.getProducer(),
        Title: pdfDoc.getTitle(),
        CreationDate: pdfDoc.getCreationDate(),
        ModDate: pdfDoc.getModificationDate()
      };

      removableFields.pdf.forEach(field => {
        if (pdfMetadata[field] && !field.toLowerCase().includes('copyright')) {
          metadata.push({
            name: field,
            value: pdfMetadata[field]
          });
        }
      });
    }
  } catch (error) {
    throw new Error(`Metadata extraction failed: ${error.message}`);
  }
  
  return metadata;
}

function renderFileInfo(file, metadata) {
  const fileInfo = document.getElementById('fileInfo');
  const infoHTML = `
    <div class="column" style="margin:2rem">
      <div><strong>File Name:</strong> ${file.name}</div>
      <div><strong>File Type:</strong> ${file.type || 'Unknown'}</div>
      <div><strong>File Size:</strong> ${(file.size / 1024).toFixed(2)} KB</div>
      <div><strong>Last Modified:</strong> ${new Date(file.lastModified).toLocaleString()}</div>
      
      ${metadata.length > 0 ? `
        <div style="margin-top:1rem; border-top:1px solid #eee; padding-top:1rem;">
          <strong>Detected Metadata:</strong>
          ${metadata.map(({name, value}) => `
            <div style="color:#4caf50; margin:0.3rem 0;">
              ✓ ${name}: ${formatMetadataValue(value)}
            </div>
          `).join('')}
        </div>
      ` : '<div style="margin-top:1rem; color:#666">No removable metadata found</div>'
    }
      
      <div style="margin-top:1rem; border-top:1px solid #eee; padding-top:1rem;">
        <button class="compress-btn" id="removeMetadataBtn">
          Remove Metadata & Download
        </button>
      </div>
    </div>`;

  fileInfo.innerHTML = infoHTML;
  fileInfo.style.display = "flex";
  
  // Add proper event listener
  document.getElementById('removeMetadataBtn').addEventListener('click', handleMetadataRemoval);
  if(metadata < 1){
    document.getElementById('removeMetadataBtn').style.display="none";
  }
}

async function handleMetadataRemoval() {
  const loader = document.getElementById('loader');
  const status = document.getElementById('status');
  
  try {
    if (!uploadedFile) return;
    
    loader.style.display = "block";
    status.textContent = "Processing...";
    
    let cleanBlob;
    
    if (uploadedFile.type.startsWith('image/')) {
      const img = await createImageBitmap(uploadedFile);
      const canvas = new OffscreenCanvas(img.width, img.height);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      cleanBlob = await canvas.convertToBlob({ type: uploadedFile.type });
    } 
    else if (uploadedFile.type === 'application/pdf') {
      const pdfBytes = await uploadedFile.arrayBuffer();
      const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
      
      // Clear all specified PDF metadata
      pdfDoc.setTitle('');
      pdfDoc.setAuthor('');
      pdfDoc.setCreator('');
      pdfDoc.setProducer('');
      pdfDoc.setCreationDate(new Date(0));
      pdfDoc.setModificationDate(new Date(0));
      
      cleanBlob = new Blob([await pdfDoc.save()], { type: 'application/pdf' });
    }

    triggerDownload(cleanBlob, `clean_${uploadedFile.name}`);
    status.textContent = "Download started!";
    setTimeout(() => status.textContent = "", 2000);

  } catch (error) {
    status.textContent = `Error: ${error.message}`;
    status.style.color = "red";
  } finally {
    loader.style.display = "none";
  }
}

// Helper functions
function formatMetadataValue(value) {
  if (value instanceof Date) return value.toLocaleString();
  if (typeof value === 'object') return JSON.stringify(value);
  return value;
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function showError(message) {
  const status = document.getElementById('status');
  status.textContent = message;
  status.style.color = "red";
  setTimeout(() => status.textContent = "", 5000);
}