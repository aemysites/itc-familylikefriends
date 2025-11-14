/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion13)'];

  // Find all accordion items (cmp-accordion__item)
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item'));
  const rows = [headerRow];

  items.forEach((item) => {
    // Title cell: Find the button and its title span
    const button = item.querySelector('button');
    let titleCell = '';
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      // Use the actual DOM node for semantic preservation
      titleCell = titleSpan ? titleSpan : button;
    } else {
      // Defensive fallback: get header text
      const header = item.querySelector('.cmp-accordion__header');
      titleCell = header ? header : '';
    }

    // Content cell: Find the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = '';
    if (panel) {
      // Use the panel's content directly (reference, not clone)
      contentCell = panel;
    }

    // Only add row if both cells have content
    if (titleCell && contentCell) {
      rows.push([titleCell, contentCell]);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
