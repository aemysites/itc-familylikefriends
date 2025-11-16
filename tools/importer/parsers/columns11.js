/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns11)'];

  // Only extract content from the provided HTML, do not invent content
  // The HTML only contains an image
  const img = element.querySelector('img');
  const contentRow = [img ? img : ''];

  const cells = [
    headerRow,
    contentRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
