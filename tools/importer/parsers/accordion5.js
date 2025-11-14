/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion (accordion5) block parser
  // Header row as per guidelines
  const headerRow = ['Accordion (accordion5)'];

  // Defensive: Find the accordion header/title
  let titleEl = null;
  // Look for a button inside h3 (common pattern)
  const header = element.querySelector('.cmp-accordion__header');
  if (header) {
    const button = header.querySelector('button');
    if (button) {
      // The title is usually inside a span
      titleEl = button.querySelector('.cmp-accordion__title') || button;
    }
  }
  // Fallback: Try to find any button
  if (!titleEl) {
    const btn = element.querySelector('button');
    if (btn) titleEl = btn;
  }

  // Defensive: Find the accordion content panel
  let contentEl = null;
  // Panel is usually marked with data-cmp-hook-accordion="panel"
  const panel = element.querySelector('[data-cmp-hook-accordion="panel"]');
  if (panel) {
    // Use the panel's content directly (preserves structure)
    contentEl = panel;
  }

  // Fallback: Try to find any div with class 'cmp-accordion__panel'
  if (!contentEl) {
    const fallbackPanel = element.querySelector('.cmp-accordion__panel');
    if (fallbackPanel) contentEl = fallbackPanel;
  }

  // Compose the rows for the block table
  const rows = [headerRow];

  // Only add the item row if we have a title and content
  if (titleEl && contentEl) {
    rows.push([titleEl, contentEl]);
  }

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
