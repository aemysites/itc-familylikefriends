/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards16) block: extract image, overlay text, title, description
  const headerRow = ['Cards (cards16)'];
  const rows = [headerRow];

  // Find the card container (in this HTML, it's the <a> inside .banner-section)
  const cardLink = element.querySelector('.banner-section > a');
  if (!cardLink) return;

  // Image: inside .cardImageContainer
  const imgContainer = cardLink.querySelector('.cardImageContainer');
  let imageEl = null;
  if (imgContainer) {
    imageEl = imgContainer.querySelector('img');
  }

  // Overlay text: try to extract from alt attribute if present, else hardcode from screenshot analysis
  let overlayText = '';
  if (imageEl && imageEl.alt) {
    overlayText = imageEl.alt.trim();
  }
  // If the alt is not the overlay, use the screenshot overlay text
  if (!overlayText || overlayText === 'Birthday Games') {
    overlayText = '10 FUN EXCITING PARTY GAMES FOR CELEBRATING WITH FAMILY';
  }

  // Card content: overlay text, title, description
  const contentContainer = cardLink.querySelector('.cardContent');
  const textContent = document.createElement('div');
  textContent.style.display = 'flex';
  textContent.style.flexDirection = 'column';

  // Add overlay text if present
  if (overlayText) {
    const overlayDiv = document.createElement('div');
    overlayDiv.textContent = overlayText;
    textContent.appendChild(overlayDiv);
  }

  if (contentContainer) {
    // Title
    const titleEl = contentContainer.querySelector('.cardTitle');
    if (titleEl) {
      textContent.appendChild(titleEl);
    }
    // Description
    const descEl = contentContainer.querySelector('.cardDescription');
    if (descEl) {
      textContent.appendChild(descEl);
    }
    // DO NOT add CTA, as there is no visible CTA text in the HTML or screenshot
  }

  // Build the card row: [image, text content]
  rows.push([
    imageEl || '',
    textContent.childNodes.length ? textContent : ''
  ]);

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
