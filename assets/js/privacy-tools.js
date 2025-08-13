const tools = [
    {
        id: 1,
        icon: 'fa-font',
        title: 'File Compressor',
        description: 'Free online file compressor to reduce file size without losing quality. Supports ZIP, GZIP, TAR, RAR, and other formats. Works fully in your browser for fast, private compression with no uploads.',
        tags: [
            'Compress Files',
            'File Compressor',
            'Reduce File Size',
            'Online File Compressor',
            'ZIP File Compressor',
            'GZIP File Compressor',
            'TAR File Compressor',
            'RAR File Compressor',
            'Browser File Compressor',
            'Offline File Compression'
        ],
        category: 'privacy',
        url: 'file-compressor'
    },
    {
        id: 2,
        icon: 'fa-font',
        title: 'Image Redactor - Redact Images at Pixel Level',
        description: 'Pixelate, blur, or hide sensitive parts of your photos with our free image redactor. 100% browser-based, secure, and instant — no uploads or sign-ups required.',
        tags: [
            'Redact Image',
            'Redact Image Online',
            'Pixelate Image',
            'Blur Image',
            'Hide Sensitive Information in Image',
            'Online Image Redactor',
            'Image Privacy Tool',
            'Secure Image Editing',
            'Censor Image Online',
            'Anonymize Image'
        ],
        category: 'privacy',
        url: 'image-redactor'
    },
    {
        id: 3,
        icon: 'fa-font',
        title: 'Metadata Deleter',
        description: 'Easily delete metadata from photos, documents, and other files to protect your privacy. Works entirely in your browser for safe, offline metadata removal.',
        tags: [
            'Metadata Deleter',
            'Metadata Remover',
            'Delete Metadata from Files',
            'Remove EXIF Data',
            'Photo Metadata Remover',
            'Document Metadata Remover',
            'Offline Metadata Removal',
            'Secure File Cleaning',
            'Remove Metadata Online',
            'Anonymize Files'
        ],
        category: 'privacy',
        url: 'meta-data-remover'
    }
];

        
        // Render Tools
        const toolsGrid = document.getElementById('toolsGrid');
        
        function renderTools(toolsArray) {
            toolsGrid.innerHTML = '';
            
            toolsArray.forEach(tool => {
                const toolCard = document.createElement('div');
                toolCard.className = 'tool-card';
                toolCard.innerHTML = `
                   <a href="${tool.url}">
                    <div class="tool-icon">
                    <h2>${tool.title}</h2>
                    </div>
                    <div class="tool-content">
                        <p class="tool-description">${tool.description}</p>
                        <div class="tool-tags">
                            ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                    </a>
                `;
                toolsGrid.appendChild(toolCard);
            });
        }
        
        // Initialize tools
        renderTools(tools);
        
        // Search Functionality
        const searchInput = document.getElementById('searchInput');
        
        searchInput.addEventListener('input', () => {
            const searchTerm = searchInput.value.toLowerCase();
            
            if (searchTerm === '') {
                renderTools(tools);
                return;
            }
            
            const filteredTools = tools.filter(tool => 
                tool.title.toLowerCase().includes(searchTerm) || 
                tool.description.toLowerCase().includes(searchTerm) ||
                tool.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
            
            renderTools(filteredTools);
        });
        
                    
        function copyToClipboard() {
            const text = resultOutput.textContent;
            navigator.clipboard.writeText(text)
                .then(() => {
                    const originalText = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                    setTimeout(() => {
                        copyBtn.innerHTML = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
        
        function clearAll() {
            textInput.value = '';
            resultOutput.textContent = 'Your converted text will appear here...';
        }
        
        // Initialize with sample conversion
        window.addEventListener('DOMContentLoaded', () => {
        });