// /assets/js/alac-to-mp3.js
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

  // Lazy-load ffmpeg only when needed (optional):
  let ffmpegLoaded = false;
  async function ensureFFmpeg() {
    if (!ffmpegLoaded) {
      await ffmpeg.load();
      ffmpegLoaded = true;
    }
  }

  // Show file details when user selects ALAC
  fileInput.addEventListener("change", (e) => {
    selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const sizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
    const type = selectedFile.type || 'audio/alac';

    fileDetails.innerHTML = `<strong>Name:</strong> ${selectedFile.name}<br>
                             <strong>Type:</strong> ${type}<br>
                             <strong>Size:</strong> ${sizeMB} MB`;

    // show file-info block and hide any previous converted player
    fileInfo.style.display = "flex";
    convertedPlayer.style.display = "none";
    progressContainer.style.display = "none";
    progressBar.style.width = "0%";
  });

  // Convert button
  convertBtn.addEventListener("click", async () => {
    if (!selectedFile) return;

    // show progress UI
    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    convertedPlayer.style.display = "none";

    await ensureFFmpeg();

    ffmpeg.setProgress(({ ratio }) => {
      progressBar.style.width = `${Math.round(ratio * 100)}%`;
    });

    try {
      // write input with .alac extension to FFmpeg FS
      ffmpeg.FS("writeFile", "input.alac", await fetchFile(selectedFile));

      // run conversion (simple command); you can tweak bitrate if desired
      await ffmpeg.run("-i", "input.alac", "-codec:a", "libmp3lame", "-q:a", "2", "output.mp3");

      const data = ffmpeg.FS("readFile", "output.mp3");
      const mp3Blob = new Blob([data.buffer], { type: "audio/mpeg" });
      const mp3Url = URL.createObjectURL(mp3Blob);

      // set player + download link
      mp3Audio.src = mp3Url;
      downloadLink.href = mp3Url;
      downloadLink.download = selectedFile.name.replace(/\.[^/.]+$/, "") + ".mp3";

      // hide file info and show converted player
      fileInfo.style.display = "none";
      progressContainer.style.display = "none";
      convertedPlayer.style.display = "flex";
    } catch (err) {
      console.error("Conversion error:", err);
      alert("Conversion failed — check console for details.");
      progressContainer.style.display = "none";
    } finally {
      // cleanup (optional): remove FS files to free memory
      try { ffmpeg.FS("unlink", "input.alac"); } catch(e) {}
      try { ffmpeg.FS("unlink", "output.mp3"); } catch(e) {}
    }
  });
});
