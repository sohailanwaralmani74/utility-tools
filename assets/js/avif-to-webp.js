let uploadedImages = [];

function previewImages(e) {
    const container = document.getElementById("uploadedFiles");
    container.innerHTML = "";
    container.style.border = "2px solid #ccc";
    container.style.padding = "10px";
    container.style.borderRadius = "5px";
    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "10px";
    container.style.minHeight = "100px";
    container.style.alignItems = "flex-start";

    const fragment = document.createDocumentFragment();
    e.forEach(file => {
        const objectUrl = URL.createObjectURL(file);
        const wrapper = document.createElement("div");
        wrapper.style.position = "relative";
        wrapper.style.display = "inline-block";
        wrapper.style.margin = "5px";

        const img = document.createElement("img");
        img.src = objectUrl;
        img.style.maxWidth = "200px";
        img.style.maxHeight = "200px";
        img.style.border = "1px solid #ddd";
        img.style.borderRadius = "3px";
        img.style.objectFit = "contain";
        img.loading = "lazy";

        const nameDiv = document.createElement("div");
        nameDiv.textContent = file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name;
        nameDiv.style.fontSize = "12px";
        nameDiv.style.textAlign = "center";
        nameDiv.style.marginTop = "5px";
        nameDiv.style.color = "#555";
        nameDiv.style.width = "200px";
        nameDiv.style.overflow = "hidden";
        nameDiv.style.textOverflow = "ellipsis";
        nameDiv.style.whiteSpace = "nowrap";

        const sizeDiv = document.createElement("div");
        sizeDiv.textContent = (file.size / 1048576).toFixed(2) + " MB";
        sizeDiv.style.fontSize = "11px";
        sizeDiv.style.color = "#888";
        sizeDiv.style.textAlign = "center";

        wrapper.appendChild(img);
        wrapper.appendChild(nameDiv);
        wrapper.appendChild(sizeDiv);
        fragment.appendChild(wrapper);

        img.onload = () => URL.revokeObjectURL(objectUrl);
    });

    container.appendChild(fragment);

    if (!e.length) {
        container.innerHTML = '<p style="color:#666; width:100%; text-align:center;">No images to display</p>';
        container.style.border = "none";
    }
}

function exportToImage(format) {
    if (!uploadedImages.length) return alert("Please upload at least one AVIF image.");

    format = (format || "webp").toLowerCase();
    if (!["webp"].includes(format)) return console.error("Unsupported format: " + format);

    const mime = "image/webp";
    const zip = new JSZip();

    const promises = uploadedImages.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function() {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);

                canvas.toBlob(blob => {
                    const filename = file.name.replace(/\.[^/.]+$/, "") + "." + format;
                    zip.file(filename, blob);
                    resolve();
                }, mime);
            };
            img.src = reader.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    }));

    Promise.all(promises)
        .then(() => zip.generateAsync({ type: "blob" }))
        .then(content => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `converted_images_${format}.zip`;
            link.click();
        })
        .catch(err => console.error("Image conversion error:", err));
}

document.getElementById("imageUpload").addEventListener("change", function(e) {
    const files = Array.from(e.target.files).filter(f => f.type === "image/avif");
    if (!files.length) return alert("Please upload WebP images only.");

    document.getElementById("exportOptions").style.display = "flex";
    uploadedImages = files;
    previewImages(files);
});
