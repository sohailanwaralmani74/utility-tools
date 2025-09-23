// ogg-to-mp3.js

const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({ log: true });

const fileInput = document.getElementById("audio-file");
const fileInfo = document.getElementById("file-info");
const fileDetails = document.getElementById("file-details");
const convertBtn = document.getElementById("convert-btn");
const progressContainer = document.getElementById("progress-container");
const progressBar = document.getElementById("progress-bar");
const convertedPlayer = document.getElementById("converted-player");
const mp3Audio = document.getElementById("mp3-audio");
const downloadLink = document.getElementById("download-link");
convertedPlayer.style.display = "none"; 
fileInfo.style.display = "none";

let selectedFile = null;

// Handle file upload
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    selectedFile = file;

    // Show file info
    fileDetails.innerHTML = `
        <strong>Name:</strong> ${file.name}<br>
        <strong>Type:</strong> ${file.type || 'audio/ogg'}<br>
        <strong>Size:</strong> ${(file.size / 1024 / 1024).toFixed(2)} MB
    `;
    fileInfo.style.display = "flex";
});

// Convert button click
convertBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";

    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    // Write file to virtual FS
    ffmpeg.FS("writeFile", "input.ogg", await fetchFile(selectedFile));

    // Run conversion to mp3
    await ffmpeg.run("-i", "input.ogg", "output.mp3");

    // Read output
    const data = ffmpeg.FS("readFile", "output.mp3");
    const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
    const mp3Url = URL.createObjectURL(mp3Blob);

    // Show player
    convertedPlayer.style.display = "flex";
    mp3Audio.src = mp3Url;
    downloadLink.href = mp3Url;
    downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";

    // Hide progress bar after completion
    progressBar.style.width = "100%";
    setTimeout(() => {
        progressContainer.style.display = "none";
        fileInfo.style.display = "none"; // hide file info after conversion
    }, 800);
});

// Track FFmpeg progress
ffmpeg.setProgress(({ ratio }) => {
    progressBar.style.width = `${Math.round(ratio * 100)}%`;
});
