    const { createFFmpeg, fetchFile } = FFmpeg;
    const ffmpeg = createFFmpeg({
            log: true,
            corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
            wasmPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
            workerPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js',
            mainName: 'main',
            instantiateWasm: async (imports, callback) => {
                try {
                    const wasmBinary = await fetch('https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm')
                        .then(r => r.arrayBuffer());

                    const instance = await WebAssembly.instantiate(wasmBinary, {
                        wasi_snapshot_preview1: {
                            fd_write: () => 0,
                            fd_close: () => 0
                        }
                    });

                    callback(instance);
                    return instance.exports;
                } catch (e) {
                    console.error("WASM Instantiation Failed:", e);
                    throw e;
                }
            }
        });

    const fileInput = document.getElementById("audio-file");
    const fileInfo = document.getElementById("file-info");
    const fileDetails = document.getElementById("file-details");
    const convertBtn = document.getElementById("convert-btn");
    const progressContainer = document.getElementById("progress-container");
    const progressBar = document.getElementById("progress-bar");
    const convertedPlayer = document.getElementById("converted-player");
    const mp3Audio = document.getElementById("mp3-audio");
    const downloadLink = document.getElementById("download-link");
    convertedPlayer.style.display = "none"; // hide preview if new file selected
    fileInfo.style.display = "none"; // hide preview if new file selected
    let selectedFile;

    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];
        if (selectedFile) {
            const sizeKB = (selectedFile.size / 1024).toFixed(2);
            const format = selectedFile.name.split('.').pop().toUpperCase();

            fileDetails.innerHTML = `
                <strong>Name:</strong> ${selectedFile.name}<br>
                <strong>Format:</strong> ${format}<br>
                <strong>Size:</strong> ${sizeKB} KB
            `;
            fileInfo.style.display = "flex";   // show details block
            
        }
    });

// Conversion
convertBtn.addEventListener('click', async () => {
    if (!selectedFile) return;
    convertBtn.innerText = 'Loading FFmpeg...';
    convertBtn.style.pointerEvents = 'none';

    // Load ffmpeg.wasm
    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    progressContainer.style.display = 'block';
    progressBar.style.width = '0%';

    // Track conversion progress
    ffmpeg.setProgress(({ ratio }) => {
        convertBtn.innerText = 'Parsing OGX...';
        progressBar.style.width = `${(ratio * 100).toFixed(1)}%`;
    });

    try {
        // Write file to FFmpeg FS
        ffmpeg.FS('writeFile', 'input.ogx', await fetchFile(selectedFile));

        // Run conversion to MP3
        await ffmpeg.run('-i', 'input.ogx', '-vn', '-b:a', '192k', 'output.mp3');

        // Read converted MP3
        const data = ffmpeg.FS('readFile', 'output.mp3');
        const mp3Blob = new Blob([data.buffer], { type: 'audio/mp3' });
        const mp3Url = URL.createObjectURL(mp3Blob);

        // Set audio player and download link
        mp3Audio.src = mp3Url;
        downloadLink.href = mp3Url;
        downloadLink.download = selectedFile.name.replace(/\.ogx$/i, '.mp3');

        convertedPlayer.style.display = 'flex';
    } catch (err) {
        alert('Conversion failed. Make sure the file is a valid .ogx.');
        console.error(err);
    } finally {
        convertBtn.innerText = 'Convert to MP3';
        convertBtn.style.pointerEvents = 'auto';
        progressContainer.style.display = 'none';
        progressBar.style.width = '0%';
    }
});
