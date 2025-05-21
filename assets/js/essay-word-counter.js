const fileInput = document.getElementById('fileInput');
const textInput = document.getElementById('textInput');

function debounce(fn, wait = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  }

  // Unified, debounced handler

  const onChange = debounce(text => processData(text), 300);



fileInput.addEventListener('change', e => {
  const file = e.target.files[0];
  if (file && file.type === 'text/plain') {
    const reader = new FileReader();
    reader.onload = () => {
        textInput.value = reader.result;
        processData(reader.result);
      };
    reader.readAsText(file);
  } else {
    alert('Please upload a valid .txt file.');
  }
});

  // Listen for typing/paste
  textInput.addEventListener('input', e => {
    onChange(e.target.value);
  });

// sample handler—replace with your real async calls
function processData(text) {
    analyzeCounts(text);
    analyzeCapitalization(text);
    analyzePunctuation(text);
    analyzeSentenceStats(text);
    analyzeLexicalStats(text);
    populateFrequencyListFromText(text);
    calculateTimeEstimates(text);
  }


  /////////////////  Find Count ////////////////

async function analyzeCounts(text) {
    
    await Promise.resolve(); // yield once so UI stays responsive
    const words = (text.match(/\b\w+\b/g) || []).length;
    const chars = text.length;
    const sentences = (text.match(/[^\.!?]+[\.!?]+/g) || []).length;
    const paragraphs = (text.split(/\n{2,}/) || []).filter(p => p.trim()).length;
    const lines = (text.split(/\n/)).length;
    const spaces = (text.match(/ /g) || []).length;
    const uniques = new Set(text.match(/\b\w+\b/g) || []).size;
    const pages = Math.ceil(words / 300); // e.g. 300 wpd

    document.getElementById('wordCount').textContent = words;
    document.getElementById('charCount').textContent = chars;
    document.getElementById('sentenceCount').textContent = sentences;
    document.getElementById('uniqueWords').textContent = uniques;
    document.getElementById('paragraphs').textContent = paragraphs;
    document.getElementById('lines').textContent = lines;
    document.getElementById('spaces').textContent = spaces;
    document.getElementById('pageEstimates').textContent = pages;
    
  }

  ///////////////  Find Punctuation Counts ////////////////

async function analyzePunctuation(text) {
    await Promise.resolve(); // yield once so UI stays responsive
  
    const counts = {
      period:             (text.match(/\./g) || []).length,
      comma:              (text.match(/,/g) || []).length,
      questionMark:       (text.match(/\?/g) || []).length,
      colon:              (text.match(/:/g) || []).length,
      semicolon:          (text.match(/;/g) || []).length,
      apostrophe:         (text.match(/'/g) || []).length,
      quotationMarks:     (text.match(/["“”]/g) || []).length,
      hyphen:             (text.match(/-/g) || []).length,
      dash:               (text.match(/—/g) || []).length,
      parentheses:        (text.match(/[()]/g) || []).length,
      brackets:           (text.match(/[\[\]]/g) || []).length,
      braces:             (text.match(/[{}]/g) || []).length,
      slash:              (text.match(/\//g) || []).length,
      backslash:          (text.match(/\\/g) || []).length,
      exclamationMarks:   (text.match(/!/g) || []).length,
      ellipsis:           (text.match(/\.{3}/g) || []).length
    };
  
    // update the UI: expects elements like <span id="periodCount"></span>
    for (const [key, val] of Object.entries(counts)) {
      const el = document.getElementById(`${key}Count`);
      if (el) el.textContent = val;
    }
  }

  
//////////////////////////    populate Frequency              /////////////


function calculateWordFrequencies(text) {
    const wordCounts = {};
    const words = text
      .toLowerCase()
      .match(/\b[a-zA-Z']+\b/g); // Matches words with optional apostrophes
  
    if (!words) return wordCounts;
  
    words.forEach(word => {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    });
  
    return wordCounts;
  }
  
  function populateFrequencyListFromText(text) {
    const wordData = calculateWordFrequencies(text);
    const scroller = document.getElementById('frequency-scroller');
  
    // Clear existing items
    scroller.innerHTML = '';
  
    // Sort and get top 10 words
    const sortedWords = Object.entries(wordData)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  
    // Create elements
    sortedWords.forEach(([word, count]) => {
      const item = document.createElement('div');
      item.className = 'word-item';
      item.innerHTML = `
        <span class="word-text">${word}</span>
        <span class="word-count">${count}</span>
      `;
      scroller.appendChild(item);
    });
  }
    

  //////////////////////////      Capitalization Mistakes ///////

async function analyzeCapitalization(text) {
    const mistakes = findCapitalizationMistakes(text);
    displayMistakes(mistakes);
}

function findCapitalizationMistakes(text) {
    const mistakes = [];
    const lines = text.split('\n');

    lines.forEach((line, lineIndex) => {
        if (!line.trim()) return;

        const words = line.split(/(\s+)/);
        let wordPosition = 0;
        let lastIndex = 0; // Tracks character position to avoid repeated .indexOf issues

        words.forEach((word) => {
            if (!word.trim()) return;

            const charIndex = line.indexOf(word, lastIndex); // Get exact position of current word
            lastIndex = charIndex + word.length;

            wordPosition++;
            const expected = getExpectedCapitalization(word, charIndex, line);
            if (expected && word !== expected) {
                mistakes.push({
                    incorrect: word,
                    corrected: expected,
                    line: lineIndex + 1,
                    position: wordPosition
                });
            }
        });
    });

    return mistakes;
}

function getExpectedCapitalization(word, wordStartIndex, line) {
    // Skip words that are already capitalized or all caps
    if (/^[A-Z]/.test(word) || word === word.toUpperCase()) {
        return null;
    }

    const textBefore = line.substring(0, wordStartIndex);

    // Rule 1: Word is first in line
    const isFirstWord = wordStartIndex === 0;

    // Rule 2: Word follows a sentence terminator (., !, ?)
    const afterSentenceTerminator = /[.!?]["')\]]?\s*$/.test(textBefore);

    // Rule 3: lowercase 'i' as pronoun
    const isLowercasePronoun = word.toLowerCase() === "i" && word === "i";

    if (isFirstWord || afterSentenceTerminator || isLowercasePronoun) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    return null;
}

function displayMistakes(mistakes) {
    const container = document.getElementById('capitalization-issues');
    container.innerHTML = '';

    if (mistakes.length === 0) {
        container.innerHTML = '<div class="no-issues">No capitalization issues found!</div>';
        return;
    }

    mistakes.sort((a, b) => a.line - b.line || a.position - b.position)
           .forEach(mistake => {
        const card = document.createElement('div');
        card.className = 'issue-card';
        card.innerHTML = `
            <div class="issue-text">
                <span class="incorrect">${mistake.incorrect}</span>
                <span>→</span>
                <span class="correct">${mistake.corrected}</span>
            </div>
            <div class="issue-location">
                Line ${mistake.line}, Pos ${mistake.position}
                <button class="jump-btn" 
                        onclick="jumpToError(${mistake.line}, ${mistake.position})">
                    ↗ Jump
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function jumpToError(lineNumber, position) {
    const textarea = document.getElementById('textInput');
    const lines = textarea.value.split('\n');
    
    // Calculate character position
    let charCount = 0;
    for (let i = 0; i < lineNumber - 1; i++) {
        charCount += lines[i].length + 1; // +1 for newline
    }

    // Find the word position in the line
    const lineWords = lines[lineNumber - 1].split(/\s+/);
    for (let i = 0; i < position - 1; i++) {
        charCount += lineWords[i].length + (i > 0 ? 1 : 0); // Add space if not first word
    }

    // Focus and select
    textarea.focus();
    textarea.setSelectionRange(charCount, charCount + lineWords[position - 1].length);
    textarea.scrollTop = textarea.scrollHeight * ((lineNumber - 1) / lines.length);
}

/////////////////  Analyze Sentence Stats ///////////////////

async function analyzeSentenceStats(text) {
    await Promise.resolve(); // Let UI remain responsive
  
    const rawSentences = text.match(/[^\.!?]+[\.!?]+/g) || [];
    const sentences = rawSentences.map(s => s.trim()).filter(s => s.length);
  
    if (sentences.length === 0) {
      // Reset UI
      document.getElementById('LongestSentence').textContent = '-';
      document.getElementById('longestSentenceLeangth').textContent = '0';
      document.getElementById('shortestSentence').textContent = '-';
      document.getElementById('shortestSentenceLeangth').textContent = '0';
      document.getElementById('averageSentenceCharacters').textContent = '0';
      document.getElementById('averageSentenceWords').textContent = '0';
      ['oneToFive','sixToTen','elevenToFifteen','sixteenToTwenty','twentyOnePlus']
        .forEach(id => document.getElementById(id).textContent = '0');
      return;
    }
  
    // Collect sentence data
    const stats = sentences.map(s => {
      const words = (s.match(/\b\w+\b/g) || []).length;
      const chars = s.length;
      return { text: s, words, chars };
    });
  
    // Longest & Shortest (by word count)
    const longest = stats.reduce((a, b) => b.words > a.words ? b : a);
    const shortest = stats.reduce((a, b) => b.words < a.words ? b : a);
  
    // Averages
    const totalChars = stats.reduce((sum, s) => sum + s.chars, 0);
    const totalWords = stats.reduce((sum, s) => sum + s.words, 0);
    const avgChars = (totalChars / stats.length).toFixed(2);
    const avgWords = (totalWords / stats.length).toFixed(2);
  
    // Distribution
    const dist = { oneToFive: 0, sixToTen: 0, elevenToFifteen: 0, sixteenToTwenty: 0, twentyOnePlus: 0 };
    stats.forEach(s => {
      if (s.words <= 5) dist.oneToFive++;
      else if (s.words <= 10) dist.sixToTen++;
      else if (s.words <= 15) dist.elevenToFifteen++;
      else if (s.words <= 20) dist.sixteenToTwenty++;
      else dist.twentyOnePlus++;
    });
  
    // Update UI
    document.getElementById('LongestSentence').textContent = longest.text;
    document.getElementById('longestSentenceLeangth').textContent = longest.words;
  
    document.getElementById('shortestSentence').textContent = shortest.text;
    document.getElementById('shortestSentenceLeangth').textContent = shortest.words;
  
    document.getElementById('averageSentenceCharacters').textContent = avgChars;
    document.getElementById('averageSentenceWords').textContent = avgWords;
  
    document.getElementById('oneToFive').textContent = dist.oneToFive;
    document.getElementById('sixToTen').textContent = dist.sixToTen;
    document.getElementById('elevenToFifteen').textContent = dist.elevenToFifteen;
    document.getElementById('sixteenToTwenty').textContent = dist.sixteenToTwenty;
    document.getElementById('twentyOnePlus').textContent = dist.twentyOnePlus;
  }
  
  ///////////   Lexical Analysis //////////////////

  function analyzeLexicalStats(text) {
    const words = (text.match(/\b\w+\b/g) || []).map(w => w.toLowerCase());
    const totalWords = words.length;
    const uniqueWords = new Set(words);
    const totalChars = words.reduce((sum, w) => sum + w.length, 0);
  
    // Average word length
    const avgWordLength = totalWords === 0 ? 0 : (totalChars / totalWords).toFixed(2);
  
    // Syllable count (very rough estimate)
    const syllableCount = words.reduce((sum, word) => sum + countSyllables(word), 0);
  
    // Lexical Density: content words (non-stopwords) / total words
    const stopWords = new Set([
      "a", "an", "the", "in", "on", "at", "of", "for", "with", "is", "are", "was", "were", "be", "been", "has", "had",
      "to", "do", "did", "does", "by", "and", "or", "but", "so", "because", "than", "as", "if", "then", "from", "that"
    ]);
    const stopWordsCount = words.filter(w => stopWords.has(w)).length;
    const contentWordsCount = totalWords - stopWordsCount;
    const lexicalDensity = totalWords === 0 ? 0 : ((contentWordsCount / totalWords) * 100).toFixed(2);
  
    // Filler Words Count
    const fillerWordsSet = new Set(["like", "you know", "basically", "actually", "literally", "just", "sort of", "kind of"]);
    const fillerWordsCount = words.filter(w => fillerWordsSet.has(w)).length;
  
    // Type-Token Ratio
    const ttr = totalWords === 0 ? 0 : (uniqueWords.size / totalWords).toFixed(2);
  
    // Hapax Legomena
    const freqMap = {};
    words.forEach(w => freqMap[w] = (freqMap[w] || 0) + 1);
    const hapaxList = Object.keys(freqMap).filter(w => freqMap[w] === 1);

    const stopWordsUsed = [...new Set(words.filter(w => stopWords.has(w)))];
    const fillerUsed = [...new Set(Array.from(fillerWordsSet).filter(p => new RegExp(`\\b${p}\\b`, 'i').test(text)))];

  
  
    // Longest Word
    let longestWord = '';
    words.forEach(w => {
      if (w.length > longestWord.length) longestWord = w;
    });
  
    // Update DOM
    document.getElementById('sykkableCount').textContent = syllableCount;
    document.getElementById('averageWordLength').textContent = avgWordLength;
    document.getElementById('lexicalDenisty').textContent = lexicalDensity + '%';
  
    document.getElementById('ttr').textContent = ttr;
    document.getElementById('fillerWordsCount').textContent = fillerWordsCount;
    document.getElementById('stopWordsCount').textContent = stopWordsCount;
  
    document.getElementById('hapaxLegomenaLeangth').textContent = hapaxList.length;
    document.getElementById('hapaxLegomena').textContent = hapaxList.join(", ");
  
    document.getElementById('longestWord').textContent = longestWord || '-';
    document.getElementById('longestWordChar').textContent = longestWord.length || '0';

    document.getElementById('stopWordsUsedCount').textContent = stopWordsUsed.length;
    document.getElementById('stopWords').textContent = stopWordsUsed.length > 0 ? stopWordsUsed.join(', ') : '-';

    document.getElementById('fillerWordsUsedCount').textContent = fillerUsed.length;
    document.getElementById('fillerWords').textContent = fillerUsed.length > 0 ? fillerUsed.join(', ') : '-';
  }
  
  // Helper: estimate syllables in a word
  function countSyllables(word) {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    const syllables = word.match(/[aeiouy]{1,2}/g);
    return (syllables || []).length || 1;
  }
  
  ////////////////////// Time estimations ////////////

  function calculateTimeEstimates(text) {
    const wordCount = (text.match(/\b[a-zA-Z']+\b/g) || []).length;
  
    const timeEstimates = {
      readingTime: wordCount / 200,
      speakingTime: wordCount / 130,
      typingTime: wordCount / 40,
      handwritingTime: wordCount / 20,
      proofreadingTime: wordCount / 100,
      translationTime: wordCount / 30,
    };
  
    // Round to 1 decimal and add "min"
    Object.keys(timeEstimates).forEach(key => {
      const minutes = timeEstimates[key];
      document.getElementById(key).textContent = minutes < 1
        ? `${Math.ceil(minutes * 60)} sec`
        : `${minutes.toFixed(1)} min`;
    });
  }
  
  ///////////////////////   Export Functions  /////////////////////////

  // Export as TXT
function exportToTXT() {
    const text = textInput.value;
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.download = 'text-analysis.txt';
    link.href = URL.createObjectURL(blob);
    link.click();
}

// Export as Word (DOCX) using Blob and HTML content
function exportToWord() {
    const header = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office' 
              xmlns:w='urn:schemas-microsoft-com:office:word' 
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head><meta charset='utf-8'><title>Export HTML to Word Document</title></head><body>`;
    const footer = "</body></html>";
    const content = `<pre>${textInput.value}</pre>`;
    const sourceHTML = header + content + footer;

    const blob = new Blob(['\ufeff', sourceHTML], {
        type: 'application/msword'
    });

    const link = document.createElement("a");
    link.download = "text-analysis.doc";
    link.href = URL.createObjectURL(blob);
    link.click();
}

// Export as PDF using jsPDF (requires library)
function exportToPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const text = textInput.value;
    
    const margin = 10;
    const maxLineWidth = 180; // in mm
    const lines = doc.splitTextToSize(text, maxLineWidth);
    doc.text(lines, margin, margin + 10);
    doc.save("text-analysis.pdf");
}