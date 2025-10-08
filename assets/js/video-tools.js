const tools = [
  {
    id: 1,
    icon: 'fa-video',
    title: 'Convert MOV to MP4',
    description: 'Fast MOV to MP4 converter. Works offline, secure and easy to use.',
    tags: [
      'mov to mp4',
      'convert mov to mp4',
      'mov to mp4 converter',
      'video format converter',
      'offline mov converter',
      'mov to mp4 high quality',
      'free mov converter',
      'browser mov to mp4'
    ],
    category: 'video-tools',
    url: 'mov-to-mp4',
    ai_summary: 'Browser-based MOV to MP4 converter for fast, secure, and lossless video format conversion.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MOV to MP4 Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-gif", "mp4-to-mov", "mov-to-mp3"]
  },
  {
    id: 2,
    icon: 'fa-music',
    title: 'Convert MOV to MP3',
    description: 'Extract MP3 audio from MOV videos easily and securely online.',
    tags: [
      'mov to mp3',
      'extract audio from mov',
      'mov to mp3 converter',
      'convert mov audio',
      'video to mp3',
      'mov sound extract',
      'offline mov to mp3',
      'mov to mp3 high quality'
    ],
    category: 'video-tools',
    url: 'mov-to-mp3',
    ai_summary: 'Extract clear MP3 audio from MOV files instantly with this free, browser-based converter.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MOV to MP3 Converter",
      "applicationCategory": "AudioExtractor",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-wav", "mov-to-mp4", "video-to-gif"]
  },
  {
    id: 3,
    icon: 'fa-wave-square',
    title: 'Convert MOV to WAV',
    description: 'Free MOV to WAV converter for uncompressed, high-quality audio extraction.',
    tags: [
      'mov to wav',
      'convert mov to wav',
      'mov to wav converter',
      'extract wav from mov',
      'high quality mov audio',
      'offline mov converter',
      'mov sound to wav',
      'free mov wav tool'
    ],
    category: 'video-tools',
    url: 'mov-to-wav',
    ai_summary: 'Extract studio-quality WAV audio from MOV video files right in your browser — no uploads needed.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MOV to WAV Converter",
      "applicationCategory": "AudioExtractor",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-mp3", "mov-to-mp4", "video-to-gif"]
  },
  {
    id: 4,
    icon: 'fa-gif',
    title: 'Convert MOV to GIF',
    description: 'Create GIFs from MOV videos instantly — free, fast, and browser-based.',
    tags: [
      'mov to gif',
      'convert mov to gif',
      'mov to gif converter',
      'video to gif',
      'animated gif from mov',
      'mov animation maker',
      'mov gif converter online',
      'free mov to gif'
    ],
    category: 'video-tools',
    url: 'mov-to-gif',
    ai_summary: 'Turn MOV videos into looping GIFs in seconds — fast, private, and fully client-side.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MOV to GIF Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mp4-to-gif", "video-to-gif", "webm-to-gif"]
  },
  {
    id: 5,
    icon: 'fa-gif',
    title: 'Convert MP4 to GIF',
    description: 'Convert MP4 videos to GIFs instantly — no watermark or upload required.',
    tags: [
      'mp4 to gif',
      'convert mp4 to gif',
      'mp4 gif converter',
      'video to gif',
      'animated gif maker',
      'free mp4 to gif',
      'offline gif converter',
      'mp4 animation export'
    ],
    category: 'video-tools',
    url: 'mp4-to-gif',
    ai_summary: 'Convert MP4 videos into GIF animations offline in your browser — fast, simple, and private.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MP4 to GIF Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-gif", "video-to-gif", "webm-to-gif"]
  },
  {
    id: 6,
    icon: 'fa-video',
    title: 'Convert MP4 to MOV',
    description: 'Free MP4 to MOV converter — preserve quality and frame rate instantly.',
    tags: [
      'mp4 to mov',
      'convert mp4 to mov',
      'mp4 to mov converter',
      'video format converter',
      'free mp4 converter',
      'mp4 to mov high quality',
      'offline mp4 converter',
      'mp4 mov conversion'
    ],
    category: 'video-tools',
    url: 'mp4-to-mov',
    ai_summary: 'Convert MP4 to MOV with full quality retention using this secure, offline-capable web tool.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "MP4 to MOV Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-mp4", "video-to-gif", "webm-to-gif"]
  },
  {
    id: 7,
    icon: 'fa-video',
    title: 'Convert Video to GIF',
    description: 'Convert any video format to GIF — fast, private, and free to use.',
    tags: [
      'video to gif',
      'convert video to gif',
      'any format to gif',
      'universal gif converter',
      'animated gif maker',
      'offline gif converter',
      'free video gif tool',
      'browser video to gif'
    ],
    category: 'video-tools',
    url: 'video-to-gif',
    ai_summary: 'Create GIFs from any video format instantly in your browser with no file uploads.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "Video to GIF Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mov-to-gif", "mp4-to-gif", "webm-to-gif"]
  },
  {
    id: 8,
    icon: 'fa-gif',
    title: 'Convert WEBM to GIF',
    description: 'Turn WEBM videos into GIFs instantly — quick, simple, and free.',
    tags: [
      'webm to gif',
      'convert webm to gif',
      'webm gif converter',
      'video to gif converter',
      'animated gif maker',
      'webm gif tool',
      'offline webm converter',
      'free webm to gif'
    ],
    category: 'video-tools',
    url: 'webm-to-gif',
    ai_summary: 'Transform WEBM videos into animated GIFs quickly and privately using this in-browser tool.',
    schema: {
      "@type": "SoftwareApplication",
      "name": "WEBM to GIF Converter",
      "applicationCategory": "VideoConverter",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    related_tools: ["mp4-to-gif", "mov-to-gif", "video-to-gif"]
  },
  {
  id: 9,
  icon: 'fa-music',
  title: 'Convert MP4 to MP3',
  description: 'Convert MP4 to MP3 online — extract high-quality audio from videos instantly. Free, secure, and browser-based.',
  tags: [
    'mp4 to mp3',
    'convert mp4 to mp3',
    'mp4 to mp3 converter',
    'turn mp4 into mp3',
    'change mp4 to mp3 online free',
    'convert mp4 into mp3',
    'extract audio from mp4',
    'mp4 to mp3 converter free',
    'convert mp4 to mp3 format',
    'mp4 to mp3 converter online'
  ],
  category: 'video-tools',
  url: 'mp4-to-mp3',
  ai_summary: 'Browser-based MP4 to MP3 converter for fast, free, and high-quality audio extraction without uploads or sign-ups.',
  related_tools: [
    'mov-to-gif',
    'mov-to-mp3',
    'mov-to-mp4',
    'mov-to-wav',
    'mp4-to-gif',
    'mp4-to-mov',
    'video-to-gif',
    'webm-to-gif'
  ]
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