const tools = [
    {
        id: 1,
        icon: 'fa-font',
        title: 'Audio File Format Converter',
        description: 'Free online audio converter to quickly convert FLAC, WAV, M4A, AAC, OGG, OPUS, ALAC, AMR, AIFF, WMA, CAF to MP3 and vice versa. Works entirely in your browser for fast, private, and secure audio conversion without uploads.',
        tags: [
            'Convert Audio Files',
            'Audio Converter',
            'FLAC to MP3',
            'WAV to MP3',
            'M4A to MP3',
            'AAC to MP3',
            'OGG to MP3',
            'OPUS to MP3',
            'ALAC to MP3',
            'AMR to MP3',
            'AIFF to MP3',
            'WMA to MP3',
            'CAF to MP3',
            'MP3 Converter Online',
            'Browser Audio Converter',
            'Offline Audio Converter'
        ],
        category: 'audio',
        url: 'audio-converter'
    },
    {
        id: 2,
        icon: 'fa-font',
        title: 'Create Video from Image and Audio',
        description: 'Turn your images and audio into MP4 videos instantly. Upload a picture, add music or narration, and create stunning videos directly in your browser. Perfect for YouTube, social media, and presentations — no software needed.',
        tags: [
            'MP3 to MP4 with Image',
            'MP3 to MP4 Image',
            'Convert MP3 to MP4 with Image',
            'Image and Audio to Video',
            'Add Audio to Image',
            'Create Video from Photo and Music',
            'Image Slideshow with Music',
            'Online Video Creator',
            'Browser Video Maker',
            'Make MP4 from Image and Sound'
        ],
        category: 'video',
        url: 'create-video-from-image-and-audio'
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
        
        // Initialize with sample conversion
        window.addEventListener('DOMContentLoaded', () => {
        });