const tools = [
  {
    id: 8,
    icon: 'fa-font',
    title: 'CSV To SQL Converter',
    description: 'Effortlessly convert CSV files to SQL format with our fast, offline CSV to SQL converter. Generate production-ready SQL scripts for database import with ease and security.',
    tags: [
      'CSV to SQL',
      'CSV to SQL converter',
      'convert CSV to SQL',
      'SQL script generator',
      'offline CSV converter',
      'CSV database import',
      'CSV to SQL offline',
      'CSV to SQL export'
    ],
    category: 'csv',
    url: 'csv-to-sql'
  },
  {
    id: 9,
    icon: 'fa-font',
    title: 'Convert CSV to TXT',
    description: 'Quickly convert CSV files to plain text (TXT) offline. Secure, private, and easy to use CSV to TXT converter with no upload required.',
    tags: [
      'CSV to TXT',
      'CSV to text converter',
      'convert CSV to TXT',
      'CSV to plain text',
      'offline CSV converter',
      'CSV text export',
      'CSV to TXT offline'
    ],
    category: 'csv',
    url: 'convert-csv-to-txt'
  },
  {
    id: 10,
    icon: 'fa-font',
    title: 'Convert CSV to PDF',
    description: 'Transform your CSV data into clean, tabular PDF files instantly. Offline CSV to PDF converter offering fast, secure document export with easy preview and download.',
    tags: [
      'CSV to PDF',
      'CSV to PDF converter',
      'convert CSV to PDF',
      'CSV table PDF',
      'offline CSV converter',
      'CSV to PDF export',
      'CSV PDF offline'
    ],
    category: 'csv',
    url: 'convert-csv-to-pdf'
  },
  {
    id: 11,
    icon: 'fa-font',
    title: 'Convert CSV to HTML',
    description: 'Convert CSV files to fully editable HTML tables offline. Export CSV data to responsive HTML format perfect for web usage, with no uploads needed.',
    tags: [
      'CSV to HTML',
      'CSV to HTML converter',
      'convert CSV to HTML',
      'CSV table HTML',
      'offline CSV converter',
      'CSV to web table',
      'CSV HTML export'
    ],
    category: 'csv',
    url: 'convert-csv-to-html'
  },
  {
    id: 12,
    icon: 'fa-font',
    title: 'Convert CSV to XML',
    description: 'Easily convert CSV files into XML format offline. Our CSV to XML converter lets you export structured XML data securely and quickly without internet connection.',
    tags: [
      'CSV to XML',
      'CSV to XML converter',
      'convert CSV to XML',
      'CSV XML export',
      'offline CSV converter',
      'CSV to XML format',
      'CSV XML offline'
    ],
    category: 'csv',
    url: 'convert-csv-to-xml'
  },
  {
    id: 13,
    icon: 'fa-font',
    title: 'Convert CSV to Excel',
    description: 'Convert CSV files to Excel XLS or XLSX formats offline. Edit and export your spreadsheet data safely with this fast, user-friendly CSV to Excel converter.',
    tags: [
      'CSV to Excel',
      'CSV to XLS',
      'CSV to XLSX',
      'convert CSV to Excel',
      'offline CSV converter',
      'CSV Excel export',
      'CSV spreadsheet converter'
    ],
    category: 'csv',
    url: 'convert-csv-to-excel'
  },
  {
    id: 14,
    icon: 'fa-font',
    title: 'CSV Converter',
    description: 'Universal CSV converter to transform CSV files into multiple formats including Excel, SQL, XML, PDF, and TXT. Fully offline and secure tool for seamless data conversion.',
    tags: [
      'CSV converter',
      'convert CSV',
      'CSV to Excel',
      'CSV to SQL',
      'CSV to XML',
      'CSV to PDF',
      'CSV to TXT',
      'offline CSV converter',
      'universal CSV converter'
    ],
    category: 'universal',
    url: 'excel-csv-converter'
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