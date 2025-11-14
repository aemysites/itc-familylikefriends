/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the correct header row
  const headerRow = ['Carousel (carousel12)'];

  // Extract the carousel heading and subheading
  const headingSection = element.querySelector('.famlf-carousel-text');
  let headingContent = '';
  if (headingSection) {
    headingContent = Array.from(headingSection.children)
      .map((child) => child.textContent.trim())
      .filter(Boolean)
      .join('<br>');
  }

  // Find the swiper section containing slides
  const swiperSection = element.querySelector('.swiper');
  let rows = [];
  if (swiperSection) {
    const wrapper = swiperSection.querySelector('.swiper-wrapper');
    if (wrapper) {
      const slides = Array.from(wrapper.children).filter(
        (el) => el.classList.contains('swiper-slide')
      );
      for (const slide of slides) {
        // Find image (first cell)
        const img = slide.querySelector('img');
        if (!img) continue;

        // Find text content (second cell)
        let textCell = document.createElement('div');
        // Extract card title and subtitle from slide's banner-section
        const card = slide.querySelector('.banner-section');
        let cardTitle = '';
        let cardSubtitle = '';
        if (card) {
          // Try to find the card title (look for .banner-section > div > div > strong, b, h1, h2, h3)
          // The actual title/subtitle may be in nested divs, so search all descendants
          const titleEl = Array.from(card.querySelectorAll('*')).find(
            (el) => el.textContent.trim() &&
              (/reliving priceless moments/i).test(el.textContent.trim())
          );
          if (titleEl) {
            cardTitle = titleEl.textContent.trim();
            const heading = document.createElement('h2');
            heading.textContent = cardTitle;
            textCell.appendChild(heading);
          }
          // Try to find the card subtitle (Submitted by ...)
          const subtitleEl = Array.from(card.querySelectorAll('*')).find(
            (el) => el.textContent.trim().toLowerCase().startsWith('submitted by')
          );
          if (subtitleEl) {
            cardSubtitle = subtitleEl.textContent.trim();
            const sub = document.createElement('p');
            sub.textContent = cardSubtitle;
            textCell.appendChild(sub);
          }
        }
        // Add CTA if present in the block
        const ctaSection = element.querySelector('.text-center');
        if (ctaSection) {
          const cta = ctaSection.querySelector('a');
          if (cta) {
            const ctaLink = document.createElement('a');
            ctaLink.href = cta.href;
            ctaLink.textContent = cta.textContent.trim();
            textCell.appendChild(ctaLink);
          }
        }
        // Add heading/subheading to the first slide only
        if (rows.length === 0 && headingContent) {
          const headingDiv = document.createElement('div');
          headingDiv.innerHTML = headingContent;
          textCell.prepend(headingDiv);
        }
        rows.push([img, textCell]);
      }
    }
  }

  // Compose table data
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
