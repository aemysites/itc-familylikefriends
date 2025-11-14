/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all tab labels and corresponding panels
  const tabsRoot = element.querySelector('.cmp-tabs');
  if (!tabsRoot) return;

  // Tab labels (li elements inside ol[role="tablist"])
  const tabLabels = Array.from(tabsRoot.querySelectorAll('ol[role="tablist"] > li[role="tab"]'));
  // Tab panels (div[role="tabpanel"] inside tabsRoot)
  const tabPanels = Array.from(tabsRoot.querySelectorAll('div[role="tabpanel"]'));

  // Defensive: Only process if we have at least one tab label and panel
  if (!tabLabels.length || !tabPanels.length) return;

  // Build rows for each tab
  const rows = tabLabels.map((tabLabel, idx) => {
    // Find the corresponding panel by aria-controls/id
    const panelId = tabLabel.getAttribute('aria-controls');
    const panel = tabPanels.find(p => p.id === panelId);
    // Defensive: If no panel found, use empty string
    let tabContent = '';
    if (panel) {
      // Use the entire panel element as tab content (preserves structure)
      tabContent = panel;
    }
    // Each row: [Tab Label, Tab Content]
    return [tabLabel.textContent.trim(), tabContent];
  });

  // Table header row
  const headerRow = ['Tabs (tabs6)'];
  const cells = [headerRow, ...rows];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
