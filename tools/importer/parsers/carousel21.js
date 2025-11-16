/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel21) block: 2 columns, multiple rows, first row is block name
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Find the carousel slides
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;
  const slides = Array.from(swiperWrapper.querySelectorAll('.swiper-slide'));

  slides.forEach((slide) => {
    // Find the image (mandatory)
    let img = slide.querySelector('img');
    if (!img) {
      // If no image, create a placeholder span with alt text if available
      const alt = slide.querySelector('img')?.getAttribute('alt') || '';
      const span = document.createElement('span');
      span.textContent = alt ? `[${alt}]` : '(no image)';
      img = span;
    }

    // Always create two columns per row: image and text (even if text is empty)
    // Only use visible text nodes (excluding img alt) for the second cell
    let visibleText = '';
    function getVisibleText(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent;
      }
      if (node.nodeType === Node.ELEMENT_NODE && !['SCRIPT', 'STYLE', 'IMG'].includes(node.tagName)) {
        let txt = '';
        node.childNodes.forEach(child => {
          txt += getVisibleText(child);
        });
        return txt;
      }
      return '';
    }
    visibleText = getVisibleText(slide).trim();

    // If no visible text, leave second cell empty
    rows.push([img, visibleText]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
