/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards17) block: 2 columns, multiple rows, each row = card (image, text)
  const headerRow = ['Cards (cards17)'];
  const rows = [headerRow];

  // Find the active tab panel
  const activeTabPanel = element.querySelector('.cmp-tabs__tabpanel--active');
  if (!activeTabPanel) return;
  const posterListing = activeTabPanel.querySelector('.posterListing');
  if (!posterListing) return;
  const posterContainer = posterListing.querySelector('.poster-container');
  if (!posterContainer) return;
  const cardItems = posterContainer.querySelectorAll('.poster-container__item');
  if (!cardItems.length) return;

  // For each card, extract image and visible text content
  cardItems.forEach(card => {
    const img = card.querySelector('img');
    let cardText = '';
    // Try to get visible text overlays from the card's image parent
    // If there is a previous sibling with text, use that (for overlay titles)
    let prev = card.previousElementSibling;
    if (prev && prev.textContent && prev.textContent.trim()) {
      cardText = prev.textContent.trim();
    }
    // If still empty, try to get direct text nodes (rare)
    if (!cardText) {
      card.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
          cardText += node.textContent.trim() + '\n';
        }
      });
      cardText = cardText.trim();
    }
    // If still empty, try to get alt text from image
    if (!cardText && img && img.alt && img.alt !== 'poster-img') {
      cardText = img.alt;
    }
    // If still empty, try to infer title from image src or data-dam-path
    if (!cardText) {
      // Try data-dam-path
      const damPath = card.getAttribute('data-dam-path');
      if (damPath) {
        let name = damPath.split('/').pop().replace(/\.[a-zA-Z]+$/, '').replace(/[-_]/g, ' ');
        name = name.replace(/\b\w/g, l => l.toUpperCase()).trim();
        cardText = name;
      } else if (img && img.src) {
        const match = img.src.match(/\/([^\/]+?)(\.[a-zA-Z]+)?(\?|$)/);
        if (match && match[1]) {
          let name = match[1].replace(/\.[a-zA-Z]+$/, '').replace(/[-_]/g, ' ');
          name = name.replace(/\b\w/g, l => l.toUpperCase()).trim();
          cardText = name;
        }
      }
    }
    rows.push([img, cardText]);
  });

  // LOAD MORE button (call-to-action)
  const loadMoreBtn = posterContainer.parentElement.querySelector('.load-more-container__btn');
  if (loadMoreBtn) {
    rows.push(['', loadMoreBtn.textContent.trim()]);
  }

  // Create the cards table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
