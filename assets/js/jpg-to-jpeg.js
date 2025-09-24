// jpg-to-jpeg.js
// Minimal, robust preview + remove + convert -> zip logic.

const jpgUpload = document.getElementById('jpgUpload');
const uploadedImages = document.getElementById('uploadedImages');
const convertToJpeg = document.getElementById('convertToJpeg');
const loader = document.getElementById('loader');

let files = []; // array of { id, file, dataUrl }

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

/** Render previews (image + filename + remove icon) */
function renderPreviews() {
  uploadedImages.innerHTML = '';

  if (!files.length) {
    convertToJpeg.style.display = 'none';
    return;
  }

  files.forEach(item => {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.margin = '6px';

    const img = document.createElement('img');
    img.src = item.dataUrl;
    img.alt = item.file.name;
    img.style.width = '150px';
    img.style.minHeight = '180px';
    img.style.objectFit = 'cover';
    img.style.border = '1px solid #e6e6e6';
    img.style.borderRadius = '6px';
    img.style.display = 'block';

    const fname = document.createElement('div');
    fname.textContent = item.file.name;
    fname.style.overflow = 'hidden';
    fname.style.textOverflow = 'ellipsis';
    fname.style.whiteSpace = 'nowrap';
    fname.style.width = '150px';
    fname.style.marginTop = '6px';

    const removeBtn = document.createElement('span');
    removeBtn.innerHTML = '✖';
    removeBtn.setAttribute('role', 'button');
    removeBtn.setAttribute('aria-label', 'Remove image');
    removeBtn.style.position = 'absolute';
    removeBtn.style.top = '6px';
    removeBtn.style.right = '10px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.style.background = 'rgba(255,255,255,0.9)';
    removeBtn.style.borderRadius = '50%';
    removeBtn.style.padding = '2px 6px';
    removeBtn.style.fontSize = '12px';
    removeBtn.style.lineHeight = '1';

    removeBtn.addEventListener('click', () => {
      files = files.filter(f => f.id !== item.id);
      renderPreviews();
    });

    wrapper.appendChild(img);
    wrapper.appendChild(removeBtn);
    uploadedImages.appendChild(wrapper);
  });

  convertToJpeg.style.display = 'inline-block';
}

/** Convert File to JPEG Blob using an Image + canvas (robust for browsers) */
function fileToJpegBlob(file, quality = 0.92) {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(blob => {
          URL.revokeObjectURL(objectUrl);
          if (blob) resolve(blob);
          else reject(new Error('Canvas toBlob failed'));
        }, 'image/jpeg', quality);
      } catch (err) {
        URL.revokeObjectURL(objectUrl);
        reject(err);
      }
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(objectUrl);
      reject(err);
    };
    img.src = objectUrl;
  });
}

/** Handle file selection (appends new, avoids duplicates by name+size) */
jpgUpload.addEventListener('change', (e) => {
  const selected = Array.from(e.target.files || []).filter(f => /\.(jpe?g)$/i.test(f.name) && f.type.startsWith('image/'));
  if (!selected.length) {
    // nothing valid selected
    e.target.value = '';
    return;
  }

  // read each file as dataURL and push with unique id
  let remaining = selected.length;
  selected.forEach(file => {
    const duplicate = files.some(f => f.file.name === file.name && f.file.size === file.size);
    if (duplicate) {
      remaining--;
      if (remaining === 0) renderPreviews();
      return;
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      files.push({ id: uid(), file: file, dataUrl: ev.target.result });
      remaining--;
      if (remaining === 0) renderPreviews();
    };
    reader.onerror = function () {
      remaining--;
      if (remaining === 0) renderPreviews();
    };
    reader.readAsDataURL(file);
  });

  // clear input so same files can be reselected later
  e.target.value = '';
});

/** Accessibility: Enter / Space should act on label */
convertToJpeg.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    convertToJpeg.click();
  }
});

/** Convert all selected files, pack into ZIP and download */
convertToJpeg.addEventListener('click', async () => {
  if (!files.length) {
    alert('Please upload JPG / JPEG files first.');
    return;
  }

  loader.style.display = 'block';
  convertToJpeg.style.pointerEvents = 'none';
  const prevText = convertToJpeg.textContent;
  convertToJpeg.textContent = 'Converting...';

  try {
    const zip = new JSZip();
    for (const item of files) {
      const blob = await fileToJpegBlob(item.file, 0.92);
      const outName = item.file.name.replace(/\.(jpe?g)$/i, '.jpeg');
      zip.file(outName, blob);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'converted-jpegs.zip');
  } catch (err) {
    console.error(err);
    alert('Conversion failed: ' + (err && err.message ? err.message : err));
  } finally {
    loader.style.display = 'none';
    convertToJpeg.style.pointerEvents = 'auto';
    convertToJpeg.textContent = prevText;
  }
});
