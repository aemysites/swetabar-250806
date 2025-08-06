/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the accordion block
  const accordion = element.querySelector('.cmp-accordion');
  if (!accordion) return;

  const rows = [];
  // Block name header row
  rows.push(['Accordion']);

  // Find all direct accordion items
  const items = accordion.querySelectorAll(':scope > .cmp-accordion__item');
  items.forEach((item) => {
    // Title: get the actual DOM element for semantic formatting
    const button = item.querySelector('button.cmp-accordion__button');
    let titleCell = '';
    if (button) {
      // Use the button's child span that holds the title
      const titleSpan = button.querySelector('.cmp-accordion__title');
      if (titleSpan) {
        // Reference the <span> directly to preserve markup
        titleCell = titleSpan;
      } else {
        // fallback: use button's textContent
        titleCell = document.createTextNode(button.textContent.trim());
      }
    }
    // Content: Panel, reference its real contents
    let contentCell = '';
    const panel = item.querySelector('[data-cmp-hook-accordion="panel"]');
    if (panel) {
      // Many accordions have a single container.responsivegrid inside panel
      // We want real content, so look for all direct children of the deepest .cmp-container in the panel
      let mainContent = panel;
      // Drill down to .cmp-container if exists
      let innerContainer = panel.querySelector(':scope > .container.responsivegrid > .cmp-container');
      if (innerContainer) {
        mainContent = innerContainer;
      } else {
        // fallback: first .cmp-container
        const cmpContainer = panel.querySelector(':scope > .cmp-container');
        if (cmpContainer) {
          mainContent = cmpContainer;
        }
      }
      // Use all direct children (e.g., .text blocks)
      const children = Array.from(mainContent.children).filter(e => e);
      if (children.length === 1) {
        contentCell = children[0];
      } else if (children.length > 1) {
        contentCell = children;
      } else {
        contentCell = '';
      }
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the accordion block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.parentNode.replaceChild(table, element);
}
