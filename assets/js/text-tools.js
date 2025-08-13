const tools = [
    {
        id: 1,
        icon: 'fa-font',
        title: 'Word Counter & Text Analyzer',
        description: 'Free online word counter and text analyzer tool to count words, characters, sentences, and paragraphs. Check punctuation, detect keyword density, and perform lexical analysis for SEO and writing improvement.',
        tags: [
            'Word Counter',
            'Text Analyzer',
            'Lexical Analysis',
            'Character Counter',
            'Sentence Counter',
            'Paragraph Counter',
            'Keyword Density Checker',
            'Text Statistics'
        ],
        category: 'text',
        url: 'word-counter'
    },
    {
        id: 2,
        icon: 'fa-font',
        title: 'Diff Checker – Compare Text & Files',
        description: 'Quickly compare two text blocks or files with our free online diff checker. Highlight differences, track changes, and compare code, documents, or data with ease.',
        tags: [
            'Diff Checker',
            'Difference Checker',
            'Text Difference Tool',
            'Check File Difference',
            'Compare Text Online',
            'Code Compare Tool',
            'Document Compare',
            'Text Compare Utility'
        ],
        category: 'text',
        url: 'diff-checker'
    },
    {
        id: 3,
        icon: 'fa-font',
        title: 'Markdown (MD) Editor with Live Preview',
        description: 'Powerful Markdown editor with real-time preview. Create and edit README.md files, add tables, code blocks, and formatting. Works offline and is completely free.',
        tags: [
            'MD Editor',
            'Best Markdown Editor',
            'Markdown Editor Online',
            'Editor for README.md',
            'Markdown Table Generator',
            'Markdown Code Block',
            'Markdown Preview Tool',
            'Offline Markdown Editor'
        ],
        category: 'text',
        url: 'best-md-editor'
    },
    {
        id: 4,
        icon: 'fa-font',
        title: 'Lorem Ipsum / Lrem Ipsum Generator',
        description: 'Generate lorem ipsum or lrem ipsum placeholder text instantly for design and content mockups. Customize length by paragraphs, sentences, or words. Perfect for web, print, and UI prototypes.',
        tags: [
            'Lorem Ipsum Generator',
            'Generate Lorem Ipsum',
            'Lrem Ipsum Generator',
            'Generate Lrem Ipsum',
            'Dummy Text Generator',
            'Placeholder Text Generator',
            'Random Text Generator',
            'Filler Text for Design'
        ],
        category: 'text',
        url: 'lorem-ipsum-generator'
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