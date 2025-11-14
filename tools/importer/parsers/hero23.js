/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract main image (SVG or IMG)
  const imgHolder = element.querySelector('.img_holder img');
  let mainImage = imgHolder || '';

  // 2. Extract heading and subheading
  const textBox = element.querySelector('.text_box');
  let heading = '', subheading = '';
  if (textBox) {
    const h = textBox.querySelector('h4');
    if (h) heading = h;
    const p = textBox.querySelector('p');
    if (p) subheading = p;
  }

  // 3. Extract CTA link (with text and icon)
  const ctaBox = element.querySelector('.cta_box');
  let cta = '';
  if (ctaBox) {
    const a = ctaBox.querySelector('a');
    if (a) cta = a;
  }

  // 4. Compose table rows
  const headerRow = ['Hero (hero23)']; // CRITICAL: Must match block name exactly
  const imageRow = [mainImage]; // Reference image element directly
  // Content row: heading, subheading, CTA (all referenced elements, not text)
  const contentRow = [
    [heading, subheading, cta].filter(Boolean)
  ];

  // 5. Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    imageRow,
    contentRow
  ], document);

  // 6. Replace original element
  element.replaceWith(table);
}
