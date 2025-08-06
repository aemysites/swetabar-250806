/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row with block name, as in the example
  const headerRow = ['Hero (hero4)'];

  // 2. Second row: background image only if present
  let imageEl = null;
  const imgWrap = element.querySelector('.cmp-teaser__image');
  if (imgWrap) {
    const innerImgDiv = imgWrap.querySelector('[data-cmp-is="image"]');
    if (innerImgDiv) {
      const img = innerImgDiv.querySelector('img');
      if (img) imageEl = img;
    }
  }

  // 3. Third row: title, description, CTA (if present)
  const textContent = [];
  const contentDiv = element.querySelector('.cmp-teaser__content');
  if (contentDiv) {
    const title = contentDiv.querySelector('.cmp-teaser__title');
    if (title) textContent.push(title);
    const desc = contentDiv.querySelector('.cmp-teaser__description');
    if (desc) textContent.push(desc);
    const ctaDiv = contentDiv.querySelector('.cmp-teaser__action-container');
    if (ctaDiv) {
      const cta = ctaDiv.querySelector('a');
      if (cta) textContent.push(cta);
    }
  }

  // Compose table rows
  const rows = [
    headerRow,
    [imageEl || ''],
    [textContent.length ? textContent : '']
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
