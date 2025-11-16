/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion26)'];

  // Find all accordion items
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item'));

  // Build rows for each accordion item
  const rows = items.map(item => {
    // Title: Look for .cmp-accordion__title inside button
    const button = item.querySelector('button.cmp-accordion__button');
    let title = button ? button.querySelector('.cmp-accordion__title') : null;
    // Defensive: fallback to button text if .cmp-accordion__title missing
    if (!title && button) {
      title = document.createElement('span');
      title.textContent = button.textContent.trim();
    }

    // Content: Look for the panel
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    // Defensive: If panel exists, use its children (usually a .cmp-text block)
    let content = null;
    if (panel) {
      // If the panel contains a .cmp-text, use it directly
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        content = cmpText;
      } else {
        // Otherwise, use all panel children
        content = Array.from(panel.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
        // If only one element, use it directly
        if (content.length === 1) content = content[0];
      }
    }
    // Defensive: If no content, use empty string
    if (!content) content = '';

    return [title, content];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
