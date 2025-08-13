const tools = [
  {
    id: 1,
    icon: 'fa-font',
    title: 'Universal XML Converter',
    description: 'Convert XML files effortlessly to XLSX, XLS, JSON, PDF (raw and table), CSV, and more. Fast, offline, and secure XML conversion tool with no upload needed.',
    tags: [
      'Universal XML converter',
      'Convert XML files',
      'XML to XLSX',
      'XML to XLS',
      'XML to JSON',
      'XML to PDF',
      'XML to CSV',
      'Offline XML converter',
      'XML file converter'
    ],
    category: 'xml',
    url: 'xml-converter'
  },
  {
    id: 2,
    icon: 'fa-font',
    title: 'XML To Excel Converter',
    description: 'Convert XML files to Excel XLSX or XLS formats quickly and offline. Secure XML to Excel conversion without internet connection.',
    tags: [
      'XML to Excel',
      'XML to XLSX',
      'XML to XLS',
      'Convert XML to Excel',
      'Offline XML to Excel converter',
      'XML Excel export',
      'XML spreadsheet converter'
    ],
    category: 'xml',
    url: 'xml-to-excel'
  },
  {
    id: 3,
    icon: 'fa-font',
    title: 'XML To JSON Converter',
    description: 'Easily convert XML files to JSON format offline. Export clean JSON data from XML with our fast and secure converter.',
    tags: [
      'XML to JSON',
      'Convert XML to JSON',
      'XML JSON converter',
      'Offline XML to JSON',
      'XML to JSON export',
      'XML JSON format converter'
    ],
    category: 'xml',
    url: 'xml-to-json'
  },
  {
    id: 4,
    icon: 'fa-font',
    title: 'XML To SQL Converter',
    description: 'Convert XML files to SQL scripts offline for seamless database import. Generate clean, production-ready SQL from XML data securely.',
    tags: [
      'XML to SQL',
      'Convert XML to SQL',
      'XML SQL converter',
      'Offline XML to SQL',
      'XML to SQL export',
      'XML database converter'
    ],
    category: 'xml',
    url: 'xml-to-sql'
  },
  {
    id: 5,
    icon: 'fa-font',
    title: 'XML To PDF Converter',
    description: 'Convert XML files into PDF documents or PDF tables offline. Fast and secure XML to PDF conversion with preview and download options.',
    tags: [
      'XML to PDF',
      'Convert XML to PDF',
      'XML PDF converter',
      'Offline XML to PDF',
      'XML to PDF export',
      'XML PDF document converter'
    ],
    category: 'xml',
    url: 'xml-to-pdf'
  },
  {
    id: 6,
    icon: 'fa-font',
    title: 'XML To CSV Converter',
    description: 'Convert XML files to CSV format offline. Export XML data as clean CSV files quickly and securely with no internet connection needed.',
    tags: [
      'XML to CSV',
      'Convert XML to CSV',
      'XML CSV converter',
      'Offline XML to CSV',
      'XML to CSV export',
      'XML spreadsheet converter'
    ],
    category: 'xml',
    url: 'xml-to-csv'
  },
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