/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all text nodes inside an element (for overlays, etc.)
  function getAllText(el) {
    let text = '';
    if (!el) return text;
    el.childNodes.forEach(node => {
      if (node.nodeType === 3) {
        text += node.textContent.trim() + ' ';
      } else if (node.nodeType === 1) {
        text += getAllText(node);
      }
    });
    return text.trim();
  }

  // Extract cards from poster container
  function extractCards(container) {
    const cards = [];
    const cardEls = container.querySelectorAll('.poster-container__item');
    cardEls.forEach(cardEl => {
      const img = cardEl.querySelector('img');
      let cardText = '';
      // Try to get overlay text or description (for lower cards)
      let rawText = getAllText(cardEl);
      // Remove repeated alt text
      if (img && img.alt && rawText.includes(img.alt)) {
        rawText = rawText.replace(img.alt, '').trim();
      }
      // If no text, fallback to alt
      cardText = rawText || (img && img.alt ? img.alt : '');
      cards.push([img, cardText]);
    });
    return cards;
  }

  // Get heading text
  const headingEl = element.querySelector('.famlf-genres-title');
  const heading = headingEl ? headingEl.textContent.trim() : '';

  // Get tab labels
  const tabBtns = element.querySelectorAll('.language-options-container__btn');
  const tabsText = Array.from(tabBtns).map(btn => btn.textContent.trim()).join(' | ');

  // Find the active tabpanel (only show cards for active tab)
  const tabPanels = element.querySelectorAll('.cmp-tabs__tabpanel');
  let activePanel = null;
  tabPanels.forEach(panel => {
    if (panel.classList.contains('cmp-tabs__tabpanel--active')) {
      activePanel = panel;
    }
  });
  if (!activePanel) {
    activePanel = tabPanels[0];
  }

  let cardsRows = [];
  const posterListing = activePanel.querySelector('.posterListing');
  if (posterListing) {
    const posterContainer = posterListing.querySelector('.poster-container');
    if (posterContainer) {
      cardsRows = extractCards(posterContainer);
    }
    // Add the LOAD MORE button if present
    const loadMoreBtn = posterListing.parentElement.querySelector('.load-more-container__btn');
    if (loadMoreBtn) {
      cardsRows.push(['', loadMoreBtn.textContent.trim()]);
    }
  }

  // Defensive: If no cards found, do not replace
  if (!cardsRows.length) return;

  // Compose table rows
  const headerRow = ['Cards (cards17)'];
  // Add tabs and heading as first card row if present
  if (tabsText || heading) {
    cardsRows.unshift(['', [tabsText, heading].filter(Boolean).join(' | ')]);
  }
  const tableRows = [headerRow, ...cardsRows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the source element with the block table
  element.replaceWith(block);
}
