/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Embed (embedVideo18)'];

  // Only include visible text content (ignore hidden elements)
  // In this HTML, all visible text is empty (h2 is empty, buttons are d-none)
  // So, the content row should be empty
  const contentRow = [''];

  // Build the table
  const cells = [
    headerRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
