/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages1) block: 1 column, multiple rows, each row is a card
  const headerRow = ['Cards (cardsNoImages1)'];
  const rows = [headerRow];

  // Select all card items (recipe-detail__info-item)
  const cardItems = element.querySelectorAll('.recipe-detail__info-item');

  cardItems.forEach((card) => {
    // Extract icon, value, and label
    const iconImg = card.querySelector('img');
    const valueSpan = card.querySelector('.info_value');
    const labelSpan = card.querySelector('.info_text');

    // Compose cell content: icon (if present), value, label
    const cellContent = [];
    if (iconImg) cellContent.push(iconImg.cloneNode(true));
    if (valueSpan) cellContent.push(document.createElement('br'), valueSpan.cloneNode(true));
    if (labelSpan) cellContent.push(document.createElement('br'), labelSpan.cloneNode(true));

    // Defensive fallback: if no value/label, use all children
    if (cellContent.length === 0 && card.children.length) {
      Array.from(card.children).forEach(child => cellContent.push(child.cloneNode(true)));
    }

    rows.push([cellContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
