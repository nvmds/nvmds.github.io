// Simple lightbox for article images and carousels.
class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    this.createLightboxHTML();
    this.addEventListeners();
    this.addKeyboardNavigation();
  }

  createLightboxHTML() {
    const lightboxHTML = `
      <div id="lightbox" class="lightbox">
        <div class="lightbox-content">
          <button class="lightbox-close" title="Close" aria-label="Close">&#10005;</button>
          <button class="lightbox-nav lightbox-prev" title="Previous" aria-label="Previous">&#8249;</button>
          <button class="lightbox-nav lightbox-next" title="Next" aria-label="Next">&#8250;</button>
          <img id="lightbox-image" src="" alt="">
          <div class="lightbox-caption" id="lightbox-caption"></div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightbox-image');
    this.lightboxCaption = document.getElementById('lightbox-caption');
  }

  addEventListeners() {
    this.carouselGroups = [];
    document.querySelectorAll('.image-gallery-index').forEach((carousel) => {
      const images = Array.from(carousel.querySelectorAll('a')).map((link) => {
        const img = link.querySelector('img');
        return { src: img.src, alt: img.alt || link.title || '', element: link };
      });
      if (images.length === 0) return;
      const groupIndex = this.carouselGroups.push(images) - 1;
      images.forEach((image, imageIndex) => {
        image.element.addEventListener('click', (e) => {
          e.preventDefault();
          this.openCarousel(groupIndex, imageIndex);
        });
      });
    });

    document.querySelectorAll('.nm-prose img').forEach((img) => {
      if (img.closest('.image-gallery-index') || img.classList.contains('no-lightbox')) return;
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => this.openSingle(img.src, img.alt));
    });

    this.lightbox.querySelector('.lightbox-close').addEventListener('click', () => this.close());
    this.lightbox.querySelector('.lightbox-prev').addEventListener('click', () => this.prev());
    this.lightbox.querySelector('.lightbox-next').addEventListener('click', () => this.next());
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });
  }

  addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  }

  openCarousel(groupIndex, imageIndex) {
    this.currentGroup = groupIndex;
    this.currentIndex = imageIndex;
    this.currentImages = this.carouselGroups[groupIndex];
    this.render();
  }

  openSingle(src, alt) {
    this.currentGroup = null;
    this.currentImages = [{ src, alt }];
    this.currentIndex = 0;
    this.render();
  }

  render() {
    const image = this.currentImages[this.currentIndex];
    this.lightboxImage.src = image.src;
    this.lightboxImage.alt = image.alt;
    this.lightboxCaption.textContent = image.alt;
    this.lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    this.updateNavigation();
  }

  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    const newIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentImages.length - 1;
    if (this.currentGroup !== null) this.openCarousel(this.currentGroup, newIndex);
    else { this.currentIndex = newIndex; this.render(); }
  }

  next() {
    const newIndex = this.currentIndex < this.currentImages.length - 1 ? this.currentIndex + 1 : 0;
    if (this.currentGroup !== null) this.openCarousel(this.currentGroup, newIndex);
    else { this.currentIndex = newIndex; this.render(); }
  }

  updateNavigation() {
    const prevBtn = this.lightbox.querySelector('.lightbox-prev');
    const nextBtn = this.lightbox.querySelector('.lightbox-next');
    const multi = this.currentImages.length > 1;
    prevBtn.style.display = multi ? 'flex' : 'none';
    nextBtn.style.display = multi ? 'flex' : 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => new Lightbox());
