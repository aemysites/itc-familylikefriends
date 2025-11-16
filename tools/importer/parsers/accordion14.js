/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Accordion (accordion14)'];

  // Extract title from button > .cmp-accordion__title
  let title = '';
  const button = element.querySelector('button');
  if (button) {
    const titleSpan = button.querySelector('.cmp-accordion__title');
    if (titleSpan) {
      title = titleSpan.textContent.trim();
    }
  }

  // Extract content from .cmp-accordion__panel
  let content = '';
  const panel = element.querySelector('.cmp-accordion__panel');
  if (panel) {
    // Get all text content from all paragraphs inside the panel
    const paragraphs = Array.from(panel.querySelectorAll('p'));
    if (paragraphs.length) {
      content = paragraphs.map(p => p.textContent.trim()).join(' ');
    } else {
      content = panel.textContent.trim();
    }
  }

  // Compose table rows: header as single cell, then 2-column data row
  const cells = [];
  cells.push(headerRow); // single cell header row
  cells.push([title, content]); // 2-column data row

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
