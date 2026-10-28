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
                    showFormMessage(volunteerForm, 'success',
                        'Welcome aboard, ' + fullNameField.value.trim() + '! ' +
                        roleInfo[roleField.value] + ' There is no cost to volunteer. ' +
                        'You said you are free on: ' + chosenDays.join(', ') + '. ' +
                        'We will contact you within 2 working days.');
                    volunteerForm.reset();
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
                input.style.outline = '2px solid #FF5A5F'; // red outline = problem
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

});