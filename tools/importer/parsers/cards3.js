/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cards3)'];
  const rows = [];
  // Get all cards (li elements)
  const ul = element.querySelector('ul.cmp-image-list');
  if (!ul) return;
  const cards = ul.querySelectorAll('li.cmp-image-list__item');
  cards.forEach((card) => {
    // --- First column: the image ---
    let img = null;
    const imgLink = card.querySelector('.cmp-image-list__item-image-link');
    if (imgLink) {
      const imgDiv = imgLink.querySelector('.cmp-image-list__item-image');
      if (imgDiv) {
        img = imgDiv.querySelector('img');
      }
    }
    // --- Second column: text content ---
    const textContent = [];
    // Title (styled as heading, bold)
    const titleLink = card.querySelector('.cmp-image-list__item-title-link');
    if (titleLink) {
      // Use <strong> for header effect (matches visual in example)
      const strong = document.createElement('strong');
      strong.textContent = titleLink.textContent.trim();
      textContent.push(strong);
    }
    // Description
    const desc = card.querySelector('.cmp-image-list__item-description');
    if (desc) {
      // Wrap in <p> for block display
      const p = document.createElement('p');
      p.textContent = desc.textContent.trim();
      textContent.push(p);
    }
    // Row for this card
    rows.push([img, textContent]);
  });
  // Build table as per instructions
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  // Replace original element
  element.replaceWith(table);
}
