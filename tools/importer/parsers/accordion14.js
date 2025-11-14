/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const headerRow = ['Accordion (accordion14)'];

  // Extract plain text title from the accordion header
  let titleText = '';
  const button = element.querySelector('button');
  if (button) {
    const titleSpan = button.querySelector('.cmp-accordion__title');
    if (titleSpan) {
      titleText = titleSpan.textContent.trim();
    }
  }

  // Extract only the paragraph content from the accordion panel
  let contentText = '';
  const panel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  if (panel) {
    const p = panel.querySelector('p');
    if (p) {
      contentText = p.textContent.trim();
    }
  }

  // Build rows: header, then [title, content] as plain text
  const rows = [
    headerRow,
    [titleText, contentText]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
