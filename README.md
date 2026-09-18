# Haven Community Food Bank – Website Project

---

## Student Details

**Student Name:** Thapelo Mathebe
**Student Number:** ST10480445
**Subject:** Web Development (WEDE5020)
**Programme:** Diploma in Information Technology – Software Development
**Group:** 4
**Date:** 14 August 2026 (last updated 18 September 2026)

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
**Part 3 – Interactivity:** JavaScript for forms, maps, etc. *Status: In Progress — mobile navigation, interactive map, and form validation are working; see Changelog below*

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



##
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
**Modern visual design** – a warm, distinct colour system (coral, deep indigo, soft periwinkle) with a bento-style card layout, glass-effect header, and gradient accents, rather than a generic template look
**Accessibility features** – high contrast, keyboard navigation, visible focus states, alt text on images
**Functional mobile menu** – the hamburger icon now actually opens/closes navigation on small screens
**Interactive map** – a real Leaflet.js map on the Contact page with clickable pins for all three distribution points, popups with hours/contact info, and "Get Directions" links
**Form validation** – the Contact and Volunteer forms validate required fields, email format, and (for the volunteer form) that at least one availability day is checked, with inline error messages and a success confirmation
**Newsletter signup feedback** – the footer subscribe form confirms submission client-side
**Back-to-top button** – appears after scrolling and smooth-scrolls back to the top
**Clear navigation** – the menu is consistent across all pages
**Donate button** – stands out to encourage giving
**Social media links** – connects to Facebook, Instagram, Twitter, and LinkedIn



## Tech Stack

**HTML5** – page structure; it's the standard and has good accessibility features
**CSS3** – styling and layout; Flexbox and Grid make responsive design easier
**JavaScript (Vanilla)** – interactivity: mobile nav toggle, form validation, newsletter feedback, back-to-top
**Leaflet.js** – interactive maps; free, open-source, doesn't track users
**CARTO basemap tiles** – map tile provider (see Changelog: switched from raw OpenStreetMap tile servers, which actively block unregistered app traffic per their usage policy)
**Font Awesome** – icons; free icons that look professional
**Google Fonts** – typography; Montserrat and Open Sans are clean and readable
**Netlify** – hosting; free tier is generous, has HTTPS and fast delivery
**Git & GitHub** – version control; standard for tracking changes



## File and Folder Structure

```
haven-site/
  index.html
  about.html
  services.html
  enquiry.html
  contact.html
  css/
    style.css
  js/
    main.js
  images/      (local images, if/when added)
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
- **Part 3 (In Progress)** – JavaScript: mobile navigation, interactive map, and form validation are done; still to come: any remaining dynamic features




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
- *(Further changes will be logged here as Part 3 progresses)*



## References

- Font Awesome. (2024). *Font Awesome Icons*. Available at: https://fontawesome.com/ [Accessed 14 August 2026].
- Google Fonts. (2024). *Montserrat & Open Sans*. Available at: https://fonts.google.com/ [Accessed 14 August 2026].
- Pexels. (2024). *Free Stock Photos*. Available at: https://www.pexels.com/ [Accessed 14 August 2026].
- Mozilla Developer Network. (2024). *HTML: HyperText Markup Language*. Available at: https://developer.mozilla.org/en-US/docs/Web/HTML [Accessed 14 August 2026].
- Mozilla Developer Network. (2024). *CSS: Cascading Style Sheets*. Available at: https://developer.mozilla.org/en-US/docs/Web/CSS [Accessed 14 August 2026].
