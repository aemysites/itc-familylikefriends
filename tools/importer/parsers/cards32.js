/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards32) block parser
  const headerRow = ['Cards (cards32)'];
  const rows = [headerRow];

  // Find the card container
  const cardContainer = element.querySelector('.recipeListing_wrapper');
  if (!cardContainer) {
    element.replaceWith(document.createElement('div'));
    return;
  }

  // Select all card links (each card is an anchor)
  const cardLinks = cardContainer.querySelectorAll('.recipeListing__link');
  cardLinks.forEach((cardLink) => {
    // Image (first cell)
    const imgDiv = cardLink.querySelector('.card-img img');
    let imageEl = imgDiv || null;

    // Text content (second cell)
    const cardContent = cardLink.querySelector('.card-content');
    const contentCell = document.createElement('div');
    if (cardContent) {
      // Title
      const titleSpan = cardContent.querySelector('.card-content__top .recipeTile');
      if (titleSpan) {
        const titleEl = document.createElement('h3');
        titleEl.textContent = titleSpan.textContent;
        contentCell.appendChild(titleEl);
      }
      // Group rating, prep time, difficulty horizontally
      const bottomRow = document.createElement('div');
      bottomRow.style.display = 'flex';
      bottomRow.style.gap = '1em';
      bottomRow.style.alignItems = 'center';
      // Rating (with star icon)
      const ratingSpan = cardContent.querySelector('.card-content__top .recipeRating');
      if (ratingSpan) {
        const starImg = ratingSpan.querySelector('img');
        const ratingText = ratingSpan.childNodes[ratingSpan.childNodes.length - 1].textContent.trim();
        const ratingDiv = document.createElement('span');
        if (starImg) {
          ratingDiv.appendChild(starImg.cloneNode(true));
        }
        ratingDiv.appendChild(document.createTextNode(' ' + ratingText));
        bottomRow.appendChild(ratingDiv);
      }
      // Prep time (with clock icon)
      const prepTimeSpan = cardContent.querySelector('.card-content__bottom .recipePrepTime');
      if (prepTimeSpan) {
        const clockImg = prepTimeSpan.querySelector('img');
        const prepTimeText = prepTimeSpan.childNodes[prepTimeSpan.childNodes.length - 1].textContent.trim();
        const prepTimeDiv = document.createElement('span');
        if (clockImg) {
          prepTimeDiv.appendChild(clockImg.cloneNode(true));
        }
        prepTimeDiv.appendChild(document.createTextNode(' ' + prepTimeText));
        bottomRow.appendChild(prepTimeDiv);
      }
      // Difficulty
      const difficultySpan = cardContent.querySelector('.card-content__bottom .recipeDifficulty');
      if (difficultySpan) {
        const difficultyDiv = document.createElement('span');
        difficultyDiv.textContent = difficultySpan.textContent.trim();
        bottomRow.appendChild(difficultyDiv);
      }
      contentCell.appendChild(bottomRow);
    }

    // Always use two columns per spec
    rows.push([imageEl, contentCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
