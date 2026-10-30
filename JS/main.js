/* ==========================================================================
   HAVEN COMMUNITY FOOD BANK - main.js  (Part 3: JavaScript)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ======================================================================
       1. MOBILE MENU
       ====================================================================== */
    var menuButton = document.querySelector('.menu-toggle');
    var navMenu = document.querySelector('header nav');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', function () {
            navMenu.classList.toggle('nav-open');
            if (navMenu.classList.contains('nav-open')) {
                menuButton.setAttribute('aria-expanded', 'true');
            } else {
                menuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ======================================================================
       2. BACK-TO-TOP BUTTON
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
       3. DYNAMIC NEWS LIST (index.html)
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

            contentDiv.appendChild(heading);
            contentDiv.appendChild(paragraph);
            li.appendChild(dateSpan);
            li.appendChild(contentDiv);
            newsList.appendChild(li);
        }
    }

    /* ======================================================================
       4. SCROLL ANIMATIONS
       ====================================================================== */
    var animatedItems = document.querySelectorAll(
        '.stat-card, .value-card, .event-card, .timeline-item, .partner-item, ' +
        '.contact-item, .location-card, .role-card, .team-member, .mv-card, ' +
        '.gallery-item, .faq-item, .featured-image, .news-list li, .mosaic-item, .step-card, ' +
        '.volunteer-filters, .volunteer-counter'
    );

    for (var a = 0; a < animatedItems.length; a++) {
        animatedItems[a].classList.add('reveal');
        if (animatedItems[a].classList.contains('gallery-item') ||
            animatedItems[a].classList.contains('featured-image')) {
            animatedItems[a].classList.add('img-reveal');
        }
    }

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
    revealCardsOnScreen();

    /* ======================================================================
       5. INTERACTIVE MAP (contact.html)
       ====================================================================== */
    var mapDiv = document.getElementById('leafletMap');

    if (mapDiv && typeof L !== 'undefined') {
        var locations = [
            { name: 'Philippi Hub', lat: -34.0340, lng: 18.5540, address: '123 Main Rd, Philippi, 7785', hours: 'Mon, Wed, Sat (10am - 2pm)', contact: 'Nomsa - (021) 123-4567' },
            { name: 'Khayelitsha Satellite', lat: -34.0356, lng: 18.6714, address: '45 Mandela Ave, Khayelitsha, 7784', hours: 'Tue, Fri (11am - 3pm)', contact: 'Peter - (021) 123-4568' },
            { name: 'Mitchells Plain Satellite', lat: -34.0356, lng: 18.6217, address: '78 Second Ave, Mitchells Plain, 7785', hours: 'Wed, Thu (9am - 1pm)', contact: 'Thandi - (021) 123-4569' }
        ];

        var map = L.map('leafletMap').setView([-34.0345, 18.615], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        var allPoints = [];
        for (var m = 0; m < locations.length; m++) {
            var place = locations[m];
            var marker = L.marker([place.lat, place.lng]).addTo(map);
            var directionsLink = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.address);

            marker.bindPopup(
                '<strong>' + place.name + '</strong><br>' + place.address + '<br>' + place.hours + '<br>' + place.contact + '<br>' +
                '<a href="' + directionsLink + '" target="_blank">Get Directions</a>'
            );
            allPoints.push([place.lat, place.lng]);
        }
        map.fitBounds(allPoints, { padding: [40, 40] });
    }

    /* ======================================================================
       6. FAQ ACCORDION + SEARCH (services.html)
       ====================================================================== */
    var faqItems = document.querySelectorAll('.faq-item');

    for (var f = 0; f < faqItems.length; f++) {
        setupAccordionItem(faqItems[f]);
    }

    function setupAccordionItem(faqItem) {
        var questionButton = faqItem.querySelector('.faq-question');
        var answerBox = faqItem.querySelector('.faq-answer');

        if (!questionButton || !answerBox) return;

        questionButton.addEventListener('click', function () {
            var wasOpen = faqItem.classList.contains('open');

            for (var k = 0; k < faqItems.length; k++) {
                faqItems[k].classList.remove('open');
                faqItems[k].querySelector('.faq-answer').style.maxHeight = null;
                faqItems[k].querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }

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
        faqSearchBox.addEventListener('input', function () {
            var searchText = faqSearchBox.value.toLowerCase();
            var matchesFound = 0;

            for (var s = 0; s < faqItems.length; s++) {
                var itemText = faqItems[s].textContent.toLowerCase();
                if (itemText.indexOf(searchText) !== -1) {
                    faqItems[s].style.display = '';
                    matchesFound++;
                } else {
                    faqItems[s].style.display = 'none';
                }
            }

            if (faqEmptyMessage) {
                faqEmptyMessage.style.display = (matchesFound === 0) ? 'block' : 'none';
            }
        });
    }

    /* ======================================================================
       7. SCHEDULE DAY FILTER (services.html)
       ====================================================================== */
    var filterBar = document.getElementById('scheduleFilter');
    var scheduleRows = document.querySelectorAll('#scheduleTable tbody tr');
    var scheduleEmptyMessage = document.getElementById('scheduleEmpty');

    if (filterBar) {
        var filterButtons = filterBar.querySelectorAll('.filter-btn');

        for (var b = 0; b < filterButtons.length; b++) {
            filterButtons[b].addEventListener('click', function () {
                var chosenDay = this.getAttribute('data-day');
                var rowsShown = 0;

                for (var x = 0; x < filterButtons.length; x++) { filterButtons[x].classList.remove('active'); }
                this.classList.add('active');

                for (var r = 0; r < scheduleRows.length; r++) {
                    var rowDays = scheduleRows[r].getAttribute('data-days');
                    if (chosenDay === 'all' || rowDays.indexOf(chosenDay) !== -1) {
                        scheduleRows[r].style.display = '';
                        rowsShown++;
                    } else {
                        scheduleRows[r].style.display = 'none';
                    }
                }

                if (scheduleEmptyMessage) {
                    scheduleEmptyMessage.style.display = (rowsShown === 0) ? 'block' : 'none';
                }
            });
        }
    }

    /* ======================================================================
       8. PHOTO GALLERY + LIGHTBOX (about.html)
       ====================================================================== */
    var galleryItems = document.querySelectorAll('.gallery-item');
    var lightbox = document.getElementById('lightbox');

    if (galleryItems.length > 0 && lightbox) {
        var lightboxImage = document.getElementById('lightboxImage');
        var lightboxCaption = document.getElementById('lightboxCaption');
        var currentPhoto = 0;

        function showPhoto(position) {
            if (position < 0) position = galleryItems.length - 1;
            if (position >= galleryItems.length) position = 0;
            currentPhoto = position;

            lightboxImage.src = galleryItems[position].getAttribute('data-full');
            lightboxImage.alt = galleryItems[position].getAttribute('data-caption');
            lightboxCaption.textContent = galleryItems[position].getAttribute('data-caption');

            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }

        for (var g = 0; g < galleryItems.length; g++) {
            addGalleryClick(galleryItems[g], g);
        }

        function addGalleryClick(photoButton, photoNumber) {
            photoButton.addEventListener('click', function () { showPhoto(photoNumber); });
        }

        document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
        document.getElementById('lightboxNext').addEventListener('click', function () { showPhoto(currentPhoto + 1); });
        document.getElementById('lightboxPrev').addEventListener('click', function () { showPhoto(currentPhoto - 1); });

        lightbox.addEventListener('click', function (event) {
            if (event.target === lightbox) closeLightbox();
        });

        document.addEventListener('keydown', function (event) {
            if (!lightbox.classList.contains('open')) return;
            if (event.key === 'Escape') closeLightbox();
            if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
            if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
        });
    }

    /* ======================================================================
       9. FORM VALIDATION HELPERS
       ====================================================================== */
    function emailError(email) {
        var atPosition = email.indexOf('@');
        var lastDot = email.lastIndexOf('.');
        if (email === '') return 'Please enter your email address.';
        if (atPosition < 1 || lastDot < atPosition + 2 || lastDot === email.length - 1 || email.indexOf(' ') !== -1) return 'Please enter a valid email, for example name@example.com';
        return '';
    }

    function phoneError(phone) {
        if (phone === '') return '';
        var digitsOnly = phone.split(' ').join('').split('-').join('');
        if (isNaN(digitsOnly) || digitsOnly.length !== 10 || digitsOnly.charAt(0) !== '0') return 'Enter a 10-digit phone number starting with 0, e.g. 082 123 4567';
        return '';
    }

    function nameError(name) {
        if (name.length < 2) return 'Please enter your full name (at least 2 characters).';
        return '';
    }

    function dobError(dobText) {
        if (dobText === '') return 'Please choose your date of birth.';
        var birthDate = new Date(dobText);
        var today = new Date();
        var age = today.getFullYear() - birthDate.getFullYear();
        var monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) age--;
        if (birthDate > today) return 'Date of birth cannot be in the future.';
        if (age < 16) return 'Volunteers must be at least 16 years old.';
        return '';
    }

    function showFieldError(field, message) {
        field.classList.add('has-error');
        var errorText = document.createElement('span');
        errorText.className = 'field-error';
        errorText.textContent = message;
        field.parentNode.insertBefore(errorText, field.nextSibling);
    }

    function clearFieldErrors(form) {
        var oldErrors = form.querySelectorAll('.field-error');
        for (var i = 0; i < oldErrors.length; i++) oldErrors[i].remove();
        var redFields = form.querySelectorAll('.has-error');
        for (var j = 0; j < redFields.length; j++) redFields[j].classList.remove('has-error');
    }

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

    function checkField(field, errorMessage) {
        if (errorMessage !== '') {
            showFieldError(field, errorMessage);
            return false;
        }
        return true;
    }

    /* ======================================================================
       10. CONTACT FORM (contact.html)
       ====================================================================== */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();
            clearFieldErrors(contactForm);

            var nameField = document.getElementById('contactName');
            var emailField = document.getElementById('contactEmail');
            var typeField = document.getElementById('messageType');
            var subjectField = document.getElementById('subject');
            var messageField = document.getElementById('message');

            var allOk = true;
            if (!checkField(nameField, nameError(nameField.value.trim()))) allOk = false;
            if (!checkField(emailField, emailError(emailField.value.trim()))) allOk = false;
            if (typeField.value === '') { showFieldError(typeField, 'Please choose the type of message.'); allOk = false; }
            if (messageField.value.trim().length < 10) { showFieldError(messageField, 'Your message must be at least 10 characters long.'); allOk = false; }

            if (!allOk) {
                showFormMessage(contactForm, 'error', 'Please fix the highlighted fields and try again.');
                return;
            }

            var emailSubject = '[' + typeField.value + '] ' + subjectField.value.trim();
            var emailBody = 'Name: ' + nameField.value.trim() + '\nEmail: ' + emailField.value.trim() + '\nType of message: ' + typeField.value + '\n\n' + messageField.value.trim();
            var recipient = 'info@havenfoodbank.org';
            var mailtoLink = 'mailto:' + recipient + '?subject=' + encodeURIComponent(emailSubject) + '&body=' + encodeURIComponent(emailBody);

            var submitButton = contactForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            sendWithAjax(
                { name: nameField.value.trim(), email: emailField.value.trim(), type: typeField.value, message: messageField.value.trim() },
                function () {
                    showFormMessage(contactForm, 'success', 'Thank you, ' + nameField.value.trim() + '! Your message was sent. Click "Open Email" below if you would also like to email us directly.');
                    addMailButton(contactForm, mailtoLink);
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Enquiry';
                },
                function () {
                    showFormMessage(contactForm, 'error', 'Sorry, we could not send your message right now. Please try again, or use the email button.');
                    addMailButton(contactForm, mailtoLink);
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Enquiry';
                }
            );
        });
    }

    function addMailButton(form, mailtoLink) {
        var oldButton = form.querySelector('.mail-button');
        if (oldButton) oldButton.remove();

        var mailButton = document.createElement('a');
        mailButton.className = 'btn btn-small mail-button';
        mailButton.href = mailtoLink;
        mailButton.textContent = 'Open Email';

        var messageBox = form.querySelector('.form-message');
        messageBox.parentNode.insertBefore(mailButton, messageBox.nextSibling);
    }

    function sendWithAjax(data, onSuccess, onFailure) {
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(function (response) {
            if (response.ok) onSuccess(); else onFailure();
        })
        .catch(function () { onFailure(); });
    }

    /* ======================================================================
       11. VOLUNTEER FORM (enquiry.html)
       ====================================================================== */
    var volunteerForm = document.getElementById('volunteerForm');

    if (volunteerForm) {
        // PRE-SELECT ROLE FROM URL (if clicked from Home page)
        var urlParams = new URLSearchParams(window.location.search);
        var roleParam = urlParams.get('role');
        if (roleParam) {
            var roleDropdown = document.getElementById('role');
            if (roleDropdown) {
                roleDropdown.value = roleParam;
            }
        }

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
            if (!checkField(fullNameField, nameError(fullNameField.value.trim()))) allOk = false;
            if (!checkField(volEmailField, emailError(volEmailField.value.trim()))) allOk = false;
            if (!checkField(phoneField, phoneError(phoneField.value.trim()))) allOk = false;
            if (!checkField(dobField, dobError(dobField.value))) allOk = false;
            if (roleField.value === '') { showFieldError(roleField, 'Please choose a role.'); allOk = false; }
            if (skillsField.value.length > 300) { showFieldError(skillsField, 'Please keep this under 300 characters.'); allOk = false; }

            var dayBoxes = volunteerForm.querySelectorAll('input[name="availability"]');
            var chosenDays = [];
            for (var d = 0; d < dayBoxes.length; d++) {
                if (dayBoxes[d].checked) chosenDays.push(dayBoxes[d].value);
            }
            if (chosenDays.length === 0) { showFieldError(dayBoxes[0].parentNode.parentNode, 'Please tick at least one day you are available.'); allOk = false; }

            var heardBoxes = volunteerForm.querySelectorAll('input[name="hearAbout"]');
            var heardChosen = false;
            for (var h = 0; h < heardBoxes.length; h++) {
                if (heardBoxes[h].checked) heardChosen = true;
            }
            if (!heardChosen) { showFieldError(heardBoxes[0].parentNode.parentNode, 'Please tell us how you heard about us.'); allOk = false; }

            if (!allOk) {
                showFormMessage(volunteerForm, 'error', 'Please fix the highlighted fields and try again.');
                return;
            }

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
                    showFormMessage(volunteerForm, 'success', 'Welcome aboard, ' + fullNameField.value.trim() + '! ' + roleInfo[roleField.value] + ' There is no cost to volunteer. You said you are free on: ' + chosenDays.join(', ') + '. We will contact you within 2 working days.');
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
       12. NEWSLETTER FORM
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
                input.style.outline = '2px solid #C46A4E';
                input.placeholder = 'Enter a valid email';
                return;
            }

            input.style.outline = '';
            button.textContent = 'Subscribed!';
            form.reset();

            setTimeout(function () { button.textContent = 'Subscribe'; }, 2500);
        });
    }

    /* ======================================================================
       13. VOLUNTEER ROLE FINDER (index.html & enquiry.html)
       ====================================================================== */
    var vfGrid = document.getElementById('volunteerGrid');
    var vfSearch = document.getElementById('roleSearch');
    var vfFilterBtns = document.querySelectorAll('.volunteer-finder .filter-btn');
    var vfCountEl = document.getElementById('interestCount');
    var vfBtn = document.getElementById('expressInterestBtn');

    if (vfGrid) {
        var vfRoles = [
            { id: 1, title: 'Food Packing', category: 'physical', days: ['weekday'], time: 'Tue & Thu, 9am–12pm', desc: 'Pack food parcels for families.' },
            { id: 2, title: 'Meal Serving', category: 'physical', days: ['weekday'], time: 'Mon & Wed, 11am–2pm', desc: 'Serve hot meals with dignity.' },
            { id: 3, title: 'Delivery Driver', category: 'physical', days: ['weekend', 'weekday'], time: 'Flexible', desc: 'Deliver parcels to homes. Own vehicle needed.' },
            { id: 4, title: 'Admin Support', category: 'admin', days: ['weekday'], time: 'Weekdays, 9am–5pm', desc: 'Help with office tasks and coordination.' },
            { id: 5, title: 'Saturday Sorters', category: 'physical', days: ['weekend'], time: 'Saturdays, 8am–12pm', desc: 'Sort and organise donated goods.' },
            { id: 6, title: 'Social Media Helper', category: 'admin', days: ['weekend', 'weekday'], time: 'Flexible', desc: 'Help spread the word online.' }
        ];

        var vfCurrentFilter = 'all';
        var vfSearchTerm = '';
        var vfInterestCount = 0;

        function renderVFRoles() {
            var htmlString = '';
            var foundCount = 0;

            for (var i = 0; i < vfRoles.length; i++) {
                var role = vfRoles[i];
                var matchesFilter = false;
                var matchesSearch = false;

                if (vfCurrentFilter === 'all' || role.category === vfCurrentFilter) {
                    matchesFilter = true;
                } else {
                    for (var d = 0; d < role.days.length; d++) {
                        if (role.days[d] === vfCurrentFilter) {
                            matchesFilter = true;
                        }
                    }
                }

                var titleLower = role.title.toLowerCase();
                var descLower = role.desc.toLowerCase();
                var searchLower = vfSearchTerm.toLowerCase();

                if (titleLower.indexOf(searchLower) !== -1 || descLower.indexOf(searchLower) !== -1) {
                    matchesSearch = true;
                }

                if (matchesFilter && matchesSearch) {
                    foundCount++;
                    htmlString += '<div class="role-card reveal reveal-visible">';
                    htmlString += '<h3>' + role.title + '</h3>';
                    htmlString += '<p>' + role.desc + '</p>';
                    htmlString += '<span class="role-time">🕒 ' + role.time + '</span>';
                    htmlString += '<button class="btn btn-primary sign-up-btn" data-role="' + role.title + '">Sign Up</button>';
                    htmlString += '</div>';
                }
            }

            if (foundCount === 0) {
                vfGrid.innerHTML = '<p class="no-results">No roles match your criteria. Try adjusting your filters.</p>';
            } else {
                vfGrid.innerHTML = htmlString;
                
                // NEW: Add click events to the dynamically generated Sign Up buttons
                var signUpBtns = document.querySelectorAll('.sign-up-btn');
                for (var s = 0; s < signUpBtns.length; s++) {
                    signUpBtns[s].addEventListener('click', function() {
                        var roleName = this.getAttribute('data-role');
                        var valueToSelect = "";
                        
                        // Map the title to the select dropdown values
                        if (roleName === 'Food Packing') { valueToSelect = 'packing'; }
                        else if (roleName === 'Meal Serving') { valueToSelect = 'serving'; }
                        else if (roleName === 'Delivery Driver') { valueToSelect = 'driving'; }
                        else if (roleName === 'Admin Support') { valueToSelect = 'admin'; }

                        var roleSelect = document.getElementById('role'); 

                        if (roleSelect) {
                            // We are on the volunteer page. Scroll to form and select role.
                            roleSelect.value = valueToSelect;
                            var form = document.getElementById('volunteerForm');
                            if (form) {
                                form.scrollIntoView({ behavior: 'smooth' });
                            }
                        } else {
                            // We are on the home page. Redirect to volunteer page with URL parameter.
                            window.location.href = 'enquiry.html?role=' + valueToSelect;
                        }
                    });
                }
            }
        }

        for (var b = 0; b < vfFilterBtns.length; b++) {
            vfFilterBtns[b].addEventListener('click', function () {
                for (var k = 0; k < vfFilterBtns.length; k++) {
                    vfFilterBtns[k].classList.remove('active');
                }
                this.classList.add('active');
                
                vfCurrentFilter = this.getAttribute('data-filter');
                renderVFRoles();
            });
        }

        if (vfSearch) {
            vfSearch.addEventListener('input', function (e) {
                vfSearchTerm = e.target.value;
                renderVFRoles();
            });
        }

        if (vfBtn) {
            vfBtn.addEventListener('click', function () {
                vfInterestCount++;
                vfCountEl.textContent = vfInterestCount;
                vfBtn.textContent = 'Thanks! 🎉';
                setTimeout(function () { 
                    vfBtn.textContent = "I'm Interested!"; 
                }, 2000);
            });
        }

        renderVFRoles();
    }

    /* ======================================================================
       14. DONATION MODAL (index.html & enquiry.html)
       ====================================================================== */
    var donationModal = document.getElementById('donationModal');
    var openDonateBtns = document.querySelectorAll('.open-donate-modal');
    var closeDonateBtn = document.querySelector('.close-modal');
    var modalOverlay = document.querySelector('.modal-overlay');
    
    var tabBtns = document.querySelectorAll('.donation-tabs .tab-btn');
    var tabContents = document.querySelectorAll('.tab-content');
    
    var amountBtns = document.querySelectorAll('.amount-btn');
    var customAmountInput = document.getElementById('customAmount');
    var moneyImpactText = document.getElementById('moneyImpact');
    var donateMoneyBtn = document.getElementById('donateMoneyBtn');
    
    var donateFoodBtn = document.getElementById('donateFoodBtn');
    var foodTypeSelect = document.getElementById('foodType');
    var foodQuantityInput = document.getElementById('foodQuantity');
    
    var donationMessage = document.getElementById('donationMessage');

    if (donationModal) {
        for (var i = 0; i < openDonateBtns.length; i++) {
            openDonateBtns[i].addEventListener('click', function(e) {
                e.preventDefault();
                donationModal.classList.add('open');
                donationModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                donationMessage.style.display = 'none';
            });
        }

        function closeDonateModal() {
            donationModal.classList.remove('open');
            donationModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }

        if (closeDonateBtn) { closeDonateBtn.addEventListener('click', closeDonateModal); }
        if (modalOverlay) { modalOverlay.addEventListener('click', closeDonateModal); }
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && donationModal.classList.contains('open')) {
                closeDonateModal();
            }
        });

        for (var t = 0; t < tabBtns.length; t++) {
            tabBtns[t].addEventListener('click', function() {
                for (var x = 0; x < tabBtns.length; x++) { tabBtns[x].classList.remove('active'); }
                for (var y = 0; y < tabContents.length; y++) { tabContents[y].classList.remove('active'); }
                
                this.classList.add('active');
                var targetTab = this.getAttribute('data-tab');
                var targetContent = document.getElementById('tab-' + targetTab);
                if (targetContent) { targetContent.classList.add('active'); }
            });
        }

        for (var a = 0; a < amountBtns.length; a++) {
            amountBtns[a].addEventListener('click', function() {
                for (var x = 0; x < amountBtns.length; x++) { amountBtns[x].classList.remove('selected'); }
                this.classList.add('selected');
                customAmountInput.value = '';
                var amount = this.getAttribute('data-amount');
                updateMoneyImpact(amount);
            });
        }

        if (customAmountInput) {
            customAmountInput.addEventListener('input', function() {
                for (var x = 0; x < amountBtns.length; x++) { amountBtns[x].classList.remove('selected'); }
                var amount = this.value;
                updateMoneyImpact(amount);
            });
        }

        function updateMoneyImpact(amount) {
            if (amount === '' || amount <= 0) {
                moneyImpactText.innerHTML = 'Select an amount to see your impact...';
            } else {
                var meals = Math.floor(amount / 10);
                moneyImpactText.innerHTML = 'R' + amount + ' provides <strong>' + meals + ' meals</strong> for families in need.';
            }
        }

        if (donateMoneyBtn) {
            donateMoneyBtn.addEventListener('click', function() {
                var amount = customAmountInput.value;
                for (var x = 0; x < amountBtns.length; x++) {
                    if (amountBtns[x].classList.contains('selected')) {
                        amount = amountBtns[x].getAttribute('data-amount');
                    }
                }

                if (!amount || amount <= 0) {
                    donationMessage.className = 'form-message error';
                    donationMessage.textContent = 'Please select or enter a valid amount.';
                    donationMessage.style.display = 'block';
                    return;
                }
                
                donationMessage.className = 'form-message success';
                donationMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your donation of R' + amount + ' has been processed (Demo).';
                donationMessage.style.display = 'block';
                
                customAmountInput.value = '';
                updateMoneyImpact('');
                for (var x = 0; x < amountBtns.length; x++) { amountBtns[x].classList.remove('selected'); }
            });
        }

        if (donateFoodBtn) {
            donateFoodBtn.addEventListener('click', function() {
                var foodType = foodTypeSelect.value;
                var foodQty = foodQuantityInput.value.trim();

                if (foodType === '' || foodQty === '') {
                    donationMessage.className = 'form-message error';
                    donationMessage.textContent = 'Please select a food type and enter a quantity.';
                    donationMessage.style.display = 'block';
                    return;
                }

                donationMessage.className = 'form-message success';
                donationMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We have noted your donation of <strong>' + foodQty + '</strong> of <strong>' + foodType + '</strong>. Please drop it off at our Philippi Hub (Mon-Sat).';
                donationMessage.style.display = 'block';

                foodTypeSelect.value = '';
                foodQuantityInput.value = '';
                var dropOff = document.getElementById('dropOffDate');
                if (dropOff) { dropOff.value = ''; }
            });
        }
    }

});