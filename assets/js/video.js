
let imagesArray = [];
let audioFile = null;
let audioDuration = 0;
document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const audioUpload = document.getElementById('audioUpload');
    const imageUpload = document.getElementById('imageUpload');
    const uploadedImages = document.getElementById('uploadedImages');
    const audioPreview = document.getElementById('audioPreview');
    const audioSource = document.getElementById('audioSource');
    const generateVideoLabel = document.getElementById("generateVideo");
    // Store the uploaded images array


    // Handle audio upload
    audioUpload.addEventListener('change', function (e) {
        const file = e.target.files[0];
        if (!file) return;
        audioFile = file; // Store the audio file

        const audioURL = URL.createObjectURL(file);
        audioSource.src = audioURL;
        audioPreview.style.display = 'block';
        audioPreview.load();
        audioPreview.onloadedmetadata = function () {
            console.log(audioPreview.duration);
            audioDuration = audioPreview.duration;
        };
        checkGenerateVideoButton();
    });

    // Handle image upload
    imageUpload.addEventListener('change', function (e) {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        document.getElementById('uploadedImages').style.display = 'flex';
        // Process each file
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            const reader = new FileReader();
            reader.onload = function (event) {
                const imgSrc = event.target.result;
                imagesArray.push(imgSrc);
                updateImagesDisplay();
                checkGenerateVideoButton();
            };
            reader.readAsDataURL(file);
        }
    });

    // Update the images display in the container
    function updateImagesDisplay() {
        uploadedImages.innerHTML = '';

        imagesArray.forEach((imgSrc, index) => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'draggable-image';
            imgContainer.draggable = true;
            imgContainer.dataset.index = index;

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.style.maxWidth = '100px';
            imgElement.style.maxHeight = '100px';
            imgElement.style.margin = '5px';

            imgContainer.appendChild(imgElement);
            uploadedImages.appendChild(imgContainer);
        });

        // Add drag and drop event listeners
        setupDragAndDrop();
    }

    // Check if both audio and images are uploaded to show generate video button
    function checkGenerateVideoButton() {
        if (audioFile && imagesArray.length > 0) {
            generateVideoLabel.style.display = 'inline-block';
            // You might want to add click handler here or keep it separate
        } else {
            generateVideoLabel.style.display = 'none';
        }
    }

    // Set up drag and drop functionality
    function setupDragAndDrop() {
        const draggableImages = document.querySelectorAll('.draggable-image');

        draggableImages.forEach(img => {
            img.addEventListener('dragstart', dragStart);
            img.addEventListener('dragover', dragOver);
            img.addEventListener('drop', drop);
            img.addEventListener('dragend', dragEnd);
        });
    }

    // Drag and drop functions
    let draggedItem = null;

    function dragStart(e) {
        draggedItem = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
        setTimeout(() => this.style.opacity = '0.4', 0);
    }

    function dragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function drop(e) {
        e.preventDefault();
        e.stopPropagation();

        if (draggedItem !== this) {
            // Get the indices of the dragged and target items
            const draggedIndex = parseInt(draggedItem.dataset.index);
            const targetIndex = parseInt(this.dataset.index);

            // Swap the images in the array
            [imagesArray[draggedIndex], imagesArray[targetIndex]] =
                [imagesArray[targetIndex], imagesArray[draggedIndex]];

            // Update the display with the new order
            updateImagesDisplay();
        }

        return false;
    }

    function dragEnd() {
        this.style.opacity = '1';
    }
});


async function generateVideo() {
    const { createFFmpeg, fetchFile } = FFmpeg;
    document.getElementById("loader").style.display = "block";
            document.getElementById("generateVideo").style.display = 'none';


    try {
        // =================================================================
        // 1. Verify Cross-Origin Isolation
        // =================================================================
        if (!crossOriginIsolated) {
            throw new Error("Enable COOP/COEP headers in your server or service worker");
        }

        // =================================================================
        // 2. WASM Memory Initialization (Critical Fix)
        // =================================================================
        const wasmMemory = new WebAssembly.Memory({
            initial: 32752,   // EXACTLY matches your error requirement
            maximum: 32752,    // No memory growth
            shared: true       // Required for threading
        });

        // =================================================================
        // 3. FFmpeg Configuration (Official Build)
        // =================================================================
        const ffmpeg = createFFmpeg({
            log: true,
            corePath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.js',
            wasmPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm',
            workerPath: 'https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.worker.js',
            mainName: 'main',
            instantiateWasm: async (imports, callback) => {
                try {
                    const wasmBinary = await fetch('https://unpkg.com/@ffmpeg/core@0.11.0/dist/ffmpeg-core.wasm')
                        .then(r => r.arrayBuffer());

                    const instance = await WebAssembly.instantiate(wasmBinary, {
                        wasi_snapshot_preview1: {
                            fd_write: () => 0,
                            fd_close: () => 0
                        }
                    });

                    callback(instance);
                    return instance.exports;
                } catch (e) {
                    console.error("WASM Instantiation Failed:", e);
                    throw e;
                }
            }
        });

        // =================================================================
        // 4. Load FFmpeg with Verification
        // =================================================================
        if (!ffmpeg.isLoaded()) {
            console.log('Loading FFmpeg with 2GB memory...');
            await ffmpeg.load();
        }

        // =================================================================
        // 5. Process Audio and Images
        // =================================================================
        // Assuming imagesArray is an array of image files (imageFile objects)
        console.log('Processing audio...');
        const audioBlob = await fetchFile(audioFile);
        ffmpeg.FS("writeFile", "audio.mp3", audioBlob);

        // Process images for video
        console.log('Processing images...');
        const imageDuration = audioDuration / imagesArray.length;
        const imageFiles = [];
        for (let i = 0; i < imagesArray.length; i++) {
            const imageBlob = await fetchFile(imagesArray[i]);
            const ext = imagesArray[i]?.name?.substring(imagesArray[i]?.name.lastIndexOf('.')).toLowerCase() ?? ''; 
            const imageName = `image_${i}${ext}`;
            imageFiles.push(imageName);
            ffmpeg.FS("writeFile", imageName, imageBlob);
        }

        // Generate input.txt with duration for each image
        let inputFile = '';
        for (let i = 0; i < imageFiles.length; i++) {
            inputFile += `file '${imageFiles[i]}'\n`; // Add file line
                inputFile += `duration ${imageDuration}\n`; // Add duration to each image except the last one
            
        }      

        ffmpeg.FS("writeFile", 'input.txt', inputFile);



        // Command to generate the video from images and audio
        await ffmpeg.run(
            '-f', 'concat',
            '-safe', '0',
            '-i', 'input.txt',
            '-i', 'audio.mp3',
            '-c:v', 'libx264',
            '-vf', 'scale=1280:720,format=yuv420p',
            '-shortest',
            '-y',
            'output.mp4'        // Output video file
        );
        console.log('FFmpeg command completed successfully.');
        // =================================================================
        // 6. Output & Cleanup
        // =================================================================
        console.log('Finalizing video...');
        const data = ffmpeg.FS("readFile", "output.mp4");
        const videoUrl = URL.createObjectURL(new Blob([data.buffer], { type: "video/mp4" }));

        const downloadLink = document.createElement("a");
        downloadLink.href = videoUrl;
        downloadLink.download = "generated_video.mp4";
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Cleanup after 1 second
        setTimeout(() => {
            document.body.removeChild(downloadLink);
            URL.revokeObjectURL(videoUrl);
            ffmpeg.exit(); // Free WASM memory
        }, 1000);

    } catch (error) {
        console.error('Video Generation Failed:', error);
        alert(`ERROR: ${error.message}`);
    } finally {
        document.getElementById("loader").style.display = "none";
        document.getElementById("generateVideo").style.display = 'inline-block';
    }
}
