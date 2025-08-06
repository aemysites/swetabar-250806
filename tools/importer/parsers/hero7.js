/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must exactly match the example: 'Hero (hero7)'
  const headerRow = ['Hero (hero7)'];

  // Find the background image (optional)
  let bgImg = '';
  const imgContainer = element.querySelector('.cmp-teaser__image');
  if (imgContainer) {
    const img = imgContainer.querySelector('img');
    if (img) bgImg = img;
  }

  // Find the text content (Title, Description)
  const textContent = [];
  const contentDiv = element.querySelector('.cmp-teaser__content');
  if (contentDiv) {
    // Title, usually a heading
    const title = contentDiv.querySelector('.cmp-teaser__title');
    if (title) {
      textContent.push(title);
    }
    // Subheading and any paragraphs
    const description = contentDiv.querySelector('.cmp-teaser__description');
    if (description) {
      // Push all child nodes (could be paragraphs, spans, text, etc.)
      description.childNodes.forEach((node) => {
        textContent.push(node);
      });
    }
  }

  // Build block table: 1 column, 3 rows as in the example
  const cells = [
    headerRow,
    [bgImg],
    [textContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
