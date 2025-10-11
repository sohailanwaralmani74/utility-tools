const videoInput = document.getElementById("videoPlayer"),
      fileInput = document.getElementById("audio-file"),
      convertBtn = document.getElementById("convert-btn"),
      progressContainer = document.getElementById("progress-container"),
      progressBar = document.getElementById("progress-bar"),
      convertedPlayer = document.getElementById("converted-player"),
      mp4Video = document.getElementById("mp4-video"),
      downloadLink = document.getElementById("download-link"),
      uploadedFile = document.getElementById("uploadedFile");

fileInput.addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    uploadedFile.style.display = "inline-block";
    const url = URL.createObjectURL(file);
    videoInput.src = url;
    videoInput.load();
});

convertBtn.addEventListener("click", async () => {
    if (!fileInput.files[0]) return alert("Please upload a MOV file first");

    const file = fileInput.files[0];

    progressContainer.style.display = "block";
    progressBar.style.width = "0%";
    convertBtn.textContent = "Converting...";
    convertBtn.style.pointerEvents = "none";

    try {
        const { createFFmpeg, fetchFile } = FFmpeg;

        if (!crossOriginIsolated) {
            throw new Error("Enable COOP/COEP headers in your server or service worker");
        }

        new WebAssembly.Memory({ initial: 32752, maximum: 32752, shared: true });

        const ffmpeg = createFFmpeg({
            log: false,
            corePath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js",
            wasmPath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm",
            workerPath: "https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js",
            mainName: "main",
            instantiateWasm: async (imports, receive) => {
                try {
                    const buffer = await fetch("https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm")
                                         .then(res => res.arrayBuffer());
                    const instance = await WebAssembly.instantiate(buffer, { wasi_snapshot_preview1: { fd_write: () => 0, fd_close: () => 0 } });
                    receive(instance);
                    return instance.exports;
                } catch (err) {
                    throw err;
                }
            },
            progress: ({ ratio }) => {
                progressBar.style.width = Math.min(100, Math.round(100 * ratio)) + "%";
            }
        });

        if (!ffmpeg.isLoaded()) await ffmpeg.load();

        ffmpeg.FS("writeFile", "inputavi", await fetchFile(file));
        await ffmpeg.run(
            "-i", "inputavi",
            "-c:v", "libx264",
            "-c:a", "aac",
            "-preset", "fast",
            "-crf", "23",
            "output.mp4"
        );

        const data = ffmpeg.FS("readFile", "output.mp4");
        const blob = new Blob([data.buffer], { type: "video/mp4" });
        const mp4Url = URL.createObjectURL(blob);

        mp4Video.src = mp4Url;
        downloadLink.href = mp4Url;
        downloadLink.download = "converted.mp4";
        convertedPlayer.style.display = "flex";

        convertBtn.textContent = "Convert to MP4";
        convertBtn.style.pointerEvents = "auto";
    } catch (err) {
        alert("Conversion failed: " + err.message);
    } finally {
        progressContainer.style.display = "none";
    }
});
