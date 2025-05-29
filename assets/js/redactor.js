  const input = document.getElementById('imageInput');
  const canvas = document.getElementById('redactorCanvas');
  const ctx = canvas.getContext('2d');

  const pixelateBtn = document.getElementById('pixelateBtn');
  const downloadBtn = document.getElementById('downloadBtn');

  let isDrawing = false;
  let startX, startY, endX, endY;
  let imgLoaded = false;

  let selection = null; // Store last drawn selection
  let imageDataURL = null; // Save for re-rendering if needed
  let uploadedfile= null;

  // Load image to canvas
  input.addEventListener('change', (e) => {
    pixelateBtn.disabled = false;

    const file = e.target.files[0];
    if (!file) return;
    uploadedfile = file;
    const img = new Image();
    img.onload = () => {
      // Set canvas dimensions equal to image
      canvas.width = 99;
      canvas.height = 99;

      // Display image on canvas
      ctx.drawImage(img, 0, 0);

      // Save for redrawing later
      imageDataURL = canvas.toDataURL();

      // Mark image as loaded
      imgLoaded = true;

      // Enable Pixelate button
    };
    img.src = URL.createObjectURL(file);
    
  });

  // Handle drawing selection
  canvas.addEventListener('mousedown', (e) => {
    if (!imgLoaded) return;
    const rect = canvas.getBoundingClientRect();
    startX = (e.clientX - rect.left) * (canvas.width / rect.width);
    startY = (e.clientY - rect.top) * (canvas.height / rect.height);
    isDrawing = true;
  });

  canvas.addEventListener('mouseup', (e) => {
    if (!imgLoaded || !isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    endX = (e.clientX - rect.left) * (canvas.width / rect.width);
    endY = (e.clientY - rect.top) * (canvas.height / rect.height);
    isDrawing = false;

    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const w = Math.abs(endX - startX);
    const h = Math.abs(endY - startY);

    selection = { x, y, w, h };

    // Optional: show visual feedback of selected area
    ctx.strokeStyle = '#f00';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, w, h);
  });

  // Pixelate selected area
  pixelateBtn.addEventListener('click', () => {
    if (!uploadedfile) {
        alert("Please upload file first.");
        return;
      }
    if (!selection) {
      alert("Please select an area to redacte.");
      return;
    }

    const { x, y, w, h } = selection;
    const blockSize = 10;
  
    // Iterate over the selected area in blocks
    for (let row = y; row < y + h; row += blockSize) {
      for (let col = x; col < x + w; col += blockSize) {
        let r = 0, g = 0, b = 0, a = 0;
        let pixelCount = 0;
  
        // Loop through each pixel inside the block and sample the colors
        for (let i = 0; i < blockSize; i++) {
          for (let j = 0; j < blockSize; j++) {
            const pixel = ctx.getImageData(col + j, row + i, 1, 1).data;
            r += pixel[0];
            g += pixel[1];
            b += pixel[2];
            a += pixel[3];
            pixelCount++;
          }
        }
  
        // Calculate average color for the block
        r = Math.floor(r / pixelCount);
        g = Math.floor(g / pixelCount);
        b = Math.floor(b / pixelCount);
        a = Math.floor(a / pixelCount);
  
        // Set the fill color to the average color of the block
        ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`;
  
        // Fill the block with the average color
        ctx.fillRect(col, row, blockSize, blockSize);
      }
    }
  
    // Enable the download button after redaction
    downloadBtn.disabled = false;
  });

  // Optional: Download redacted image
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'redacted-image.png';
    link.href = canvas.toDataURL();
    link.click();
  });    