/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as shown in the example
  const headerRow = ['Cards (cards5)'];
  const rows = [headerRow];

  // Get all the list item cards
  const items = element.querySelectorAll('ul.cmp-image-list > li.cmp-image-list__item');
  items.forEach((item) => {
    // First cell: image (reference the img element from the DOM)
    let img = null;
    const imgLink = item.querySelector('.cmp-image-list__item-image-link');
    if (imgLink) {
      img = imgLink.querySelector('img');
    }

    // Second cell: text content
    const cellContent = [];
    // Title: bold, and if there is a link, wrap in anchor
    const titleLink = item.querySelector('.cmp-image-list__item-title-link');
    const titleSpan = item.querySelector('.cmp-image-list__item-title');
    if (titleSpan) {
      const strong = document.createElement('strong');
      strong.textContent = titleSpan.textContent;
      if (titleLink) {
        const a = document.createElement('a');
        a.href = titleLink.getAttribute('href');
        a.appendChild(strong);
        cellContent.push(a);
      } else {
        cellContent.push(strong);
      }
    }
    // Description: below the heading
    const descSpan = item.querySelector('.cmp-image-list__item-description');
    if (descSpan) {
      const descDiv = document.createElement('div');
      descDiv.textContent = descSpan.textContent;
      cellContent.push(descDiv);
    }
    rows.push([
      img,
      cellContent
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
