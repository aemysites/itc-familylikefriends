/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards16) block: 2 columns, first row is header, each card = row
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Find the card link container
  const cardLink = element.querySelector('a.text-decoration-none');
  if (!cardLink) return;

  // --- Image cell ---
  // Find the image inside the card
  const imgContainer = cardLink.querySelector('.cardImageContainer');
  let imgEl = null;
  if (imgContainer) {
    imgEl = imgContainer.querySelector('img');
  }

  // --- Text cell ---
  // Find the content container
  const cardContent = cardLink.querySelector('.cardContent');
  let textCellContent = [];
  if (cardContent) {
    // Title (h2)
    const titleEl = cardContent.querySelector('.cardTitle');
    if (titleEl) textCellContent.push(titleEl);
    // Description (p)
    const descEl = cardContent.querySelector('.cardDescription');
    if (descEl) textCellContent.push(descEl);
    // CTA (button or link)
    // In this example, the button is present but has no visible text, so skip if empty
    const ctaBtn = cardContent.querySelector('.cardCta');
    if (ctaBtn && ctaBtn.textContent.trim()) {
      textCellContent.push(ctaBtn);
    }
  }

  // Compose the card row
  rows.push([
    imgEl || '',
    textCellContent.length > 0 ? textCellContent : ''
  ]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
