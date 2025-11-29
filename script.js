// ...existing code...
// Mobile menu toggle + close on link click
(function () {
    const btn = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.nav-menu');
    if (!btn || !menu) return;
    btn.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    // close menu when any nav link is clicked (mobile)
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
            if (menu.classList.contains('open')) {
                menu.classList.remove('open');
                btn.setAttribute('aria-expanded', 'false');
            }
        });
    });
})();

// Gallery show/hide toggle
(function () {
    const openBtn = document.getElementById('open-gallery-btn');
    const closeBtn = document.getElementById('close-gallery-btn');
    const gallery = document.getElementById('gallery');
    if (!openBtn || !gallery) return;

    function showGallery() {
        gallery.classList.remove('hidden');
        gallery.classList.add('show');
        openBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => gallery.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
    }

    function hideGallery() {
        gallery.classList.remove('show');
        gallery.classList.add('hidden');
        if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    }

    openBtn.addEventListener('click', showGallery);
    if (closeBtn) closeBtn.addEventListener('click', hideGallery);

    gallery.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        // keep gallery open if the link navigates away
    }));
})();

// ...existing code...
// Contact form: submit to Formspree and clear fields on success
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    // find the contact form that posts to Formspree
    const contactForm = document.querySelector('form[action^="https://formspree.io"]');
    if (!contactForm) return;

    // create a status element (if not already present)
    let statusEl = document.getElementById('form-status');
    if (!statusEl) {
      statusEl = document.createElement('div');
      statusEl.id = 'form-status';
      statusEl.setAttribute('role', 'status');
      statusEl.setAttribute('aria-live', 'polite');
      statusEl.style.marginBottom = '.5rem';
      // insert status above submit button if available
      const submitBtn = contactForm.querySelector('.submit-btn');
      if (submitBtn) contactForm.insertBefore(statusEl, submitBtn);
      else contactForm.prepend(statusEl);
    }

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      statusEl.textContent = 'Sending…';
      const submitBtn = contactForm.querySelector('.submit-btn');
      if (submitBtn) submitBtn.disabled = true;

      const data = new FormData(contactForm);

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          statusEl.textContent = 'Thanks — your message was sent.';
          // clear form fields so client details disappear
          contactForm.reset();
        } else {
          const json = await res.json().catch(() => ({}));
          statusEl.textContent = json?.error || 'Oops — something went wrong. Please try again.';
        }
      } catch (err) {
        statusEl.textContent = 'Network error — please try again later.';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        // clear the message after a short delay
        setTimeout(() => { statusEl.textContent = ''; }, 6000);
      }
    });
  });
})();