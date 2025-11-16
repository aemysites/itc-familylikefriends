/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Find the main image (SVG icon)
  const imgHolder = element.querySelector('.img_holder img');
  // Defensive: fallback if not found
  const heroImage = imgHolder || '';

  // Helper: Find the heading (h4)
  const heading = element.querySelector('.text_box h4');
  // Helper: Find the subheading (paragraph)
  const subheading = element.querySelector('.text_box p');

  // Helper: Find the CTA (anchor)
  const cta = element.querySelector('.cta_box a');

  // Build table rows
  const headerRow = ['Hero (hero23)'];
  const imageRow = [heroImage ? heroImage : ''];

  // Compose content row
  const content = [];
  if (heading) content.push(heading);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);
  const contentRow = [content];

  // Build table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
