/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header row
  const headerRow = ['Accordion (accordion25)'];

  // Find all accordion items (children with class 'cmp-accordion__item')
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item'));

  // Build rows for each accordion item
  const rows = items.map(item => {
    // Title: find the button with class 'cmp-accordion__button', then the span with class 'cmp-accordion__title'
    let titleText = '';
    const button = item.querySelector('.cmp-accordion__button');
    if (button) {
      const titleEl = button.querySelector('.cmp-accordion__title');
      if (titleEl) {
        titleText = titleEl.textContent.trim();
      } else {
        titleText = button.textContent.trim();
      }
    }
    // Content: find the panel with class 'cmp-accordion__panel', then extract only the inner text content
    let contentCell = '';
    const panel = item.querySelector('.cmp-accordion__panel');
    if (panel) {
      // Find the cmp-text inside the panel
      const cmpText = panel.querySelector('.cmp-text');
      if (cmpText) {
        // Get all text content from cmp-text (e.g., paragraphs)
        contentCell = Array.from(cmpText.querySelectorAll('p, ul, ol, div')).map(el => el.cloneNode(true));
      } else {
        // Fallback: get all text content from panel
        contentCell = Array.from(panel.querySelectorAll('p, ul, ol, div')).map(el => el.cloneNode(true));
      }
    }
    // If contentCell is still empty, fallback to panel's textContent
    if (!contentCell || (Array.isArray(contentCell) && contentCell.length === 0)) {
      contentCell = panel ? panel.textContent.trim() : '';
    }
    return [titleText, contentCell];
  });

  // Compose table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
