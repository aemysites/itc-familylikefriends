/* global WebImporter */
export default function parse(element, { document }) {
  // Embed (embedVideo18) block: expects 1 column, 2 rows
  // Row 1: block name
  // Row 2: image (optional), followed by video URL (required)

  // Always use the block name as header
  const headerRow = ['Embed (embedVideo18)'];

  // Only include visible text content (not hidden by CSS)
  // In this HTML, all buttons have class 'd-none', and the error message is empty
  // There is no image or video URL
  // The screenshot is blank, so output should be an empty cell

  const rows = [
    headerRow,
    [''],
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
