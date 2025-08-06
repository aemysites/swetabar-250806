/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid with columns
  const grid = element.querySelector('.aem-Grid');
  if (!grid) return;
  // Get the direct children of the grid - each is a column (logo, nav, search)
  const columns = Array.from(grid.children);
  // Compose the header row exactly as required
  const headerRow = ['Columns (columns9)'];
  // Compose the content row: one cell per column, referencing existing elements
  const contentRow = columns.map(col => col);
  // Create the block table in the required format
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  // Replace the original element with the constructed block table
  element.replaceWith(table);
}
