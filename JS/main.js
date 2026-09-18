/* ==========================================================================
   HAVEN COMMUNITY FOOD BANK — MAIN SCRIPT
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

            // TODO: replace with a real fetch() to your backend/Netlify Forms
            // endpoint once one exists. For now we confirm success to the user.
            showFormMessage(form, 'success', (options && options.successText) || 'Thank you — your message has been sent!');
            form.reset();
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

});