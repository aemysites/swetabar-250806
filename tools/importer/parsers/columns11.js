/* global WebImporter */
export default function parse(element, { document }) {
  // Find the innermost grid that contains the footer columns
  const grid = element.querySelector('.aem-Grid.aem-Grid--12');
  if (!grid) return;

  // --- LEFT COLUMN: Logo ---
  const logoCol = grid.querySelector('.cmp-image--logo');
  let logo = null;
  if (logoCol) {
    logo = logoCol;
  }

  // --- CENTER COLUMN: Navigation ---
  const navCol = grid.querySelector('.cmp-navigation--footer');
  let nav = null;
  if (navCol) {
    nav = navCol.querySelector('nav') || navCol;
  }

  // --- RIGHT COLUMN: Follow Us title & Social buttons ---
  const titleCol = grid.querySelector('.cmp-title--right');
  let title = null;
  if (titleCol) {
    title = titleCol.querySelector('.cmp-title') || titleCol;
  }
  const btnListCol = grid.querySelector('.cmp-buildingblock--btn-list');
  let btnList = null;
  if (btnListCol) {
    btnList = btnListCol.querySelector('.aem-Grid') || btnListCol;
  }
  const rightColumnContent = [];
  if (title) rightColumnContent.push(title);
  if (btnList) rightColumnContent.push(btnList);

  // Build the main content row as three columns
  const contentRow = [logo, nav, rightColumnContent];

  // --- BOTTOM ROW: Copyright/text ---
  const textCol = element.querySelector('.cmp-text--font-xsmall');
  let text = null;
  if (textCol) {
    text = textCol.querySelector('.cmp-text') || textCol;
  }
  // If text exists, span all columns (as in the screenshot)
  const bottomRow = text ? [text, '', ''] : null;

  // --- TABLE HEADER ROW ---
  // Header row is a single cell spanning all columns
  const headerRow = ['Columns (columns11)'];

  // --- BUILD FINAL CELLS ---
  const cells = [headerRow, contentRow];
  if (bottomRow) cells.push(bottomRow);

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
