/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block header
  const headerRow = ['Accordion (accordion26)'];

  // Find all accordion items
  const items = Array.from(element.querySelectorAll('.cmp-accordion__item'));

  // Prepare rows for each accordion item
  const rows = items.map(item => {
    // Title: find the button, then the title span inside
    const button = item.querySelector('button.cmp-accordion__button');
    let titleSpan = button && button.querySelector('.cmp-accordion__title');
    let titleContent = titleSpan ? titleSpan : button;

    // Content: always include all content from the panel, regardless of expanded/collapsed
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    let contentCell = [''];
    if (panel) {
      if (panel.children.length === 1 && panel.firstElementChild) {
        contentCell = Array.from(panel.firstElementChild.children);
      } else {
        contentCell = Array.from(panel.childNodes).filter(n => n.nodeType === 1);
      }
      if (!contentCell || contentCell.length === 0) {
        contentCell = [panel];
      }
    }

    return [titleContent, contentCell];
  });

  // Compose table cells
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
