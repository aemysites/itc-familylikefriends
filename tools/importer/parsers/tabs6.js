/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tabs root container
  const tabsRoot = element.querySelector('.cmp-tabs');
  if (!tabsRoot) return;

  // Find tab labels (li[role="tab"])
  const tabList = tabsRoot.querySelector('.cmp-tabs__tablist');
  if (!tabList) return;
  const tabLabels = Array.from(tabList.querySelectorAll('li[role="tab"]'));

  // Find corresponding tab panels (div[role="tabpanel"])
  const tabPanels = Array.from(tabsRoot.querySelectorAll('div[role="tabpanel"]'));

  // Defensive: Ensure we have matching labels and panels
  if (tabLabels.length !== tabPanels.length || tabLabels.length === 0) return;

  // Table header must match block name exactly
  const headerRow = ['Tabs (tabs6)'];
  const rows = [headerRow];

  // For each tab, add a row: [label, content]
  tabLabels.forEach((labelEl, idx) => {
    // Tab label (text only, dynamic)
    const tabLabel = labelEl.textContent.trim();
    // Tab content: reference the panel element directly
    const tabPanel = tabPanels[idx];
    // Defensive: If panel is missing, skip
    if (!tabPanel) return;
    rows.push([tabLabel, tabPanel]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
