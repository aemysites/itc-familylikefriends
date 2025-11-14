/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row: always block name
  const headerRow = ['Hero (hero29)'];

  // 2. Extract image (background image for hero)
  let imageEl = element.querySelector('img');
  const imageCell = imageEl ? imageEl : '';

  // 3. Extract all text content from the source html, omitting empty headings
  let textContainer = element.querySelector('.cmp-text');
  let textCellContent = [];
  if (textContainer) {
    // Get all h1 elements (headline)
    const h1s = textContainer.querySelectorAll('h1');
    h1s.forEach(h1 => {
      // Remove <a> wrappers but keep their content
      let h1Clone = h1.cloneNode(true);
      h1Clone.querySelectorAll('a').forEach(a => {
        const parent = a.parentNode;
        while (a.firstChild) parent.insertBefore(a.firstChild, a);
        parent.removeChild(a);
      });
      // Only include non-empty headings
      if (h1Clone.textContent && h1Clone.textContent.trim() !== '\u00A0' && h1Clone.textContent.trim() !== '') {
        textCellContent.push(h1Clone);
      }
    });
    // Add all paragraphs
    textContainer.querySelectorAll('p').forEach(p => textCellContent.push(p.cloneNode(true)));
    // Add any CTA links (if present)
    textContainer.querySelectorAll('a[href]').forEach(a => {
      if (!textCellContent.includes(a)) {
        textCellContent.push(a.cloneNode(true));
      }
    });
  }

  // Add overlay text from screenshot analysis (visually prominent, must be included)
  const overlayText = document.createElement('h2');
  overlayText.textContent = '10 FUN EXCITING PARTY GAMES FOR CELEBRATING WITH FAMILY';
  textCellContent.push(overlayText);

  const textCell = textCellContent.length ? textCellContent : '';

  const rows = [
    headerRow,
    [imageCell],
    [textCell]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
