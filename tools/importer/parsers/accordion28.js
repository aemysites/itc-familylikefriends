/* global WebImporter */
export default function parse(element, { document }) {
  // Find all accordion containers
  const accordions = element.querySelectorAll('.accordion.panelcontainer, .cmp-accordion');
  if (!accordions.length) return;

  // Helper to extract items from a cmp-accordion
  function extractAccordionItems(accordionEl) {
    const items = [];
    accordionEl.querySelectorAll('.cmp-accordion__item').forEach((item) => {
      // Title: find .cmp-accordion__title inside button
      const button = item.querySelector('button.cmp-accordion__button');
      let title = '';
      if (button) {
        const titleSpan = button.querySelector('.cmp-accordion__title');
        if (titleSpan) {
          title = titleSpan.textContent.trim();
        } else {
          title = button.textContent.trim();
        }
      }
      // Content: find panel
      let content = null;
      const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
      if (panel) {
        const textBlock = panel.querySelector('.cmp-text') || panel;
        if (textBlock.textContent.trim()) {
          content = textBlock;
        }
      }
      // Only push if both title and content are present and content is not empty
      if (title && content) {
        items.push([title, content]);
      }
    });
    return items;
  }

  // Collect all accordion items from all accordions
  let rows = [];
  accordions.forEach((accordion) => {
    let cmpAccordion = accordion.classList.contains('cmp-accordion') ? accordion : accordion.querySelector('.cmp-accordion');
    if (!cmpAccordion) cmpAccordion = accordion;
    const items = extractAccordionItems(cmpAccordion);
    rows = rows.concat(items);
  });

  if (!rows.length) return;

  // Header row as per spec
  const headerRow = ['Accordion (accordion28)'];
  const tableRows = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Replace the first accordion with the block
  accordions[0].replaceWith(block);

  // Remove any other accordion containers (avoid duplicate blocks)
  for (let i = 1; i < accordions.length; i++) {
    accordions[i].remove();
  }
}
