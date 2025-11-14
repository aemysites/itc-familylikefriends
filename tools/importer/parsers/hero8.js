/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Hero (hero8)'];

  // Extract the main image (Sign_In.svg)
  const img = element.querySelector('img[src*="Sign_In.svg"]');
  const imageRow = [img ? img : ''];

  // Extract heading, subheading, and CTA
  const heading = element.querySelector('h4');
  const subheading = element.querySelector('p');
  const cta = element.querySelector('a');

  const textContent = [];
  if (heading) textContent.push(heading);
  if (subheading) textContent.push(subheading);
  if (cta) textContent.push(cta);

  const textRow = [textContent.length ? textContent : ''];

  const cells = [
    headerRow,
    imageRow,
    textRow
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
