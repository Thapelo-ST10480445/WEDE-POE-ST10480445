# Haven Community Food Bank – Website Project

---

## Student Details

**Student Name:** Thapelo Mathebe
**Student Number:** ST10480445
**Subject:** Web Development (WEDE5020)
**Programme:** Diploma in Information Technology – Software Development
**Group:** 4
**Date:** 14 August 2026 (last updated 1 November 2026)

---

## Project Overview

For this project, I've built a website for Haven Community Food Bank, a non-profit organisation based in Cape Town that's been helping people since 2015. They serve over 400 families every month, but right now they don't have a proper website — they rely on paper flyers and Facebook posts to get information out.

The goal is to give them a modern, professional website that works well on phones (since a lot of their community members access the internet that way). The website needs to be easy to navigate, look good, and most importantly, be useful for three different groups of people:

**People who need food** — they need to find out where and when to get help
**Volunteers** — they need an easy way to sign up
**Donors** — they need to see the impact and know how to help

### Project Phases

This is a three-part assignment, built step by step:

**Part 1 – Planning:** proposals, design, sitemap. *Status: Done*
**Part 2 – Build:** the HTML and CSS (structure and styling). *Status: Done*
**Part 3 – Interactivity:** JavaScript for forms, maps, etc. *Status: Done — mobile navigation, interactive Leaflet map, form validation and processing, FAQ accordion with search, schedule filtering, photo gallery with lightbox, scroll animations, dynamically-rendered news, volunteer console, donate pop-up and on-page SEO; see the Part 3 checklist and Changelog below*

---

## Live Website and Repository

- **Live website (GitHub Pages):** https://thapelo-st10480445.github.io/WEDE-POE-ST10480445/
- **GitHub repository:** https://github.com/Thapelo-ST10480445/WEDE-POE-ST10480445
- **Run it locally:** download or clone the repository and open `index.html` in a browser (no build step or server needed; an internet connection is needed for the map tiles, icons, fonts and photos)

---

## Part 3 Checklist (where each requirement is)

| Part 3 requirement | Where it is |
|---|---|
| Interactive elements | Mobile menu, FAQ accordion, schedule filter, volunteer console, donate pop-up, back-to-top, scroll animations (`js/main.js`) |
| Interactive map | `contact.html` – Leaflet map with 3 pins, popups and directions links (section 4 of `js/main.js`) |
| Gallery lightbox | `about.html` – 6 photos, next/previous/close, keyboard and touch support (section 7) |
| Dynamic content and search | `index.html` news built from an array (section 8); `services.html` FAQ live search and day filter (sections 5 and 6); volunteer console search, filter and sort |
| SEO: title tags | A unique `<title>` on every page |
| SEO: meta keywords and description | A unique `keywords` and `description` meta tag on every page, plus Open Graph and Twitter tags, canonical URLs and JSON-LD (homepage) |
| SEO: image file names and alt text | Descriptive alt text on every image (see the Image Index below); descriptively named hero image files in `images/` |
| Enquiry form controls | `enquiry.html` – text, email, tel, date, dropdown, checkboxes, radio buttons, textarea, all with labels |
| Enquiry validation | Required fields, email, phone, date of birth (16+), text length, at least one day and one source; messages under each field |
| Enquiry process response | After a valid submission the form is replaced by a "You have successfully enrolled" card (reference number, role, days, next steps) |
| Contact form controls | `contact.html` – name, email, type of message (dropdown), subject, message, all with labels |
| Contact validation | Required fields, email format, message type chosen, message at least 10 characters |
| Contact process email | The message is sent with AJAX (`fetch`) and compiled into an email (`mailto:info@havenfoodbank.org`) including the type of message, with an "Open Email" button; the form `action` is also a `mailto:` link as a no-JavaScript fallback |
| GitHub | Project pushed to the repository above with descriptive commits |
| README and Changelog | This file and `CHANGELOG.md` |
| Deployment | GitHub Pages (link above) |

---

## Part 2 Feedback and Resulting Changes

The following changes were made after the Part 2 submission to respond to its feedback (full detail in `CHANGELOG.md`):

- **Responsiveness and usability on phones:** fixed the mobile menu, enlarged tap targets to 44px, stopped hover effects sticking on touch screens, and fixed the fixed-background flicker on mobile
- **Visual design:** replaced the original turquoise theme with a fresh off-white and green palette, a new logo and favicon, and better, more relevant photographs
- **Accessibility:** descriptive alt text on all images, labels on every form control, keyboard support in the lightbox, accordion and pop-up, visible focus states, and reduced-motion support
- **Performance:** resized hero image in three sizes, responsive `srcset` images, lazy loading on photos
- **Content fixes:** rebuilt the truncated `services.html`, fixed the homepage file name and link problems, replaced the placeholder address with a realistic one
- *(If your lecturer's Part 2 feedback lists specific points, add them here with how each was addressed.)*

---

## SEO, Page Speed and Security (Additional Requests)

| Request | What was done |
|---|---|
| **robots.txt** | `robots.txt` in the project root allows all crawlers and points to the sitemap |
| **sitemap.xml** | `sitemap.xml` lists all 5 pages with last-modified date, change frequency and priority, using the live GitHub Pages address |
| **Page speed** | Hero image resized to 400, 800 and 1200px JPG versions; responsive `srcset` and `loading="lazy"` on photos; scripts loaded with `defer` so they do not block the page; `preconnect` to fonts, icons and the photo host; the hero photo is preloaded on the home page; `font-display: swap` for Google Fonts; one shared stylesheet and one shared script (cached across pages) |
| **Security** | A Content Security Policy (meta tag) limits where scripts, styles, fonts, images and AJAX calls may come from; `referrer` policy; `rel="noopener noreferrer"` on links that open in a new tab; a hidden honeypot field on the contact and volunteer forms to catch spam bots; client-side validation of all input; user-typed text is shown with `textContent` instead of being injected as HTML; `mailto:` content is encoded with `encodeURIComponent`; HTTPS is provided by GitHub Pages; no passwords, payments or personal data are stored (the console plan is the only thing saved, in the visitor's own browser) |

---

## Website Goals and Objectives

**Centralise Information** – instead of having info scattered everywhere, everything lives in one place online
**Get More Volunteers** – make it super easy for people to sign up
**Attract More Donors** – show people what the organisation does so they feel confident donating
**Make It Accessible** – the site needs to work for everyone, including people with disabilities
**Build a Professional Image** – look legitimate so corporate partners take them seriously

### How I'll Measure Success (KPIs)

**Less admin work** – tracked by counting phone calls/emails asking basic questions; target: 40% less in 6 months
**More volunteers** – tracked by counting online sign-ups; target: 50% more in 6 months
**More donations** – tracked by counting new monthly donors; target: 30+ new donors per month
**Better visibility** – tracked via Google Search Console impressions; target: 500+ impressions per month



## Key Features and Functionality

### The Pages

I've built 5 main pages (the minimum required):

**Homepage** (`index.html`) – the landing page with the hero section, stats, and a preview of what's coming up
**About Us** (`about.html`) – the organisation's story, team members, and what they stand for
**Get Help** (`services.html`) – eligibility, distribution schedule, locations, and an FAQ section
**Volunteer** (`enquiry.html`) – a form where people can sign up to help out
**Contact** (`contact.html`) – how to get in touch, an interactive map, and where to find them

### Features

**Mobile-friendly design** – everything works on phones first, then scales up
**Modern visual design** – a fresh off-white and green colour system (leaf green #1F8A4C, forest green #1F5D3A, sage #A8D5B5 on a warm off-white #F8F6EF background) with a bento-style card layout, glass-effect header, and gradient accents, rather than a generic template look
**Accessibility features** – high contrast, keyboard navigation, visible focus states, alt text on images
**Functional mobile menu** – the hamburger icon now actually opens/closes navigation on small screens
**Interactive map** – a real Leaflet.js map on the Contact page with clickable pins for all three distribution points, popups with hours/contact info, and "Get Directions" links
**Form validation** – the Contact and Volunteer forms validate required fields, email format, and (for the volunteer form) that at least one availability day is checked, with inline error messages and a success confirmation
**Newsletter signup feedback** – the footer subscribe form confirms submission client-side
**Back-to-top button** – appears after scrolling and smooth-scrolls back to the top
**Clear navigation** – the menu is consistent across all pages
**Donate button** – stands out to encourage giving
**Social media links** – connects to Facebook, Instagram, Twitter, and LinkedIn
**FAQ accordion with live search** – the Get Help page's FAQ expands/collapses one question at a time, with a search box that filters questions as you type
**Distribution schedule filter** – filter the schedule table by day (Mon–Sat) with one click
**Photo gallery with lightbox** – an "Our Work in the Community" gallery on the About page; click any photo to view it full-size with next/previous/close controls (mouse, tap, or keyboard)
**Scroll-reveal and image animations** – cards and list items animate gently into view as you scroll; hero and page-header photos have a slow Ken Burns zoom (CSS `@keyframes`)
**Dynamically-rendered news** – the homepage's "Latest News" list is generated with JavaScript from a data array rather than hardcoded, simulating how it would be populated from a CMS/API
**AJAX form submission** – the Contact and Volunteer forms send their data with `fetch()` (POST, JSON) to a free practice API without reloading the page, with a loading state on the submit button and success/error messages; the URL can be swapped for a real backend later
**Volunteer Console** (`enquiry.html`) – an interactive tool where a visitor picks where and when they want to volunteer: filter 12 open shifts by location, role and day, search and sort them, add shifts to a personal plan (max 4 per week, spots count down, clash and duplicate checks), see live stats (shifts shown, open spots, shifts in plan, hours per week), save the plan in the browser (`localStorage`) and send it into the sign-up form with one click
**Donate pop-up** – every "Donate" button opens a pop-up with three tabs: **Give Money** (R50, R100, R200, R500, R1000 or a custom amount, minimum R50, once-off or monthly), **Give Food** (choose the type of food, the quantity and the unit, add several items, pick a drop-off location) and **Give Time** (choose the role, location, days and hours per week). Each tab is validated and ends with a thank-you card and a reference number
**Volunteer enrolment confirmation** – after a valid sign-up the form is replaced by a "You have successfully enrolled" card showing a reference number, the role, available days, any shifts planned in the console and what happens next
**On-page SEO** – descriptive meta titles/descriptions per page, Open Graph and Twitter Card tags for link previews, canonical URLs, NGO structured data (JSON-LD) on the homepage, a `robots.txt`, and a `sitemap.xml`



## Tech Stack

**HTML5** – page structure (Mozilla Developer Network, n.d.); it's the standard and has good accessibility features
**CSS3** – styling and layout (Mozilla Developer Network, n.d.); Flexbox and Grid make responsive design easier
**JavaScript (Vanilla)** – interactivity: mobile nav, Leaflet map, FAQ accordion and search, schedule filter, gallery lightbox, scroll animations, dynamic news, form validation, `fetch()` AJAX submission, back-to-top
**Leaflet.js** – interactive maps; free, open-source, doesn't track users (Leaflet, n.d.)
**CARTO basemap tiles** – map tile provider (see Changelog: switched from raw OpenStreetMap tile servers, which actively block unregistered app traffic per their usage policy)
**Font Awesome** – icons; free icons that look professional (Font Awesome, n.d.)
**Google Fonts** – typography; Montserrat and Open Sans are clean and readable (Google Fonts, n.d.)
**GitHub Pages** – free hosting directly from the GitHub repository, with HTTPS (GitHub, n.d.)
**Git & GitHub** – version control; standard for tracking changes



## File and Folder Structure

```
haven-site/
  index.html
  about.html
  services.html
  enquiry.html
  contact.html
  robots.txt
  sitemap.xml
  css/
    style.css
  js/
    main.js
  images/      (hero photo in 400/800/1200px JPG sizes)
  favicon.svg
  .nojekyll
  CHANGELOG.md
```

- All pages share the same header, navigation, and footer for consistency
- All styling lives in one stylesheet (`css/style.css`) so the look stays consistent across pages
- All interactivity lives in one script (`js/main.js`), loaded on every page — it checks for each feature's elements before running, so one shared file safely covers all five pages



## Timeline and Milestones

- **2015** – Haven founded; started as a small weekend soup kitchen
- **2017** – Registered as a formal NPO
- **2019** – Opened Philippi warehouse and distribution hub
- **2021** – Added satellite locations in Mitchells Plain and Strandfontein
- **2026** – Now serving 400+ families monthly with groceries and 600+ hot meals
- **Part 1 (Done)** – Planning, proposal, sitemap, wireframes
- **Part 2 (Done)** – HTML structure and CSS styling for all 5 pages
- **Part 3 (In Progress)** – JavaScript: mobile navigation, interactive map, form validation, FAQ accordion/search, schedule filtering, gallery/lightbox, scroll animations, dynamic content, and on-page SEO are all done; still to come: deployment, screenshot evidence, and final GitHub commit history



## Part 1 Details

Part 1 covered the planning phase: the website project proposal, defining the scope and goals, researching and sourcing content, and creating the sitemap. Part 2 and Part 3 details will follow in future submissions/edits as those phases are completed.



## Sitemap

- **Home** (`index.html`)
  - Links to: About, Services, Volunteer, Contact
- **About** (`about.html`)
  - Our Story, Mission & Vision, Values, Team, Impact, Testimonials
- **Services / Get Help** (`services.html`)
  - Eligibility, Distribution Schedule, Locations, FAQ
- **Volunteer** (`enquiry.html`)
  - Volunteer Roles, Testimonials, Sign-Up Form
- **Contact** (`contact.html`)
  - Contact Details, Enquiry Form, Interactive Map, Locations, Social Links

All pages are reachable from every other page via the main navigation menu and the footer quick links.



## Changelog

- **14 August 2026** – Renamed homepage file to `index.html` so all internal navigation links resolve correctly
- **14 August 2026** – Fixed corrupted characters on the homepage (missing en-dashes in distribution times)
- **14 August 2026** – Fixed mismatched names/alt text and duplicate photos in the About page team section
- **14 August 2026** – Reorganised project into proper folder structure (`css/` folder for stylesheet)
- **14 August 2026** – Cleaned up inconsistent spacing/comment formatting on the homepage
- **18 September 2026** – Redesigned the colour palette and layout for a more modern look: moved from the original navy/turquoise theme to a warm coral-red, deep indigo, and soft periwinkle palette, with pill-shaped buttons, a glass-effect sticky header, gradient accents, bento-style card grids, and a fluid typography scale
- **18 September 2026** – Confirmed `homepage.html` was still present under its old filename despite the earlier changelog entry; actually renamed it to `index.html` so it matches the internal links across every page
- **18 September 2026** – Re-fixed the distribution-time en-dashes on the homepage, which had regressed back to plain double spaces (`10am  2pm` → `10am – 2pm`)
- **18 September 2026** – Rebuilt `services.html` from scratch: the uploaded file was corrupted/truncated at 1.4KB. Reconstructed it against the sitemap (Eligibility, Distribution Schedule table, Locations, FAQ) in the new design system
- **18 September 2026** – Added `js/main.js` for Part 3 interactivity:
  - Functional mobile navigation toggle (hamburger menu now opens/closes on small screens)
  - Interactive Leaflet.js map on the Contact page with pins, popups, and directions links for all three distribution points
  - Client-side validation and success/error feedback for the Contact and Volunteer forms
  - Newsletter signup confirmation in the footer
  - Back-to-top button
- **18 September 2026** – Replaced the placeholder address (`123 Main Rd, Philippi, 7785`) across all five pages, the footer, the map data, and the directions links with a realistic Philippi address: `24 Old Lansdowne Road, Philippi, 7781`
- **18 September 2026** – Fixed a `403 Access blocked` error from the interactive map: the raw OpenStreetMap tile servers (`tile.openstreetmap.org`) actively reject traffic that doesn't meet their tile usage policy. Switched the Leaflet tile layer to CARTO's free basemap tiles, which permit this kind of use without an API key
- **12 October 2026** – Fixed mobile responsiveness and button/touch issues in `css/style.css`:
  - Enlarged the hamburger menu button to a proper 44×44px tap target (it was icon-sized and easy to miss on a phone)
  - Stopped hover-lift animations (cards, nav links, Donate button, back-to-top) from getting visually "stuck" on tap — touch screens simulate `:hover` on tap, so these now only trigger on devices with a real mouse/trackpad (`@media (hover: hover) and (pointer: fine)`); `:active` still gives instant tap feedback everywhere
  - Fixed the hero's `background-attachment: fixed`, which breaks/flickers on iOS Safari and many Android browsers, by switching it to `scroll` under 768px
  - Tightened the header layout at very small phone widths (≤480px) so the logo, Donate button, and menu icon no longer crowd each other
  - Added `touch-action: manipulation` to buttons to remove the ~300ms tap delay some mobile browsers add
- **12 October 2026** – Replaced the logo on all five pages: the old navy/turquoise badge had three lines of text ("H" / "FOOD" / "BANK") crammed into a 42px icon that was unreadable at that size. New logo is a rounded-square badge in the site's indigo gradient with a simple coral heart resting in a white bowl — reads clearly at header size and matches the current colour palette
- **17 October 2026** – Completed the remaining Part 3 JavaScript and SEO requirements:
  - **FAQ accordion + search** (`services.html`): converted the static FAQ list into a one-at-a-time accordion with expand/collapse animation, plus a live search box that filters questions as you type (`js/main.js`)
  - **Distribution schedule filter** (`services.html`): added day-of-week filter buttons (All / Mon–Sat) above the schedule table that show/hide rows instantly, with a "no results" message when a day has no open locations
  - **Photo gallery + lightbox** (`about.html`): new "Our Work in the Community" section with 6 photos; clicking one opens a full-size lightbox with next/previous/close controls, supporting mouse, touch, and keyboard (Esc, ←, →)
  - **Scroll-reveal animations**: cards across every page (stats, values, events, team, timeline, locations, roles, partners, gallery, FAQ, news) now fade/slide into view on scroll (this was later simplified to a scroll listener, see 28 October), with a `prefers-reduced-motion` fallback for users who've disabled animations
  - **Dynamic content loading** (`index.html`): the "Latest News" list is now built entirely with JavaScript DOM methods (`createElement`/`appendChild`) from a data array instead of being hardcoded in the HTML, with a `<noscript>` fallback for the rare case JavaScript is disabled
  - **Simulated AJAX submission**: the Contact and Volunteer form handlers now submit through a Promise-based async function with a loading spinner on the submit button, matching the shape of a real `fetch()` call — the `TODO` comment in `js/main.js` marks exactly where to plug in a real backend or Netlify Forms endpoint
  - **On-page SEO**: added Open Graph and Twitter Card meta tags plus a canonical URL to all five pages (for clean link previews when shared), NGO structured data (JSON-LD, schema.org) to the homepage describing the organisation, and created `robots.txt` and `sitemap.xml` at the project root
- **28 October 2026** – Rewrote `js/main.js` in plain, beginner-friendly JavaScript (function declarations, `for` loops, `getElementById`/`querySelector`, step-by-step comments) so that I can fully understand and explain every line. The advanced constructs from the 17 October version (`IntersectionObserver`, Promises, `matchMedia`, regex background splitting, 3D tilt maths) were replaced with simpler equivalents:
  - **Scroll animations**: now a scroll event listener that checks `getBoundingClientRect().top` and adds the `reveal-visible` class; the CSS transition still does the fading/sliding
  - **AJAX**: forms now send their data with a real `fetch()` POST (to the free JSONPlaceholder practice API) and handle success and failure messages; only the URL needs to change when Haven has a real server
  - **Validation**: separate small check functions for email, South African phone number (10 digits starting with 0), name length, message length (min 10 characters), and date of birth (not in the future, volunteer must be 16+), each returning a clear error message shown under the field
  - **Contact form** (`contact.html`): added a required "Type of Message" dropdown (General Enquiry, Donation, Volunteering, Request for Food Help). After validation the message type, name, email and message are compiled into a `mailto:` email addressed to `info@havenfoodbank.org`, with an "Open Email" button
  - **Volunteer enquiry form** (`enquiry.html`): after a valid submission the page now shows a response about the chosen role (days/times), that volunteering costs nothing, and the days the volunteer said they are available
  - Removed the mouse-tilt effect on gallery photos (unnecessary complexity); the CSS image-zoom and Ken Burns animations remain
- **28 October 2026** – Visual upgrade: replaced the placeholder photos with more fitting food-bank and volunteer photos from Pexels (gallery, page headers, featured image, spotlight background). Added a "Life at Haven" photo mosaic and a donate call-to-action band on the homepage, and a "How a Distribution Day Works" 3-step photo section on the Get Help page; the new cards use the same scroll animation. Photo credits added to References
- **1 November 2026** – SEO, page speed and security update: refreshed `robots.txt` (with comments) and `sitemap.xml` (new last-modified dates); added a Content Security Policy, referrer policy, `noopener noreferrer` on external links and a hidden honeypot field on the contact and volunteer forms (checked in `js/main.js`); added `defer` on scripts, `preconnect` hints, a preloaded hero image and a theme colour on every page; fixed stray favicon text that had pushed the meta tags out of the page head
- **31 October 2026** – Improvements:
  - **Donate pop-up** (section 13 of `js/main.js`, styles in `css/style.css` 27j): the pop-up is created with JavaScript (`createElement`, `innerHTML`, `appendChild`) so it works on every page without repeating HTML. The header and homepage Donate buttons open it (the link still goes to `contact.html` if JavaScript is off). Money tab: amount buttons from R50, custom amount with a R50 minimum, once-off or monthly. Food tab: food type list, quantity (whole number, 1-1000) and unit, several items in a removable list, drop-off location. Time tab: role, location, days and hours per week. All tabs validate name and email, send the data with `fetch()` and finish with a thank-you card and reference number. Escape, the close button and clicking the background close it
  - **Volunteer enrolment confirmation** (`enquiry.html`): replaced the short message with a "You have successfully enrolled as a Haven volunteer" card: reference number, date, role, available days, email, shifts from the console plan, next steps, and an "Enrol another volunteer" button
  - **Volunteer Console responsive fix**: removed the scrolling box inside the page on tablets and phones, plan buttons now wrap properly, tighter padding and statistics on small screens, a "Jump to my plan" button on mobile, and a sticky plan panel on desktop
- **30 October 2026** – Added to boost the Part 3 JavaScript marks:
  - **Volunteer Console** (`enquiry.html`, section 12 of `js/main.js`): the 12 shifts are stored in an array of objects and the cards, plan list and statistics are built with DOM methods (`createElement`, `appendChild`, `textContent`). Visitors can filter by location, role and day, search by keyword, sort (day, spots left, longest shift), add and remove shifts, and see the spots, hours and totals update live. Rules are enforced with validation messages: maximum 4 shifts per week, no duplicate shifts, no time clashes on the same day, and no full shifts. The plan can be saved in `localStorage` and "Use plan in sign-up form" ticks the matching availability days and selects the role in the form
  - **New colour theme**: changed the whole site from coral/indigo/periwinkle to an **off-white and green** palette. All colours are CSS variables in `:root`, so the change was made in one place, then the logo, favicon, hero/banner overlays and hard-coded colours were updated to match
- **28 October 2026** – Deployment: the site will be hosted on **GitHub Pages** (`https://thapelo-st10480445.github.io/WEDE-POE-ST10480445/`). `robots.txt`, `sitemap.xml`, canonical/Open Graph URLs and the JSON-LD data now use this address; added `favicon.svg` and `.nojekyll`. The full history is in `CHANGELOG.md`



## Image Index and Credits

Photographs are free stock photos from Pexels (Pexels, n.d.), used under the Pexels licence. Every image has descriptive alt text.

| Page | Alt text | Source / file |
|---|---|---|
| index.html | Fresh vegetables arranged for a community food programme | https://images.pexels.com/photos/6590914/pexels-photo-6590914.jpeg |
| index.html | Packing parcels together | https://images.pexels.com/photos/6995260/pexels-photo-6995260.jpeg |
| index.html | Carrying food home | https://images.pexels.com/photos/9090854/pexels-photo-9090854.jpeg |
| index.html | Meals shared with our youngest neighbours | https://images.pexels.com/photos/9823013/pexels-photo-9823013.jpeg |
| index.html | Hand-delivered with a smile | https://images.pexels.com/photos/6591161/pexels-photo-6591161.jpeg |
| about.html | Nomsa M. - Director | https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg |
| about.html | Peter K. - Operations Manager | https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg |
| about.html | Thandi N. - Volunteer Coordinator | https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg |
| about.html | James S. - Volunteer Lead | https://images.pexels.com/photos/2380794/pexels-photo-2380794.jpeg |
| about.html | Volunteers packing food parcels ahead of a distribution day | https://images.pexels.com/photos/6995260/pexels-photo-6995260.jpeg |
| about.html | A volunteer handing out food parcels at our Philippi hub | https://images.pexels.com/photos/6591161/pexels-photo-6591161.jpeg |
| about.html | The Haven team preparing donations for the week | https://images.pexels.com/photos/6995201/pexels-photo-6995201.jpeg |
| about.html | Volunteers carrying fresh stock into the hub | https://images.pexels.com/photos/6647017/pexels-photo-6647017.jpeg |
| about.html | Young community members enjoying a meal | https://images.pexels.com/photos/9823013/pexels-photo-9823013.jpeg |
| about.html | Meal containers being handed out at a community site | https://images.pexels.com/photos/6895226/pexels-photo-6895226.jpeg |
| services.html | Arrive and Check In | https://images.pexels.com/photos/6646952/pexels-photo-6646952.jpeg |
| services.html | We Pack Your Parcel | https://images.pexels.com/photos/6646871/pexels-photo-6646871.jpeg |
| services.html | Collect and Go Home | https://images.pexels.com/photos/6895226/pexels-photo-6895226.jpeg |

## References

Referenced using the Harvard (Anglia) style. Sources are listed alphabetically. (n.d.) means no date is given on the web page.

- CARTO (n.d.) *Basemaps*. Available at: https://carto.com/basemaps (Accessed: 1 November 2026).
- Font Awesome (n.d.) *Font Awesome icons*. Available at: https://fontawesome.com/ (Accessed: 1 November 2026).
- GitHub (n.d.) *GitHub Pages documentation*. Available at: https://docs.github.com/en/pages (Accessed: 1 November 2026).
- Google Fonts (n.d.) *Montserrat and Open Sans*. Available at: https://fonts.google.com/ (Accessed: 1 November 2026).
- Google Search Central (n.d.) *Sitemaps and robots.txt introduction*. Available at: https://developers.google.com/search/docs/crawling-indexing (Accessed: 1 November 2026).
- Leaflet (n.d.) *Leaflet: an open-source JavaScript library for interactive maps*. Available at: https://leafletjs.com/ (Accessed: 1 November 2026).
- Mozilla Developer Network (n.d.) *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS (Accessed: 1 November 2026).
- Mozilla Developer Network (n.d.) *HTML: HyperText Markup Language*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML (Accessed: 1 November 2026).
- Mozilla Developer Network (n.d.) *JavaScript*. Available at: https://developer.mozilla.org/en-US/docs/Web/JavaScript (Accessed: 1 November 2026).
- OpenStreetMap Foundation (n.d.) *Tile usage policy*. Available at: https://operations.osmfoundation.org/policies/tiles/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A group of African children smiling and holding food* [photograph]. Available at: https://www.pexels.com/photo/a-group-of-african-children-smiling-and-holding-food-9823013/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A group of women carrying cardboard boxes on their heads* [photograph]. Available at: https://www.pexels.com/photo/a-group-of-women-carrying-cardboard-boxes-on-their-heads-9090854/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A man and a woman packing relief goods in boxes* [photograph]. Available at: https://www.pexels.com/photo/a-man-and-a-woman-packing-relief-goods-in-boxes-6646871/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A volunteer distributing relief goods* [photograph]. Available at: https://www.pexels.com/photo/a-volunteer-distributing-relief-goods-6591161/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A woman handing out food containers to children* [photograph]. Available at: https://www.pexels.com/photo/a-woman-handing-out-food-containers-to-children-6895226/ (Accessed: 1 November 2026).
- Pexels (n.d.) *A woman standing beside the white van carrying a brown box* [photograph]. Available at: https://www.pexels.com/photo/a-woman-standing-beside-the-white-van-carrying-a-brown-box-6646893/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Food donation with cans and fresh vegetables* [photograph]. Available at: https://www.pexels.com/photo/food-donation-with-cans-and-fresh-vegetables-6590914/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Free stock photo of Africa, aid and volunteers* [photograph]. Available at: https://www.pexels.com/photo/love-people-africa-travel-6647178/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Free stock photos*. Available at: https://www.pexels.com/ (Accessed: 1 November 2026).
- Pexels (n.d.) *People donating goods* [photograph]. Available at: https://www.pexels.com/photo/people-donating-goods-6646952/ (Accessed: 1 November 2026).
- Pexels (n.d.) *People packing food* [photograph]. Available at: https://www.pexels.com/photo/people-packing-food-6995260/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Two men carrying boxes* [photograph]. Available at: https://www.pexels.com/photo/two-men-carrying-boxes-6647017/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Volunteer people in white shirts* [photograph]. Available at: https://www.pexels.com/photo/volunteer-people-in-white-shirts-6646877/ (Accessed: 1 November 2026).
- Pexels (n.d.) *Volunteers preparing donations* [photograph]. Available at: https://www.pexels.com/photo/volunteers-preparing-donations-6995201/ (Accessed: 1 November 2026).
- Schema.org (n.d.) *NGO*. Available at: https://schema.org/NGO (Accessed: 1 November 2026).