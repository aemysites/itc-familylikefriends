/* global WebImporter */
export default function parse(element, { document }) {
  // Defensive: Only proceed if the element contains an image (background)
  const img = element.querySelector('img');

  // Build the header row as required
  const headerRow = ['Columns (columns11)'];

  // The block visually is a single column with a background image (the orange section is a background, not content)
  // The only real content in the HTML is the image, which is used as a background in the screenshot
  // Place the image in the second row, single column
  const contentRow = [img ? img : ''];

  // Compose the table
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
