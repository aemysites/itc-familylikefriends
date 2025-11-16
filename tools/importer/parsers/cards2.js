/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards2) block: 2 columns, multiple rows
  // Each card: image (left), text (right), step indicator must be included

  // Header row as required
  const headerRow = ['Cards (cards2)'];

  // Find the step indicator (number in colored circle)
  let stepDiv = element.querySelector('.directions__step-count');
  let stepText = '';
  if (stepDiv) {
    stepText = stepDiv.textContent.trim();
  }

  // Find the image (mandatory)
  let img = element.querySelector('.directions__card-image img');
  if (!img) {
    img = element.querySelector('img');
  }

  // Find the text content (mandatory)
  let textContent = element.querySelector('.directions__card-content');
  if (!textContent) {
    textContent = Array.from(element.querySelectorAll('div')).find(div => div.textContent && div.textContent.trim().length > 0);
  }

  // Compose the card row: first cell is step indicator (as its own element) + image, second cell is text
  let cell1 = document.createElement('div');
  if (stepText) {
    const stepBadge = document.createElement('span');
    stepBadge.textContent = stepText;
    stepBadge.style.display = 'inline-block';
    stepBadge.style.background = '#bf271b';
    stepBadge.style.color = '#fff';
    stepBadge.style.borderRadius = '50%';
    stepBadge.style.width = '2em';
    stepBadge.style.height = '2em';
    stepBadge.style.textAlign = 'center';
    stepBadge.style.lineHeight = '2em';
    stepBadge.style.fontWeight = 'bold';
    stepBadge.style.marginBottom = '0.5em';
    cell1.appendChild(stepBadge);
    cell1.appendChild(document.createElement('br'));
  }
  if (img) {
    cell1.appendChild(img.cloneNode(true));
  }

  const cardRow = [cell1, textContent];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cardRow,
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
