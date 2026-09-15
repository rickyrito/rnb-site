// Gallery Lightbox
const galleryImages = [
  { src: 'assets/img/gallery/galeria-1.jpeg', caption: 'Showroom de Electrodomésticos' },
  { src: 'assets/img/gallery/galeria-2.jpeg', caption: 'Centro de Operações' },
  { src: 'assets/img/gallery/galeria-3.jpeg', caption: 'Linha de Reparação Especializada' },
  { src: 'assets/img/gallery/galeria-4.jpeg', caption: 'Showroom Principal' },
  { src: 'assets/img/gallery/galeria-5.jpeg', caption: 'Área de Assistência Técnica' },
  { src: 'assets/img/gallery/galeria-6.jpeg', caption: 'Sede da RNB' }
];

let currentImageIndex = 0;

function openLightbox(index) {
  currentImageIndex = index;
  const lightbox = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  img.src = galleryImages[index].src;
  caption.textContent = galleryImages[index].caption;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  img.src = galleryImages[currentImageIndex].src;
  caption.textContent = galleryImages[currentImageIndex].caption;
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  img.src = galleryImages[currentImageIndex].src;
  caption.textContent = galleryImages[currentImageIndex].caption;
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeLightbox();
  }
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Toggle menu
  navToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', 
      mainNav.classList.contains('active') ? 'true' : 'false');
  });
  
  // Close menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      mainNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnToggle = navToggle.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnToggle && mainNav.classList.contains('active')) {
      mainNav.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Update year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
