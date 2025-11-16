/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name
  const headerRow = ['Accordion (accordion13)'];
  const rows = [headerRow];

  // Find all accordion items
  const items = element.querySelectorAll('.cmp-accordion__item');
  items.forEach((item) => {
    // Title: get the text or span from the button
    let title = '';
    const button = item.querySelector('button');
    if (button) {
      const titleSpan = button.querySelector('.cmp-accordion__title');
      title = titleSpan ? titleSpan.textContent.trim() : button.textContent.trim();
    }
    // Content: get the panel content (all children as a fragment)
    let content = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Create a fragment with all children
      const frag = document.createDocumentFragment();
      Array.from(panel.children).forEach(child => frag.appendChild(child.cloneNode(true)));
      content = frag;
    }
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Fix: ensure header row spans two columns (must be set on the first row's cell)
  const firstRow = block.querySelector('tr:first-child');
  if (firstRow && firstRow.children.length === 1) {
    firstRow.children[0].setAttribute('colspan', '2');
  }
  // Replace the original element
  element.replaceWith(block);
}
