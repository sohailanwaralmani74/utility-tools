let uploadedFile=null;async function exportFile(e){showLoader("Processing Conversion ......");let{createFFmpeg:l,fetchFile:a}=window.FFmpeg,t=l({log:!0,corePath:"https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js"});try{if(showLoader("Converting to "+e),!uploadedFile)throw Error("No file uploaded!");t.isLoaded()||await t.load(),t.FS("writeFile",uploadedFile.name,await a(uploadedFile));let o=uploadedFile.name.replace(/\.[^/.]+$/,""),i=`${o}.${e}`;await t.run("-i",uploadedFile.name,i);let s=t.FS("readFile",i),r=new Blob([s.buffer],{type:"audio/mpeg"}),n=URL.createObjectURL(r),d=document.createElement("a");showLoader("Added To Download"),d.href=n,d.download=i,d.click(),URL.revokeObjectURL(n)}catch(c){alert(`Error: ${c.message}`)}finally{hideLoader()}}function showLoader(e){let l=document.getElementById("loader");l||((l=document.createElement("div")).id="loader",l.style.position="fixed",l.style.top="50%",l.style.left="50%",l.style.transform="translate(-50%, -50%)",l.style.background="rgba(0, 0, 0, 0.7)",l.style.color="#fff",l.style.padding="15px 25px",l.style.borderRadius="10px",l.style.fontSize="18px",l.style.zIndex="9999",document.body.appendChild(l)),l.innerText=e,l.style.display="block"}function hideLoader(){let e=document.getElementById("loader");e&&(e.style.display="none")}document.getElementById("audio-file").addEventListener("change",function(e){document.getElementById("loader").style.display="block";let l=e.target.files[0];if(!l)return;uploadedFile=l,document.getElementById("fileInfo").style.display="flex";let a=`
  <div class="column" style="margin:1rem">
  <div><strong>File Name:</strong> ${l.name}</div>
  <div><strong>File Type:</strong> ${l.type||"Unknown"}</div>
  <div><strong>File Size:</strong> ${(l.size/1024).toFixed(2)} KB</div>
  <div><strong>Last Modified:</strong> ${new Date(l.lastModified).toLocaleString()} 
  </div>
  <div style="font-family: Georgia;   display: flex; justify-content: start; margin-top: 1rem !important ">
    <label style="margin-top: 0.5rem; margin-right: 4rem">Convert To </label> 
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('mp3')"><u>mp3</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('flac')"><u>flac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('wav')"><u>wav</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('m4a')"><u>m4a</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('aac')"><u>aac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('ogg')"><u>ogg</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('opus')"><u>opus</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('alac')"><u>alac</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('amr')"><u>amr</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('aiff')"><u>aiff</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('wma')"><u>wma</u></label>
    <label class="compress-label" style="margin-left:1rem" onclick="exportFile('caf')"><u>caf</u></label>

    
    </div>
  </div>
`;document.getElementById("fileInfo").innerHTML=a,document.getElementById("loader").style.display="none"});