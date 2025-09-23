document.addEventListener("DOMContentLoaded", async () => {
    const { createFFmpeg } = FFmpeg;
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

    // Load ffmpeg when page loads
    if (!ffmpeg.isLoaded()) {
        await ffmpeg.load();
    }

    // When user selects file
    fileInput.addEventListener("change", (e) => {
        selectedFile = e.target.files[0];
        if (selectedFile) {
            fileInfo.style.display = "flex";
            fileDetails.textContent = `File: ${selectedFile.name} | Size: ${(selectedFile.size / 1024 / 1024).toFixed(2)} MB | Type: ${selectedFile.type}`;
        }
    });

    // Convert button click
    convertBtn.addEventListener("click", async () => {
        if (!selectedFile) return;

        // Reset UI
        progressContainer.style.display = "block";
        progressBar.style.width = "0%";
        convertedPlayer.style.display = "none";

        // Write file to memory
        ffmpeg.FS("writeFile", "input.aac", await fetchFile(selectedFile));

        // Run conversion
        await ffmpeg.run("-i", "input.aac", "output.mp3");

        // Read converted file
        const data = ffmpeg.FS("readFile", "output.mp3");
        const mp3Blob = new Blob([data.buffer], { type: "audio/mp3" });
        const mp3Url = URL.createObjectURL(mp3Blob);

        // Show player + download link
        mp3Audio.src = mp3Url;
        downloadLink.href = mp3Url;
        downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";
        convertedPlayer.style.display = "flex";

        // Hide progress
        progressContainer.style.display = "none";
    });

    // Progress listener
    ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
    });
});
