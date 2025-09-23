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
        title: 'MP3 To MP4 With Image',
        description: 'Turn your images and mp3 into MP4 videos instantly. Upload a picture, add music or narration, and create stunning videos directly in your browser. Perfect for YouTube, social media, and presentations — no software needed.',
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
        url: 'mp3-to-mp4-with-image'
    },
    {
        id: 3,
        icon: 'fa-font',
        title: 'AMR To MP3',
        description: 'Convert amr to mp3 faster with amr to mp3 converter. Converting amr to mp3 is relaible with reptile birds tool',
        tags: [
            'amr to mp3',
            'convert amr to mp3',
            'Convert amr file to mp3',
            'Convert amr file to mp3 file',
            'amr audio to mp3',
        ],
        category: 'audio',
        url: 'amr-to-mp3'
    },
    {
        id: 4,
        icon: 'fa-font',
        title: 'M4A To MP3',
        description: 'Convert m4a to mp3 faster with m4a to mp3 converter. Converting m4a to mp3 is relaible with reptile birds tool',
        tags: [
            'm4a to mp3',
            'change m4a to mp3',
            'convert m4a to mp3',
            'm4a to mp3 converter',
            'convert m4a file to mp3',
            'm4a to mp3 mac'
        ],
        category: 'audio',
        url: 'm4a-to-mp3'
    },
    {
    id: 5,
    icon: 'fa-music',
    title: 'OGG To MP3',
    description: 'Convert ogg to mp3 instantly with our fast and reliable OGG to MP3 converter tool. Works securely in your browser.',
    tags: [
        'ogg to mp3',
        'change ogg to mp3',
        'convert ogg to mp3',
        'ogg to mp3 converter',
        'convert ogg file to mp3',
        'ogg audio to mp3'
    ],
    category: 'audio',
    url: 'convert-ogg-to-mp3'
   },
   {
    id: 6,
    icon: 'fa-music',
    title: 'AAC To MP3',
    description: 'Convert AAC to MP3 quickly and securely with our AAC to MP3 converter tool. 100% browser-based, no upload required.',
    tags: [
        'aac to mp3',
        'convert aac to mp3',
        'aac to mp3 converter',
        'change aac to mp3',
        'convert aac file to mp3',
        'aac audio to mp3'
    ],
    category: 'audio',
    url: 'aac-to-mp3'
   },
   {
    id: 7,
    icon: 'fa-music',
    title: 'OPUS To MP3',
    description: 'Convert OPUS to MP3 quickly and securely with our OPUS to MP3 converter tool. Works directly in your browser.',
    tags: [
        'opus to mp3',
        'convert opus to mp3',
        'opus to mp3 converter',
        'change opus to mp3',
        'convert opus file to mp3',
        'opus audio to mp3'
    ],
    category: 'video',
    url: 'opus-to-mp3'
   },
   {
    id: 8,
    icon: 'fa-music',
    title: 'ALAC To MP3',
    description: 'Convert ALAC (Apple Lossless) to MP3 quickly and securely in your browser. No upload required — conversions happen on your device.',
    tags: [
        'alac to mp3',
        'convert alac to mp3',
        'convert .alac to mp3',
        'alac to mp3 converter',
        'alac file to mp3',
        'apple lossless to mp3'
    ],
    category: 'audio',
    url: 'alac-to-mp3'
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