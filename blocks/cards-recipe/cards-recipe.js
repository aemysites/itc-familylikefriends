import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* Transform 2-column table into card structure */
  const ul = document.createElement('ul');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    // Create card container div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'cards-recipe-card';

    // Get both columns
    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    if (!imageCell || !contentCell) return;

    // Extract image from first column
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'cards-recipe-card-image';
      imageDiv.appendChild(picture.cloneNode(true));
      cardDiv.appendChild(imageDiv);
    }

    // Extract content from second column
    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'cards-recipe-card-body';

    // Get all paragraphs from content cell
    const contentChildren = [...contentCell.children];
    contentChildren.forEach((child) => {
      bodyDiv.appendChild(child.cloneNode(true));
    });

    cardDiv.appendChild(bodyDiv);
    li.appendChild(cardDiv);
    ul.append(li);
  });

  // Optimize images
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  block.append(ul);
}
