document.addEventListener('DOMContentLoaded', function() {
    const inputA = document.getElementById('input-a');
    const inputB = document.getElementById('input-b');
    const compareBtn = document.getElementById('compare-btn');
    const swapBtn = document.getElementById('swap-btn');
    const clearBtn = document.getElementById('clear-btn');
    const modeSelect = document.getElementById('mode-select');
    const diffResults = document.getElementById('diff-results');
    const charCounts = document.querySelectorAll('.char-count');

    // Update character counts
    function updateCounts() {
        charCounts[0].textContent = `${inputA.value.length} chars`;
        charCounts[1].textContent = `${inputB.value.length} chars`;
    }

    // Diff implementation
    function compareContent() {
        const mode = modeSelect.value;
        const textA = inputA.value;
        const textB = inputB.value;

        if (!textA || !textB) {
            diffResults.innerHTML = '<p>Please enter content in both fields</p>';
            return;
        }

        try {
            if (mode === 'json') {
                const objA = JSON.parse(textA);
                const objB = JSON.parse(textB);
                diffResults.innerHTML = compareObjects(objA, objB);
            } else if (mode === 'csv') {
                diffResults.innerHTML = compareCSV(textA, textB);
            } else {
                diffResults.innerHTML = compareText(textA, textB);
            }
        } catch (e) {
            diffResults.innerHTML = `<p class="error">Error: ${e.message}</p>`;
        }
    }

    // Text diff
    function compareText(textA, textB) {
        const linesA = textA.split('\n');
        const linesB = textB.split('\n');
        let html = '';

        const maxLines = Math.max(linesA.length, linesB.length);
        
        for (let i = 0; i < maxLines; i++) {
            const lineA = linesA[i] || '';
            const lineB = linesB[i] || '';
            
            if (lineA === lineB) {
                html += `<div>${escapeHtml(lineA)}</div>`;
            } else {
                html += `<div class="diff-changed">
                    <span class="diff-removed">${escapeHtml(lineA)}</span><br>
                    <span class="diff-added">${escapeHtml(lineB)}</span>
                </div>`;
            }
        }
        
        return html;
    }

    // Helper functions
    function escapeHtml(text) {
        return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    // Event listeners
    inputA.addEventListener('input', updateCounts);
    inputB.addEventListener('input', updateCounts);
    compareBtn.addEventListener('click', compareContent);
    
    swapBtn.addEventListener('click', function() {
        const temp = inputA.value;
        inputA.value = inputB.value;
        inputB.value = temp;
        updateCounts();
    });
    
    clearBtn.addEventListener('click', function() {
        inputA.value = '';
        inputB.value = '';
        diffResults.innerHTML = '';
        updateCounts();
    });

    // Initialize
    updateCounts();
});