<script src="/assets/js/ffmpeg.min.js"></script>
<script src="/sw.js"></script>

<div style="width: 100%; margin: auto; padding: 1rem; font-family: sans-serif;">
    <!-- Upload Button -->
    <div style="display: flex; justify-content: center; width: 100%;">
        <label for="audio-file" class="upload-label"
            style="padding: 0.2rem 0.5rem; background: orange; color: #fff; border-radius: 0.5rem; cursor: pointer; text-align: center; width: auto;">
            Upload File
        </label>
        <input type="file" id="audio-file" accept=".mkv" style="display: none;">
    </div>
<div id="uploadedFile" style="position: relative; display: none; width: 100%;">
  <video id="videoPlayer" style="width: 100%; height: 400px;" controls>
    <source src="" type="video/mp4">
    Your browser does not support the video tag.
  </video>

  <!-- Overlay Button -->
  <span id="convert-btn"
          style="position: absolute;
                 text-decoration: underline;
                 top: 2px;
                 right: 2px;
                 color: orange;
                 border: none;
                 padding: 0.6rem 1.2rem;
                 border-radius: 0.4rem;
                 cursor: pointer;
                 font-weight: bold;
                 opacity: 0.9;
                 transition: 0.3s;
                 ">
    Convert to MP4
  </span>
</div>
    <!-- Progress Bar -->
    <div id="progress-container" style="display:none; margin-top:1rem; width:100%;">
        <div style="background:#f1f1f1; border-radius:0.5rem; overflow:hidden; width:100%;">
            <div id="progress-bar" style="width:0%; height:0.6rem; background:#007bff;"></div>
        </div>
    </div>
    <div id="converted-player"
        style="display:none; margin-top:1.5rem; padding:1rem; border: 0.1rem solid #ccc; border-radius: 0.6rem; justify-content:space-between; align-items:center; flex-wrap: wrap; width: 100%;">
        <video id="mp4-video" controls style="flex:1 1 75%; width: 100%; height: 400px;">
           <source src="" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <a id="download-link" href="#" download style="position: absolute;
                 text-decoration: underline;
                 top: 2px;
                 right: 2px;
                 color: orange;
                 border: none;
                 padding: 0.6rem 1.2rem;
                 border-radius: 0.4rem;
                 cursor: pointer;
                 font-weight: bold;
                 opacity: 0.9;
                 transition: 0.3s;
                 ">
            Download
        </a>
    </div>
</div>

<script src="/assets/js/mkv-to-mp4.js"></script>