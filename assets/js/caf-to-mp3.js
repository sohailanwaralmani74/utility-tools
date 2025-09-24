// /assets/js/caf-to-mp3.js
document.addEventListener("DOMContentLoaded", () => {
  // FFmpeg is exposed as global by your /assets/js/ffmpeg.min.js
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

  let selectedFile = null;
  let ffmpegLoaded = false;

  async function ensureFFmpegLoaded() {
    if (!ffmpegLoaded) {
      await ffmpeg.load();
      ffmpegLoaded = true;
    }
  }

  fileInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const sizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    const type = selectedFile.type || "audio/caf";

    fileDetails.innerHTML = `<strong>Name:</strong> ${selectedFile.name}<br>
                             <strong>Type:</strong> ${type}<br>
                             <strong>Size:</strong> ${sizeMB} MB`;

    // show file-info, hide converted player and progress
    fileInfo.style.display = "flex";
    convertedPlayer.style.display = "none";
    progressContainer.style.display = "none";
    progressBar.style.width = "0%";
  });

  convertBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    // UI reset
    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    convertedPlayer.style.display = "none";

    try {
      await ensureFFmpegLoaded();

      ffmpeg.setProgress(({ ratio }) => {
        progressBar.style.width = `${Math.round(ratio * 100)}%`;
      });

      // write input file as input.caf
      ffmpeg.FS("writeFile", "input.caf", await fetchFile(selectedFile));

      // convert to mp3; using libmp3lame with VBR quality q:a 2
      await ffmpeg.run("-i", "input.caf", "-codec:a", "libmp3lame", "-q:a", "2", "output.mp3");

      // read output
      const data = ffmpeg.FS("readFile", "output.mp3");
      const mp3Blob = new Blob([data.buffer], { type: "audio/mpeg" });
      const mp3Url = URL.createObjectURL(mp3Blob);

      // set player + download
      mp3Audio.src = mp3Url;
      downloadLink.href = mp3Url;
      downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";

      // hide file-info, show converted player
      fileInfo.style.display = "none";
      progressContainer.style.display = "none";
      convertedPlayer.style.display = "flex";
    } catch (err) {
      console.error("CAF→MP3 conversion error:", err);
      alert("Conversion failed — check console for details.");
      progressContainer.style.display = "none";
    } finally {
      // cleanup FS entries (best-effort)
      try { ffmpeg.FS("unlink", "input.caf"); } catch (e) {}
      try { ffmpeg.FS("unlink", "output.mp3"); } catch (e) {}
    }
  });
});
