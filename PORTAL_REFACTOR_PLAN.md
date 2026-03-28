Mai jos ai aceeași temă, dar împărțită corect pe faze, ca să poată fi executată curat în repo-ul tău actual.

Folosește prompturile în ordinea asta. Nu le trimite pe toate odată.

**Regulă comună pentru toate fazele**
Pune asta la începutul fiecărui prompt, ca instrucțiune constantă:

```txt
You are working inside an existing Next.js theme repository, not a greenfield app.

Core principles:
- reuse what is good
- adapt what is needed
- do not rebuild unnecessarily
- do not preserve blog logic where it no longer fits
- keep architecture simple, scalable, and SEO-safe

This project must become a Romanian local directory portal with two clearly separated zones:
1. BLOG
2. LOCAL DIRECTORY

They may share:
- design system
- layout primitives
- typography
- cards
- visual components
- metadata helpers if clean

They must NOT share the same content logic.

Important:
- a Business is NOT a blog Post
- a city page is NOT a blog archive
- a county page is NOT an editorial taxonomy page
- do not simulate one model through another

Preferred route model:
- /
- /judet/[countySlug]
- /[citySlug]
- /[citySlug]/[businessSlug]
- /blog
- /blog/[postSlug]

Reserved slugs:
- blog
- contact
- despre
- servicii
- judet
- api
- admin

Current repo already contains App Router, Sanity integration, blog-oriented components, and layout primitives. Audit first, then adapt incrementally.
```

**Phase 1: audit + implementation brief**
```txt
Analyze the existing theme and produce a practical implementation brief for converting it into a Romanian local directory portal.

Do NOT implement code yet.

Your output must be structured exactly in this order:
1. Objective
2. Recommended architecture
3. What can be reused from the current theme
4. What must be adapted
5. What must NOT be forced from the current theme
6. Recommended App Router folder structure
7. Recommended Sanity schema structure
8. Route protection and slug rules
9. SEO metadata strategy
10. Sitemap and robots strategy
11. Internal linking strategy
12. Risks and anti-patterns
13. Simplest clean implementation path
14. Step-by-step Codex implementation tasks

Be specific to the actual repo structure. Mention which existing files/folders/components are reusable and which are blog-specific and should be refactored or removed from the main site flow.
```

**Phase 2: data models**
```txt
Implement only the data architecture for the new portal.

Tasks:
- create Sanity schemas for:
  - county
  - city
  - business
  - category
  - post
- preserve blog as a separate content model
- do not reuse the current post schema as a fake business model
- create clear references:
  - County has many Cities
  - City belongs to one County
  - Business belongs to one City
  - Business belongs to one or more Categories
  - Post is separate but may reference County / City / Business / Category when editorially relevant
- add slug rules and validation
- block reserved slugs
- add useful required and optional fields for local SEO and content usefulness
- update Sanity schema registration
- create or update TypeScript types for the new entities

Do not build final pages yet.
Do not redesign the UI yet.
```

**Phase 3: routing skeleton**
```txt
Implement only the App Router structure for the new portal.

Requirements:
- create a clean folder structure for:
  - app/(site)/page.tsx
  - app/(site)/judet/[countySlug]/page.tsx
  - app/(site)/[citySlug]/page.tsx
  - app/(site)/[citySlug]/[businessSlug]/page.tsx
  - app/(site)/blog/page.tsx
  - app/(site)/blog/[postSlug]/page.tsx
- preserve the Studio route
- prevent route collisions with reserved slugs
- ensure city/business dynamic routes do not swallow blog/admin/api routes
- keep architecture simple and explicit
- move old blog routing away from /posts/[slug] to /blog/[postSlug]
- leave placeholders where necessary, but set the final route foundation correctly

Do not fully build page content yet.
Do not add SEO layer yet.
```

**Phase 4: shared data layer**
```txt
Refactor the data access layer so blog and directory logic are fully separated.

Tasks:
- create separate queries and fetch utilities for:
  - counties
  - cities
  - businesses
  - categories
  - posts
- keep blog queries isolated from directory queries
- remove assumptions that all content is a post
- create clean TypeScript return shapes for each entity
- keep reusable low-level Sanity client utilities if they are still valid
- keep naming explicit and domain-correct

Do not build final UI yet.
```

**Phase 5: reusable UI adaptation**
```txt
Adapt the existing theme UI into a reusable portal UI layer.

Tasks:
- audit current reusable components
- preserve and adapt:
  - global layout shell
  - header
  - footer
  - section headers
  - grid/list patterns
  - card patterns where structurally appropriate
- remove or demote demo/blog-only navigation items from the main user flow
- convert the homepage from a blog homepage into a portal homepage shell
- keep the design system consistent with the theme where useful
- do not force article UI into business entity UI

Important:
- keep the blog styling available for the blog area
- build shared components only where reuse is real
```

**Phase 6: directory pages**
```txt
Build the actual directory pages.

Implement:
- homepage
- county pages
- city pages
- business pages

Homepage should include:
- hero with portal value proposition
- browse/search entry
- featured counties or cities
- featured businesses
- top categories
- latest useful blog posts
- trust/quality section
- footer navigation

County page should include:
- county intro
- important cities
- useful discovery links
- category/business overview if available
- editorial support links only when relevant

City page should include:
- city intro
- useful local context
- featured categories
- business listings
- county relation
- editorial support links only when relevant

Business page should feel like a local entity page, not a blog article.
Include:
- business name
- categories
- city / county
- unique intro
- address
- contact info
- schedule
- map or coordinates if available
- services
- gallery if available
- descriptive content
- related businesses or nearby alternatives
- related blog articles only when relevant

Important:
- avoid thin pages
- do not create empty location shells
```

**Phase 7: preserve and reconnect blog**
```txt
Now rebuild the blog area cleanly inside the new architecture.

Tasks:
- create /blog index
- create /blog/[postSlug]
- preserve useful editorial components where appropriate
- keep blog content logic separate from directory content logic
- allow editorial references to County / City / Business / Category when useful
- connect blog and directory via internal linking, but do not merge their models

Do not turn business pages into article pages.
Do not turn city/county pages into taxonomy archives.
```

**Phase 8: SEO foundations**
```txt
Implement the technical SEO layer for the portal.

Tasks:
- scalable metadata generation
- canonical logic where needed
- robots strategy
- sitemap strategy
- structured data where appropriate
- internal linking logic between homepage, counties, cities, businesses, and blog
- define indexable vs non-indexable page types
- avoid doorway behavior
- avoid thin content indexing
- avoid duplicate or near-duplicate local pages
- ensure clean crawl paths

Be explicit about:
- which pages should usually be indexable
- which pages should usually not be indexable
- how sitemap entries should be generated
- how canonical URLs should behave
```

**Phase 9: QA and cleanup**
```txt
Run a final architecture and SEO QA pass on the refactor.

Check for:
- thin county/city/business pages
- duplicate route risks
- slug conflicts
- blog/directory model leakage
- invalid internal linking
- poor crawl paths
- placeholder/demo pages still exposed in navigation
- metadata inconsistencies
- sitemap/robots mismatches

Then:
- clean up dead code where safe
- keep useful reusable theme foundations
- do not remove unrelated functionality unless it clearly conflicts
- provide a concise final summary of what was reused, what was adapted, and what was intentionally not preserved
```

**Cum le dai practic**
1. Trimite `Phase 1`.
2. După ce primești brief-ul, trimite `Phase 2`.
3. Continuă până la `Phase 9`.
4. Dacă vrei control mai bun, oprești după `Phase 3` și validezi arhitectura înainte de UI.

În mesajul următor îți pot face și varianta `copy-paste` completă, într-un singur document, cu toate fazele gata de trimis una după alta.

