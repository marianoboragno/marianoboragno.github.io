// Navigation and State Management
function navigateTo(sectionId) {
  const sections = document.querySelectorAll('.content-section');
  const navLinks = document.querySelectorAll('.nav-link');
  const sidebar = document.getElementById('sidebar');

  // Update URL hash without forcing jump
  window.history.pushState(null, null, `#${sectionId}`);

  // Activate target section
  sections.forEach(section => {
    if (section.id === sectionId) {
      section.classList.add('active');
    } else {
      section.classList.remove('active');
    }
  });

  // Update active nav link
  navLinks.forEach(link => {
    if (link.dataset.target === sectionId) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // Close mobile sidebar if open
  if (sidebar && sidebar.classList.contains('open')) {
    sidebar.classList.remove('open');
  }

  // Scroll to top of content smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initial setup on DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Navigation button listeners
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      if (target) {
        navigateTo(target);
      }
    });
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Close sidebar on click outside on mobile
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target) && sidebar.classList.contains('open')) {
          sidebar.classList.remove('open');
        }
      }
    });
  }

  // Handle URL hash on load or back/forward
  function handleHash() {
    const hash = window.location.hash.replace('#', '');
    const validSections = ['inicio', 'que-es-un-puyo', 'cuando-estan-las-papas'];
    if (validSections.includes(hash)) {
      navigateTo(hash);
    } else {
      navigateTo('inicio');
    }
  }

  window.addEventListener('popstate', handleHash);
  handleHash();

  // Potato Scanner Interactive Demo
  const scanBtn = document.getElementById('scanBtn');
  const scanResult = document.getElementById('scanResult');
  const scanLoader = document.getElementById('scanLoader');
  const scanVerdict = document.getElementById('scanVerdict');

  if (scanBtn && scanResult && scanLoader && scanVerdict) {
    scanBtn.addEventListener('click', () => {
      scanResult.classList.remove('hidden');
      scanLoader.classList.remove('hidden');
      scanVerdict.classList.add('hidden');
      scanBtn.disabled = true;
      scanBtn.style.opacity = '0.7';

      setTimeout(() => {
        scanLoader.classList.add('hidden');
        scanVerdict.classList.remove('hidden');
        scanBtn.disabled = false;
        scanBtn.style.opacity = '1';
      }, 1200);
    });
  }
});
