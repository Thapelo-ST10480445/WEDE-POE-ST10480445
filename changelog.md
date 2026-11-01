# Changelog

**Project:** Haven Community Food Bank website
**Developer:** Thapelo Mathebe (ST10480445)
**Module:** Web Development (WEDE5020), The Independent Institute of Education (IIE)

This file records every notable change to the project, grouped by assignment part. Newest part first.

## At a Glance

| Version | Date | Part | Summary | Status |
|---------|------|------|---------|--------|
| 3.0.0 | 18 Sep - 31 Oct 2026 | Part 3 | JavaScript, interactivity, SEO, forms, new design | Complete, deploying to GitHub Pages |
| 2.0.0 | 18 Sep 2026 | Part 2 | Advanced CSS styling | Submitted |
| 1.0.0 | 14 Aug 2026 | Part 1 | Proposals, HTML structure, README | Submitted |

---

## Part 3 - JavaScript, Interactivity and Deployment  `[3.0.0]`

**Dates:** 18 September - 31 October 2026
**Status:** Complete. The website will be deployed with **GitHub Pages**.

### 1. JavaScript (`js/main.js`)

One shared script is loaded on every page. Each feature first checks that its elements exist on the current page. The code is written in plain beginner-level JavaScript (functions, `for` loops, `getElementById` / `querySelector`) with comments on each step.

| Feature | Page | What it does |
|---------|------|--------------|
| Mobile menu | All | Hamburger button opens and closes the navigation on phones |
| Back-to-top button | All | Appears after scrolling down and scrolls smoothly to the top |
| Interactive map (Leaflet.js) | Contact | 3 pins (Philippi, Khayelitsha, Mitchells Plain) with popups and "Get Directions" links |
| FAQ accordion | Services | Click a question to open its answer, one open at a time |
| FAQ search | Services | Live search that hides non-matching questions, with a "no results" message |
| Schedule filter | Services | Day buttons (All, Mon-Sat) show or hide table rows |
| Photo gallery and lightbox | About | Click a photo to enlarge it; next, previous and close buttons; Esc and arrow keys work |
| Dynamic news list | Home | News items are stored in an array and built with `createElement` / `appendChild` |
| Scroll animations | All | Cards fade and slide in as they scroll into view (JS adds a class, CSS does the animation) |
| Volunteer console | Enquiry | Interactive tool: filter, search and sort 12 shifts, build a weekly plan (max 4, no duplicates or clashes), live statistics, save plan in the browser and send it into the sign-up form |
| Donate pop-up | All | Give money (from R50), food (type and quantity) or time (role, days) with validation and a thank-you card |
| Newsletter form | Footer | Checks the email and confirms "Subscribed!" |

### 1b. Volunteer Console (`enquiry.html`, added 30 October 2026)

A new interactive section above the sign-up form where volunteers choose where, when and how they want to help.

- **Data:** 12 shifts stored in an array of objects (location, role, day, start and end time, spots left)
- **Filter, search and sort:** by location (3 sites), role (4 roles) and day; keyword search; sort by day, spots left or longest shift; reset button
- **My plan:** add and remove shifts; spots count down as shifts are added; the plan list and statistics (shifts shown, open spots, shifts in plan, hours per week) update live
- **Rules with messages:** maximum 4 shifts per week, no duplicate shifts, no time clashes on the same day, no full shifts
- **Save and send:** the plan is saved in the browser (`localStorage`, wrapped in try/catch) and "Use plan in sign-up form" ticks the matching availability days and selects the role in the form below
- **JavaScript skills shown:** arrays of objects, `for` loops, DOM creation (`createElement`, `appendChild`, `textContent`), events, functions, conditions, `localStorage`, sorting with `sort()`

### 1c. Donate Pop-up and Enrolment Confirmation (added 31 October 2026)

- **Donate pop-up (every page):** the Donate buttons open a pop-up built with JavaScript, with three tabs
  - **Give Money:** R50, R100, R200, R500, R1000 or a custom amount (minimum R50); once-off or monthly; the button shows the chosen amount
  - **Give Food:** type of food (8 categories), quantity (whole number 1-1000), unit (items, packs, kg, litres, boxes); several items can be added and removed; drop-off location at one of the 3 sites
  - **Give Time:** role (4 roles), location, days free and hours per week
  - All tabs validate the fields, show error messages, send the data with `fetch()` and finish with a thank-you card and reference number (for example `HV-DON-4821`). Escape, the close button and the dark background close the pop-up
- **Volunteer enrolment confirmation (`enquiry.html`):** after a valid sign-up the form is replaced by a "You have successfully enrolled as a Haven volunteer!" card with reference number, date, role, available days, email, shifts from the console plan, next steps, and an "Enrol another volunteer" button
- **Volunteer Console made responsive:** no scrolling box inside the page on tablets and phones, wrapping plan buttons, smaller padding and statistics on small screens, a "Jump to my plan" button on mobile, sticky plan panel on desktop

### 2. Forms and Validation

- **Client-side validation** with a clear error message under each invalid field:
  - Required fields
  - Email format
  - South African phone number (10 digits, starts with 0)
  - Name length (minimum 2 characters)
  - Message length (minimum 10 characters)
  - Date of birth (not in the future, volunteers must be 16 or older)
  - At least one availability day, and one "how did you hear about us" choice
- **AJAX submission:** the forms send their data with `fetch()` (POST, JSON) without reloading the page. A "Sending..." state shows on the button, and success or failure messages are displayed. A free practice API is used for now; only the URL needs to change when a real server exists.
- **Contact page (`contact.html`):**
  - Added a required **Type of Message** dropdown (General Enquiry, Donation, Volunteering, Request for Food Help).
  - After validation the message is compiled into an email (`mailto:`) addressed to `info@havenfoodbank.org`, including the message type. An "Open Email" button appears.
- **Enquiry page (`enquiry.html`):** after a valid submission the page shows a response with the chosen role's days and times, that volunteering costs nothing, and the days the volunteer said they are available.

### 3. CSS Animations and Images

- Ken Burns slow-zoom effect on the hero and page-header backgrounds
- Image zoom reveal on gallery and featured photos
- Replaced the hero photo with a South African food-distribution photo (resized to 400, 800 and 1200px JPG versions for faster loading)
- Replaced the placeholder gallery, page-header, featured and spotlight photos with more fitting food-bank and volunteer photos from Pexels (credited in the README references)
- New homepage sections: "Life at Haven" photo mosaic and a donate call-to-action band; new "How a Distribution Day Works" 3-step photo section on `services.html`

### 4. SEO, Performance and Security

- Open Graph and Twitter Card meta tags and a canonical URL on all five pages
- NGO structured data (JSON-LD, schema.org) on the homepage
- Added `robots.txt` and `sitemap.xml` in the project root
- Responsive image sizes and descriptive `alt` text for faster, more accessible pages

### 5. Mobile and Touch Fixes (12 October 2026)

- Hamburger button enlarged to a 44x44px tap target
- Hover effects now apply only on devices with a mouse (`@media (hover: hover) and (pointer: fine)`), so they no longer get "stuck" after a tap
- Hero `background-attachment: fixed` switched to `scroll` below 768px (it flickers on iOS and Android)
- Tighter header layout at 480px and below
- `touch-action: manipulation` on buttons to remove the tap delay

### 6. Design Updates

- **Off-white and green theme (30 October 2026):** the coral, indigo and periwinkle palette was replaced with a warm off-white background (#F8F6EF) and greens (leaf #1F8A4C, forest #1F5D3A, sage #A8D5B5). All colours live in CSS variables, so the change was made once in `:root`; the logo, favicon, hero and banner overlays and gradients were recoloured to match
- *(18 September palette, now replaced)* **Colour palette changed** from turquoise and dark grey (Parts 1-2) to coral red (#FF5A5F), deep indigo (#2E2B5F) and soft periwinkle (#A6B1FF), with pill-shaped buttons, a glass-effect header and bento-style card grids (18 September)
- **New logo** on all five pages: an indigo rounded badge with a coral heart in a white bowl, readable at header size (12 October)

### 7. Fixes

- Map showed a `403 Access blocked` error because the OpenStreetMap tile servers reject unregistered traffic. Switched to free CARTO basemap tiles (18 September).
- Replaced the placeholder address with a realistic Philippi address: `24 Old Lansdowne Road, Philippi, 7781` (18 September).
- Corrected file and content issues: `homepage.html` renamed to `index.html`, missing en-dashes in distribution times restored, and `services.html` rebuilt after the upload was found truncated (18 September).
- News items created by JavaScript were not animating on scroll; fixed by registering them for the animation after they are created.

### 8. Documentation

- README updated with the Part 3 features, new folder structure and references
- This changelog restructured by assignment part

### Part 2 Feedback and Resulting Changes

| Area | Change made in Part 3 |
|---|---|
| Mobile responsiveness | Fixed the mobile menu, 44px tap targets, hover effects limited to mouse devices, no fixed backgrounds on phones, tighter small-screen header |
| Design | New off-white and green theme, new logo and favicon, new photographs, photo mosaic and call-to-action band |
| Accessibility | Alt text on all images, labelled form controls, keyboard support (lightbox, accordion, pop-up), focus states, reduced-motion support |
| Performance | Hero image resized to 400/800/1200px, `srcset` and lazy loading on photos |
| Content | Rebuilt truncated `services.html`, fixed file name and link problems, realistic address |
| Documentation | README restructured with a Part 3 checklist and image index; changelog restructured by part |

*(Add the lecturer's exact Part 2 feedback points here if they list specific items.)*

### Part 3 Rubric Checklist (1 November 2026)

- Added `action="mailto:info@havenfoodbank.org"` to the contact and volunteer forms as a no-JavaScript fallback (JavaScript still validates and sends with AJAX first)
- Fixed the one image without alt text (the lightbox image now has a default alt that JavaScript replaces for each photo)
- Added a Part 3 checklist, live site link and image index with credits to the README

### 9. Deployment

- The site will be published with **GitHub Pages** from the project's GitHub repository (replaces the Netlify plan listed earlier).
- Steps: push the project to GitHub, then Settings > Pages > deploy from the `main` branch (root folder).
- Updated the web address in `robots.txt`, `sitemap.xml`, the canonical tags, the Open Graph URLs and the homepage structured data to the live address: `https://thapelo-st10480445.github.io/WEDE-POE-ST10480445/`

### Still to do (own tasks)
- Deploy to GitHub Pages and test the live site
- Cross-browser testing and accessibility audit results (screenshots as evidence)
- Add Harvard references for the new hero photo and any other new images

---

## Part 2 - Advanced CSS Styling  `[2.0.0]`

**Date:** 18 September 2026
**Status:** Submitted

### Added
- External stylesheet `css/style.css` applied to all five pages
- CSS variables (`:root`) for colours and spacing
- Fluid typography using `clamp()`
- Glassmorphism header (`backdrop-filter: blur(10px)`) on the sticky navigation
- CSS Grid and Flexbox layouts (`auto-fit` grids for stats, team, values and locations)
- `:hover`, `:focus` and `:active` states on buttons, links and form inputs, with glowing borders and lift effects
- Responsive media queries for tablet (max-width 768px) and mobile (max-width 480px)
- Gradients, box shadows and rounded corners

### Changed
- Consolidated breakpoints for smooth scaling across mobile, tablet and desktop

### Removed
- Inline styles from the HTML files (moved to the external stylesheet)

---

## Part 1 - Proposal, Structure and Documentation  `[1.0.0]`

**Date:** 14 August 2026
**Status:** Submitted

### Added
- **Project setup:** folder structure, Git repository, README.md and CHANGELOG.md
- **Proposals:** Haven Community Food Bank (non-profit) and Oak & Iron Custom Carpentry (small business), each with overview, goals and KPIs, current website analysis, features, design guidelines, technical requirements, timeline and budget
- **HTML pages:**
  - `index.html` - hero, impact statistics, upcoming events, volunteer spotlight, latest news
  - `about.html` - history timeline, mission and vision, values, team profiles, testimonials
  - `services.html` - eligibility, weekly distribution schedule, location cards, FAQ
  - `enquiry.html` - volunteer roles and sign-up form (name, email, phone, date of birth, role, availability, skills, how you heard about us)
  - `contact.html` - contact details, enquiry form, location cards, social links
- **Styling:** first stylesheet with a turquoise and dark grey scheme, Montserrat and Open Sans fonts, responsive breakpoints and card layouts
- **Images:** hero, food parcels, volunteers, page headers, team and location photos (sourced from Pexels and Unsplash)
- **Documentation:** README with student details, goals, features, tech stack, folder structure, timeline, sitemap and Harvard Anglia references

### Pre-submission history

| Version | Date | What happened |
|---------|------|---------------|
| 0.9.0 | 13 Aug 2026 | HTML templates for all pages, CSS variables, navigation; fixed image paths and broken links |
| 0.8.0 | 12 Aug 2026 | Two proposals written, audience and competitor analysis |
| 0.7.0 | 11 Aug 2026 | Research, content gathering, image sourcing |
| 0.6.0 | 10 Aug 2026 | Wireframes, draft timeline, budget estimate |
| 0.5.0 | 9 Aug 2026 | Idea, organisation selected, research started |