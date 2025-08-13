document.addEventListener('DOMContentLoaded', function () {
    const markdownInput = document.getElementById('markdown-input');
    const previewContent = document.getElementById('preview-content');
    const charCount = document.getElementById('char-count');
    const togglePreview = document.getElementById('toggle-preview');
    const toolButtons = document.querySelectorAll('.tool-button[data-insert]');
    const downloadBtn = document.getElementById('download-md');
    const copyBtn = document.getElementById('copy-md');

    // Simple Markdown parser (replace with marked.js or similar for full features)
    function parseMarkdown(text) {
        // Basic replacements
        return text
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
            .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
            .replace(/\n/g, '<br>');
    }

    // Update preview
    function updatePreview() {
        previewContent.innerHTML = parseMarkdown(markdownInput.value);
        charCount.textContent = `${markdownInput.value.length} characters`;
    }

    // Initial preview update
    updatePreview();

    // Live preview
    markdownInput.addEventListener('input', updatePreview);

    // Toolbar buttons
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const insertText = button.getAttribute('data-insert');
            const startPos = markdownInput.selectionStart;
            const endPos = markdownInput.selectionEnd;
            const selectedText = markdownInput.value.substring(startPos, endPos);

            markdownInput.value =
                markdownInput.value.substring(0, startPos) +
                insertText.replace('selected', selectedText) +
                markdownInput.value.substring(endPos);

            // Focus back on the textarea
            markdownInput.focus();
            updatePreview();
        });
    });

    // Toggle preview pane
    togglePreview.addEventListener('click', () => {
        const previewPane = document.querySelector('.preview-pane');
        previewPane.style.display = previewPane.style.display === 'none' ? 'block' : 'none';
    });

    // Download Markdown
    downloadBtn.addEventListener('click', () => {
        const blob = new Blob([markdownInput.value], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.md';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Copy Markdown
    copyBtn.addEventListener('click', () => {
        markdownInput.select();
        document.execCommand('copy');
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    });

    document.getElementById('export-html').addEventListener('click', function () {
        // Get the generated HTML from your preview
        const htmlContent = document.getElementById('preview-content').innerHTML;
    
        // Create a complete HTML document with basic styling
        const fullHtml = `<!DOCTYPE html>
    <html>
    <head>
        <title>Exported Markdown</title>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: -apple-system, BlinkMacSystemFont, sans-serif;
                line-height: 1.6;
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                color: #333;
            }
            h1, h2, h3 {
                color: #2c3e50;
                margin-top: 1.5em;
            }
            pre {
                background: #f6f8fa;
                padding: 16px;
                border-radius: 4px;
                overflow: auto;
            }
            code {
                font-family: SFMono-Regular, Consolas, monospace;
                background: rgba(27,31,35,0.05);
                padding: 0.2em 0.4em;
                border-radius: 3px;
            }
            blockquote {
                border-left: 4px solid #4a6fa5;
                color: #6a737d;
                padding: 0 1em;
                margin: 0 0 16px 0;
            }
        </style>
    </head>
    <body>
    ${htmlContent}
    </body>
    </html>`;
    
        // Create and trigger download
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'markdown-export.html';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
});


