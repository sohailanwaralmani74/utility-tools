const tools = [
    {
        id: 16,
        icon: 'fa-font',
        title: 'JSON To Excel Converter',
        description: 'Edit JSON , Preview And Convert JSON To Excel, Offline And Faster',
        tags: ['JSON To Excel', 'Convert JSON To Excel', 'JSON To XLSX', 'JSON To XLS'],
        category: 'JSON',
        url: 'json-to-excel'
    },
    {
        id: 17,
        icon: 'fa-font',
        title: 'JSON To CSV Converter',
        description: 'Edit JSON , Preview And Convert JSON To CSV',
        tags: ['JSON To CSV', 'Convert JSON To CSV', 'JSON To CSV Converter'],
        category: 'JSON',
        url: 'json-to-csv'
    },
    {
        id: 17,
        icon: 'fa-font',
        title: 'JSON To TXT Converter',
        description: 'Edit JSON , Preview And Convert JSON To TXT',
        tags: ['JSON To TXT', 'Convert JSON To TXT', 'JSON To TXT Converter'],
        category: 'JSON',
        url: 'json-to-txt'
    },
    {
        id: 18,
        icon: 'fa-font',
        title: 'JSON To HTML Converter',
        description: 'Edit JSON , Preview And Convert JSON To HTML',
        tags: ['JSON To HTML', 'Convert JSON To HTML', 'JSON To HTML Converter'],
        category: 'JSON',
        url: 'json-to-html'
    },
    {
        id: 19,
        icon: 'fa-font',
        title: 'JSON To PDF Converter',
        description: 'Edit JSON , Preview And Convert JSON To PDF',
        tags: ['JSON To PDF', 'Convert JSON To PDF', 'JSON To PDF Converter'],
        category: 'JSON',
        url: 'json-to-pdf'
    },
    {
        id: 20,
        icon: 'fa-font',
        title: 'JSON To XML Converter',
        description: 'Edit JSON , Preview And Convert JSON To XML. Edit XML and Export',
        tags: ['JSON To XML', 'Convert JSON To XML', 'JSON To XML Converter'],
        category: 'JSON',
        url: 'json-to-xml'
    },
    {
        id: 21,
        icon: 'fa-font',
        title: 'JSON To SQL Converter',
        description: 'Edit JSON , Preview And Convert JSON To SQL. Production Ready SQL',
        tags: ['JSON To SQL', 'Convert JSON To SQL', 'JSON To SQL Converter'],
        category: 'JSON',
        url: 'json-to-sql'
    },
    {
        id: 22,
        icon: 'fa-font',
        title: 'Uinversal JSON Converter',
        description: 'Edit And Convert JSON to CSV, XLSX, XLS, TXT, HTML, PDF, XML, or SQL formats',
        tags: ['JSON Converter', 'JSON Format Converter', 'JSON Editor'],
        category: 'JSON',
        url: 'json-converter'
    },
    {
        id: 23,
        icon: 'fa-code',
        title: 'JSON String to JSON Object Converter',
        description: 'Instantly convert any JSON string to a fully formatted JSON object. Copy or download the converted object for your projects.',
        tags: ['JSON String to Object', 'JSON Parser', 'JSON Formatter', 'String to JSON Online'],
        category: 'JSON',
        url: 'json-string-to-json-object'
    },
    {
        id: 24,
        icon: 'fa-sitemap',
        title: 'JSON to JSON Schema Converter',
        description: 'Convert any JSON object to a valid JSON Schema online. Generate, copy, or download schemas instantly for API validation or data contracts.',
        tags: ['JSON to JSON Schema', 'Convert JSON to Schema', 'JSON Schema Generator', 'JSON to JSON Schema Online'],
        category: 'JSON',
        url: 'json-to-json-schema'
    },
{
    id: 25,
    icon: 'fa-code',
    title: 'JSON to Dart Converter',
    description: 'Quickly convert any JSON object or string into fully structured Dart models online. Supports null safety, private fields, default values, and generates ready-to-use classes for Flutter and Dart applications.',
    tags: ['JSON to Dart Converter', 'JSON to Dart Model', 'JSON to Dart Null Safety', 'JSON to Dart Class', 'JSON to Dart Online', 'JSON to Dart Flutter', 'JSON to Dart Freezed', 'JSON to Dart QuickType'],
    category: 'JSON',
    url: 'json-to-dart'
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