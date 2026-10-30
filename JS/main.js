/* ==========================================================================
   HAVEN COMMUNITY FOOD BANK - main.js  (Part 3: JavaScript)

   This one file is loaded on every page. Each section checks that the
   elements it needs exist on the current page before it does anything, so
   the same file safely works on all five pages.

   What's in here (matches the Part 3 brief):
     1.  Mobile menu            (DOM manipulation)
     2.  Back-to-top button
     3.  Scroll animations      (animations/transitions with CSS + JS)
     4.  Interactive map        (Leaflet library)
     5.  FAQ accordion + search (accordion + search/filter)
     6.  Schedule day filter    (filter content)
     7.  Gallery + lightbox     (lightbox gallery)
     8.  Dynamic news list      (loading content with JavaScript)
     9.  Form validation        (client-side validation + error messages)
    10.  AJAX form submission   (fetch) + email (mailto) for contact form
    11.  Newsletter form
    12.  Volunteer console (enquiry page)
   ========================================================================== */

// Wait until the whole page (HTML) has loaded before running any code
document.addEventListener('DOMContentLoaded', function () {

    /* ======================================================================
       1. MOBILE MENU
       Clicking the hamburger button adds/removes the class "nav-open" on the
       <nav>. The CSS shows or hides the menu depending on that class.
       ====================================================================== */
    var menuButton = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('header nav');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function () {
            // toggle = add the class if it's missing, remove it if it's there
            navMenu.classList.toggle('nav-open');

            // Tell screen readers whether the menu is open (accessibility)
            if (navMenu.classList.contains('nav-open')) {
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ======================================================================
       2. BACK-TO-TOP BUTTON
       The button is hidden until the user has scrolled down a bit.
       ====================================================================== */
    var backToTopButton = document.getElementById('backToTop');

    if (backToTopButton) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ======================================================================
       8. DYNAMIC NEWS LIST (index.html)
       The news items are stored in an array of objects and the <li> elements
       are CREATED with JavaScript instead of being typed into the HTML.
       (This runs before the scroll animations so the new items get animated.)
       ====================================================================== */
    var newsList = document.getElementById('newsList');

    if (newsList) {
        var newsItems = [
            {
                date: 'August 2026',
                title: 'New Distribution Point Opening',
                text: 'We are excited to announce a new distribution point opening in Strandfontein, serving the community every Saturday.'
            },
            {
                date: 'July 2026',
                title: 'Winter Coat Drive',
                text: 'Drop off warm clothing at any of our distribution locations to help keep our community warm this winter.'
            },
            {
                date: 'June 2026',
                title: 'Celebrating Our Volunteers',
                text: 'Thank you to our 50+ volunteers for their incredible dedication this past year. We could not do it without you!'
            }
        ];

        // Loop through the array and build one <li> for each news item
        for (var n = 0; n < newsItems.length; n++) {
            var item = newsItems[n];

            var li = document.createElement('li');

            var dateSpan = document.createElement('span');
            dateSpan.className = 'news-date';
            dateSpan.textContent = item.date;

            var contentDiv = document.createElement('div');
            contentDiv.className = 'news-content';

            var heading = document.createElement('h4');
            heading.textContent = item.title;

            var paragraph = document.createElement('p');
            paragraph.textContent = item.text;

            // Put the pieces together: heading + paragraph go in the div,
            // the date + div go in the li, and the li goes in the list.
            contentDiv.appendChild(heading);
            contentDiv.appendChild(paragraph);
            li.appendChild(dateSpan);
            li.appendChild(contentDiv);
            newsList.appendChild(li);
        }
    }

    /* ======================================================================
       3. SCROLL ANIMATIONS
       Cards start slightly lower and see-through (CSS class "reveal"). When
       they scroll into view we add the class "reveal-visible" and the CSS
       transition makes them fade/slide in smoothly.
       ====================================================================== */
    var animatedItems = document.querySelectorAll(
        '.stat-card, .value-card, .event-card, .timeline-item, .partner-item, ' +
        '.contact-item, .location-card, .role-card, .team-member, .mv-card, ' +
        '.gallery-item, .faq-item, .featured-image, .news-list li, .mosaic-item, .step-card'
    );

    // Give every card the starting "hidden" look
    for (var a = 0; a < animatedItems.length; a++) {
        animatedItems[a].classList.add('reveal');

        // Photos get an extra zoom effect (see .img-reveal in the CSS)
        if (animatedItems[a].classList.contains('gallery-item') ||
            animatedItems[a].classList.contains('featured-image')) {
            animatedItems[a].classList.add('img-reveal');
        }
    }

    // Check every card: if it is on screen, reveal it
    function revealCardsOnScreen() {
        var screenHeight = window.innerHeight;

        for (var i = 0; i < animatedItems.length; i++) {
            var distanceFromTop = animatedItems[i].getBoundingClientRect().top;

            if (distanceFromTop < screenHeight - 60) {
                animatedItems[i].classList.add('reveal-visible');
            }
        }
    }

    window.addEventListener('scroll', revealCardsOnScreen);
    revealCardsOnScreen(); // also run once on page load for cards already visible

    /* ======================================================================
       4. INTERACTIVE MAP (contact.html) - uses the Leaflet library
       ====================================================================== */
    var mapDiv = document.getElementById('leafletMap');

    // "L" only exists if the Leaflet script loaded, so check for it first
    if (mapDiv && typeof L !== 'undefined') {

        // Each location is an object with its name, position and details
        var locations = [
            {
                name: 'Philippi Hub',
                lat: -34.0340,
                lng: 18.5540,
                address: '123 Main Rd, Philippi, 7785',
                hours: 'Mon, Wed, Sat (10am - 2pm)',
                contact: 'Nomsa - (021) 123-4567'
            },
            {
                name: 'Khayelitsha Satellite',
                lat: -34.0356,
                lng: 18.6714,
                address: '45 Mandela Ave, Khayelitsha, 7784',
                hours: 'Tue, Fri (11am - 3pm)',
                contact: 'Peter - (021) 123-4568'
            },
            {
                name: 'Mitchells Plain Satellite',
                lat: -34.0356,
                lng: 18.6217,
                address: '78 Second Ave, Mitchells Plain, 7785',
                hours: 'Wed, Thu (9am - 1pm)',
                contact: 'Thandi - (021) 123-4569'
            }
        ];

        // Create the map inside the div and centre it on Cape Town
        var map = L.map('leafletMap').setView([-34.0345, 18.615], 11);

        // Add the map pictures (tiles). CARTO tiles are free to use.
        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Add one marker (pin) per location, each with a popup
        var allPoints = [];

        for (var m = 0; m < locations.length; m++) {
            var place = locations[m];

            var marker = L.marker([place.lat, place.lng]).addTo(map);

            var directionsLink = 'https://www.google.com/maps/search/?api=1&query=' +
                encodeURIComponent(place.address);

            marker.bindPopup(
                '<strong>' + place.name + '</strong><br>' +
                place.address + '<br>' +
                place.hours + '<br>' +
                place.contact + '<br>' +
                '<a href="' + directionsLink + '" target="_blank">Get Directions</a>'
            );

            allPoints.push([place.lat, place.lng]);
        }

        // Zoom the map so all three pins are visible
        map.fitBounds(allPoints, { padding: [40, 40] });
    }

    /* ======================================================================
       5. FAQ ACCORDION + SEARCH (services.html)
       Click a question to open its answer. Only one answer is open at a time.
       Typing in the search box hides questions that don't match.
       ====================================================================== */
    var faqItems = document.querySelectorAll('.faq-item');

    for (var f = 0; f < faqItems.length; f++) {
        setupAccordionItem(faqItems[f]);
    }

    // This function sets up ONE accordion item (a question + its answer)
    function setupAccordionItem(faqItem) {
        var questionButton = faqItem.querySelector('.faq-question');
        var answerBox = faqItem.querySelector('.faq-answer');

        if (!questionButton || !answerBox) {
            return; // not a proper accordion item, skip it
        }

        questionButton.addEventListener('click', function () {
            var wasOpen = faqItem.classList.contains('open');

            // First close every FAQ item...
            for (var k = 0; k < faqItems.length; k++) {
                faqItems[k].classList.remove('open');
                faqItems[k].querySelector('.faq-answer').style.maxHeight = null;
                faqItems[k].querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }

            // ...then open this one, unless it was already open (then it stays closed)
            if (wasOpen === false) {
                faqItem.classList.add('open');
                answerBox.style.maxHeight = answerBox.scrollHeight + 'px';
                questionButton.setAttribute('aria-expanded', 'true');
            }
        });
    }

    var faqSearchBox = document.getElementById('faqSearch');
    var faqEmptyMessage = document.getElementById('faqEmpty');

    if (faqSearchBox) {
        // "input" fires every time the user types or deletes a letter
        faqSearchBox.addEventListener('input', function () {
            var searchText = faqSearchBox.value.toLowerCase();
            var matchesFound = 0;

            for (var s = 0; s < faqItems.length; s++) {
                var itemText = faqItems[s].textContent.toLowerCase();

                // indexOf returns -1 when the search text is NOT found
                if (itemText.indexOf(searchText) !== -1) {
                    faqItems[s].style.display = '';
                    matchesFound = matchesFound + 1;
                } else {
                    faqItems[s].style.display = 'none';
                }
            }

            // Show a "nothing found" message when no question matches
            if (faqEmptyMessage) {
                if (matchesFound === 0) {
                    faqEmptyMessage.style.display = 'block';
                } else {
                    faqEmptyMessage.style.display = 'none';
                }
            }
        });
    }

    /* ======================================================================
       6. SCHEDULE DAY FILTER (services.html)
       Each table row has data-days="Mon,Wed,Sat". When a day button is
       clicked we only show the rows whose data-days contains that day.
       ====================================================================== */
    var filterBar = document.getElementById('scheduleFilter');
    var scheduleRows = document.querySelectorAll('#scheduleTable tbody tr');
    var scheduleEmptyMessage = document.getElementById('scheduleEmpty');

    if (filterBar) {
        var filterButtons = filterBar.querySelectorAll('.filter-btn');

        for (var b = 0; b < filterButtons.length; b++) {
            filterButtons[b].addEventListener('click', function () {
                // "this" is the button that was clicked
                var chosenDay = this.getAttribute('data-day');
                var rowsShown = 0;

                // Highlight only the clicked button
                for (var x = 0; x < filterButtons.length; x++) {
                    filterButtons[x].classList.remove('active');
                }
                this.classList.add('active');

                // Show or hide each table row
                for (var r = 0; r < scheduleRows.length; r++) {
                    var rowDays = scheduleRows[r].getAttribute('data-days');

                    if (chosenDay === 'all' || rowDays.indexOf(chosenDay) !== -1) {
                        scheduleRows[r].style.display = '';
                        rowsShown = rowsShown + 1;
                    } else {
                        scheduleRows[r].style.display = 'none';
                    }
                }

                if (scheduleEmptyMessage) {
                    if (rowsShown === 0) {
                        scheduleEmptyMessage.style.display = 'block';
                    } else {
                        scheduleEmptyMessage.style.display = 'none';
                    }
                }
            });
        }
    }

    /* ======================================================================
       7. PHOTO GALLERY + LIGHTBOX (about.html)
       Clicking a gallery photo opens a big version on a dark background.
       There are Next / Previous / Close buttons, and the keyboard works too.
       ====================================================================== */
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');

    if (galleryItems.length > 0 && lightbox) {
        var lightboxImage = document.getElementById('lightboxImage');
        var lightboxCaption = document.getElementById('lightboxCaption');
        var currentPhoto = 0; // position of the photo being shown (0 = first)

        // Show the photo at a given position in the gallery
        function showPhoto(position) {
            // Wrap around: after the last photo go back to the first, etc.
            if (position < 0) {
                position = galleryItems.length - 1;
            }
            if (position >= galleryItems.length) {
                position = 0;
            }
            currentPhoto = position;

            lightboxImage.src = galleryItems[position].getAttribute('data-full');
            lightboxImage.alt = galleryItems[position].getAttribute('data-caption');
            lightboxCaption.textContent = galleryItems[position].getAttribute('data-caption');

            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden'; // stop the page scrolling behind
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        // Clicking a photo opens the lightbox at that photo
        for (var g = 0; g < galleryItems.length; g++) {
            // We pass g into a helper function so each button remembers its own number
            addGalleryClick(galleryItems[g], g);
        }

        function addGalleryClick(photoButton, photoNumber) {
            photoButton.addEventListener('click', function () {
                showPhoto(photoNumber);
            });
        }

        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);

        document.getElementById('lightboxNext').addEventListener('click', function () {
            showPhoto(currentPhoto + 1);
        });

        document.getElementById('lightboxPrev').addEventListener('click', function () {
            showPhoto(currentPhoto - 1);
        });

        // Clicking the dark background (not the photo) also closes it
        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard: Escape closes, left/right arrows change photo
        document.addEventListener('keydown', function (event) {
            if (lightbox.classList.contains('open') === false) {
                return; // lightbox is closed, ignore the keys
            }
            if (event.key === 'Escape') {
                closeLightbox();
            }
            if (event.key === 'ArrowLeft') {
                showPhoto(currentPhoto - 1);
            }
            if (event.key === 'ArrowRight') {
                showPhoto(currentPhoto + 1);
            }
        });
    }

    /* ======================================================================
       9. FORM VALIDATION HELPERS (used by the contact + volunteer forms)
       Each check function returns an error message (text) if the value is
       wrong, or an empty string "" if the value is fine.
       ====================================================================== */

    // Is this a valid-looking email? (has text, an @, text, a dot, text)
    function emailError(email) {
        var atPosition = email.indexOf('@');
        var lastDot = email.lastIndexOf('.');

        if (email === '') {
            return 'Please enter your email address.';
        }
        if (atPosition < 1 || lastDot < atPosition + 2 || lastDot === email.length - 1 || email.indexOf(' ') !== -1) {
            return 'Please enter a valid email, for example name@example.com';
        }
        return '';
    }

    // South African phone numbers: 10 digits starting with 0 (optional field)
    function phoneError(phone) {
        if (phone === '') {
            return ''; // phone is optional, so empty is fine
        }
        // Remove spaces and dashes so "082 123 4567" is treated as "0821234567"
        var digitsOnly = phone.split(' ').join('').split('-').join('');

        if (isNaN(digitsOnly) || digitsOnly.length !== 10 || digitsOnly.charAt(0) !== '0') {
            return 'Enter a 10-digit phone number starting with 0, e.g. 082 123 4567';
        }
        return '';
    }

    // Name must be at least 2 characters
    function nameError(name) {
        if (name.length < 2) {
            return 'Please enter your full name (at least 2 characters).';
        }
        return '';
    }

    // Date of birth: must be chosen, not in the future, and volunteer must be 16+
    function dobError(dobText) {
        if (dobText === '') {
            return 'Please choose your date of birth.';
        }
        var birthDate = new Date(dobText);
        var today = new Date();

        var age = today.getFullYear() - birthDate.getFullYear();
        // If the birthday hasn't happened yet this year, they are one year younger
        var monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }

        if (birthDate > today) {
            return 'Date of birth cannot be in the future.';
        }
        if (age < 16) {
            return 'Volunteers must be at least 16 years old.';
        }
        return '';
    }

    // Show a red error message under a form field
    function showFieldError(field, message) {
        field.classList.add('has-error');

        var errorText = document.createElement('span');
        errorText.className = 'field-error';
        errorText.textContent = message;

        // Put the error text directly after the input field
        field.parentNode.insertBefore(errorText, field.nextSibling);
    }

    // Remove all old error messages from a form (before checking again)
    function clearFieldErrors(form) {
        var oldErrors = form.querySelectorAll('.field-error');
        for (var i = 0; i < oldErrors.length; i++) {
            oldErrors[i].remove();
        }

        var redFields = form.querySelectorAll('.has-error');
        for (var j = 0; j < redFields.length; j++) {
            redFields[j].classList.remove('has-error');
        }
    }

    // Show a message box at the top of the form. type is "success" or "error"
    function showFormMessage(form, type, text) {
        var box = form.querySelector('.form-message');

        if (box === null) {
            box = document.createElement('div');
            form.insertBefore(box, form.firstChild);
        }

        box.className = 'form-message ' + type;
        box.textContent = text;
        box.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Checks one field with a check function; returns true if it is OK
    function checkField(field, errorMessage) {
        if (errorMessage !== '') {
            showFieldError(field, errorMessage);
            return false;
        }
        return true;
    }

    /* ======================================================================
       10a. CONTACT FORM (contact.html)
       1. Validate the fields.   2. Send the data with AJAX (fetch).
       3. Build an email (mailto link) so the visitor can send it to us.
       ====================================================================== */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // stop the page from reloading
            clearFieldErrors(contactForm);

            var nameField = document.getElementById('contactName');
            var emailField = document.getElementById('contactEmail');
            var typeField = document.getElementById('messageType');
            var subjectField = document.getElementById('subject');
            var messageField = document.getElementById('message');

            // Check every field (we check all of them so ALL errors show at once)
            var allOk = true;

            if (checkField(nameField, nameError(nameField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(emailField, emailError(emailField.value.trim())) === false) {
                allOk = false;
            }
            if (typeField.value === '') {
                showFieldError(typeField, 'Please choose the type of message.');
                allOk = false;
            }
            if (messageField.value.trim().length < 10) {
                showFieldError(messageField, 'Your message must be at least 10 characters long.');
                allOk = false;
            }

            if (allOk === false) {
                showFormMessage(contactForm, 'error', 'Please fix the highlighted fields and try again.');
                return; // stop here, do not send anything
            }

            // ---- Everything is valid: build the email text ----
            var emailSubject = '[' + typeField.value + '] ' + subjectField.value.trim();
            var emailBody =
                'Name: ' + nameField.value.trim() + '\n' +
                'Email: ' + emailField.value.trim() + '\n' +
                'Type of message: ' + typeField.value + '\n\n' +
                messageField.value.trim();

            // mailto link: opens the visitor's email app with everything filled in
            var recipient = 'info@havenfoodbank.org';
            var mailtoLink = 'mailto:' + recipient +
                '?subject=' + encodeURIComponent(emailSubject) +
                '&body=' + encodeURIComponent(emailBody);

            // ---- AJAX: send the form data without reloading the page ----
            var submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                {
                    name: nameField.value.trim(),
                    email: emailField.value.trim(),
                    type: typeField.value,
                    message: messageField.value.trim()
                },
                function () {
                    // This runs if the server replied OK
                    showFormMessage(contactForm, 'success',
                        'Thank you, ' + nameField.value.trim() + '! Your message was sent. ' +
                        'Click "Open Email" below if you would also like to email us directly.');

                    // Add an "Open Email" button that uses the mailto link
                    addMailButton(contactForm, mailtoLink);

                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Enquiry';
                },
                function () {
                    // This runs if something went wrong (e.g. no internet)
                    showFormMessage(contactForm, 'error',
                        'Sorry, we could not send your message right now. Please try again, or use the email button.');
                    addMailButton(contactForm, mailtoLink);

                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Enquiry';
                }
            );
        });
    }

    // Adds an "Open Email" link under the form (only once)
    function addMailButton(form, mailtoLink) {
        var oldButton = form.querySelector('.mail-button');
        if (oldButton) {
            oldButton.remove();
        }

        var mailButton = document.createElement('a');
        mailButton.className = 'btn btn-small mail-button';
        mailButton.href = mailtoLink;
        mailButton.textContent = 'Open Email';

        var messageBox = form.querySelector('.form-message');
        messageBox.parentNode.insertBefore(mailButton, messageBox.nextSibling);
    }

    /* ======================================================================
       AJAX FUNCTION - sends data to a server using fetch() without
       reloading the page. We use jsonplaceholder.typicode.com, a free
       practice server that accepts any POST request and replies "created".
       When Haven has a real server, only the web address needs to change.
       ====================================================================== */
    function sendWithAjax(data, onSuccess, onFailure) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(function (response) {
                if (response.ok) {
                    onSuccess();
                } else {
                    onFailure();
                }
            })
            .catch(function () {
                // fetch fails completely when there is no internet connection
                onFailure();
            });
    }


    /* ======================================================================
       ENROLMENT CONFIRMATION (volunteer sign-up)
       Hides the form and shows a "successfully enrolled" card with the
       volunteer's details, a reference number and what happens next.
       ====================================================================== */
    function makeReference(prefix) {
        // e.g. HV-VOL-4821 (random 4-digit number)
        return prefix + '-' + Math.floor(1000 + Math.random() * 9000);
    }

    function showEnrolment(form, details) {
        var oldCard = document.getElementById('enrolSuccess');
        if (oldCard) {
            oldCard.remove();
        }

        var today = new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
        var card = document.createElement('div');
        card.id = 'enrolSuccess';
        card.className = 'enrol-success';
        card.setAttribute('role', 'status');

        var html = '<div class="enrol-icon"><i class="fas fa-check"></i></div>' +
            '<h3>You have successfully enrolled as a Haven volunteer!</h3>' +
            '<p class="enrol-lead">Thank you, <strong></strong>. Your application has been received and you are now on our volunteer list.</p>' +
            '<ul class="enrol-details">' +
            '<li><span>Reference</span><strong>' + makeReference('HV-VOL') + '</strong></li>' +
            '<li><span>Date enrolled</span><strong>' + today + '</strong></li>' +
            '<li><span>Role</span><strong id="enrolRole"></strong></li>' +
            '<li><span>Available on</span><strong id="enrolDays"></strong></li>' +
            '<li><span>Confirmation sent to</span><strong id="enrolEmail"></strong></li>' +
            '</ul>';

        if (details.shifts.length > 0) {
            html += '<h4>Shifts in your plan</h4><ul class="enrol-shifts" id="enrolShifts"></ul>';
        }

        html += '<h4>What happens next</h4>' +
            '<ol class="enrol-steps">' +
            '<li>A volunteer coordinator will contact you within 2 working days.</li>' +
            '<li>Attend a short orientation (about 45 minutes) before your first shift.</li>' +
            '<li>Start helping and feed a family in your community. Volunteering is free.</li>' +
            '</ol>' +
            '<div class="enrol-buttons">' +
            '<a href="index.html" class="btn btn-primary"><i class="fas fa-home"></i> Back to Home</a>' +
            '<button type="button" class="btn btn-small" id="enrolAnother"><i class="fas fa-user-plus"></i> Enrol another volunteer</button>' +
            '</div>';

        card.innerHTML = html;

        // Put user-typed text in with textContent (safer than building it into the HTML string)
        card.querySelector('.enrol-lead strong').textContent = details.name;
        card.querySelector('#enrolRole').textContent = details.roleText;
        card.querySelector('#enrolDays').textContent = details.days.join(', ');
        card.querySelector('#enrolEmail').textContent = details.email;

        var shiftBox = card.querySelector('#enrolShifts');
        if (shiftBox) {
            for (var s = 0; s < details.shifts.length; s++) {
                var li = document.createElement('li');
                li.textContent = details.shifts[s];
                shiftBox.appendChild(li);
            }
        }

        // Hide the form, show the card
        form.style.display = 'none';
        form.parentNode.insertBefore(card, form);
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });

        card.querySelector('#enrolAnother').addEventListener('click', function () {
            form.reset();
            clearFieldErrors(form);
            var oldMessage = form.querySelector('.form-message');
            if (oldMessage) {
                oldMessage.remove();
            }
            card.remove();
            form.style.display = '';
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    /* ======================================================================
       10b. VOLUNTEER FORM (enquiry.html)
       After the form is valid we show a response about the role chosen
       (what it involves, the cost, and the days the volunteer picked).
       ====================================================================== */
    var volunteerForm = document.getElementById('volunteerForm');

    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFieldErrors(volunteerForm);

            var fullNameField = document.getElementById('fullName');
            var volEmailField = document.getElementById('email');
            var phoneField = document.getElementById('phone');
            var dobField = document.getElementById('dob');
            var roleField = document.getElementById('role');
            var skillsField = document.getElementById('skills');

            var allOk = true;

            if (checkField(fullNameField, nameError(fullNameField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(volEmailField, emailError(volEmailField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(phoneField, phoneError(phoneField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(dobField, dobError(dobField.value)) === false) {
                allOk = false;
            }
            if (roleField.value === '') {
                showFieldError(roleField, 'Please choose a role.');
                allOk = false;
            }
            if (skillsField.value.length > 300) {
                showFieldError(skillsField, 'Please keep this under 300 characters.');
                allOk = false;
            }

            // At least one availability checkbox must be ticked
            var dayBoxes = volunteerForm.querySelectorAll('input[name="availability"]');
            var chosenDays = [];
            for (var d = 0; d < dayBoxes.length; d++) {
                if (dayBoxes[d].checked) {
                    chosenDays.push(dayBoxes[d].value);
                }
            }
            if (chosenDays.length === 0) {
                showFieldError(dayBoxes[0].parentNode.parentNode, 'Please tick at least one day you are available.');
                allOk = false;
            }

            // One of the "How did you hear about us?" radio buttons must be chosen
            var heardBoxes = volunteerForm.querySelectorAll('input[name="hearAbout"]');
            var heardChosen = false;
            for (var h = 0; h < heardBoxes.length; h++) {
                if (heardBoxes[h].checked) {
                    heardChosen = true;
                }
            }
            if (heardChosen === false) {
                showFieldError(heardBoxes[0].parentNode.parentNode, 'Please tell us how you heard about us.');
                allOk = false;
            }

            if (allOk === false) {
                showFormMessage(volunteerForm, 'error', 'Please fix the highlighted fields and try again.');
                return;
            }

            // Work out what to say about the chosen role
            var roleInfo = {
                packing: 'Food Packing runs on Tuesday and Thursday from 9am to 12pm.',
                serving: 'Meal Serving runs on Monday and Wednesday from 11am to 2pm.',
                driving: 'Delivery Drivers choose their own hours and need their own vehicle.',
                admin: 'Admin Support works on weekdays from 9am to 5pm.'
            };

            var submitButton = volunteerForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                { name: fullNameField.value.trim(), email: volEmailField.value.trim(), role: roleField.value, days: chosenDays },
                function () {
                    // Collect any shifts the visitor added in the Volunteer Console
                    var plannedShifts = [];
                    var planSpans = document.querySelectorAll('#planList li span');
                    for (var ps = 0; ps < planSpans.length; ps++) {
                        plannedShifts.push(planSpans[ps].textContent);
                    }

                    showEnrolment(volunteerForm, {
                        name: fullNameField.value.trim(),
                        email: volEmailField.value.trim(),
                        roleCode: roleField.value,
                        roleText: roleField.options[roleField.selectedIndex].text,
                        info: roleInfo[roleField.value],
                        days: chosenDays,
                        shifts: plannedShifts
                    });
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Application';
                },
                function () {
                    showFormMessage(volunteerForm, 'error', 'Sorry, we could not send your application right now. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Application';
                }
            );
        });
    }

    /* ======================================================================
       11. NEWSLETTER FORM (footer on every page)
       ====================================================================== */
    var newsletterForms = document.querySelectorAll('.newsletter-form');

    for (var nf = 0; nf < newsletterForms.length; nf++) {
        setupNewsletter(newsletterForms[nf]);
    }

    function setupNewsletter(form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var input = form.querySelector('input');
            var button = form.querySelector('button');

            if (emailError(input.value.trim()) !== '') {
                input.style.outline = '2px solid #1F8A4C'; // red outline = problem
                input.placeholder = 'Enter a valid email';
                return;
            }

            input.style.outline = '';
            button.textContent = 'Subscribed!';
            form.reset();

            // After 2.5 seconds put the button text back
            setTimeout(function () {
                button.textContent = 'Subscribe';
            }, 2500);
        });
    }

    /* ======================================================================
       12. VOLUNTEER CONSOLE (enquiry.html)
       An interactive tool where a visitor chooses WHERE, WHAT and WHEN they
       want to volunteer. It shows how these ideas work together:
         - an array of objects (the shift data)
         - loops + if statements to filter, search and sort
         - creating HTML with createElement (dynamic DOM)
         - events (click, change, input)
         - localStorage to remember the plan
         - sending the plan into the sign-up form
       ====================================================================== */
    var shiftListBox = document.getElementById('shiftList');

    if (shiftListBox) {

        // ---- 12.1 The data: every shift is an object inside an array ----
        // startHour / endHour are used to detect clashing shifts.
        var allShifts = [
            { id: 1,  location: 'Philippi Hub',             role: 'packing', day: 'Tuesday',   start: 9,  end: 12, spots: 6 },
            { id: 2,  location: 'Philippi Hub',             role: 'packing', day: 'Thursday',  start: 9,  end: 12, spots: 4 },
            { id: 3,  location: 'Philippi Hub',             role: 'serving', day: 'Monday',    start: 11, end: 14, spots: 5 },
            { id: 4,  location: 'Philippi Hub',             role: 'serving', day: 'Saturday',  start: 10, end: 14, spots: 3 },
            { id: 5,  location: 'Philippi Hub',             role: 'admin',   day: 'Wednesday', start: 9,  end: 13, spots: 2 },
            { id: 6,  location: 'Khayelitsha Satellite',    role: 'serving', day: 'Tuesday',   start: 11, end: 15, spots: 4 },
            { id: 7,  location: 'Khayelitsha Satellite',    role: 'driving', day: 'Friday',    start: 11, end: 15, spots: 2 },
            { id: 8,  location: 'Khayelitsha Satellite',    role: 'packing', day: 'Friday',    start: 8,  end: 11, spots: 5 },
            { id: 9,  location: 'Mitchells Plain Satellite', role: 'serving', day: 'Wednesday', start: 9,  end: 13, spots: 4 },
            { id: 10, location: 'Mitchells Plain Satellite', role: 'packing', day: 'Thursday',  start: 9,  end: 12, spots: 6 },
            { id: 11, location: 'Mitchells Plain Satellite', role: 'driving', day: 'Thursday',  start: 10, end: 13, spots: 1 },
            { id: 12, location: 'Mitchells Plain Satellite', role: 'admin',   day: 'Monday',    start: 9,  end: 12, spots: 3 }
        ];

        // Friendly names for the role codes, and the order of the week
        var roleNames = { packing: 'Food Packing', serving: 'Meal Serving', driving: 'Delivery Driving', admin: 'Admin Support' };
        var weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var MAX_SHIFTS = 4;                  // a volunteer may plan at most 4 shifts a week

        var myPlan = [];                     // the shifts the visitor has chosen

        // ---- 12.2 Grab the page elements we need ----
        var locationSelect = document.getElementById('consoleLocation');
        var roleSelect = document.getElementById('consoleRole');
        var daySelect = document.getElementById('consoleDay');
        var sortSelect = document.getElementById('consoleSort');
        var searchBox = document.getElementById('consoleSearch');
        var shiftEmpty = document.getElementById('shiftEmpty');
        var planListBox = document.getElementById('planList');
        var planEmpty = document.getElementById('planEmpty');
        var planSummary = document.getElementById('planSummary');
        var planMessage = document.getElementById('planMessage');

        // ---- 12.3 Small helper functions ----

        // Find a shift in the array by its id number
        function findShift(id) {
            for (var i = 0; i < allShifts.length; i++) {
                if (allShifts[i].id === id) {
                    return allShifts[i];
                }
            }
            return null;
        }

        // Is this shift already in my plan?
        function isInPlan(id) {
            for (var i = 0; i < myPlan.length; i++) {
                if (myPlan[i] === id) {
                    return true;
                }
            }
            return false;
        }

        // Turn 13 into "13:00"
        function formatHour(hour) {
            if (hour < 10) {
                return '0' + hour + ':00';
            }
            return hour + ':00';
        }

        function shiftText(shift) {
            return roleNames[shift.role] + ' - ' + shift.location + ', ' + shift.day + ' ' +
                formatHour(shift.start) + '-' + formatHour(shift.end);
        }

        // Show a success (green) or error (red) message above the plan
        function showPlanMessage(type, text) {
            planMessage.className = 'console-message ' + type;
            planMessage.textContent = text;
            planMessage.style.display = 'block';
        }

        // Does shift A overlap in time with a shift already in my plan?
        // Returns the clashing shift, or null if there is no clash.
        function findClash(newShift) {
            for (var i = 0; i < myPlan.length; i++) {
                var planned = findShift(myPlan[i]);
                if (planned.day === newShift.day &&
                    newShift.start < planned.end && planned.start < newShift.end) {
                    return planned;
                }
            }
            return null;
        }

        // ---- 12.4 Filter, search and sort the shifts ----
        function getVisibleShifts() {
            var chosenLocation = locationSelect.value;
            var chosenRole = roleSelect.value;
            var chosenDay = daySelect.value;
            var searchText = searchBox.value.toLowerCase().trim();
            var result = [];

            for (var i = 0; i < allShifts.length; i++) {
                var shift = allShifts[i];

                // Each "if" removes the shift when it does not match the filter
                if (chosenLocation !== 'all' && shift.location !== chosenLocation) { continue; }
                if (chosenRole !== 'all' && shift.role !== chosenRole) { continue; }
                if (chosenDay !== 'all' && shift.day !== chosenDay) { continue; }

                if (searchText !== '') {
                    var searchable = (roleNames[shift.role] + ' ' + shift.location + ' ' + shift.day).toLowerCase();
                    if (searchable.indexOf(searchText) === -1) { continue; }
                }
                result.push(shift);
            }

            // Sort the result (the compare function returns a negative number
            // when "a" should come before "b")
            var sortBy = sortSelect.value;
            result.sort(function (a, b) {
                if (sortBy === 'spots') { return b.spots - a.spots; }
                if (sortBy === 'hours') { return (b.end - b.start) - (a.end - a.start); }
                return weekDays.indexOf(a.day) - weekDays.indexOf(b.day);   // by day
            });
            return result;
        }

        // ---- 12.5 Draw the list of shifts (creates the HTML with JavaScript) ----
        function showShifts() {
            var visible = getVisibleShifts();
            var totalSpots = 0;

            shiftListBox.innerHTML = '';                     // clear the old cards

            for (var i = 0; i < visible.length; i++) {
                var shift = visible[i];
                totalSpots += shift.spots;

                var card = document.createElement('div');
                card.className = 'shift-card';
                if (isInPlan(shift.id)) { card.className += ' in-plan'; }
                if (shift.spots === 0) { card.className += ' full'; }

                var info = document.createElement('div');

                var title = document.createElement('h4');
                title.textContent = roleNames[shift.role];

                var meta = document.createElement('div');
                meta.className = 'shift-meta';
                meta.innerHTML =
                    '<span><i class="fas fa-map-marker-alt"></i>' + shift.location + '</span>' +
                    '<span><i class="fas fa-calendar-day"></i>' + shift.day + '</span>' +
                    '<span><i class="fas fa-clock"></i>' + formatHour(shift.start) + ' - ' + formatHour(shift.end) + '</span>';

                // Spots badge: colour changes depending on how many are left
                var badge = document.createElement('span');
                badge.className = 'spots-badge';
                if (shift.spots === 0) {
                    badge.className += ' none';
                    badge.textContent = 'Full';
                } else if (shift.spots <= 2) {
                    badge.className += ' low';
                    badge.textContent = 'Only ' + shift.spots + ' left';
                } else {
                    badge.textContent = shift.spots + ' spots left';
                }

                info.appendChild(title);
                info.appendChild(meta);
                info.appendChild(badge);

                var button = document.createElement('button');
                button.type = 'button';
                button.className = 'btn btn-primary';
                if (isInPlan(shift.id)) {
                    button.textContent = 'Added';
                    button.disabled = true;
                } else if (shift.spots === 0) {
                    button.textContent = 'Full';
                    button.disabled = true;
                } else {
                    button.textContent = 'Add to plan';
                    button.setAttribute('data-id', shift.id);
                    button.addEventListener('click', function () {
                        // "this" is the button that was clicked
                        addToPlan(parseInt(this.getAttribute('data-id'), 10));
                    });
                }

                card.appendChild(info);
                card.appendChild(button);
                shiftListBox.appendChild(card);
            }

            shiftEmpty.style.display = (visible.length === 0) ? 'block' : 'none';
            document.getElementById('statShown').textContent = visible.length;
            document.getElementById('statSpots').textContent = totalSpots;
        }

        // ---- 12.6 Draw "My Plan" ----
        function showPlan() {
            planListBox.innerHTML = '';
            var totalHours = 0;

            for (var i = 0; i < myPlan.length; i++) {
                var shift = findShift(myPlan[i]);
                totalHours += shift.end - shift.start;

                var li = document.createElement('li');
                var text = document.createElement('span');
                text.textContent = shiftText(shift);

                var removeButton = document.createElement('button');
                removeButton.type = 'button';
                removeButton.setAttribute('aria-label', 'Remove this shift');
                removeButton.innerHTML = '<i class="fas fa-times"></i>';
                removeButton.setAttribute('data-id', shift.id);
                removeButton.addEventListener('click', function () {
                    removeFromPlan(parseInt(this.getAttribute('data-id'), 10));
                });

                li.appendChild(text);
                li.appendChild(removeButton);
                planListBox.appendChild(li);
            }

            planEmpty.style.display = (myPlan.length === 0) ? 'block' : 'none';
            document.getElementById('statPlan').textContent = myPlan.length;
            document.getElementById('statHours').textContent = totalHours;

            if (myPlan.length > 0) {
                // Each volunteer hour helps pack roughly 20 meals (an estimate for the demo)
                planSummary.style.display = 'block';
                planSummary.textContent = myPlan.length + ' shift(s), ' + totalHours +
                    ' hours a week - about ' + (totalHours * 20) + ' meals helped each week!';
            } else {
                planSummary.style.display = 'none';
            }
        }

        function refreshConsole() {
            showShifts();
            showPlan();
        }

        // ---- 12.7 Add and remove shifts ----
        function addToPlan(id) {
            var shift = findShift(id);

            if (myPlan.length >= MAX_SHIFTS) {
                showPlanMessage('error', 'You can plan at most ' + MAX_SHIFTS + ' shifts a week.');
                return;
            }
            var clash = findClash(shift);
            if (clash !== null) {
                showPlanMessage('error', 'That shift clashes with: ' + shiftText(clash));
                return;
            }
            if (shift.spots === 0) {
                showPlanMessage('error', 'Sorry, that shift is full.');
                return;
            }

            shift.spots = shift.spots - 1;       // take one spot
            myPlan.push(id);
            showPlanMessage('success', 'Added: ' + shiftText(shift));
            refreshConsole();
        }

        function removeFromPlan(id) {
            var newPlan = [];
            for (var i = 0; i < myPlan.length; i++) {
                if (myPlan[i] !== id) {
                    newPlan.push(myPlan[i]);
                }
            }
            myPlan = newPlan;
            findShift(id).spots = findShift(id).spots + 1;     // give the spot back
            showPlanMessage('success', 'Shift removed from your plan.');
            refreshConsole();
        }

        // ---- 12.8 Save the plan in the browser (localStorage) ----
        function savePlan() {
            try {
                localStorage.setItem('havenVolunteerPlan', JSON.stringify(myPlan));
                showPlanMessage('success', 'Plan saved on this device.');
            } catch (error) {
                showPlanMessage('error', 'Your browser would not let us save the plan.');
            }
        }

        function loadSavedPlan() {
            try {
                var saved = localStorage.getItem('havenVolunteerPlan');
                if (saved === null) { return; }
                var ids = JSON.parse(saved);
                for (var i = 0; i < ids.length; i++) {
                    var shift = findShift(ids[i]);
                    if (shift !== null && shift.spots > 0 && findClash(shift) === null && myPlan.length < MAX_SHIFTS) {
                        shift.spots = shift.spots - 1;
                        myPlan.push(shift.id);
                    }
                }
            } catch (error) {
                // saved data was missing or damaged - just start with an empty plan
            }
        }

        function clearPlan() {
            for (var i = 0; i < myPlan.length; i++) {
                findShift(myPlan[i]).spots = findShift(myPlan[i]).spots + 1;
            }
            myPlan = [];
            try { localStorage.removeItem('havenVolunteerPlan'); } catch (error) { }
            showPlanMessage('success', 'Plan cleared.');
            refreshConsole();
        }

        // ---- 12.9 Send the plan into the sign-up form ----
        // Sets the preferred role and ticks the availability days.
        function usePlanInForm() {
            if (myPlan.length === 0) {
                showPlanMessage('error', 'Add at least one shift to your plan first.');
                return;
            }

            // Role = the role of the first shift in the plan
            var roleField = document.getElementById('role');
            if (roleField) {
                roleField.value = findShift(myPlan[0]).role;
            }

            // Untick every day, then tick the days in the plan
            var dayBoxes = document.querySelectorAll('input[name="availability"]');
            for (var i = 0; i < dayBoxes.length; i++) {
                dayBoxes[i].checked = false;
                for (var j = 0; j < myPlan.length; j++) {
                    if (dayBoxes[i].value === findShift(myPlan[j]).day) {
                        dayBoxes[i].checked = true;
                    }
                }
            }

            // Put a summary in the "special skills / notes" box
            var notesField = document.getElementById('skills');
            if (notesField) {
                var lines = [];
                for (var k = 0; k < myPlan.length; k++) {
                    lines.push(shiftText(findShift(myPlan[k])));
                }
                notesField.value = ('Planned shifts: ' + lines.join('; ')).substring(0, 300);
            }

            showPlanMessage('success', 'Your plan was added to the sign-up form below.');
            document.getElementById('volunteerForm').scrollIntoView({ behavior: 'smooth' });
        }

        // ---- 12.10 Connect the buttons and filters to the functions ----
        locationSelect.addEventListener('change', showShifts);
        roleSelect.addEventListener('change', showShifts);
        daySelect.addEventListener('change', showShifts);
        sortSelect.addEventListener('change', showShifts);
        searchBox.addEventListener('input', showShifts);

        document.getElementById('consoleReset').addEventListener('click', function () {
            locationSelect.value = 'all';
            roleSelect.value = 'all';
            daySelect.value = 'all';
            sortSelect.value = 'day';
            searchBox.value = '';
            showShifts();
        });
        document.getElementById('btnSavePlan').addEventListener('click', savePlan);
        document.getElementById('btnClearPlan').addEventListener('click', clearPlan);
        document.getElementById('btnUsePlan').addEventListener('click', usePlanInForm);

        // Start: restore a saved plan (if any) and draw everything
        loadSavedPlan();
        refreshConsole();
    }



    /* ======================================================================
       13. DONATE POP-UP (every page)
       The "Donate" buttons open a pop-up (modal) with three tabs:
         - Give Money  (R50, R100, R200, R500, R1000 or your own amount, min R50)
         - Give Food   (food type + quantity + unit, several items allowed)
         - Give Time   (which role you can volunteer for, where and when)
       The pop-up is built with JavaScript so we do not repeat it in every
       HTML file. If JavaScript is off, the Donate link still goes to
       contact.html.
       ====================================================================== */
    var foodTypes = [
        'Tinned food (beans, vegetables, fish)',
        'Dry goods (rice, maize meal, pasta, flour)',
        'Fresh fruit and vegetables',
        'Bread and baked goods',
        'Cooking oil, sugar, salt and spices',
        'Dairy and eggs',
        'Baby food and formula',
        'Other (please tell us in the notes)'
    ];
    var donateLocations = ['Philippi Hub', 'Khayelitsha Satellite', 'Mitchells Plain Satellite'];
    var donateRoles = ['Food Packing', 'Meal Serving', 'Delivery Driving', 'Admin Support'];
    var weekDayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var MIN_DONATION = 50;

    var donateModal = null;      // the pop-up (created the first time it is needed)
    var donateOpener = null;     // the button that opened it (so we can return focus)
    var foodList = [];           // the food items added so far: {type, quantity, unit}

    // Turn an array of strings into <option> tags
    function makeOptions(list) {
        var html = '';
        for (var i = 0; i < list.length; i++) {
            html += '<option value="' + list[i] + '">' + list[i] + '</option>';
        }
        return html;
    }

    function buildDonateModal() {
        var dayBoxes = '';
        for (var d = 0; d < weekDayNames.length; d++) {
            dayBoxes += '<label><input type="checkbox" name="giveDays" value="' + weekDayNames[d] + '"> ' + weekDayNames[d].substring(0, 3) + '</label>';
        }

        var modal = document.createElement('div');
        modal.className = 'donate-modal';
        modal.id = 'donateModal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'donateTitle');
        modal.setAttribute('aria-hidden', 'true');

        modal.innerHTML =
            '<div class="donate-dialog">' +
            '<button type="button" class="donate-close" id="donateClose" aria-label="Close donate window">&times;</button>' +
            '<h2 id="donateTitle">Make a Difference</h2>' +
            '<p class="donate-intro">Choose how you would like to help Haven feed our neighbours.</p>' +

            '<div class="donate-tabs">' +
            '<button type="button" class="donate-tab active" data-tab="money"><i class="fas fa-hand-holding-heart"></i> Give Money</button>' +
            '<button type="button" class="donate-tab" data-tab="food"><i class="fas fa-apple-alt"></i> Give Food</button>' +
            '<button type="button" class="donate-tab" data-tab="time"><i class="fas fa-people-carry"></i> Give Time</button>' +
            '</div>' +

            /* ---------- MONEY ---------- */
            '<form class="donate-pane active" id="donateMoneyForm" data-pane="money" novalidate>' +
            '<p class="donate-label">Choose an amount (minimum R50)</p>' +
            '<div class="amount-grid">' +
            '<button type="button" class="amount-btn" data-amount="50">R50</button>' +
            '<button type="button" class="amount-btn" data-amount="100">R100</button>' +
            '<button type="button" class="amount-btn" data-amount="200">R200</button>' +
            '<button type="button" class="amount-btn" data-amount="500">R500</button>' +
            '<button type="button" class="amount-btn" data-amount="1000">R1000</button>' +
            '</div>' +
            '<div class="form-group"><label for="donateCustom">Or type your own amount (R)</label>' +
            '<input type="number" id="donateCustom" min="50" step="10" inputmode="numeric" placeholder="e.g. 250"></div>' +
            '<div class="form-group"><label>How often?</label><div class="radio-group">' +
            '<label><input type="radio" name="donateFreq" value="Once-off" checked> Once-off</label>' +
            '<label><input type="radio" name="donateFreq" value="Monthly"> Monthly</label></div></div>' +
            '<div class="form-group"><label for="moneyName">Full name *</label><input type="text" id="moneyName" autocomplete="name"></div>' +
            '<div class="form-group"><label for="moneyEmail">Email *</label><input type="email" id="moneyEmail" autocomplete="email"></div>' +
            '<p class="donate-total" id="donateTotal">Select an amount to continue.</p>' +
            '<button type="submit" class="btn btn-primary donate-submit" id="moneySubmit">Donate</button>' +
            '</form>' +

            /* ---------- FOOD ---------- */
            '<form class="donate-pane" id="donateFoodForm" data-pane="food" novalidate>' +
            '<p class="donate-label">What food would you like to donate?</p>' +
            '<div class="form-group"><label for="foodType">Type of food</label>' +
            '<select id="foodType">' + makeOptions(foodTypes) + '</select></div>' +
            '<div class="food-row">' +
            '<div class="form-group"><label for="foodQty">Quantity</label>' +
            '<input type="number" id="foodQty" min="1" max="1000" step="1" inputmode="numeric" placeholder="e.g. 10"></div>' +
            '<div class="form-group"><label for="foodUnit">Unit</label>' +
            '<select id="foodUnit"><option value="items">items</option><option value="packs">packs</option>' +
            '<option value="kg">kg</option><option value="litres">litres</option><option value="boxes">boxes</option></select></div>' +
            '</div>' +
            '<button type="button" class="btn btn-small" id="foodAdd"><i class="fas fa-plus"></i> Add to my donation</button>' +
            '<ul class="food-list" id="foodListBox"></ul>' +
            '<p class="console-empty" id="foodEmpty">No food added yet.</p>' +
            '<div class="form-group"><label for="foodLocation">Drop-off location</label>' +
            '<select id="foodLocation">' + makeOptions(donateLocations) + '</select></div>' +
            '<div class="form-group"><label for="foodNotes">Notes (optional)</label>' +
            '<textarea id="foodNotes" rows="2" maxlength="200" placeholder="e.g. best before dates, allergens"></textarea></div>' +
            '<div class="form-group"><label for="foodName">Full name *</label><input type="text" id="foodName" autocomplete="name"></div>' +
            '<div class="form-group"><label for="foodEmail">Email *</label><input type="email" id="foodEmail" autocomplete="email"></div>' +
            '<div class="form-group"><label for="foodPhone">Phone (optional)</label><input type="tel" id="foodPhone" autocomplete="tel" placeholder="082 123 4567"></div>' +
            '<button type="submit" class="btn btn-primary donate-submit">Submit food donation</button>' +
            '</form>' +

            /* ---------- TIME ---------- */
            '<form class="donate-pane" id="donateTimeForm" data-pane="time" novalidate>' +
            '<p class="donate-label">What would you like to volunteer for?</p>' +
            '<div class="form-group"><label for="giveRole">Role</label>' +
            '<select id="giveRole"><option value="">-- Choose a role --</option>' + makeOptions(donateRoles) + '</select></div>' +
            '<div class="form-group"><label for="giveLocation">Where?</label>' +
            '<select id="giveLocation">' + makeOptions(donateLocations) + '</select></div>' +
            '<div class="form-group"><label>Days you are free</label><div class="checkbox-group" id="giveDaysBox">' + dayBoxes + '</div></div>' +
            '<div class="form-group"><label for="giveHours">Hours per week</label>' +
            '<select id="giveHours"><option value="2">About 2 hours</option><option value="4" selected>About 4 hours</option>' +
            '<option value="8">About 8 hours</option><option value="12">12 hours or more</option></select></div>' +
            '<div class="form-group"><label for="giveName">Full name *</label><input type="text" id="giveName" autocomplete="name"></div>' +
            '<div class="form-group"><label for="giveEmail">Email *</label><input type="email" id="giveEmail" autocomplete="email"></div>' +
            '<button type="submit" class="btn btn-primary donate-submit">Offer my time</button>' +
            '<p class="donate-note">Want to browse open shifts? <a href="enquiry.html#volunteerConsole">Open the Volunteer Console</a>.</p>' +
            '</form>' +

            /* ---------- THANK YOU ---------- */
            '<div class="donate-success" id="donateSuccess" role="status" style="display:none;"></div>' +
            '</div>';

        document.body.appendChild(modal);
        return modal;
    }

    function openDonate(startTab, opener) {
        if (donateModal === null) {
            donateModal = buildDonateModal();
            wireDonateModal();
        }
        donateOpener = opener || null;
        showDonateTab(startTab || 'money');
        resetDonateSuccess();
        donateModal.classList.add('open');
        donateModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        document.getElementById('donateClose').focus();
    }

    function closeDonate() {
        if (donateModal === null) {
            return;
        }
        donateModal.classList.remove('open');
        donateModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (donateOpener) {
            donateOpener.focus();
        }
    }

    // Show one tab (pane) and hide the others
    function showDonateTab(name) {
        var tabs = donateModal.querySelectorAll('.donate-tab');
        var panes = donateModal.querySelectorAll('.donate-pane');
        for (var t = 0; t < tabs.length; t++) {
            if (tabs[t].getAttribute('data-tab') === name) {
                tabs[t].classList.add('active');
            } else {
                tabs[t].classList.remove('active');
            }
        }
        for (var p = 0; p < panes.length; p++) {
            if (panes[p].getAttribute('data-pane') === name) {
                panes[p].classList.add('active');
            } else {
                panes[p].classList.remove('active');
            }
        }
    }

    // Go back from the thank-you card to the forms
    function resetDonateSuccess() {
        var box = document.getElementById('donateSuccess');
        box.style.display = 'none';
        box.innerHTML = '';
        donateModal.querySelector('.donate-tabs').style.display = '';
        donateModal.querySelector('.donate-intro').style.display = '';
    }

    // Replace the forms with a thank-you card
    function showDonateSuccess(title, lines, reference) {
        var panes = donateModal.querySelectorAll('.donate-pane');
        for (var p = 0; p < panes.length; p++) {
            panes[p].classList.remove('active');
        }
        donateModal.querySelector('.donate-tabs').style.display = 'none';
        donateModal.querySelector('.donate-intro').style.display = 'none';

        var box = document.getElementById('donateSuccess');
        box.innerHTML = '<div class="enrol-icon"><i class="fas fa-check"></i></div><h3></h3><ul class="enrol-details" id="donateDetails"></ul>' +
            '<div class="enrol-buttons"><button type="button" class="btn btn-primary" id="donateDone">Done</button>' +
            '<button type="button" class="btn btn-small" id="donateAgain">Give again</button></div>';
        box.querySelector('h3').textContent = title;

        var list = box.querySelector('#donateDetails');
        var rows = [['Reference', reference]].concat(lines);
        for (var r = 0; r < rows.length; r++) {
            var li = document.createElement('li');
            var label = document.createElement('span');
            label.textContent = rows[r][0];
            var value = document.createElement('strong');
            value.textContent = rows[r][1];
            li.appendChild(label);
            li.appendChild(value);
            list.appendChild(li);
        }
        box.style.display = 'block';

        document.getElementById('donateDone').addEventListener('click', closeDonate);
        document.getElementById('donateAgain').addEventListener('click', function () {
            resetDonateSuccess();
            showDonateTab('money');
        });
    }

    // Money: work out the amount from the buttons or the custom box
    function getMoneyAmount() {
        var custom = document.getElementById('donateCustom').value;
        if (custom !== '') {
            return Number(custom);
        }
        var chosen = donateModal.querySelector('.amount-btn.selected');
        if (chosen) {
            return Number(chosen.getAttribute('data-amount'));
        }
        return 0;
    }

    function updateDonateTotal() {
        var amount = getMoneyAmount();
        var frequency = donateModal.querySelector('input[name="donateFreq"]:checked').value;
        var totalText = document.getElementById('donateTotal');
        var submit = document.getElementById('moneySubmit');

        if (amount >= MIN_DONATION) {
            totalText.textContent = 'You are giving R' + amount + ' (' + frequency.toLowerCase() + ').';
            submit.textContent = 'Donate R' + amount;
        } else {
            totalText.textContent = 'Select an amount to continue.';
            submit.textContent = 'Donate';
        }
    }

    // Food: redraw the list of added items
    function drawFoodList() {
        var box = document.getElementById('foodListBox');
        box.innerHTML = '';
        for (var i = 0; i < foodList.length; i++) {
            var li = document.createElement('li');
            var text = document.createElement('span');
            text.textContent = foodList[i].quantity + ' ' + foodList[i].unit + ' - ' + foodList[i].type;
            var remove = document.createElement('button');
            remove.type = 'button';
            remove.setAttribute('aria-label', 'Remove ' + foodList[i].type);
            remove.innerHTML = '<i class="fas fa-times"></i>';
            removeFoodClick(remove, i);
            li.appendChild(text);
            li.appendChild(remove);
            box.appendChild(li);
        }
        document.getElementById('foodEmpty').style.display = (foodList.length === 0) ? 'block' : 'none';
    }

    function removeFoodClick(button, position) {
        button.addEventListener('click', function () {
            foodList.splice(position, 1);
            drawFoodList();
        });
    }

    // Try to add the food in the type / quantity boxes. Returns true if added.
    function addFoodItem() {
        var qtyField = document.getElementById('foodQty');
        var oldError = qtyField.parentNode.querySelector('.field-error');
        if (oldError) {
            oldError.remove();
        }
        qtyField.classList.remove('has-error');

        var qty = Number(qtyField.value);
        if (qtyField.value === '' || qty < 1 || qty > 1000 || qty !== Math.floor(qty)) {
            showFieldError(qtyField, 'Enter a whole number from 1 to 1000.');
            return false;
        }

        foodList.push({
            type: document.getElementById('foodType').value,
            quantity: qty,
            unit: document.getElementById('foodUnit').value
        });
        qtyField.value = '';
        drawFoodList();
        return true;
    }

    // Attach all the events once the pop-up exists
    function wireDonateModal() {
        document.getElementById('donateClose').addEventListener('click', closeDonate);

        // clicking the dark background closes it
        donateModal.addEventListener('click', function (event) {
            if (event.target === donateModal) {
                closeDonate();
            }
        });

        // Escape key closes it
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && donateModal.classList.contains('open')) {
                closeDonate();
            }
        });

        // Tabs
        var tabs = donateModal.querySelectorAll('.donate-tab');
        for (var t = 0; t < tabs.length; t++) {
            tabs[t].addEventListener('click', function () {
                showDonateTab(this.getAttribute('data-tab'));
            });
        }

        // ---- MONEY ----
        var amountButtons = donateModal.querySelectorAll('.amount-btn');
        for (var a = 0; a < amountButtons.length; a++) {
            amountButtons[a].addEventListener('click', function () {
                for (var x = 0; x < amountButtons.length; x++) {
                    amountButtons[x].classList.remove('selected');
                }
                this.classList.add('selected');
                document.getElementById('donateCustom').value = '';   // the button wins
                updateDonateTotal();
            });
        }
        document.getElementById('donateCustom').addEventListener('input', function () {
            for (var x = 0; x < amountButtons.length; x++) {
                amountButtons[x].classList.remove('selected');         // typed amount wins
            }
            updateDonateTotal();
        });
        var freqRadios = donateModal.querySelectorAll('input[name="donateFreq"]');
        for (var f = 0; f < freqRadios.length; f++) {
            freqRadios[f].addEventListener('change', updateDonateTotal);
        }

        var moneyForm = document.getElementById('donateMoneyForm');
        moneyForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFieldErrors(moneyForm);

            var nameField = document.getElementById('moneyName');
            var emailField = document.getElementById('moneyEmail');
            var amount = getMoneyAmount();
            var allOk = true;

            if (amount < MIN_DONATION || isNaN(amount)) {
                showFieldError(document.getElementById('donateCustom'), 'The minimum donation is R' + MIN_DONATION + '. Pick an amount or type your own.');
                allOk = false;
            }
            if (checkField(nameField, nameError(nameField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(emailField, emailError(emailField.value.trim())) === false) {
                allOk = false;
            }
            if (allOk === false) {
                return;
            }

            var frequency = donateModal.querySelector('input[name="donateFreq"]:checked').value;
            var submitButton = document.getElementById('moneySubmit');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                { type: 'money', amount: amount, frequency: frequency, name: nameField.value.trim(), email: emailField.value.trim() },
                function () {
                    showDonateSuccess('Thank you, ' + nameField.value.trim() + '! Your pledge was received.', [
                        ['Amount', 'R' + amount + ' (' + frequency + ')'],
                        ['Next step', 'We will email payment (EFT) details to ' + emailField.value.trim()]
                    ], makeReference('HV-DON'));
                    moneyForm.reset();
                    submitButton.disabled = false;
                    updateDonateTotal();
                },
                function () {
                    showFormMessage(moneyForm, 'error', 'Sorry, we could not send your pledge right now. Please try again.');
                    submitButton.disabled = false;
                    updateDonateTotal();
                }
            );
        });

        // ---- FOOD ----
        document.getElementById('foodAdd').addEventListener('click', addFoodItem);
        drawFoodList();

        var foodForm = document.getElementById('donateFoodForm');
        foodForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFieldErrors(foodForm);

            var nameField = document.getElementById('foodName');
            var emailField = document.getElementById('foodEmail');
            var phoneField = document.getElementById('foodPhone');
            var allOk = true;

            // If nothing was added yet but a quantity was typed, add it automatically
            if (foodList.length === 0 && document.getElementById('foodQty').value !== '') {
                addFoodItem();
            }
            if (foodList.length === 0) {
                showFieldError(document.getElementById('foodQty'), 'Add at least one food item with a quantity.');
                allOk = false;
            }
            if (checkField(nameField, nameError(nameField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(emailField, emailError(emailField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(phoneField, phoneError(phoneField.value.trim())) === false) {
                allOk = false;
            }
            if (allOk === false) {
                return;
            }

            var summary = [];
            for (var i = 0; i < foodList.length; i++) {
                summary.push(foodList[i].quantity + ' ' + foodList[i].unit + ' ' + foodList[i].type);
            }
            var location = document.getElementById('foodLocation').value;
            var submitButton = foodForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                { type: 'food', items: foodList, location: location, name: nameField.value.trim(), email: emailField.value.trim() },
                function () {
                    showDonateSuccess('Thank you, ' + nameField.value.trim() + '! Your food donation is booked.', [
                        ['Items', summary.join('; ')],
                        ['Drop-off', location + ' (we will confirm the time by email)']
                    ], makeReference('HV-FOOD'));
                    foodList = [];
                    drawFoodList();
                    foodForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit food donation';
                },
                function () {
                    showFormMessage(foodForm, 'error', 'Sorry, we could not send your donation right now. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit food donation';
                }
            );
        });

        // ---- TIME ----
        var timeForm = document.getElementById('donateTimeForm');
        timeForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFieldErrors(timeForm);

            var roleField = document.getElementById('giveRole');
            var nameField = document.getElementById('giveName');
            var emailField = document.getElementById('giveEmail');
            var allOk = true;

            if (roleField.value === '') {
                showFieldError(roleField, 'Please choose what you would like to volunteer for.');
                allOk = false;
            }

            var chosenDays = [];
            var dayChecks = timeForm.querySelectorAll('input[name="giveDays"]');
            for (var d = 0; d < dayChecks.length; d++) {
                if (dayChecks[d].checked) {
                    chosenDays.push(dayChecks[d].value);
                }
            }
            if (chosenDays.length === 0) {
                showFieldError(document.getElementById('giveDaysBox'), 'Tick at least one day you are free.');
                allOk = false;
            }
            if (checkField(nameField, nameError(nameField.value.trim())) === false) {
                allOk = false;
            }
            if (checkField(emailField, emailError(emailField.value.trim())) === false) {
                allOk = false;
            }
            if (allOk === false) {
                return;
            }

            var location = document.getElementById('giveLocation').value;
            var hours = document.getElementById('giveHours').value;
            var submitButton = timeForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                { type: 'time', role: roleField.value, location: location, days: chosenDays, hours: hours, name: nameField.value.trim(), email: emailField.value.trim() },
                function () {
                    showDonateSuccess('You have successfully enrolled, ' + nameField.value.trim() + '!', [
                        ['Volunteering as', roleField.value + ' at ' + location],
                        ['Free on', chosenDays.join(', ') + ' (about ' + hours + ' hours a week)'],
                        ['Next step', 'A coordinator will contact you within 2 working days']
                    ], makeReference('HV-VOL'));
                    timeForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Offer my time';
                },
                function () {
                    showFormMessage(timeForm, 'error', 'Sorry, we could not send your details right now. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Offer my time';
                }
            );
        });
    }

    // Every Donate button on the site opens the pop-up
    var donateButtons = document.querySelectorAll('.btn-donate, .donate-open');
    for (var db = 0; db < donateButtons.length; db++) {
        donateButtons[db].addEventListener('click', function (event) {
            event.preventDefault();          // stop the link going to contact.html
            openDonate('money', this);
        });
    }


});