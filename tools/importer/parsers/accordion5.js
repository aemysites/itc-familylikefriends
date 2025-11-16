/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion5)'];

  // Defensive: find the button that acts as the accordion header
  const button = element.querySelector('button');
  let titleCell = '';
  if (button) {
    // The title is inside a span with class 'cmp-accordion__title'
    const titleSpan = button.querySelector('.cmp-accordion__title');
    if (titleSpan) {
      titleCell = titleSpan;
    } else {
      // fallback: use button text
      titleCell = document.createTextNode(button.textContent.trim());
    }
  }

  // Defensive: find the panel that contains the content
  let contentCell = '';
  const panel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  if (panel) {
    // Use the panel's content (could be a div.text or similar)
    // We'll reference the whole panel for resilience
    contentCell = panel;
  }

  // Build table rows: first row is header, second row is [title, content]
  const rows = [
    headerRow,
    [titleCell, contentCell]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
