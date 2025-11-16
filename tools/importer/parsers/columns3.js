/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns3)'];

  // Get the logo section
  let logoCell = '';
  const logoSection = element.querySelector('.footer-brand__left');
  if (logoSection) {
    const logoLink = logoSection.querySelector('a');
    if (logoLink) {
      logoCell = logoLink;
    }
  }

  // Get the left and right column lists
  let leftCell = '';
  let rightCell = '';
  const navbar = element.querySelector('.footer-brand__navbar');
  if (navbar) {
    const leftNav = navbar.querySelector('.footer-brand__navbar--left');
    const rightNav = navbar.querySelector('.footer-brand__navbar--right');
    if (leftNav) {
      const leftList = leftNav.querySelector('ul.footer-list');
      if (leftList) leftCell = leftList;
    }
    if (rightNav) {
      const rightList = rightNav.querySelector('ul.footer-list');
      if (rightList) rightCell = rightList;
    }
  }

  // Build the table rows
  // First row: header
  // Second row: logo, left links, right links
  const rows = [
    headerRow,
    [logoCell, leftCell, rightCell],
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(block);
}
