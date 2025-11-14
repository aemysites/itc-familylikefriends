/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, each row is a card with image and text (step number visually separated)

  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get all card containers
  const cardContainers = element.classList.contains('directions__steps')
    ? [element]
    : element.querySelectorAll('.directions__steps');

  Array.from(cardContainers).forEach(card => {
    // Step number: .directions__step-count
    const stepEl = card.querySelector('.directions__step-count');
    const stepText = stepEl ? stepEl.textContent.trim() : '';

    // Image cell: .directions__card-image img
    const imgWrapper = card.querySelector('.directions__card-image');
    const imgEl = imgWrapper ? imgWrapper.querySelector('img') : null;

    // Text cell: .directions__card-content
    const textWrapper = card.querySelector('.directions__card-content');
    let textContent = textWrapper ? textWrapper.textContent.trim() : '';
    // Remove any leading step number from the text content
    textContent = textContent.replace(/^\d+\.?\s*/, '');

    // Defensive: if no image and no text, skip
    if (!imgEl && !textContent) return;

    // Create a span for the step number (badge style)
    let stepBadge = '';
    if (stepText) {
      stepBadge = document.createElement('span');
      stepBadge.textContent = stepText;
      stepBadge.style.display = 'inline-block';
      stepBadge.style.background = '#bf271b';
      stepBadge.style.color = '#fff';
      stepBadge.style.borderRadius = '50%';
      stepBadge.style.width = '1.5em';
      stepBadge.style.height = '1.5em';
      stepBadge.style.textAlign = 'center';
      stepBadge.style.lineHeight = '1.5em';
      stepBadge.style.fontWeight = 'bold';
      stepBadge.style.marginRight = '0.5em';
    }

    // Compose the text cell: badge + description
    const textCell = document.createElement('div');
    if (stepBadge) textCell.appendChild(stepBadge);
    textCell.appendChild(document.createTextNode(textContent));

    rows.push([
      imgEl ? imgEl : '',
      textCell
    ]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
