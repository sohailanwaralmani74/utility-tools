// /assets/js/aiff-to-mp3.js
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
  let ffmpegLoaded = false;

  async function ensureFFmpeg() {
    if (!ffmpegLoaded) {
      await ffmpeg.load();
      ffmpegLoaded = true;
    }
  }

  fileInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const sizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    const type = selectedFile.type || 'audio/aiff';

    fileDetails.innerHTML = `<strong>Name:</strong> ${selectedFile.name}<br>
                             <strong>Type:</strong> ${type}<br>
                             <strong>Size:</strong> ${sizeMB} MB`;

    fileInfo.style.display = "flex";
    convertedPlayer.style.display = "none";
    progressContainer.style.display = "none";
    progressBar.style.width = "0%";
  });

  convertBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    convertedPlayer.style.display = "none";

    await ensureFFmpeg();

    ffmpeg.setProgress(({ ratio }) => {
      progressBar.style.width = `${Math.round(ratio * 100)}%`;
    });

    try {
      ffmpeg.FS("writeFile", "input.aiff", await fetchFile(selectedFile));
      await ffmpeg.run("-i", "input.aiff", "-codec:a", "libmp3lame", "-q:a", "2", "output.mp3");

      const data = ffmpeg.FS("readFile", "output.mp3");
      const mp3Blob = new Blob([data.buffer], { type: "audio/mpeg" });
      const mp3Url = URL.createObjectURL(mp3Blob);

      mp3Audio.src = mp3Url;
      downloadLink.href = mp3Url;
      downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";

      fileInfo.style.display = "none";
      progressContainer.style.display = "none";
      convertedPlayer.style.display = "flex";
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Conversion failed — check console for details.");
      progressContainer.style.display = "none";
    } finally {
      try { ffmpeg.FS("unlink", "input.aiff"); } catch(e) {}
      try { ffmpeg.FS("unlink", "output.mp3"); } catch(e) {}
    }
  });
});
