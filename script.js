const header = document.querySelector('.site-header');
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const navAnchors = document.querySelectorAll('a[href^="#"]');

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const galleryItems = document.querySelectorAll('.gallery-item');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

const onScroll = () => {
  if (window.scrollY > 24) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
};

window.addEventListener('scroll', onScroll);
onScroll();

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  if (expanded) {
    mobileNav.hidden = true;
  } else {
    mobileNav.hidden = false;
  }
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.hidden = true;
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') {
      return;
    }

    const target = document.querySelector(targetId);
    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const openLightbox = (src, alt) => {
  lightboxImage.src = src;
  lightboxImage.alt = alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImage.src = '';
  document.body.style.overflow = '';
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => {
    const image = item.querySelector('img');
    const source = item.dataset.image || image?.src;
    const alt = image?.alt || 'Gallery image';
    if (source) {
      openLightbox(source, alt);
    }
  });
});

lightboxClose?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !lightbox.hidden) {
    closeLightbox();
  }
});
