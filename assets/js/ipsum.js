// Lrem Ipsum Generator - Advanced Sentence-Based Version

const sentenceSources = {
  kafka: [
    "A first sign of understanding is the wish to die.",
    "I write differently than I talk.",
    "In the fight between you and the world, back the world.",
    "I am a cage, in search of a bird.",
    "Logic may indeed be unshakeable, but it cannot withstand a man who is determined to live."
  ],
  werther: [
    "I am proud of my heart alone, it is the sole source of everything.",
    "My own soul is the only prison I need.",
    "What is the world to our hearts without love?",
    "I have lost the sense of existence.",
    "He who is too much occupied with the affairs of the world neglects his own soul."
  ],
  lorem: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  ],
  cicero: [
    "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
    "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores."
  ],
  cicero_en: [
    "There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.",
    "To take a trivial example, which of us ever undertakes laborious physical exercise.",
    "Nor again is there anyone who loves or pursues or desires to obtain pain of itself.",
    "Because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
    "A wise man therefore always holds in these matters to this principle of selection."
  ],
  europan: [
    "Li Europan lingues es membres del sam familie.",
    "Lor separat existentie es un myth.",
    "Por scientie, musica, sport etc., li tot Europa usa li sam vocabularium.",
    "Li lingues differe solmen in li grammatica.",
    "Un nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues."
  ],
  europan_en: [
    "The European languages are members of the same family.",
    "Their separate existence is a myth.",
    "For science, music, sport, etc., Europe uses the same vocabulary.",
    "The languages only differ in their grammar.",
    "A new common language will be more simple and regular than the existing European languages."
  ],
  far: [
    "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.",
    "There live the blind texts.",
    "Separated they live in Bookmarksgrove right at the coast of the Semantics.",
    "A large language ocean.",
    "A small river named Duden flows by their place and supplies it with the necessary regelialia."
  ],
  pangram: [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "Jived fox nymph grabs quick waltz.",
    "Glib jocks quiz nymph to vex dwarf.",
    "Sphinx of black quartz, judge my vow."
  ],
  az: [
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    "abcdefghijklmnopqrstuvwxyz",
    "0123456789"
  ]
};

function generateParagraphs(sentencesArray, paraCount = 3, sentencesPerPara = 3) {
  const paragraphs = [];

  for (let i = 0; i < paraCount; i++) {
    const shuffled = [...sentencesArray].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, sentencesPerPara);
    paragraphs.push(selected.join(' '));
  }

  return paragraphs;
}

function generateCSSClass({
  fontFamily,
  fontStyle,
  fontWeight,
  fontSize,
  letterSpacing,
  lineHeight,
  textTransform,
  textDecoration,
  textAlign
}) {
  return `p {
  font-family: ${fontFamily};
  font-style: ${fontStyle};
  font-weight: ${fontWeight};
  font-size: ${fontSize};
  letter-spacing: ${letterSpacing};
  line-height: ${lineHeight};
  text-transform: ${textTransform};
  text-decoration: ${textDecoration};
  text-align: ${textAlign};
}`;
}

function wrapParagraphs(paragraphs, usePTags) {
  if (!usePTags) return paragraphs.join('\n\n');
  return paragraphs.map(p => `<p>${p}</p>`).join('\n\n\n');
}

// Export helpers
function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => alert('Copied!'));
}

// Hooking UI
window.onload = () => {
  const generateBtn = document.getElementById("generateBtn");
  const lremOutput = document.getElementById("lremOutput");
  const cssOutput = document.getElementById("cssOutput");

  generateBtn.onclick = () => {
    const sourceKey = document.getElementById("textSource").value;
    const paraCount = parseInt(document.getElementById("paragraphCount").value);
    const wordCount = parseInt(document.getElementById("wordCount").value);
    const wrapWithP = document.getElementById("wrapParagraphs").checked;

    const cssOptions = {
      fontFamily: document.getElementById("fontFamily").value,
      fontStyle: document.getElementById("fontStyle").value,
      fontWeight: document.getElementById("fontWeight").value,
      fontSize: document.getElementById("fontSize").value,
      letterSpacing: document.getElementById("letterSpacing").value,
      lineHeight: document.getElementById("lineHeight").value,
      textTransform: document.getElementById("textTransform").value,
      textDecoration: document.getElementById("textDecoration").value,
      textAlign: document.getElementById("textAlign").value
    };

    const paragraphs = generateParagraphs(sentenceSources[sourceKey] || sentenceSources.lorem, paraCount, Math.min(wordCount, 10));
    const wrappedText = wrapParagraphs(paragraphs, wrapWithP);
    const cssClass = generateCSSClass(cssOptions);

    lremOutput.value = wrappedText;
    cssOutput.value = cssClass;
  };

  document.getElementById("copyText").onclick = () => copyToClipboard(lremOutput.value);
  document.getElementById("copyCSS").onclick = () => copyToClipboard(cssOutput.value);

  document.getElementById("eportTxt").onclick = () => downloadFile("l0rem-ipsum.txt", lremOutput.value);
  document.getElementById("eportHtml").onclick = () => downloadFile("l0rem-ipsum.html", lremOutput.value);

  document.getElementById("exportCSSText").onclick = () => downloadFile("styles.txt", cssOutput.value);
  document.getElementById("exportCSSFile").onclick = () => downloadFile("styles.css", cssOutput.value);
};
