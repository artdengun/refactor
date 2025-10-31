(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle, .faq-item .faq-header').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);


  const counters = document.querySelectorAll('.stats-item h3');
  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText.replace(/[^\d]/g, '');
      const increment = target / 200;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment) + '+';
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target + '+';
      }
    };
    updateCount();
  });

 document.getElementById('uploadForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const file = document.getElementById('csvFile').files[0];
      if (!file) {
        alert('Silakan pilih file CSV terlebih dahulu.');
        return;
      }
      alert(`File "${file.name}" berhasil diunggah! (Simulasi, backend processing belum diaktifkan)`);
    });

    document.getElementById('viewCurrentDataBtn').addEventListener('click', function () {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });

    document.getElementById('uploadCsvBtn').addEventListener('click', function () {
      alert('Upload CSV baru (fitur coming soon)');
    });

    document.getElementById('viewCurrentDataBtn').addEventListener('click', function () {
      alert('Menampilkan data analisis saat ini...');
    });

    document.getElementById('addCsvBtn').addEventListener('click', function () {
      alert('Tambah data CSV untuk analisis baru...');
    });

    document.getElementById('uploadForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const fileInput = document.getElementById('csvFile');
      const file = fileInput.files[0];
      if (!file) {
        alert('⚠️ Silakan pilih file CSV terlebih dahulu.');
        return;
      }

      const steps = document.querySelectorAll('.status-badge');
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressText');
      let i = 0;

      progressText.textContent = 'Memulai proses analisis...';
      let progress = 0;
      const interval = setInterval(() => {
        if (i > 0) {
          steps[i - 1].className = 'status-badge done';
          steps[i - 1].textContent = 'Selesai ✅';
        }
        if (i >= steps.length) {
          clearInterval(interval);
          progressBar.style.width = '100%';
          progressText.textContent = '✅ Analisis selesai!';
          return;
        }
        steps[i].className = 'status-badge processing';
        steps[i].textContent = 'Sedang Diproses...';
        progress += (100 / steps.length);
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `Tahap ${i + 1} dari ${steps.length}: ${steps[i].previousSibling.textContent.trim()}`;
        i++;
      }, 1200);

      // tampilkan preview csv
      const reader = new FileReader();
      reader.onload = function (e) {
        const text = e.target.result;
        const lines = text.trim().split('\n');
        const headers = lines[0].split(',');
        const previewData = lines.slice(1, 6);

        const previewDiv = document.getElementById('csvPreview');
        const thead = document.querySelector('#previewTable thead');
        const tbody = document.querySelector('#previewTable tbody');

        thead.innerHTML = '';
        tbody.innerHTML = '';

        let headerRow = '<tr>';
        headers.forEach(h => headerRow += `<th>${h.trim()}</th>`);
        headerRow += '</tr>';
        thead.innerHTML = headerRow;

        previewData.forEach(line => {
          const cols = line.split(',');
          let row = '<tr>';
          cols.forEach(c => row += `<td>${c.trim()}</td>`);
          row += '</tr>';
          tbody.innerHTML += row;
        });

        previewDiv.style.display = 'block';
      };
      reader.readAsText(file);
    });

    document.getElementById('viewCurrentDataBtn').addEventListener('click', function () {
      window.location.href = "hasil_ulasan.html";
    });
})();