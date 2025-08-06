/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the carousel block
  const headerRow = ['Carousel (carousel2)'];

  // Find the image for the slide (first cell)
  let imageEl = null;
  const imageDiv = element.querySelector('.cmp-teaser__image');
  if (imageDiv) {
    const img = imageDiv.querySelector('img');
    if (img) imageEl = img;
  }

  // Text content (second cell)
  const content = element.querySelector('.cmp-teaser__content');
  const textContent = [];
  if (content) {
    // Pretitle (e.g., 'Featured Article')
    const pretitle = content.querySelector('.cmp-teaser__pretitle');
    if (pretitle && pretitle.textContent.trim()) {
      textContent.push(pretitle);
    }

    // Title (as Heading)
    const title = content.querySelector('.cmp-teaser__title');
    if (title && title.textContent.trim()) {
      textContent.push(title);
    }

    // Description
    const desc = content.querySelector('.cmp-teaser__description');
    if (desc && desc.textContent.trim()) {
      textContent.push(desc);
    }

    // CTA (usually a link)
    const cta = content.querySelector('.cmp-teaser__action-link');
    if (cta && cta.textContent.trim()) {
      // Place CTA on a new line at the end
      textContent.push(cta);
    }
  }

  // Build row for this slide: [imageEl, textContent]
  const slideRow = [imageEl, textContent];

  // Final table
  const tableCells = [headerRow, slideRow];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
