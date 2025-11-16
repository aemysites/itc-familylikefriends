/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Use exact block name
  const headerRow = ['Hero (hero29)'];

  // 2. Image row: Reference the actual image element
  const img = element.querySelector('img');
  const imageRow = [img ? img : ''];

  // 3. Content row: Only include non-empty headings from cmp-text
  const cmpText = element.querySelector('.cmp-text');
  let contentFragment = document.createDocumentFragment();
  if (cmpText) {
    Array.from(cmpText.children).forEach(node => {
      if (node.textContent && node.textContent.trim()) {
        contentFragment.appendChild(node.cloneNode(true));
      }
    });
  }

  // 4. Compose table rows
  const cells = [
    headerRow,
    imageRow,
    [contentFragment.hasChildNodes() ? contentFragment : '']
  ];

  // 5. Create table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace element with new table
  element.replaceWith(table);
}
