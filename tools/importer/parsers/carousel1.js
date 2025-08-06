/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the carousel root
  const carousel = element.querySelector('.cmp-carousel');
  if (!carousel) return;

  // Get all slides
  const slideEls = carousel.querySelectorAll('.cmp-carousel__content > .cmp-carousel__item');

  // Build rows: first row is the header
  const rows = [];
  rows.push(['Carousel (carousel1)']);

  slideEls.forEach((slide) => {
    // First column: image (img element only, not container)
    let img = null;
    const teaserImage = slide.querySelector('.cmp-teaser__image');
    if (teaserImage) {
      img = teaserImage.querySelector('img');
    }

    // Second column: text content (array of references to original elements if possible)
    const teaserContent = slide.querySelector('.cmp-teaser__content');
    const contentEls = [];
    if (teaserContent) {
      // Title (Heading, keep original element & level)
      const heading = teaserContent.querySelector('.cmp-teaser__title');
      if (heading) {
        contentEls.push(heading);
      }
      // Description
      const desc = teaserContent.querySelector('.cmp-teaser__description');
      if (desc) {
        // If it contains children (e.g. <p>), keep them; otherwise, use as plain text
        if (desc.children.length > 0) {
          Array.from(desc.childNodes).forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              contentEls.push(node);
            } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
              contentEls.push(document.createTextNode(node.textContent));
            }
          });
        } else if (desc.textContent.trim() !== '') {
          contentEls.push(document.createTextNode(desc.textContent));
        }
      }
      // CTA (call-to-action) link at the bottom
      const cta = teaserContent.querySelector('.cmp-teaser__action-container a');
      if (cta) {
        contentEls.push(cta);
      }
    }

    // Conform to structure: [image, text array or empty string]
    rows.push([
      img || '',
      contentEls.length > 0 ? contentEls : ''
    ]);
  });

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
