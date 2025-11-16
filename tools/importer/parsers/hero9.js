/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row for Hero (hero9)
  const headerRow = ['Hero (hero9)'];

  // Row 2: Background image (none in this case)
  const imageRow = [''];

  // Row 3: Only the main headline, as in the screenshot (no duplication, no extraneous elements)
  // Find the h2 inside .cmp-text (the actual headline)
  let headline = element.querySelector('.cmp-text h2');
  if (!headline) {
    // fallback: any h2 in the block
    headline = element.querySelector('h2');
  }
  let textCellContent;
  if (headline) {
    // clone the headline to preserve styling (e.g., colored span)
    textCellContent = headline.cloneNode(true);
  } else {
    // fallback: just use all text content
    const fallbackDiv = document.createElement('div');
    fallbackDiv.textContent = element.textContent.trim();
    textCellContent = fallbackDiv;
  }

  const textRow = [textCellContent];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}
