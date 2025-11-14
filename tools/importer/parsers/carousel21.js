/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel21) block parser
  const headerRow = ['Carousel (carousel21)'];
  const rows = [headerRow];

  // Find the carousel wrapper
  const swiperWrapper = element.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  // Find all slides
  const slides = swiperWrapper.querySelectorAll('.swiper-slide');
  slides.forEach((slide) => {
    // Find image (mandatory)
    const img = slide.querySelector('img');
    let imgCell = '';
    if (img) {
      imgCell = img;
    } else {
      // Defensive fallback: use alt text or slide text content
      const altText = img ? (img.getAttribute('alt') || '') : (slide.textContent.trim() || 'Image');
      const altSpan = document.createElement('span');
      altSpan.textContent = altText;
      imgCell = altSpan;
    }
    // Second column: always present, but only filled if there is actual text content
    let textCell = '';
    // Look for heading or paragraph inside the slide
    const heading = slide.querySelector('h1, h2, h3, h4, h5, h6');
    const paragraph = slide.querySelector('p');
    if (heading) {
      textCell = heading.cloneNode(true);
    } else if (paragraph) {
      textCell = paragraph.cloneNode(true);
    } else {
      // Fallback: extract visible text nodes (excluding image alt text)
      // Get all text nodes except from img
      const textNodes = Array.from(slide.childNodes)
        .filter(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
      if (textNodes.length) {
        textCell = textNodes.map(node => node.textContent.trim()).join(' ');
      }
    }
    rows.push([imgCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
