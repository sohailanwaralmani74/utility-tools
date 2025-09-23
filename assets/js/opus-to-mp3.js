// /assets/js/opus-to-mp3.js
document.addEventListener("DOMContentLoaded", async () => {
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

    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];
        if (selectedFile) {
            fileInfo.style.display = "flex";
            fileDetails.textContent = `File: ${selectedFile.name} | Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB | Type: ${selectedFile.type}`;
        }
    });

    convertBtn.addEventListener("click", async () => {
        if (!selectedFile) return;

        progressContainer.style.display = "block";
        progressBar.style.width = "0%";
        convertedPlayer.style.display = "none";

        ffmpeg.FS("writeFile", "input.opus", await fetchFile(selectedFile));
        await ffmpeg.run("-i", "input.opus", "output.mp3");

        const data = ffmpeg.FS("readFile", "output.mp3");
        const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
        const mp3Url = URL.createObjectURL(mp3Blob);

        mp3Audio.src = mp3Url;
        downloadLink.href = mp3Url;
        downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";
        convertedPlayer.style.display = "flex";

        progressContainer.style.display = "none";
    });

    ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
    });
});
