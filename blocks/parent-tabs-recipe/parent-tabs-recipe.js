// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // Find all sections with parent-block metadata pointing to this block
  const main = block.closest('main');
  const blockName = 'parent-tabs-recipe';
  const childSections = main ? [...main.querySelectorAll('.section')].filter(
    (section) => section.dataset.parentBlock === blockName,
  ) : [];

  // Aggregate child sections into this parent block
  if (childSections.length > 0) {
    // Clear the block (it's empty from markdown)
    block.innerHTML = '';

    // Move each child section's content into the parent block
    childSections.forEach((section) => {
      const heading = section.querySelector('h2, h3, h4, h5, h6');
      // Get all content divs except section-metadata
      const contentDivs = [...section.querySelectorAll(':scope > div')].filter(
        (div) => !div.classList.contains('section-metadata'),
      );

      // Create a wrapper div for this tab panel
      const panelWrapper = document.createElement('div');

      // Add the heading (will become tab label)
      if (heading) {
        const headingClone = heading.cloneNode(true);
        panelWrapper.appendChild(headingClone);
      }

      // Add all content divs
      contentDivs.forEach((content) => {
        const contentClone = content.cloneNode(true);
        panelWrapper.appendChild(contentClone);
      });

      block.appendChild(panelWrapper);

      // Remove the original section since it's now part of the parent block
      section.remove();
    });
  }

  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'parent-tabs-recipe-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'parent-tabs-recipe-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'parent-tabs-recipe-tab';
    button.id = `tab-${id}`;

    if (tabpanel.lastElementChild) {
      moveInstrumentation(tab.parentElement, tabpanel.lastElementChild);
    }
    button.innerHTML = tab.innerHTML;

    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
    const buttonP = button.querySelector('p');
    if (buttonP) {
      moveInstrumentation(buttonP, null);
    }
  });

  block.prepend(tablist);
}
