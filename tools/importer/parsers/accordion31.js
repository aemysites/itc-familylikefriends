/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block name header row
  const headerRow = ['Accordion (accordion31)'];
  const rows = [headerRow];

  // Find all accordion items
  const accordionItems = element.querySelectorAll('.cmp-accordion__item');
  accordionItems.forEach((item) => {
    // Title: Find the button and its title span
    const button = item.querySelector('button');
    let title = null;
    if (button) {
      title = button.querySelector('.cmp-accordion__title') || button;
    }
    // Content: Find the panel and its content
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let content = null;
    if (panel) {
      // Defensive: grab all children of the panel, not just text
      // Usually the content is inside a .cmp-text or .text div
      const cmpText = panel.querySelector('.cmp-text') || panel.querySelector('.text');
      if (cmpText) {
        // Use the cmpText div directly (preserves formatting and children)
        content = cmpText;
      } else {
        // Fallback: use all children of panel
        content = document.createElement('div');
        Array.from(panel.childNodes).forEach((node) => {
          content.appendChild(node.cloneNode(true));
        });
      }
    }
    // Defensive: if no content, use empty string
    if (!content) content = '';
    // Defensive: if no title, use empty string
    if (!title) title = '';
    rows.push([title, content]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
