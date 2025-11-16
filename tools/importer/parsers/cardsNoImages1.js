/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cardsNoImages1) block: 1 column, multiple rows
  // Each card: value (bold), label (below)

  // Header row as required
  const headerRow = ['Cards (cardsNoImages1)'];
  const rows = [headerRow];

  // Find all card items (recipe-detail__info-item)
  const cardItems = element.querySelectorAll('.recipe-detail__info-item');

  cardItems.forEach((card) => {
    // Defensive: collect value and label
    const valueEl = card.querySelector('.info_value');
    const labelEl = card.querySelector('.info_text');

    // Compose card content
    const cardContent = document.createElement('div');
    cardContent.style.display = 'flex';
    cardContent.style.flexDirection = 'column';
    cardContent.style.alignItems = 'center';

    // Value (bold)
    if (valueEl) {
      const strong = document.createElement('strong');
      strong.textContent = valueEl.textContent;
      cardContent.appendChild(strong);
    }
    // Label (below)
    if (labelEl) {
      const label = document.createElement('div');
      label.textContent = labelEl.textContent;
      label.style.fontSize = 'smaller';
      cardContent.appendChild(label);
    }

    rows.push([cardContent]);
  });

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
