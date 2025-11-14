/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero9)'];

  // There is no image in this block (row 2 is empty)
  const imageRow = [''];

  // Row 3: Collect all text content (including headings, paragraphs, etc.)
  // More flexible: get all direct <h2>, <h1>, <h3>, <p> inside the block
  const textContentElements = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p'));
  let textRowContent;
  if (textContentElements.length > 0) {
    // If there's only one, use it directly; if more, wrap in a fragment
    if (textContentElements.length === 1) {
      textRowContent = textContentElements[0];
    } else {
      const fragment = document.createElement('div');
      textContentElements.forEach(el => fragment.appendChild(el.cloneNode(true)));
      textRowContent = fragment;
    }
  } else {
    textRowContent = '';
  }
  const textRow = [textRowContent];

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
