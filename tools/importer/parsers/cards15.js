/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards15) block for notifications
  const headerRow = ['Cards (cards15)'];
  const rows = [headerRow];

  // Find the heading element containing the text and accent
  const headingEl = element.querySelector('.cmp-text h2');
  if (headingEl) {
    // Use a blank span for the icon cell since the screenshot has no icon
    const blankIcon = document.createElement('span');
    // Clone the heading node to preserve styling and accents (including accent mark)
    rows.push([blankIcon, headingEl.cloneNode(true)]);
  }

  // Find all notification-wrapper elements and add each as a card row
  const notifications = element.querySelectorAll('.notification-wrapper');
  notifications.forEach((notif) => {
    const blankIcon = document.createElement('span');
    const title = notif.getAttribute('data-title');
    const subtitle = notif.getAttribute('data-subtitle');
    const textCell = document.createElement('div');
    if (title) {
      const titleEl = document.createElement('strong');
      titleEl.textContent = title.trim();
      textCell.appendChild(titleEl);
    }
    if (subtitle) {
      textCell.appendChild(document.createElement('br'));
      const subtitleEl = document.createElement('span');
      subtitleEl.textContent = subtitle.trim();
      textCell.appendChild(subtitleEl);
    }
    rows.push([blankIcon, textCell]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
