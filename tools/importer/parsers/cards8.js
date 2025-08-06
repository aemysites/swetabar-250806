/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as in example
  const headerRow = ['Cards (cards8)'];
  const cards = [];
  // Locate the list of cards
  const ul = element.querySelector('ul.cmp-image-list');
  if (!ul) return;
  const items = ul.querySelectorAll('li.cmp-image-list__item');
  items.forEach(li => {
    // IMAGE CELL: Use the <img> element
    const img = li.querySelector('.cmp-image-list__item-image img');
    // TEXT CELL: Title (strong), then description (if available)
    const textCellElements = [];
    // Title
    const titleLink = li.querySelector('.cmp-image-list__item-title-link');
    if (titleLink) {
      const titleSpan = titleLink.querySelector('.cmp-image-list__item-title');
      if (titleSpan) {
        const strong = document.createElement('strong');
        strong.textContent = titleSpan.textContent;
        textCellElements.push(strong);
      }
    }
    // Description
    const descSpan = li.querySelector('.cmp-image-list__item-description');
    if (descSpan && descSpan.textContent.trim() !== '') {
      // Add a space or line break between title and description
      if (textCellElements.length > 0) textCellElements.push(document.createElement('br'));
      textCellElements.push(descSpan);
    }
    // Ensure both image and text cell are present, otherwise skip empty card
    if (img && textCellElements.length) {
      cards.push([img, textCellElements]);
    }
  });
  if (cards.length === 0) return;
  const tableArray = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(block);
}