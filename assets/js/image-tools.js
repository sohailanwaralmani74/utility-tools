const tools = [
  {
    id: 0,
    icon: 'fa-font',
    title: 'Image / PDF Converter',
    description: 'Convert PDF to JPG, PNG, AVIF, TIFF. Convert Images to PDF. Bulk convert JPG to PNG, PNG to WEBP, and more—100% browser-based, secure, and free',
    tags: ['Image Converter', 'PDF To Image Converter'],
    category: 'image',
    url:'pdf-image-converter'
  },
  {
    id: 1,
    icon: 'fa-font',
    title: 'JPG TO JPEG Converter',
    description: 'This is a powerful JPG format converter. Easily convert from jpg to various formats and more.',
    tags: ['jpg to jpeg Converter', 'jpg Format Converter', 'jpg To jpeg'],
    category: 'jpg',
    url: 'jpg-to-jpeg'
  },
  {
    id: 2,
    icon: 'fa-font',
    title: 'PNG TO JPG',
    description: 'Convert PNG to JPG or jpeg faster and secure. png to jpg converter is browser based and works offline after first load',
    tags: ['png to jpg Converter', 'png Format Converter', 'png To jpeg, png to jpg'],
    category: 'jpg',
    url: 'png-to-jpg'
  },
  {
  id: 3,
  icon: 'fa-image',
  title: 'WEBP TO PNG',
  description: 'Convert WEBP to PNG instantly in your browser. This webp to png converter works offline, keeps original quality, and ensures full privacy — no upload required.',
  tags: ['webp to png converter', 'convert webp to png', 'webp image converter', 'change webp to png'],
  category: 'png',
  url: 'webp-to-png'
},
{
  id: 4,
  icon: 'fa-image',
  title: 'AVIF TO WEBP',
  description: 'Convert AVIF to WebP instantly in your browser. This AVIF to WebP converter works fully offline, preserves image quality, and ensures 100% privacy — no upload required.',
  tags: ['avif to webp converter', 'convert avif to webp', 'avif image converter', 'change avif to webp'],
  category: 'webp',
  url: 'avif-to-webp'
},
{
  id: 5,
  icon: 'fa-image',
  title: 'WEBP TO AVIF',
  description: 'Convert WebP to AVIF instantly in your browser. This WebP to AVIF converter works fully offline, preserves image quality, and ensures 100% privacy — no upload required.',
  tags: ['webp to avif converter', 'convert webp to avif', 'webp image converter', 'change webp to avif'],
  category: 'webp',
  url: 'webp-to-avif'
},
  {
    id: 6,
    icon: 'fa-image',
    title: 'JPG TO PNG',
    description: 'Convert JPG images to PNG instantly in your browser. Works offline, preserves quality, and ensures 100% privacy — no upload required.',
    tags: ['jpg to png converter', 'convert jpg to png', 'jpg image converter', 'change jpg to png'],
    category: 'jpg',
    url: 'jpg-to-png'
  },
  {
    id: 7,
    icon: 'fa-image',
    title: 'JPG TO GIF',
    description: 'Convert JPG images to GIF online. Fast, offline, secure, and keeps the original quality intact.',
    tags: ['jpg to gif converter', 'convert jpg to gif', 'jpg image converter', 'change jpg to gif'],
    category: 'jpg',
    url: 'jpg-to-gif'
  },
  {
    id: 8,
    icon: 'fa-image',
    title: 'JPG TO BMP',
    description: 'Convert JPG images to BMP format instantly. Fully offline, safe, and preserves original image quality.',
    tags: ['jpg to bmp converter', 'convert jpg to bmp', 'jpg image converter', 'change jpg to bmp'],
    category: 'jpg',
    url: 'jpg-to-bmp'
  },
  {
    id: 9,
    icon: 'fa-image',
    title: 'JPG TO TIFF',
    description: 'Convert JPG images to TIFF format quickly in your browser. Works offline, preserves quality, and is 100% private.',
    tags: ['jpg to tiff converter', 'convert jpg to tiff', 'jpg image converter', 'change jpg to tiff'],
    category: 'jpg',
    url: 'jpg-to-tiff'
  },
  {
    id: 10,
    icon: 'fa-image',
    title: 'JPG TO WEBP',
    description: 'Convert JPG images to WebP format instantly. Fully offline, high-quality, and secure — no upload required.',
    tags: ['jpg to webp converter', 'convert jpg to webp', 'jpg image converter', 'change jpg to webp'],
    category: 'jpg',
    url: 'jpg-to-webp'
  },
  {
    id: 11,
    icon: 'fa-image',
    title: 'JPG TO AVIF',
    description: 'Convert JPG images to AVIF format online. Works offline, keeps original quality, and ensures full privacy.',
    tags: ['jpg to avif converter', 'convert jpg to avif', 'jpg image converter', 'change jpg to avif'],
    category: 'jpg',
    url: 'jpg-to-avif'
  },
  {
    id: 12,
    icon: 'fa-image',
    title: 'JPEG TO PNG',
    description: 'Convert JPEG images to PNG instantly in your browser. Fully offline, high-quality, and secure — no upload required.',
    tags: ['jpeg to png converter', 'convert jpeg to png', 'jpeg image converter', 'change jpeg to png'],
    category: 'jpeg',
    url: 'jpeg-to-png'
  },
  {
    id: 13,
    icon: 'fa-image',
    title: 'JPEG TO GIF',
    description: 'Convert JPEG images to GIF online. Works offline, preserves quality, and ensures 100% privacy.',
    tags: ['jpeg to gif converter', 'convert jpeg to gif', 'jpeg image converter', 'change jpeg to gif'],
    category: 'jpeg',
    url: 'jpeg-to-gif'
  },
  {
    id: 14,
    icon: 'fa-image',
    title: 'JPEG TO BMP',
    description: 'Convert JPEG images to BMP format in your browser. Fully offline and keeps original image quality.',
    tags: ['jpeg to bmp converter', 'convert jpeg to bmp', 'jpeg image converter', 'change jpeg to bmp'],
    category: 'jpeg',
    url: 'jpeg-to-bmp'
  },
  {
    id: 15,
    icon: 'fa-image',
    title: 'JPEG TO TIFF',
    description: 'Convert JPEG images to TIFF quickly and securely in your browser. Offline and 100% private.',
    tags: ['jpeg to tiff converter', 'convert jpeg to tiff', 'jpeg image converter', 'change jpeg to tiff'],
    category: 'jpeg',
    url: 'jpeg-to-tiff'
  },
  {
    id: 16,
    icon: 'fa-image',
    title: 'JPEG TO WEBP',
    description: 'Convert JPEG images to WebP format online. Works offline, high-quality, and private.',
    tags: ['jpeg to webp converter', 'convert jpeg to webp', 'jpeg image converter', 'change jpeg to webp'],
    category: 'jpeg',
    url: 'jpeg-to-webp'
  },
  {
    id: 17,
    icon: 'fa-image',
    title: 'JPEG TO AVIF',
    description: 'Convert JPEG images to AVIF instantly in your browser. Offline, secure, and preserves original quality.',
    tags: ['jpeg to avif converter', 'convert jpeg to avif', 'jpeg image converter', 'change jpeg to avif'],
    category: 'jpeg',
    url: 'jpeg-to-avif'
  },
  {
    id: 18,
    icon: 'fa-image',
    title: 'PNG TO JPEG',
    description: 'Convert PNG images to JPEG format quickly and securely. Works offline and preserves quality.',
    tags: ['png to jpeg converter', 'convert png to jpeg', 'png image converter', 'change png to jpeg'],
    category: 'png',
    url: 'png-to-jpeg'
  },
  {
    id: 19,
    icon: 'fa-image',
    title: 'PNG TO GIF',
    description: 'Convert PNG images to GIF online. Fully offline, fast, and keeps image quality intact.',
    tags: ['png to gif converter', 'convert png to gif', 'png image converter', 'change png to gif'],
    category: 'png',
    url: 'png-to-gif'
  },
  {
    id: 20,
    icon: 'fa-image',
    title: 'PNG TO BMP',
    description: 'Convert PNG images to BMP format instantly. Works offline and preserves original quality.',
    tags: ['png to bmp converter', 'convert png to bmp', 'png image converter', 'change png to bmp'],
    category: 'png',
    url: 'png-to-bmp'
  },
  {
    id: 21,
    icon: 'fa-image',
    title: 'PNG TO TIFF',
    description: 'Convert PNG images to TIFF format online. Offline, secure, and keeps full image quality.',
    tags: ['png to tiff converter', 'convert png to tiff', 'png image converter', 'change png to tiff'],
    category: 'png',
    url: 'png-to-tiff'
  },
  {
    id: 22,
    icon: 'fa-image',
    title: 'PNG TO WEBP',
    description: 'Convert PNG images to WebP format instantly. Works offline, maintains quality, and is private.',
    tags: ['png to webp converter', 'convert png to webp', 'png image converter', 'change png to webp'],
    category: 'png',
    url: 'png-to-webp'
  },
  {
    id: 23,
    icon: 'fa-image',
    title: 'PNG TO AVIF',
    description: 'Convert PNG images to AVIF online. Fully offline, fast, and preserves original quality.',
    tags: ['png to avif converter', 'convert png to avif', 'png image converter', 'change png to avif'],
    category: 'png',
    url: 'png-to-avif'
  },
  {
    id: 24,
    icon: 'fa-image',
    title: 'GIF TO JPG',
    description: 'Convert GIF images to JPG instantly in your browser. Offline, secure, and preserves quality.',
    tags: ['gif to jpg converter', 'convert gif to jpg', 'gif image converter', 'change gif to jpg'],
    category: 'gif',
    url: 'gif-to-jpg'
  },
  {
    id: 25,
    icon: 'fa-image',
    title: 'GIF TO JPEG',
    description: 'Convert GIF images to JPEG format online. Works offline and keeps full image quality.',
    tags: ['gif to jpeg converter', 'convert gif to jpeg', 'gif image converter', 'change gif to jpeg'],
    category: 'gif',
    url: 'gif-to-jpeg'
  },
  {
    id: 26,
    icon: 'fa-image',
    title: 'GIF TO PNG',
    description: 'Convert GIF images to PNG quickly and securely. Fully offline and maintains original quality.',
    tags: ['gif to png converter', 'convert gif to png', 'gif image converter', 'change gif to png'],
    category: 'gif',
    url: 'gif-to-png'
  },
  {
    id: 27,
    icon: 'fa-image',
    title: 'GIF TO BMP',
    description: 'Convert GIF images to BMP format instantly in your browser. Offline and keeps original quality.',
    tags: ['gif to bmp converter', 'convert gif to bmp', 'gif image converter', 'change gif to bmp'],
    category: 'gif',
    url: 'gif-to-bmp'
  },
  {
    id: 28,
    icon: 'fa-image',
    title: 'GIF TO TIFF',
    description: 'Convert GIF images to TIFF format online. Works offline, fast, and preserves quality.',
    tags: ['gif to tiff converter', 'convert gif to tiff', 'gif image converter', 'change gif to tiff'],
    category: 'gif',
    url: 'gif-to-tiff'
  },
  {
    id: 29,
    icon: 'fa-image',
    title: 'GIF TO WEBP',
    description: 'Convert GIF images to WebP format instantly in your browser. Offline, secure, and keeps quality intact.',
    tags: ['gif to webp converter', 'convert gif to webp', 'gif image converter', 'change gif to webp'],
    category: 'gif',
    url: 'gif-to-webp'
  },
  {
    id: 30,
    icon: 'fa-image',
    title: 'GIF TO AVIF',
    description: 'Convert GIF images to AVIF online. Fully offline, fast, and preserves original image quality.',
    tags: ['gif to avif converter', 'convert gif to avif', 'gif image converter', 'change gif to avif'],
    category: 'gif',
    url: 'gif-to-avif'
  },
  {
    id: 31,
    icon: 'fa-image',
    title: 'BMP TO JPG',
    description: 'Convert BMP images to JPG instantly in your browser. Works offline and maintains image quality.',
    tags: ['bmp to jpg converter', 'convert bmp to jpg', 'bmp image converter', 'change bmp to jpg'],
    category: 'bmp',
    url: 'bmp-to-jpg'
  },
  {
    id: 32,
    icon: 'fa-image',
    title: 'BMP TO JPEG',
    description: 'Convert BMP images to JPEG format online. Fully offline and preserves original quality.',
    tags: ['bmp to jpeg converter', 'convert bmp to jpeg', 'bmp image converter', 'change bmp to jpeg'],
    category: 'bmp',
    url: 'bmp-to-jpeg'
  },
  {
    id: 33,
    icon: 'fa-image',
    title: 'BMP TO PNG',
    description: 'Convert BMP images to PNG quickly and securely. Offline and keeps full image quality.',
    tags: ['bmp to png converter', 'convert bmp to png', 'bmp image converter', 'change bmp to png'],
    category: 'bmp',
    url: 'bmp-to-png'
  },
  {
    id: 34,
    icon: 'fa-image',
    title: 'BMP TO GIF',
    description: 'Convert BMP images to GIF format instantly in your browser. Offline, fast, and preserves quality.',
    tags: ['bmp to gif converter', 'convert bmp to gif', 'bmp image converter', 'change bmp to gif'],
    category: 'bmp',
    url: 'bmp-to-gif'
  },
  {
    id: 35,
    icon: 'fa-image',
    title: 'BMP TO TIFF',
    description: 'Convert BMP images to TIFF format online. Works offline, high-quality, and secure.',
    tags: ['bmp to tiff converter', 'convert bmp to tiff', 'bmp image converter', 'change bmp to tiff'],
    category: 'bmp',
    url: 'bmp-to-tiff'
  },
  {
    id: 36,
    icon: 'fa-image',
    title: 'BMP TO WEBP',
    description: 'Convert BMP images to WebP instantly. Fully offline, preserves quality, and keeps data private.',
    tags: ['bmp to webp converter', 'convert bmp to webp', 'bmp image converter', 'change bmp to webp'],
    category: 'bmp',
    url: 'bmp-to-webp'
  },
  {
    id: 37,
    icon: 'fa-image',
    title: 'BMP TO AVIF',
    description: 'Convert BMP images to AVIF online. Offline, fast, and preserves original quality.',
    tags: ['bmp to avif converter', 'convert bmp to avif', 'bmp image converter', 'change bmp to avif'],
    category: 'bmp',
    url: 'bmp-to-avif'
  },
  {
    id: 38,
    icon: 'fa-image',
    title: 'TIFF TO JPG',
    description: 'Convert TIFF images to JPG instantly. Offline, secure, and keeps full image quality.',
    tags: ['tiff to jpg converter', 'convert tiff to jpg', 'tiff image converter', 'change tiff to jpg'],
    category: 'tiff',
    url: 'tiff-to-jpg'
  },
  {
    id: 39,
    icon: 'fa-image',
    title: 'TIFF TO JPEG',
    description: 'Convert TIFF images to JPEG format online. Fully offline and preserves original quality.',
    tags: ['tiff to jpeg converter', 'convert tiff to jpeg', 'tiff image converter', 'change tiff to jpeg'],
    category: 'tiff',
    url: 'tiff-to-jpeg'
  },
  {
    id: 40,
    icon: 'fa-image',
    title: 'TIFF TO PNG',
    description: 'Convert TIFF images to PNG quickly and securely. Offline and keeps original quality.',
    tags: ['tiff to png converter', 'convert tiff to png', 'tiff image converter', 'change tiff to png'],
    category: 'tiff',
    url: 'tiff-to-png'
  },
  {
    id: 41,
    icon: 'fa-image',
    title: 'TIFF TO GIF',
    description: 'Convert TIFF images to GIF format instantly. Offline, fast, and preserves quality.',
    tags: ['tiff to gif converter', 'convert tiff to gif', 'tiff image converter', 'change tiff to gif'],
    category: 'tiff',
    url: 'tiff-to-gif'
  },
  {
    id: 42,
    icon: 'fa-image',
    title: 'TIFF TO BMP',
    description: 'Convert TIFF images to BMP format online. Works offline and preserves full image quality.',
    tags: ['tiff to bmp converter', 'convert tiff to bmp', 'tiff image converter', 'change tiff to bmp'],
    category: 'tiff',
    url: 'tiff-to-bmp'
  },
  {
    id: 43,
    icon: 'fa-image',
    title: 'TIFF TO WEBP',
    description: 'Convert TIFF images to WebP format instantly. Fully offline and preserves quality.',
    tags: ['tiff to webp converter', 'convert tiff to webp', 'tiff image converter', 'change tiff to webp'],
    category: 'tiff',
    url: 'tiff-to-webp'
  },
  {
    id: 44,
    icon: 'fa-image',
    title: 'TIFF TO AVIF',
    description: 'Convert TIFF images to AVIF online. Offline, fast, and keeps original image quality.',
    tags: ['tiff to avif converter', 'convert tiff to avif', 'tiff image converter', 'change tiff to avif'],
    category: 'tiff',
    url: 'tiff-to-avif'
  },
  {
    id: 45,
    icon: 'fa-image',
    title: 'WEBP TO JPG',
    description: 'Convert WebP images to JPG instantly in your browser. Offline and preserves full image quality.',
    tags: ['webp to jpg converter', 'convert webp to jpg', 'webp image converter', 'change webp to jpg'],
    category: 'webp',
    url: 'webp-to-jpg'
  },
  {
    id: 46,
    icon: 'fa-image',
    title: 'WEBP TO JPEG',
    description: 'Convert WebP images to JPEG format online. Works offline and preserves quality.',
    tags: ['webp to jpeg converter', 'convert webp to jpeg', 'webp image converter', 'change webp to jpeg'],
    category: 'webp',
    url: 'webp-to-jpeg'
  },
  {
    id: 47,
    icon: 'fa-image',
    title: 'WEBP TO GIF',
    description: 'Convert WebP images to GIF online instantly. Offline, secure, and maintains quality.',
    tags: ['webp to gif converter', 'convert webp to gif', 'webp image converter', 'change webp to gif'],
    category: 'webp',
    url: 'webp-to-gif'
  },
  {
    id: 48,
    icon: 'fa-image',
    title: 'WEBP TO BMP',
    description: 'Convert WebP images to BMP format quickly and securely. Offline and preserves full image quality.',
    tags: ['webp to bmp converter', 'convert webp to bmp', 'webp image converter', 'change webp to bmp'],
    category: 'webp',
    url: 'webp-to-bmp'
  },
  {
    id: 49,
    icon: 'fa-image',
    title: 'WEBP TO TIFF',
    description: 'Convert WebP images to TIFF format online. Works offline and keeps original quality.',
    tags: ['webp to tiff converter', 'convert webp to tiff', 'webp image converter', 'change webp to tiff'],
    category: 'webp',
    url: 'webp-to-tiff'
  },
  {
    id: 50,
    icon: 'fa-image',
    title: 'AVIF TO JPG',
    description: 'Convert AVIF images to JPG instantly. Fully offline and keeps original quality intact.',
    tags: ['avif to jpg converter', 'convert avif to jpg', 'avif image converter', 'change avif to jpg'],
    category: 'avif',
    url: 'avif-to-jpg'
  },
  {
    id: 51,
    icon: 'fa-image',
    title: 'AVIF TO JPEG',
    description: 'Convert AVIF images to JPEG format online. Offline, fast, and preserves image quality.',
    tags: ['avif to jpeg converter', 'convert avif to jpeg', 'avif image converter', 'change avif to jpeg'],
    category: 'avif',
    url: 'avif-to-jpeg'
  },
  {
    id: 52,
    icon: 'fa-image',
    title: 'AVIF TO PNG',
    description: 'Convert AVIF images to PNG instantly. Offline, secure, and keeps original image quality.',
    tags: ['avif to png converter', 'convert avif to png', 'avif image converter', 'change avif to png'],
    category: 'avif',
    url: 'avif-to-png'
  },
  {
    id: 53,
    icon: 'fa-image',
    title: 'AVIF TO GIF',
    description: 'Convert AVIF images to GIF format online. Works offline, fast, and maintains quality.',
    tags: ['avif to gif converter', 'convert avif to gif', 'avif image converter', 'change avif to gif'],
    category: 'avif',
    url: 'avif-to-gif'
  },
  {
    id: 54,
    icon: 'fa-image',
    title: 'AVIF TO BMP',
    description: 'Convert AVIF images to BMP format instantly. Offline and preserves original quality.',
    tags: ['avif to bmp converter', 'convert avif to bmp', 'avif image converter', 'change avif to bmp'],
    category: 'avif',
    url: 'avif-to-bmp'
  },
  {
    id: 55,
    icon: 'fa-image',
    title: 'AVIF TO TIFF',
    description: 'Convert AVIF images to TIFF online. Works offline, fast, and keeps full image quality.',
    tags: ['avif to tiff converter', 'convert avif to tiff', 'avif image converter', 'change avif to tiff'],
    category: 'avif',
    url: 'avif-to-tiff'
  }
]
;

        
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