/* global WebImporter */
export default function parse(element, { document }) {
  // Cards block header row
  const headerRow = ['Cards (cards32)'];

  // Find the parent container of all cards
  const cardsContainer = element.querySelector('.recipeListing_wrapper');
  if (!cardsContainer) return;

  // Find all card links (each card is an anchor)
  const cardLinks = Array.from(cardsContainer.querySelectorAll('.recipeListing__link'));

  // Build rows for each card
  const rows = cardLinks.map((cardLink) => {
    // Image (first cell)
    const img = cardLink.querySelector('.card-img img');

    // Card content (second cell)
    const cardContent = cardLink.querySelector('.card-content');
    if (!cardContent) return null;

    // Title
    const titleSpan = cardContent.querySelector('.card-content__top .recipeTile');
    let titleEl = null;
    if (titleSpan) {
      titleEl = document.createElement('strong');
      titleEl.textContent = titleSpan.textContent.trim();
    }

    // Rating (with star icon)
    const ratingSpan = cardContent.querySelector('.card-content__top .recipeRating');
    let ratingEl = null;
    if (ratingSpan) {
      const starImg = ratingSpan.querySelector('img');
      ratingEl = document.createElement('span');
      if (starImg) {
        ratingEl.appendChild(starImg.cloneNode(true));
        ratingEl.appendChild(document.createTextNode(' '));
      }
      ratingEl.appendChild(document.createTextNode(ratingSpan.textContent.trim()));
    }

    // Prep time (with clock icon)
    const prepTimeSpan = cardContent.querySelector('.card-content__bottom .recipePrepTime');
    let prepTimeEl = null;
    if (prepTimeSpan) {
      const clockImg = prepTimeSpan.querySelector('img');
      prepTimeEl = document.createElement('span');
      if (clockImg) {
        prepTimeEl.appendChild(clockImg.cloneNode(true));
        prepTimeEl.appendChild(document.createTextNode(' '));
      }
      prepTimeEl.appendChild(document.createTextNode(prepTimeSpan.textContent.trim()));
    }

    // Difficulty
    const difficultySpan = cardContent.querySelector('.card-content__bottom .recipeDifficulty');
    let difficultyEl = null;
    if (difficultySpan) {
      difficultyEl = document.createElement('span');
      difficultyEl.textContent = difficultySpan.textContent.trim();
    }

    // Compose the text cell
    const textCell = document.createElement('div');
    if (titleEl) textCell.appendChild(titleEl);
    if (titleEl) textCell.appendChild(document.createElement('br'));
    const statsDiv = document.createElement('div');
    statsDiv.style.display = 'flex';
    statsDiv.style.justifyContent = 'space-between';
    statsDiv.style.gap = '1em';
    if (prepTimeEl) statsDiv.appendChild(prepTimeEl);
    if (difficultyEl) statsDiv.appendChild(difficultyEl);
    if (ratingEl) statsDiv.appendChild(ratingEl);
    textCell.appendChild(statsDiv);

    // Compose row: [image, text cell]
    return [img, textCell];
  }).filter(Boolean);

  // Compose table cells
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
