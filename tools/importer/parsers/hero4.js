/* global WebImporter */
export default function parse(element, { document }) {
  // Only extract content relevant to the Hero block: image, heading, subheading, CTA.
  // Do NOT include UI controls like the close button.

  // Row 1: Block name
  const headerRow = ['Hero (hero4)'];

  // Row 2: Background image (optional)
  let imageRow = [''];
  const img = element.querySelector('.img_holder img, img.icon-svg');
  if (img) imageRow = [img];

  // Row 3: Heading, subheading, CTA (optional)
  const row3Content = [];
  const heading = element.querySelector('.text_box h1, .text_box h2, .text_box h3, .text_box h4, .text_box h5, .text_box h6');
  if (heading) row3Content.push(heading);
  const subheading = element.querySelector('.text_box p');
  if (subheading) row3Content.push(subheading);
  const cta = element.querySelector('.cta_box a');
  if (cta) {
    const ctaClone = cta.cloneNode(true);
    Array.from(ctaClone.querySelectorAll('img')).forEach(img => img.remove());
    row3Content.push(ctaClone);
  }
  // DO NOT include the close button
  const row3 = [row3Content.length ? row3Content : ['']];

  const cells = [
    headerRow,
    imageRow,
    row3
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
