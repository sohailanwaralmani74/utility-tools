const tools = [
  {
    id: 1,
    icon: 'fa-font',
    title: 'Convert XLSX to JSON',
    description: 'Convert XLSX TO JSON Offline. Load the tool and disconnect.',
    tags: [
      'convert xlsx to json',
      'xlsx to json converter',
      'convert excel to json',
      'excel to json converter',
      'xls to json',
      'convert xls to json',
      'xlsx json conversion',
      'offline xlsx to json',
      'offline excel to json',
      'excel json export',
      'json export from excel'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-json'
  },
  {
    id: 2,
    icon: 'fa-font',
    title: 'Convert XLSX to TXT',
    description: 'Convert XLSX TO TXT Offline. Faster & Secure.',
    tags: [
      'convert xlsx to txt',
      'xlsx to text converter',
      'convert excel to txt',
      'excel txt export',
      'xls to txt',
      'convert xls to txt',
      'offline xlsx to txt',
      'offline excel to txt',
      'text export from excel',
      'excel to text conversion'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-txt'
  },
  {
    id: 3,
    icon: 'fa-font',
    title: 'Convert XLSX to PDF',
    description: 'Convert XLSX TO PDF Offline. Preview And Download.',
    tags: [
      'convert xlsx to pdf',
      'xlsx to pdf converter',
      'convert excel to pdf',
      'excel pdf export',
      'xls to pdf',
      'convert xls to pdf',
      'offline xlsx to pdf',
      'offline excel to pdf',
      'pdf export from excel',
      'excel pdf conversion'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-pdf'
  },
  {
    id: 4,
    icon: 'fa-font',
    title: 'Convert XLSX to HTML',
    description: 'Convert XLSX TO HTML. Export To HTML File.',
    tags: [
      'convert xlsx to html',
      'xlsx to html converter',
      'convert excel to html',
      'excel html export',
      'xls to html',
      'convert xls to html',
      'offline xlsx to html',
      'offline excel to html',
      'html export from excel',
      'excel html conversion'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-html'
  },
  {
    id: 5,
    icon: 'fa-font',
    title: 'Convert XLSX to XML',
    description: 'Convert XLSX TO XML. Edit And Export To XML File.',
    tags: [
      'convert xlsx to xml',
      'xlsx to xml converter',
      'convert excel to xml',
      'excel xml export',
      'xls to xml',
      'convert xls to xml',
      'offline xlsx to xml',
      'offline excel to xml',
      'xml export from excel',
      'excel xml conversion'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-xml'
  },
  {
    id: 6,
    icon: 'fa-font',
    title: 'XLSX To SQL Converter',
    description: 'Convert XLSX TO SQL. Production Ready Conversion To SQL.',
    tags: [
      'convert xlsx to sql',
      'xlsx to sql converter',
      'convert excel to sql',
      'excel sql export',
      'xls to sql',
      'convert xls to sql',
      'offline xlsx to sql',
      'offline excel to sql',
      'sql export from excel',
      'excel sql conversion'
    ],
    category: 'excel',
    url: 'xlsx-to-sql-converter'
  },
  {
    id: 7,
    icon: 'fa-font',
    title: 'Convert XLSX To CSV',
    description: 'Convert XLSX TO CSV. Clean And Fast.',
    tags: [
      'convert xlsx to csv',
      'xlsx to csv converter',
      'convert excel to csv',
      'excel csv export',
      'xls to csv',
      'convert xls to csv',
      'offline xlsx to csv',
      'offline excel to csv',
      'csv export from excel',
      'excel csv conversion'
    ],
    category: 'excel',
    url: 'convert-xlsx-to-csv'
  },
  {
    id: 8,
    icon: 'fa-font',
    title: 'Global Excel Converter',
    description: 'All In One Excel Converter. Convert Excel, CSV To Any Format',
    tags: [
      'all in one excel converter',
      'excel file converter',
      'convert excel file',
      'csv to excel converter',
      'universal excel converter',
      'xls converter',
      'xlsx converter',
      'csv converter',
      'convert excel formats',
      'offline excel converter'
    ],
    category: 'excel',
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