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
    convertedPlayer.style.display = "none"; // hide preview if new file selected
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

    convertBtn.addEventListener("click", async () => {
        if (!selectedFile) return;

        progressContainer.style.display = "block";
        progressBar.style.width = "0%";

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        ffmpeg.setProgress(({ ratio }) => {
            progressBar.style.width = Math.round(ratio * 100) + "%";
        });

        // Write input file to FFmpeg's virtual FS
        ffmpeg.FS('writeFile', 'input.amr', await fetchFile(selectedFile));

        // Convert AMR -> MP3
        await ffmpeg.run('-i', 'input.amr', 'output.mp3');

        // Read output
        const data = ffmpeg.FS('readFile', 'output.mp3');
        const blob = new Blob([data.buffer], { type: 'audio/mpeg' });
        const url = URL.createObjectURL(blob);

        mp3Audio.src = url;
        downloadLink.href = url;
        downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";

        // Hide file details once conversion is done
        fileInfo.style.display = "none";
        progressContainer.style.display = "none";
        convertedPlayer.style.display = "flex";
    });
