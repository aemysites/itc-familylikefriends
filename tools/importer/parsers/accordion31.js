/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion31)'];
  const rows = [headerRow];

  // Find all accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');

  items.forEach((item) => {
    // Title: Find the button with the title span
    const button = item.querySelector('button');
    let titleContent = '';
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        titleContent = titleSpan.textContent.trim();
      } else {
        titleContent = button.textContent.trim();
      }
    }
    // Title cell as plain string
    const titleCell = titleContent;

    // Content: Find the panel content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = '';
    if (panel) {
      // If the panel contains a .cmp-text, use all its children
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        contentCell = Array.from(cmpText.childNodes);
      } else {
        contentCell = Array.from(panel.childNodes);
      }
      if (!contentCell.length) contentCell = '';
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Fix: Ensure header row spans two columns for valid table structure
  if (block && block.querySelector('tr')) {
    const firstRow = block.querySelector('tr');
    const firstCell = firstRow && firstRow.firstElementChild;
    if (firstCell) {
      firstCell.setAttribute('colspan', '2');
    }
  }

  // Replace the original element
  element.replaceWith(block);
}
