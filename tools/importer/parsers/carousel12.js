/* global WebImporter */
export default function parse(element, { document }) {
  // Compose header row
  const headerRow = ['Carousel (carousel12)'];
  const rows = [headerRow];

  // --- Extract all text content from the original HTML ---
  // 1. Hero/Header section: headline and subheading
  const headerTextSection = element.querySelector('.cmp-text');
  const allTextFragments = [];
  if (headerTextSection) {
    // Headline (h2)
    const headline = headerTextSection.querySelector('h2');
    if (headline) allTextFragments.push(headline);
    // Subheadings (all paragraphs)
    headerTextSection.querySelectorAll('p').forEach(p => allTextFragments.push(p));
  }
  // 2. CTA (GIVE IT A GO)
  const cta = element.querySelector('.famlf-carousel-cta, .famlf-cta-btn, a.cmp-button__text');
  if (cta) allTextFragments.push(cta);

  // Find the carousel slides wrapper
  const slidesWrapper = element.querySelector('.swiper-wrapper');
  if (!slidesWrapper) {
    // No slides: just output header row
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
    return;
  }

  // Get all slides
  const slideDivs = Array.from(slidesWrapper.querySelectorAll(':scope > div.swiper-slide'));
  if (!slideDivs.length) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
    return;
  }

  slideDivs.forEach((slide) => {
    // First cell: image (mandatory)
    let img = slide.querySelector('img');
    let imgCell = img ? img : '';

    // Second cell: text content (must include all text from the slide)
    const textCellFragments = [];

    // Heading (h2/h3/h4, .banner-title, .cmp-title)
    const heading = slide.querySelector('h2, h3, h4, .banner-title, .cmp-title');
    if (heading) textCellFragments.push(heading);

    // All paragraphs
    Array.from(slide.querySelectorAll('p')).forEach(p => {
      textCellFragments.push(p);
    });

    // Any spans/divs with 'Submitted by'
    Array.from(slide.querySelectorAll('span, div')).forEach(e => {
      if (/Submitted by/i.test(e.textContent)) textCellFragments.push(e);
    });

    // Decorative icons (e.g., emoji, sunburst) if present
    Array.from(slide.querySelectorAll('svg, img.icon, .icon, .emoji')).forEach(icon => {
      textCellFragments.push(icon);
    });

    // If nothing found, leave cell blank
    let textCell = textCellFragments.length ? textCellFragments : '';

    // --- Add ALL text content from the original HTML to the slide's text cell ---
    // This ensures all text from the source HTML is included in the output
    if (allTextFragments.length) {
      if (Array.isArray(textCell)) {
        textCell = [...allTextFragments, ...textCell];
      } else if (textCell) {
        textCell = [...allTextFragments, textCell];
      } else {
        textCell = allTextFragments;
      }
    }

    rows.push([imgCell, textCell]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
