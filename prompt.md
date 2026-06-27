# SQS Security Website - Step-by-Step Implementation Prompts

This document provides a set of structured, high-quality, copy-pasteable prompts to build the SQS Security website step-by-step. Each prompt is designed to instruct an AI coding assistant to implement a specific phase of the website as outlined in [`architecture.md`](file:///home/shakil/sqs-ws/architecture.md).

---

## Guide on How to Use These Prompts
* **Sequence**: Run the prompts in chronological order (Prompt 1 through Prompt 13).
* **Feedback**: Provide the output/status of the previous phase before launching the next prompt.
* **Consistency**: Do not skip steps; each prompt relies on the file structures, Tailwind CSS variables, and components created in earlier steps.

---

### Prompt 1: Initial Setup & Project Configuration
```text
Role: Expert Frontend Developer & DevOps Engineer

Task: Initialize and configure the SQS Security web application. Refer to the directory structure defined in the Phase 1 Solution Architecture.

Tech Stack Requirements:
- Astro 5 (Static-first, hybrid SSR support)
- Tailwind CSS 4 (Theme variables defined in global.css)
- TypeScript (Strict type-checking)

Instructions:
1. Initialize the Astro 5 project inside the root workspace using non-interactive mode.
2. Install project dependencies: Zod, @astrojs/sitemap, and tailwindcss v4.
3. Configure 'astro.config.mjs' for:
   - Output mode: 'hybrid' (Static-first with SSR endpoints support)
   - Site domain: 'https://sqssecurity.co.uk'
   - Setup @astrojs/sitemap integration
4. Set up the exact folder structure detailed in 'architecture.md':
   - src/components/ (common, layout, sections, forms)
   - src/layouts/ (BaseLayout.astro, PageLayout.astro)
   - src/pages/ (blog, services, api)
   - src/styles/global.css
5. Create a basic 'tsconfig.json' configured for Astro/TS development.
6. Provide verification steps to run the dev server locally. Do not write full UI code yet.
```

---

### Prompt 2: Sanity CMS Schema Definitions
```text
Role: Senior Sanity CMS Architect & Content Modeler

Task: Create the Sanity schema definitions for SQS Security.

Required Schemas to Create:
1. Services (Manned Guarding, Key Holding, CCTV Monitoring, etc.)
2. Service Areas (Southampton, London, Winchester, etc. - local SEO focus)
3. Blog Posts (Title, slug, category, author, content)
4. Industries (Logistics, Construction, Retail, etc.)
5. Testimonials (Client feedback, rating, association with services)
6. FAQs (Question, Answer, category)
7. Team Members & Careers (Profile, SIA licensing inputs, active jobs)
8. Case Studies (Challenge, Solution, Results, related Industry)
9. Accreditations (SIA, ISO, SafeContractor badges)
10. Site Settings & Contact Info (HQ Southampton address, email, direct emergency phone)

Validation Rules & Specs:
- Enforce strict validation rules (required fields, max length for SEO titles/descriptions).
- Auto-generate slugs from titles for Services, Service Areas, Blog, and Industries.
- Add an 'seo' metadata object field (metaTitle, metaDescription, ogImage) to Services, Service Areas, Blog, and Industries.
- Structure Sanity project files inside the 'sanity/' directory at the root.

Deliverable:
Only write the schema files and configurations in TypeScript.
```

---

### Prompt 3: Design System & Design Tokens (Tailwind CSS 4)
```text
Role: Premium UI/UX Engineer

Task: Establish the SQS Security Design System using Tailwind CSS 4 and create core atomic UI components.

Design Style: Modern UK corporate security company, trustworthy, gold & navy accents, premium and minimal.

Color System:
- Primary Navy: #0B1F3A
- Security Blue: #1D4ED8
- Gold Accent: #D4AF37
- Steel Gray: #64748B
- Light Gray: #F8FAFC
- Text color: #1E293B

Components to Build:
1. Typography Styles: Set up Google Fonts (Inter & Outfit) in global.css using Tailwind 4 directives.
2. Button Component (src/components/common/Button.astro):
   - Support variants: primary (navy/gold), secondary (blue), outline, and emergency-alert (red).
   - Props: href, target, class, id.
3. Card Component (src/components/common/Card.astro):
   - Support subtle hover expansions, gradient borders, and responsive styling.
4. Badge Component (src/components/common/Badge.astro):
   - Used for SIA license indicators and status states.
5. Alert Component (src/components/common/Alert.astro):
   - Standard banner states: Success, Error, Info, Warning.

Deliverable:
Write 'global.css' styling tokens and the code for the above reusable Astro components.
```

---

### Prompt 4: Core Layout & Shell Component (Header, Footer, SEO)
```text
Role: Technical Frontend Architect

Task: Implement the site shell layouts including navigation, footer, breadcrumbs, and base SEO components.

Components to Create:
1. BaseLayout.astro (src/layouts/BaseLayout.astro):
   - Receives title, description, image, canonical URL, and schema JSON-LD props.
   - Includes standard meta tags, Open Graph, and Twitter Cards.
2. PageLayout.astro (src/layouts/PageLayout.astro):
   - Wraps content in BaseLayout with Header and Footer components.
3. Header.astro (src/components/layout/Header.astro):
   - Horizontal responsive navbar.
   - Embeds Primary Horizontal Logo (Navy & Gold accents).
   - Displays top contact info (Phone, Email, and dynamic emergency call indicator).
4. Footer.astro (src/components/layout/Footer.astro):
   - Multi-column footer displaying SQS logo, accreditation badges, sitemap, address, and legal declarations.
5. Breadcrumbs.astro (src/components/layout/Breadcrumbs.astro):
   - Accessible breadcrumb system (aria-label="Breadcrumb") indicating page location.

Deliverable:
Production-quality layout templates and navigation components.
```

---

### Prompt 5: SQS Homepage Implementation
```text
Role: Expert Frontend Developer

Task: Build the SQS Security Homepage (src/pages/index.astro).

Sections to Implement:
1. Hero Section: Catchy typography, video/image overlay, and double CTAs (Emergency Line vs. Request Quote).
2. Emergency Contact CTA: High contrast, gold/navy bar showing Southampton emergency lines.
3. Trust Indicators: Accreditation carousel/badge row (SIA, ISO, SafeContractor).
4. Security Services: Grid of core services (Manned Guarding, Key Holding, etc.) displaying brief descriptions and "Read More" links.
5. Industries Served: Visual block linking to corporate, construction, and logistics sectors.
6. Why Choose Us: 4-column feature list (Licensed guards, 24/7 dispatch, UK-wide, response times).
7. Statistics Counters: Interactive counters showing key milestones (Guards active, Sites secured, Response time minutes).
8. Testimonials: Client review carousel displaying real local feedback.
9. FAQ Section: 5 common security questions styled as interactive accordions.
10. Final CTA: Prominent contact promotion at the bottom.

Deliverable:
Homepage component layout compiling the sections into 'PageLayout.astro'. Ensure no generic placeholders.
```

---

### Prompt 6: Services Directory & Dynamic Service Pages
```text
Role: Frontend Developer & SEO Specialist

Task: Build the Services Listing Directory and Dynamic Service Detail Pages.

Services:
- Manned Guarding, Mobile Patrols, CCTV Monitoring, Key Holding, Alarm Response, Construction Security, Retail Security, Maritime Security, Event Security, Corporate Security.

Instructions:
1. Create '/services/index.astro' (Directory page listing all 10 security services in a professional grid with dynamic search/filters).
2. Create '/services/[slug].astro' (Dynamic detail pages):
   - Use 'getStaticPaths()' to generate static HTML for each service.
   - Fetch detailed rich-text body, icons, and features from Sanity CMS.
   - Implement "Related Services" widget.
   - Insert customized FAQ accordions specific to each service type.
   - Embed specific 'SecurityService' JSON-LD schema dynamically.

Deliverable:
Both the index page and dynamic route page with full schema integration.
```

---

### Prompt 7: Industries Served Pages
```text
Role: Frontend Developer

Task: Build pages targeting specific UK industries.

Industries:
- Construction Security, Logistics Security, Retail Security, Healthcare Security, Maritime Security, Education Security, Corporate Security.

Instructions:
1. Create dynamic routing at '/industries/[slug].astro' (or individual files if required).
2. Showcase:
   - Specific security risks pertaining to that industry (e.g., piracy for maritime, theft for logistics).
   - Core compliance requirements (SIA, BS7858 checking).
   - Client case study snippets mapped to this industry.
   - Custom industry-targeted CTA banner.

Deliverable:
Fully styled industry pages pulling structural details from Sanity CMS.
```

---

### Prompt 8: Local SEO System (Service Areas)
```text
Role: Senior SEO & Content Engineer

Task: Build dynamic Local SEO service area landing pages targeting major UK cities.

Target Areas:
- Southampton (HQ), London, Manchester, Birmingham, Leeds, Liverpool, Portsmouth, Winchester.

URL Structure:
- '/security-company-[local-area]' (e.g., '/security-company-southampton')

Instructions:
1. Create dynamic route '/security-company-[localArea].astro' using Astro's dynamic routing.
2. Features on each page:
   - Custom header highlighting regional service coverage.
   - Custom local paragraphs addressing area-specific security concerns.
   - Grid showing specific services offered in that city.
   - FAQ section addressing local response times.
   - Embedded LocalBusiness JSON-LD schema detailing local office coordinates or service regions.
   - Testimonials matching regional clients.

Deliverable:
Highly optimized local landing route file.
```

---

### Prompt 9: Blog System
```text
Role: Frontend Developer

Task: Implement the SQS Security Blog and Resources engine.

Requirements:
1. Create '/blog/index.astro':
   - Grid of blog posts with cards showing title, snippet, author photo, publication date, and reading time.
   - Search bar component (client-side text filter).
   - Category filters (e.g., Corporate Security, Compliance, Tech).
2. Create '/blog/[slug].astro' for reading details:
   - Dynamic route using 'getStaticPaths()'.
   - Clean, readable typography container (prose style) for rich text content.
   - Author profile card at the bottom.
   - "Related Posts" horizontal scroller.
   - Dynamic Article JSON-LD schema setup.

Deliverable:
Blog directory page, detail page, and styling configurations.
```

---

### Prompt 10: Contact System (SSR Forms & Resend Integration)
```text
Role: Full-Stack Developer & Security Analyst

Task: Build a secure, rate-limited Contact System with server-side processing.

Instructions:
1. Configure Resend client inside 'src/lib/resend.ts' using environment keys ('RESEND_API_KEY').
2. Build Contact Form component ('src/components/forms/ContactForm.astro') using client-side inputs (Name, Email, Phone, Services Requested, Message, and a hidden Honeypot field).
3. Create server-side endpoint '/src/pages/api/contact.ts':
   - Enable SSR/Node endpoint handler (export const POST).
   - Validate payload using Zod (src/schemas/contactSchema.ts).
   - Check the Honeypot field: if populated, silently discard and return a fake 200 response to block bots.
   - Implement simple IP-based rate limiting (prevent bulk request spamming).
   - Format and send email notifications to 'info@sqssecurity.co.uk' and a confirmation email to the user using Resend.
   - Respond with structured JSON (success state or array of errors).
4. Connect the front-end form to fetch this API and render clean success or error banners using the Alert component.

Deliverable:
Honeypot-protected form component, validation schema, API endpoint, and email template logic.
```

---

### Prompt 11: Trust, Compliance & Accreditations
```text
Role: Compliance & Brand Manager

Task: Build sections showcasing credentials to build trust and authority in the UK security market.

Instructions:
1. Create 'src/components/sections/Accreditations.astro':
   - Display official badges for: SIA Approved Contractor, ISO 9001 (Quality Management), ISO 14001 (Environmental), SafeContractor, and ICO Data Protection.
   - Link each badge to the corresponding verification directory or display certificate details on click/hover.
2. Build an Insurance & Liability details section on the About/Contact page showing:
   - Professional Indemnity coverage.
   - Public Liability coverage (£10M).
   - Employer's Liability coverage (£10M).

Deliverable:
Visual trust badge components and verified compliance layouts.
```

---

### Prompt 12: SEO Systems & Crawl Optimization
```text
Role: Technical SEO Expert

Task: Complete indexation and crawling configurations for the live deployment.

Instructions:
1. Ensure the dynamic `<SEO />` meta component supports Canonical headers on all pages.
2. Configure dynamic schema injection:
   - Homepage -> Organization & LocalBusiness
   - Services page -> SecurityService
   - FAQ pages -> FAQPage
   - Blog posts -> Article
3. Generate 'robots.txt' inside '/public' referencing the sitemap.
4. Verify that Astro's sitemap generator compiles correct absolute links.
5. Implement breadcrumb trails utilizing JSON-LD list items to ensure clear search snippet rendering.

Deliverable:
Fully integrated SEO layout hooks, sitemap settings, and robots config.
```

---

### Prompt 13: Core Web Vitals, Performance, & Accessibility (WCAG AA)
```text
Role: Performance & Web Accessibility Engineer

Task: Audit and optimize the SQS Security website to exceed performance targets (Lighthouse 95+) and WCAG AA compliance.

Requirements:
1. Image Optimizations:
   - Use Astro's `<Image />` component for all assets.
   - Enforce explicit width/height dimensions to prevent layout shifts (CLS < 0.1).
   - Set up lazy loading on offscreen images.
2. CSS/JS optimization: Ensure CSS/JS assets are minified and unused code is eliminated.
3. Accessibility (WCAG AA):
   - Verify color contrast ratios for text elements (especially gold accent and steel gray text against white background).
   - Add focus indicators ('focus-visible') on all interactive elements.
   - Ensure all form fields have explicit, programmatically linked `<label>` tags.
   - Ensure all images have descriptive 'alt' tags (or empty 'alt' for decorative assets).
   - Ensure interactive accordion elements are keyboard-accessible (Enter/Space to expand).

Deliverable:
Refactored template files, style fixes, accessibility modifications, and performance-optimized build assets.
```
