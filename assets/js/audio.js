let uploadedFile = null;

document.getElementById('audio-file').addEventListener('change', function (e) {
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
  <div style="font-family: Georgia;   display: flex; justify-content: start; margin-top: 1rem !important ">
    <label style="margin-top: 0.5rem; margin-right: 4rem">Convert To </label> 
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('mp3')"><u>mp3</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('flac')"><u>flac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('wav')"><u>wav</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('m4a')"><u>m4a</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('aac')"><u>aac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('ogg')"><u>ogg</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('opus')"><u>opus</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('alac')"><u>alac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('amr')"><u>amr</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('aiff')"><u>aiff</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('wma')"><u>wma</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('caf')"><u>caf</u></label>

    
    </div>
  </div>
`;

  document.getElementById('fileInfo').innerHTML = infoHTML;
  document.getElementById('loader').style.display = "none";
});

async function exportFile(targetFormat) {
    const { createFFmpeg, fetchFile } = window.FFmpeg;

  // point it at your .wasm (and worker) files
  const ffmpeg = createFFmpeg({
    log: true,
    corePath:   '/assets/js/ffmpeg-core.wasm',
    workerPath: '/assets/js/ffmpeg-core.worker.js'
  });
    try {
        if (!uploadedFile) {
            throw new Error('No uploaded file found.');
        }

        targetFormat = targetFormat.trim().toLowerCase();

        if (!['mp3', 'flac', 'wav', 'm4a', 'aac', 'ogg', 'opus', 'alac', 'amr', 'aiff', 'wma', 'caf'].includes(targetFormat)) {
            throw new Error(`Unsupported target format: ${targetFormat}`);
        }

        // Show loader message
        showLoader(`Converting to ${targetFormat.toUpperCase()}...`);

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const inputFileName = uploadedFile.name;
        const outputFileName = `output.${targetFormat}`;

        // Write uploaded file into ffmpeg's filesystem
        ffmpeg.FS('writeFile', inputFileName, await fetchFile(uploadedFile));

        // Run ffmpeg conversion
        await ffmpeg.run('-i', inputFileName, outputFileName);

        // Read the output file
        const data = ffmpeg.FS('readFile', outputFileName);

        // Create Blob URL and trigger download
        const blob = new Blob([data.buffer], { type: `audio/${targetFormat}` });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = outputFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        console.log(`Exported successfully to ${targetFormat.toUpperCase()}.`);
    } catch (error) {
        console.error('Export failed:', error.message);
    } finally {
        // Hide loader message
        hideLoader();
    }
}
function showLoader(message) {
    let loader = document.getElementById('loader');
    if (!loader) {
        loader = document.createElement('div');
        loader.id = 'loader';
        loader.style.position = 'fixed';
        loader.style.top = '50%';
        loader.style.left = '50%';
        loader.style.transform = 'translate(-50%, -50%)';
        loader.style.background = 'rgba(0, 0, 0, 0.7)';
        loader.style.color = '#fff';
        loader.style.padding = '15px 25px';
        loader.style.borderRadius = '10px';
        loader.style.fontSize = '18px';
        loader.style.zIndex = '9999';
        document.body.appendChild(loader);
    }
    loader.innerText = message;
    loader.style.display = 'block';
}

function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.display = 'none';
    }
}
