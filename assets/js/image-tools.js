const tools = [
  {
    id: 0,
    icon: 'fa-font',
    title: 'Image / PDF Converter',
    description: 'Convert PDF to JPG, PNG, AVIF, TIFF. Convert Images to PDF. Bulk convert JPG to PNG, PNG to WEBP, and more—100% browser-based, secure, and free',
    tags: ['Image Converter', 'PDF To Image Converter'],
    category: 'excel',
    url:'pdf-image-converter'
  },
//   {
//     id: 1,
//     icon: 'fa-font',
//     title: 'PNG Format Converter',
//     description: 'This is a powerful PNG format converter. Easily convert from PNG to various formats and more.',
//     tags: ['PNG Converter', 'PNG Format Converter', 'Convert PNG To'],
//     category: 'PNG',
//     url: 'png-converter'
//   },
//   {
//     id: 2,
//     icon: 'fa-font',
//     title: 'JPG Format Converter',
//     description: 'This is a powerful JPG format converter. Easily convert from JPG to various formats and more.',
//     tags: ['JPG Converter', 'JPG Format Converter', 'Convert JPG To'],
//     category: 'JPG',
//     url: 'jpg-converter'
//   },
//   {
//     id: 3,
//     icon: 'fa-font',
//     title: 'JPEG Format Converter',
//     description: 'This is a powerful JPEG format converter. Easily convert from JPEG to various formats and more.',
//     tags: ['JPEG Converter', 'JPEG Format Converter', 'Convert JPEG To'],
//     category: 'JPEG',
//     url: 'jpeg-converter'
//   },
//   {
//     id: 4,
//     icon: 'fa-font',
//     title: 'GIF Format Converter',
//     description: 'This is a powerful GIF format converter. Easily convert from GIF to various formats and more.',
//     tags: ['GIF Converter', 'GIF Format Converter', 'Convert GIF To'],
//     category: 'GIF',
//     url: 'gif-converter'
//   },
//   {
//     id: 5,
//     icon: 'fa-font',
//     title: 'BMP Format Converter',
//     description: 'This is a powerful BMP format converter. Easily convert from BMP to various formats and more.',
//     tags: ['BMP Converter', 'BMP Format Converter', 'Convert BMP To'],
//     category: 'BMP',
//     url: 'bmp-converter'
//   },
//   {
//     id: 6,
//     icon: 'fa-font',
//     title: 'TIFF Format Converter',
//     description: 'This is a powerful TIFF format converter. Easily convert from TIFF to various formats and more.',
//     tags: ['TIFF Converter', 'TIFF Format Converter', 'Convert TIFF To'],
//     category: 'TIFF',
//     url: 'tiff-converter'
//   },
//   {
//     id: 7,
//     icon: 'fa-font',
//     title: 'TIF Format Converter',
//     description: 'This is a powerful TIF format converter. Easily convert from TIF to various formats and more.',
//     tags: ['TIF Converter', 'TIF Format Converter', 'Convert TIF To'],
//     category: 'TIF',
//     url: 'tif-converter'
//   },
//   {
//     id: 8,
//     icon: 'fa-font',
//     title: 'WEBP Format Converter',
//     description: 'This is a powerful WEBP format converter. Easily convert from WEBP to various formats and more.',
//     tags: ['WEBP Converter', 'WEBP Format Converter', 'Convert WEBP To'],
//     category: 'WEBP',
//     url: 'webp-converter'
//   },
//   {
//     id: 9,
//     icon: 'fa-font',
//     title: 'HEIC Format Converter',
//     description: 'This is a powerful HEIC format converter. Easily convert from HEIC to various formats and more.',
//     tags: ['HEIC Converter', 'HEIC Format Converter', 'Convert HEIC To'],
//     category: 'HEIC',
//     url: 'heic-converter'
//   },
//   {
//     id: 10,
//     icon: 'fa-font',
//     title: 'SVG Format Converter',
//     description: 'This is a powerful SVG format converter. Easily convert from SVG to various formats and more.',
//     tags: ['SVG Converter', 'SVG Format Converter', 'Convert SVG To'],
//     category: 'SVG',
//     url: 'svg-converter'
//   },
//   {
//     id: 11,
//     icon: 'fa-font',
//     title: 'AVIF Format Converter',
//     description: 'This is a powerful AVIF format converter. Easily convert from AVIF to various formats and more.',
//     tags: ['AVIF Converter', 'AVIF Format Converter', 'Convert AVIF To'],
//     category: 'AVIF',
//     url: 'avif-converter'
//   },
//   {
//     id: 12,
//     icon: 'fa-font',
//     title: 'ICO Format Converter',
//     description: 'This is a powerful ICO format converter. Easily convert from ICO to various formats and more.',
//     tags: ['ICO Converter', 'ICO Format Converter', 'Convert ICO To'],
//     category: 'ICO',
//     url: 'ico-converter'
//   },
//   {
//     id: 13,
//     icon: 'fa-font',
//     title: 'JFIF Format Converter',
//     description: 'This is a powerful JFIF format converter. Easily convert from JFIF to various formats and more.',
//     tags: ['JFIF Converter', 'JFIF Format Converter', 'Convert JFIF To'],
//     category: 'JFIF',
//     url: 'jfif-converter'
//   },
//   {
//     id: 14,
//     icon: 'fa-font',
//     title: 'RAW Format Converter',
//     description: 'This is a powerful RAW format converter. Easily convert from RAW to various formats and more.',
//     tags: ['RAW Converter', 'RAW Format Converter', 'Convert RAW To'],
//     category: 'RAW',
//     url: 'raw-converter'
//   },
//   {
//     id: 15,
//     icon: 'fa-font',
//     title: 'CR2 Format Converter',
//     description: 'This is a powerful CR2 format converter. Easily convert from CR2 to various formats and more.',
//     tags: ['CR2 Converter', 'CR2 Format Converter', 'Convert CR2 To'],
//     category: 'CR2',
//     url: 'cr2-converter'
//   },
//   {
//     id: 16,
//     icon: 'fa-font',
//     title: 'NEF Format Converter',
//     description: 'This is a powerful NEF format converter. Easily convert from NEF to various formats and more.',
//     tags: ['NEF Converter', 'NEF Format Converter', 'Convert NEF To'],
//     category: 'NEF',
//     url: 'nef-converter'
//   },
//   {
//     id: 17,
//     icon: 'fa-font',
//     title: 'ORF Format Converter',
//     description: 'This is a powerful ORF format converter. Easily convert from ORF to various formats and more.',
//     tags: ['ORF Converter', 'ORF Format Converter', 'Convert ORF To'],
//     category: 'ORF',
//     url: 'orf-converter'
//   },
//   {
//     id: 18,
//     icon: 'fa-font',
//     title: 'SR2 Format Converter',
//     description: 'This is a powerful SR2 format converter. Easily convert from SR2 to various formats and more.',
//     tags: ['SR2 Converter', 'SR2 Format Converter', 'Convert SR2 To'],
//     category: 'SR2',
//     url: 'sr2-converter'
//   },
//   {
//     id: 19,
//     icon: 'fa-font',
//     title: 'PSD Format Converter',
//     description: 'This is a powerful PSD format converter. Easily convert from PSD to various formats and more.',
//     tags: ['PSD Converter', 'PSD Format Converter', 'Convert PSD To'],
//     category: 'PSD',
//     url: 'psd-converter'
//   },
//   {
//     id: 20,
//     icon: 'fa-font',
//     title: 'DNG Format Converter',
//     description: 'This is a powerful DNG format converter. Easily convert from DNG to various formats and more.',
//     tags: ['DNG Converter', 'DNG Format Converter', 'Convert DNG To'],
//     category: 'DNG',
//     url: 'dng-converter'
//   },
//   {
//     id: 21,
//     icon: 'fa-font',
//     title: 'AI Format Converter',
//     description: 'This is a powerful AI format converter. Easily convert from AI to various formats and more.',
//     tags: ['AI Converter', 'AI Format Converter', 'Convert AI To'],
//     category: 'AI',
//     url: 'ai-converter'
//   },
//   {
//     id: 22,
//     icon: 'fa-font',
//     title: 'EPS Format Converter',
//     description: 'This is a powerful EPS format converter. Easily convert from EPS to various formats and more.',
//     tags: ['EPS Converter', 'EPS Format Converter', 'Convert EPS To'],
//     category: 'EPS',
//     url: 'eps-converter'
//   }
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