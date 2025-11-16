/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion25)'];
  const rows = [headerRow];

  // Select all accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');

  items.forEach((item) => {
    // Title cell: extract plain text from the title span
    const titleSpan = item.querySelector('.cmp-accordion__title');
    const titleText = titleSpan ? titleSpan.textContent.trim() : '';

    // Content cell: get all content from the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = '';
    if (panel) {
      const textBlock = panel.querySelector('.text');
      if (textBlock) {
        contentCell = Array.from(textBlock.children);
      } else {
        contentCell = Array.from(panel.children);
      }
    }
    rows.push([titleText, contentCell]);
  });

  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
