/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Always use block name
  const headerRow = ['Hero (hero7)'];

  // 2. Find the hero image (background image)
  const img = element.querySelector('img');

  // 3. Find overlay text in image area (if present in HTML)
  let overlayText = '';
  if (img) {
    // Look for overlay text in siblings or parent
    const parent = img.parentElement;
    if (parent) {
      // Check for direct text elements in parent
      const possibleOverlay = parent.querySelectorAll('div, span, p, h1, h2, h3, h4');
      for (const el of possibleOverlay) {
        const txt = el.textContent.trim();
        // Only add if not empty and not already in heading/subheading
        if (txt && !overlayText) {
          overlayText = txt;
        }
      }
    }
  }
  let imageCell = img ? img.cloneNode(true) : '';
  if (overlayText) {
    const overlayDiv = document.createElement('div');
    overlayDiv.textContent = overlayText;
    imageCell = [imageCell, overlayDiv];
  }
  const imageRow = [imageCell];

  // 4. Find the main heading and subheading
  const textBlock = element.querySelector('.cmp-text');
  let headingEl = null;
  let subheadingEl = null;
  let paragraphEl = null;

  if (textBlock) {
    // Find all h1/h2/h3 inside textBlock
    const h1s = textBlock.querySelectorAll('h1');
    if (h1s.length > 0) {
      // Use the first non-empty h1 as heading
      for (const h1 of h1s) {
        if (h1.textContent.trim()) {
          headingEl = h1;
          break;
        }
      }
      // If there's a second h1, treat as subheading (rare for hero)
      if (h1s.length > 1 && h1s[1] !== headingEl) {
        subheadingEl = h1s[1];
      }
    }
    // If no h1, look for h2/h3
    if (!headingEl) {
      headingEl = textBlock.querySelector('h2, h3');
    }
    // If there's a paragraph, grab it
    paragraphEl = textBlock.querySelector('p');
  }

  // 5. Compose the text cell
  const textCellContent = [];
  if (headingEl) textCellContent.push(headingEl);
  if (subheadingEl) textCellContent.push(subheadingEl);
  if (paragraphEl) textCellContent.push(paragraphEl);

  // Row 3: text content
  const textRow = [textCellContent.length ? textCellContent : ''];

  // 6. Build the table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // 7. Replace original element
  element.replaceWith(blockTable);
}
