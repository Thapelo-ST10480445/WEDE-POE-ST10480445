/* ==========================================================================
   HAVEN COMMUNITY FOOD BANK — MAIN SCRIPT
   Handles: mobile navigation, interactive Leaflet map (contact page),
   form validation + simulated AJAX submission, newsletter signup,
   back-to-top, scroll-reveal animations, FAQ accordion + live search,
   distribution-schedule day filter, photo gallery + lightbox, and
   dynamically-rendered homepage news.
   No backend exists yet, so form "submission" is simulated with a
   Promise-based delay that mimics a real AJAX/fetch round trip — swap the
   TODO in handleFormSubmit() for a real fetch() call once a backend or a
   service like Netlify Forms is wired up.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------------------
       1. MOBILE NAVIGATION TOGGLE
       --------------------------------------------------------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = nav.classList.toggle('nav-open');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-times', isOpen);
            }
        });

        // Close the mobile menu after a link is tapped
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                nav.classList.remove('nav-open');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) { icon.classList.add('fa-bars'); icon.classList.remove('fa-times'); }
            });
        });
    }

    /* ---------------------------------------------------------------------
       2. SMOOTH SCROLL — hero "scroll to explore" indicator
       --------------------------------------------------------------------- */
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.style.cursor = 'pointer';
        scrollIndicator.addEventListener('click', function () {
            const hero = document.querySelector('.hero');
            const next = hero ? hero.nextElementSibling : null;
            if (next) next.scrollIntoView({ behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------------------
       3. BACK TO TOP BUTTON
       --------------------------------------------------------------------- */
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('visible', window.scrollY > 480);
        });
        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ---------------------------------------------------------------------
       4. INTERACTIVE LEAFLET MAP (contact.html only)
       --------------------------------------------------------------------- */
    const mapEl = document.getElementById('leafletMap');
    if (mapEl && window.L) {
        const locations = [
            {
                name: 'Philippi Hub',
                coords: [-34.0340, 18.5540],
                address: '123 Main Rd, Philippi, 7785',
                hours: 'Mon, Wed, Sat (10am–2pm)',
                contact: 'Nomsa · (021) 123-4567'
            },
            {
                name: 'Khayelitsha Satellite',
                coords: [-34.0356, 18.6714],
                address: '45 Mandela Ave, Khayelitsha, 7784',
                hours: 'Tue, Fri (11am–3pm)',
                contact: 'Peter · (021) 123-4568'
            },
            {
                name: 'Mitchells Plain Satellite',
                coords: [-34.0356, 18.6217],
                address: '78 Second Ave, Mitchells Plain, 7785',
                hours: 'Wed, Thu (9am–1pm)',
                contact: 'Thandi · (021) 123-4569'
            }
        ];

        const map = L.map('leafletMap', { scrollWheelZoom: false }).setView([-34.0345, 18.615], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19

        }).addTo(map);

        const markerIcon = L.divIcon({
            className: 'haven-map-pin',
            html: '<i class="fas fa-map-marker-alt"></i>',
            iconSize: [30, 30],
            iconAnchor: [15, 28]
        });

        const bounds = [];
        locations.forEach(function (loc) {
            const marker = L.marker(loc.coords, { icon: markerIcon }).addTo(map);
            marker.bindPopup(
                '<strong>' + loc.name + '</strong><br>' +
                loc.address + '<br>' +
                '<em>' + loc.hours + '</em><br>' +
                loc.contact +
                '<br><a href="https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent(loc.address) + '" target="_blank" rel="noopener">Get Directions &rarr;</a>'
            );
            bounds.push(loc.coords);
        });

        map.fitBounds(bounds, { padding: [40, 40] });

        // Re-enable scroll zoom once the user actually clicks into the map
        map.on('focus', function () { map.scrollWheelZoom.enable(); });
        map.on('blur', function () { map.scrollWheelZoom.disable(); });
    }

    /* ---------------------------------------------------------------------
       5. FORM VALIDATION + SUBMIT FEEDBACK (contact + volunteer forms)
       --------------------------------------------------------------------- */
    function showFormMessage(form, type, text) {
        let box = form.querySelector('.form-message');
        if (!box) {
            box = document.createElement('div');
            box.className = 'form-message';
            form.insertBefore(box, form.firstChild);
        }
        box.className = 'form-message ' + type;
        box.innerHTML = (type === 'success' ? '<i class="fas fa-check-circle"></i> ' : '<i class="fas fa-exclamation-circle"></i> ') + text;
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    function clearFieldErrors(form) {
        form.querySelectorAll('.field-error').forEach(function (el) { el.remove(); });
        form.querySelectorAll('.has-error').forEach(function (el) { el.classList.remove('has-error'); });
    }

    function markFieldError(field, message) {
        field.classList.add('has-error');
        const note = document.createElement('span');
        note.className = 'field-error';
        note.textContent = message;
        field.insertAdjacentElement('afterend', note);
    }

    // Simulates an asynchronous AJAX submission (e.g. fetch() to a backend).
    // Returns a Promise that resolves after a short delay, the same shape a
    // real fetch() call would have — so swapping in a real endpoint later is
    // a one-line change (replace the Promise body with an actual fetch()).
    function simulateAjaxSubmit(formData) {
        return new Promise(function (resolve) {
            setTimeout(function () {
                // TODO: replace this whole function body with, e.g.:
                //   return fetch('/api/contact', { method: 'POST', body: formData })
                //       .then(res => res.json());
                resolve({ ok: true });
            }, 900);
        });
    }

    function handleFormSubmit(form, options) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            clearFieldErrors(form);
            let valid = true;

            // Standard required-field check
            form.querySelectorAll('[required]').forEach(function (field) {
                if (field.type === 'checkbox' || field.type === 'radio') return;
                if (!field.value.trim()) {
                    valid = false;
                    markFieldError(field, 'This field is required.');
                }
            });

            // Email format
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                valid = false;
                markFieldError(emailField, 'Enter a valid email address.');
            }

            // Custom checks (e.g. "select at least one availability day")
            if (options && options.customCheck) {
                const customError = options.customCheck(form);
                if (customError) {
                    valid = false;
                    showFormMessage(form, 'error', customError);
                }
            }

            if (!valid) {
                if (!form.querySelector('.form-message.error')) {
                    showFormMessage(form, 'error', 'Please fix the highlighted fields and try again.');
                }
                return;
            }

            // Asynchronous "submission" — disable the button, send the data
            // off, and only show success once the (simulated) response comes
            // back, exactly like a real AJAX/fetch submission would.
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            }

            simulateAjaxSubmit(new FormData(form))
                .then(function (response) {
                    if (response && response.ok) {
                        showFormMessage(form, 'success', (options && options.successText) || 'Thank you — your message has been sent!');
                        form.reset();
                    } else {
                        showFormMessage(form, 'error', 'Something went wrong sending your message. Please try again.');
                    }
                })
                .catch(function () {
                    showFormMessage(form, 'error', 'Something went wrong sending your message. Please try again.');
                })
                .finally(function () {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalBtnHtml;
                    }
                });
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        handleFormSubmit(contactForm, {
            successText: 'Thanks for reaching out! We\'ll get back to you within 2 business days.'
        });
    }

    const volunteerForm = document.getElementById('volunteerForm');
    if (volunteerForm) {
        handleFormSubmit(volunteerForm, {
            successText: 'Welcome aboard! We\'ll be in touch about your first shift shortly.',
            customCheck: function (form) {
                const checked = form.querySelectorAll('input[name="availability"]:checked');
                if (checked.length === 0) return 'Please select at least one day of availability.';
                return null;
            }
        });
    }

    /* ---------------------------------------------------------------------
       6. NEWSLETTER FORM (footer, every page)
       --------------------------------------------------------------------- */
    document.querySelectorAll('.newsletter-form').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            if (!input.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                input.style.outline = '2px solid #FF5A5F';
                return;
            }
            input.style.outline = '';
            const button = form.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Subscribed!';
            button.disabled = true;
            setTimeout(function () {
                button.textContent = originalText;
                button.disabled = false;
                form.reset();
            }, 2500);
        });
    });

    /* ---------------------------------------------------------------------
       7. SCROLL-REVEAL ANIMATIONS (every page)
       Cards and list items fade/slide into view as they enter the
       viewport, using IntersectionObserver so nothing is re-calculated on
       every scroll event. Falls back to "just show everything" if
       IntersectionObserver isn't supported.
       --------------------------------------------------------------------- */
    const revealSelectors = [
        '.stat-card', '.value-card', '.event-card', '.timeline-item',
        '.partner-item', '.contact-item', '.location-card',
        '.role-card', '.team-member', '.mv-card', '.gallery-item', '.faq-item'
    ];
    const revealTargets = document.querySelectorAll(revealSelectors.join(', '));

    // Declared here (outer scope) so the dynamically-created news items in
    // section 11 can register themselves with the same observer.
    let revealObserver = null;
    if ('IntersectionObserver' in window) {
        revealObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealTargets.forEach(function (el) {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }
    // If IntersectionObserver isn't supported, elements simply stay at their
    // default (fully visible) state since .reveal is never added.

    /* ---------------------------------------------------------------------
       8. FAQ ACCORDION + LIVE SEARCH (services.html)
       --------------------------------------------------------------------- */
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length) {
        faqItems.forEach(function (item) {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if (!question || !answer) return;

            question.addEventListener('click', function () {
                const isOpen = item.classList.contains('open');

                // Close any other open FAQ item (accordion behaviour)
                faqItems.forEach(function (other) {
                    if (other !== item) {
                        other.classList.remove('open');
                        const otherAnswer = other.querySelector('.faq-answer');
                        const otherQuestion = other.querySelector('.faq-question');
                        if (otherAnswer) otherAnswer.style.maxHeight = null;
                        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                    }
                });

                if (isOpen) {
                    item.classList.remove('open');
                    answer.style.maxHeight = null;
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('open');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        });

        const faqSearch = document.getElementById('faqSearch');
        const faqEmpty = document.getElementById('faqEmpty');
        if (faqSearch) {
            faqSearch.addEventListener('input', function () {
                const term = faqSearch.value.trim().toLowerCase();
                let visibleCount = 0;

                faqItems.forEach(function (item) {
                    const text = item.textContent.toLowerCase();
                    const matches = term === '' || text.includes(term);
                    item.style.display = matches ? '' : 'none';
                    if (matches) visibleCount++;
                });

                if (faqEmpty) faqEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
            });
        }
    }

    /* ---------------------------------------------------------------------
       9. DISTRIBUTION SCHEDULE — FILTER BY DAY (services.html)
       --------------------------------------------------------------------- */
    const scheduleFilter = document.getElementById('scheduleFilter');
    const scheduleTable = document.getElementById('scheduleTable');
    if (scheduleFilter && scheduleTable) {
        const filterButtons = scheduleFilter.querySelectorAll('.filter-btn');
        const rows = scheduleTable.querySelectorAll('tbody tr');
        const scheduleEmpty = document.getElementById('scheduleEmpty');

        filterButtons.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterButtons.forEach(function (b) { b.classList.remove('active'); });
                btn.classList.add('active');

                const day = btn.getAttribute('data-day');
                let visibleCount = 0;

                rows.forEach(function (row) {
                    const days = (row.getAttribute('data-days') || '').split(',');
                    const matches = day === 'all' || days.indexOf(day) !== -1;
                    row.style.display = matches ? '' : 'none';
                    if (matches) visibleCount++;
                });

                if (scheduleEmpty) scheduleEmpty.style.display = visibleCount === 0 ? 'block' : 'none';
            });
        });
    }

    /* ---------------------------------------------------------------------
       10. GALLERY + LIGHTBOX (about.html)
       --------------------------------------------------------------------- */
    const galleryGrid = document.getElementById('galleryGrid');
    const lightbox = document.getElementById('lightbox');
    if (galleryGrid && lightbox) {
        const galleryItems = Array.from(galleryGrid.querySelectorAll('.gallery-item'));
        const lightboxImage = document.getElementById('lightboxImage');
        const lightboxCaption = document.getElementById('lightboxCaption');
        const lightboxClose = document.getElementById('lightboxClose');
        const lightboxPrev = document.getElementById('lightboxPrev');
        const lightboxNext = document.getElementById('lightboxNext');
        let currentIndex = 0;

        function openLightbox(index) {
            currentIndex = (index + galleryItems.length) % galleryItems.length;
            const item = galleryItems[currentIndex];
            lightboxImage.src = item.getAttribute('data-full');
            lightboxImage.alt = item.getAttribute('data-caption') || '';
            lightboxCaption.textContent = item.getAttribute('data-caption') || '';
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        galleryItems.forEach(function (item, index) {
            item.addEventListener('click', function () { openLightbox(index); });
        });

        if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        if (lightboxPrev) lightboxPrev.addEventListener('click', function () { openLightbox(currentIndex - 1); });
        if (lightboxNext) lightboxNext.addEventListener('click', function () { openLightbox(currentIndex + 1); });

        // Close on backdrop click (but not when clicking the image/caption itself)
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard support: Escape closes, arrow keys navigate
        document.addEventListener('keydown', function (e) {
            if (!lightbox.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') openLightbox(currentIndex - 1);
            if (e.key === 'ArrowRight') openLightbox(currentIndex + 1);
        });
    }

    /* ---------------------------------------------------------------------
       11. DYNAMIC NEWS LIST (index.html)
       Rendered entirely with JavaScript DOM methods from a data array,
       rather than hardcoded in the HTML — a stand-in for posts that would
       normally come from a CMS or API.
       --------------------------------------------------------------------- */
    const newsList = document.getElementById('newsList');
    if (newsList) {
        const newsItems = [
            {
                date: 'August 2026',
                title: 'New Distribution Point Opening',
                text: "We're excited to announce a new distribution point opening in Strandfontein, serving the community every Saturday."
            },
            {
                date: 'July 2026',
                title: 'Winter Coat Drive',
                text: 'Drop off warm clothing at any of our distribution locations to help keep our community warm this winter.'
            },
            {
                date: 'June 2026',
                title: 'Celebrating Our Volunteers',
                text: "Thank you to our 50+ volunteers for their incredible dedication this past year. We couldn't do it without you!"
            }
        ];

        newsItems.forEach(function (item) {
            const li = document.createElement('li');

            const dateSpan = document.createElement('span');
            dateSpan.className = 'news-date';
            dateSpan.textContent = item.date;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'news-content';

            const heading = document.createElement('h4');
            heading.textContent = item.title;

            const para = document.createElement('p');
            para.textContent = item.text;

            contentDiv.appendChild(heading);
            contentDiv.appendChild(para);
            li.appendChild(dateSpan);
            li.appendChild(contentDiv);
            newsList.appendChild(li);

            // Hook the newly-created item into the same scroll-reveal
            // observer set up in section 7 (it didn't exist yet when that
            // ran its initial querySelectorAll).
            if (revealObserver) {
                li.classList.add('reveal');
                revealObserver.observe(li);
            }
        });
    }

});