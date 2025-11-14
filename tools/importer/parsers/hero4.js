/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row
  const headerRow = ['Hero (hero4)'];

  // 2. Extract image (background or decorative)
  // For this popup, the main image is the SVG icon in .img_holder
  let imageCell = '';
  const imgHolder = element.querySelector('.img_holder img');
  if (imgHolder) {
    imageCell = imgHolder;
  }

  // 3. Extract text content and CTA
  // Heading: .text_box h4
  // Subheading: .text_box p
  // CTA: .cta_box a
  const textBox = element.querySelector('.text_box');
  const ctaBox = element.querySelector('.cta_box');
  const contentCell = [];

  // Heading
  const heading = textBox ? textBox.querySelector('h4') : null;
  if (heading) contentCell.push(heading);

  // Subheading
  const subheading = textBox ? textBox.querySelector('p') : null;
  if (subheading) contentCell.push(subheading);

  // CTA
  const cta = ctaBox ? ctaBox.querySelector('a') : null;
  if (cta) contentCell.push(cta);

  // 4. Build table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell],
  ];

  // 5. Create block table and replace element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
