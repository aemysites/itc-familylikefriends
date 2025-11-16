/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards15) block: 2 columns, multiple rows. Each card: image/icon (first cell), text (second cell)
  // 1. Header row (must be exactly one column)
  const headerRow = ['Cards (cards15)'];

  // 2. Extract the heading text ('Notifications') from the cmp-text section
  let headingText = '';
  const headingEl = element.querySelector('.cmp-text h2');
  if (headingEl) {
    headingText = headingEl.textContent.trim();
  }

  // 3. Compose heading row as a card (first cell: accent/icon, second cell: heading text)
  let rows = [];
  if (headingText) {
    // Create accent/icon for the first cell
    const accent = document.createElement('span');
    accent.textContent = '✦'; // Decorative accent placeholder
    accent.style.color = '#bb1f3b';
    accent.style.fontWeight = 'bold';
    accent.style.fontSize = '1.5em';
    accent.style.display = 'inline-block';
    accent.style.marginRight = '8px';
    accent.setAttribute('aria-hidden', 'true');

    // Compose heading cell
    const headingCell = document.createElement('div');
    const strong = document.createElement('strong');
    strong.textContent = headingText;
    strong.style.color = '#bb1f3b';
    headingCell.appendChild(strong);
    rows.push([accent, headingCell]);
  }

  // 4. Find the card container and notification cards
  const notificationsContainer = element.querySelector('.notifications-container');
  if (notificationsContainer) {
    const notificationList = notificationsContainer.querySelector('.notification-list');
    if (notificationList) {
      // Find all notification-wrapper elements (each is a card)
      const wrappers = Array.from(notificationList.querySelectorAll('.notification-wrapper'));
      wrappers.forEach((wrapper) => {
        // Each card: first cell is icon/image (none in source), so use a generic icon
        // Text cell: Title (data-title), Description (data-subtitle)
        const titleText = wrapper.getAttribute('data-title') || '';
        const subtitleText = wrapper.getAttribute('data-subtitle') || '';

        // Compose text cell
        const textCell = document.createElement('div');
        if (titleText) {
          const title = document.createElement('strong');
          title.textContent = titleText;
          textCell.appendChild(title);
        }
        if (subtitleText) {
          const desc = document.createElement('div');
          desc.textContent = subtitleText;
          textCell.appendChild(desc);
        }

        // Use a generic notification icon for first cell
        const icon = document.createElement('span');
        icon.textContent = '🔔';
        icon.setAttribute('aria-label', 'notification');
        icon.style.fontSize = '1.5em';
        icon.style.display = 'inline-block';
        icon.style.marginRight = '8px';

        rows.push([icon, textCell]);
      });
    }
  }

  // 5. Compose table: header row and all cards
  const tableData = [headerRow, ...rows];

  // 6. Replace original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
