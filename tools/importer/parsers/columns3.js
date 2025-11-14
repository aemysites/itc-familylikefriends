/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Columns (columns3)'];

  // Defensive: find the main content wrapper
  const contentWrapper = element.querySelector('.footer-brand__primary--content') || element;

  // Get logo (left section)
  let logoSection = contentWrapper.querySelector('.footer-brand__left');
  let logoLink = logoSection && logoSection.querySelector('a');
  let logoCell = logoLink ? logoLink : '';

  // Get navigation columns (right section)
  let rightSection = contentWrapper.querySelector('.footer-brand__right');
  let nav = rightSection && rightSection.querySelector('.footer-brand__navbar');

  // Defensive: get left and right nav columns
  let leftNav = nav && nav.querySelector('.footer-brand__navbar--left');
  let rightNav = nav && nav.querySelector('.footer-brand__navbar--right');

  // Helper to extract list from nav column
  function extractList(navCol) {
    if (!navCol) return '';
    // Find the first non-empty .footerList
    const lists = Array.from(navCol.querySelectorAll('.footerList'));
    for (const list of lists) {
      const ul = list.querySelector('ul');
      if (ul && ul.children.length > 0) {
        return ul;
      }
    }
    return '';
  }

  const leftList = extractList(leftNav);
  const rightList = extractList(rightNav);

  // Compose the columns row: left nav, right nav
  const columnsRow = [leftList, rightList];

  // Create the table block
  const rows = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
