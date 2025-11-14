/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract all major content blocks
  function extractMainContentBlocks(root) {
    const blocks = [];
    // Hero section: h1 + h3
    const hero = root.querySelector('.cmp-text h1');
    if (hero) {
      const heroBlock = document.createElement('div');
      heroBlock.appendChild(hero.cloneNode(true));
      const heroSub = root.querySelector('.cmp-text h3');
      if (heroSub) heroBlock.appendChild(heroSub.cloneNode(true));
      blocks.push([heroBlock]);
    }
    // Banner section: Adoption is more than just love!
    const bannerText = root.querySelector('.famlf_banner_padding .cmp-text h2');
    if (bannerText) {
      const bannerBlock = document.createElement('div');
      bannerBlock.appendChild(bannerText.cloneNode(true));
      // Add next h2 and h4 if present
      const bannerText2 = bannerText.parentElement.querySelector('h2:nth-of-type(2)');
      if (bannerText2) bannerBlock.appendChild(bannerText2.cloneNode(true));
      const bannerH4 = bannerText.parentElement.querySelector('h4');
      if (bannerH4) bannerBlock.appendChild(bannerH4.cloneNode(true));
      blocks.push([bannerBlock]);
    }
    // Banner images
    root.querySelectorAll('.banner-section__wrapper img[alt]').forEach(img => {
      blocks.push([img.cloneNode(true)]);
    });
    // Statistics blocks
    root.querySelectorAll('.aem-GridColumn--default--4 .cmp-text').forEach(stat => {
      blocks.push([stat.cloneNode(true)]);
    });
    // CTA button
    const ctaBtn = root.querySelector('.cta.button a.cmp-button');
    if (ctaBtn) {
      blocks.push([ctaBtn.cloneNode(true)]);
    }
    // Informational sections
    const infoSection = root.querySelector('#text-9465e6079b');
    if (infoSection) {
      blocks.push([infoSection.cloneNode(true)]);
    }
    // Journey section
    const journeySection = infoSection && infoSection.parentElement.nextElementSibling;
    if (journeySection && journeySection.querySelector('h2')) {
      blocks.push([journeySection.cloneNode(true)]);
    }
    // FAQ section heading
    const faqHeading = root.querySelector('#text-7f355afdb7');
    if (faqHeading) {
      blocks.push([faqHeading.cloneNode(true)]);
    }
    // General Questions label
    const generalQuestions = root.querySelector('#text-9709a9ae96');
    if (generalQuestions) {
      blocks.push([generalQuestions.cloneNode(true)]);
    }
    return blocks;
  }

  // Helper to extract accordion items from a cmp-accordion
  function extractAccordionItems(accordionEl) {
    const items = [];
    const itemEls = accordionEl.querySelectorAll('.cmp-accordion__item');
    itemEls.forEach(itemEl => {
      const button = itemEl.querySelector('button.cmp-accordion__button');
      let titleSpan = button && button.querySelector('.cmp-accordion__title');
      let title = titleSpan ? titleSpan : button;
      const panel = itemEl.querySelector('[data-cmp-hook-accordion="panel"]');
      let content = null;
      if (panel) {
        const textBlock = panel.querySelector('.text .cmp-text');
        content = textBlock ? textBlock : panel;
      }
      if (title && content) {
        items.push([title.cloneNode(true), content.cloneNode(true)]);
      }
    });
    return items;
  }

  // Compose output table
  const headerRow = ['Accordion (accordion28)'];
  const cells = [headerRow];

  // Add all main content blocks as single cell rows
  const mainBlocks = extractMainContentBlocks(element);
  mainBlocks.forEach(row => cells.push(row));

  // Add all accordion items as rows
  const accordions = element.querySelectorAll('.cmp-accordion');
  accordions.forEach(acc => {
    const items = extractAccordionItems(acc);
    items.forEach(row => cells.push(row));
  });

  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
