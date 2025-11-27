# ITC Family Like Friends - Project Handover Document

## Summary

This document outlines the work completed on the Family Like Friends website migration to AEM Edge Delivery Services, what is being delivered in this handover, and guidance on completing the remaining work.

The migration leverages **Experience Catalyst**, an AI based migration tool that accelerates the transition to AEM Edge Delivery Services by automating content extraction and block generation.

### Project Overview

- **Original Site**: https://familylikefriends.com/
- **AEM Edge Delivery Site**: https://main--itc-familylikefriends--aemysites.aem.page/
- **Repository**: https://github.com/aemysites/itc-familylikefriends
- **Migration Approach**: Experience Catalyst + Manual Refinement
- **Status**: 3 pages migrated and styled (requiring minor refinement), 30+ pages partially migrated

### Quick Start

**Ready to build on this foundation?** Jump to [Section 4: How to Complete the Remaining Work](#4-how-to-complete-the-remaining-work) to see your two options.

**Want to understand what's missing?** Check [Section 3.3: Content & Styling Gaps](#33-content--styling-gaps-analysis) for detailed page-by-page analysis.

**Want to set up locally?** See [Section 2.2: Local Development Setup](#22-local-development-setup) to start developing.

**Want to understand the codebase?** Review [Section 4.1: Using the Delivered Output](#41-using-the-delivered-output-as-your-foundation) for guidance on leveraging existing blocks.

---

## 1. What You're Receiving in This Handover

### 1.1 Migrated Pages

Three pages have been migrated and styled using Experience Catalyst (minor refinements needed - see Section 3.3 for details):

| Page | Original URL | Migrated URL |
|------|-------------|--------------|
| **Adopt with Love** | [familylikefriends.com/adopt-with-love.html](https://familylikefriends.com/adopt-with-love.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/adopt-with-love) |
| **Fantasy Recipes Listing** | [familylikefriends.com/fantasy-recipes/recipe-listing.html](https://familylikefriends.com/fantasy-recipes/recipe-listing.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/fantasy-recipes/recipe-listing) |
| **Filmy Faces** | [familylikefriends.com/filmy-faces.html](https://familylikefriends.com/filmy-faces.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/filmy-faces) |

### 1.2 Custom Blocks Developed

The following custom blocks have been created specifically for the FLF site. **Note**: Only these custom blocks have been implemented; standard AEM boilerplate blocks are available in the codebase but have not been styled or customized for this project.

#### Adoption-Specific Blocks
- **`hero-adoption`** - Hero banner for adoption pages with custom styling
  - *Used in*: `/adopt-with-love`
- **`columns-adoption`** - Multi-column layout for adoption content
  - *Used in*: `/adopt-with-love`

#### Recipe-Specific Blocks
- **`cards-recipe`** - Recipe card display with imagery
  - *Used in*: `/fantasy-recipes/recipe-listing`
- **`parent-tabs-recipe`** - Tabbed interface for recipe categories
  - *Used in*: `/fantasy-recipes/recipe-listing`

#### Template-Specific Blocks
- **`carousel-templates`** - Carousel for template showcases
  - *Used in*: `/filmy-faces`

#### General Content Blocks
- **`cards-stats`** - Statistics display cards
  - *Used in*: `/adopt-with-love`
- **`cards-steps`** - Step-by-step process cards
  - *Used in*: `/filmy-faces`
- **`hero-poster`** - Hero section with poster imagery
  - *Used in*: `/filmy-faces`
- **`accordion-faq`** - FAQ accordion component
  - *Used in*: `/adopt-with-love`

### 1.3 Core Infrastructure

- **Header/Footer**: Basic styling matches original - navigation structure requires work
- **Mobile Optimization**: Responsive design implemented across 3 migrated pages
- **Global Styles**: Some brand-aligned color schemes, typography, icons

### 1.4 Configuration Files

- **`fstab.yaml`** - Content source configuration (SharePoint or Google Drive)
- **`helix-query.yaml`** - Query index configuration
- **`helix-sitemap.yaml`** - Sitemap generation configuration
- **`paths.json`** - Path mapping configuration
- **Migration tools** - Import scripts, parsers, and transformers in `tools/importer/` (detailed in Section 5.2)

---

## 2. How to Use What You're Getting

### 2.1 Understanding the AEM Edge Delivery Architecture

AEM Edge Delivery Services follows a fundamentally different architecture than traditional AEM:

```
Content (SharePoint/AEM/DA) → AEM Edge Delivery → CDN → Users
```

**Key Concepts:**
- **No CMS Backend**: Content is authored Microsoft Word (or Google Docs)
- **Git-Based**: All code lives in GitHub; changes are deployed via git push
- **Block-Based**: Pages are composed of reusable blocks
- **Performance First**: Built for perfect Lighthouse scores

**Essential Reading**: [AEM Edge Delivery Documentation](https://www.aem.live/docs/)

### 2.2 Local Development Setup

#### Prerequisites
```bash
# Install Node.js 18+ (if not already installed)
# Install AEM CLI globally
npm install -g @adobe/aem-cli
```

#### Running Locally
```bash
# Clone the repository
git clone https://github.com/aemysites/itc-familylikefriends.git
cd itc-familylikefriends

# Install dependencies
npm install

# Start the local AEM proxy server
aem up
```

The site will be available at `http://localhost:3000`

### 2.3 Working with Blocks

Each block is self-contained in the `blocks/` directory:

```
blocks/
  └── hero-adoption/
      ├── hero-adoption.js      # Block behavior and DOM manipulation
      ├── hero-adoption.css     # Block-specific styles
      └── metadata.json         # Style guide, styling info, and usage info from original site
```

**To modify a block:**
1. Edit the CSS file for styling changes
2. Edit the JS file for functionality changes
3. Test locally with `aem up`
4. Commit and push to see changes in preview

**To create a new block:**
1. Create a new folder in `blocks/` with your block name
2. Add `blockname.js` and `blockname.css` files
3. Export a default function in the JS file that decorates the block
4. Test locally before committing

**Block Development Guide**: [Block Collection](https://www.aem.live/developer/block-collection)

### 2.4 Content Authoring

Content is authored in **Microsoft Word** (or Google Docs):

1. Create a new document
2. Structure content using tables for blocks
3. Use the AEM Sidekick browser extension to preview and publish
4. Content is automatically converted to HTML

**Authoring Guide**: [Creating Content](https://www.aem.live/docs/authoring)

### 2.5 Publishing Workflow

```
Author in Microsoft Word → Preview → Publish → Live
```

1. **Preview**: `https://main--itc-familylikefriends--aemysites.aem.page/`
2. **Live**: `https://main--itc-familylikefriends--aemysites.aem.live/`

Changes to code (blocks, styles) are automatically deployed when pushed to GitHub by AEM Code Sync bot.

### 2.6 Responsive Design

All blocks follow mobile-first design principles:

- Base styles: Mobile (< 600px)
- Tablet: 600px - 900px
- Desktop: 900px+
- Large Desktop: 1200px+

Media queries are already established in global styles (`styles/styles.css`).

---

## 3. What's Remaining to Be Done

### 3.1 Page Migration

The following pages from the original site still need to be migrated (based on `tools/importer/site-urls.json`):

- **Homepage** (`/`)
  - Sections (filmy faces, family frames)
  - Recipe carousel
  - Blog/content showcase
  
- **Family Frames** (`/family-frames.html`)
  - Main landing page for photo-to-video conversion feature
  - Upload flow pages (`/family-frames/upload-family-photo.html`)
  - Frame listing (`/family-frames/upload-family-photo/frame-listing.html`)
  - Frame ready page (`/family-frames/upload-family-photo/frame-ready.html`)
  - Memory gallery (`/family-frames/upload-family-photo/memory-gallery.html`)

- **Fantasy Recipes Landing** (`/fantasy-recipes.html`)
  - Main landing page for recipes section

- **Individual Recipe Pages** (10 recipe detail pages under `/fantasy-recipes/recipe-listing/` - see `site-urls.json` for full list)

- **Filmy Faces Sub-Pages**
  - Posters listing (`/filmy-faces/posters-listing.html`)
  - Upload faces flow (`/filmy-faces/posters-listing/upload-faces.html`)
  - Poster ready (`/filmy-faces/posters-listing/poster-ready.html`)
  - My posters (`/filmy-faces/posters-listing/my-posters.html`)
  - Created poster listing (`/filmy-faces/posters-listing/created-poster-listing.html`)

- **Blog Pages** (8 blog articles + listing page)
  - Blog listing (`/blogs.html`)
  - Individual blog articles (10 Best Bollywood Movies, Birthday Games, Weekend Activities, etc.)

- **User Authentication & Profile**
  - Login page (`/login.html`)
  - Profile page (`/login/profile.html`)
  - Notifications (`/notifications.html`)

- **Informational Pages**
  - About Us (`/about-us.html`)
  - FAQs (`/faqs.html`)
  - Privacy Policy (`/privacy-policy.html`)
  - Terms and Conditions (`/terms-and-conditions.html`)
  - Sitemap (`/sitemap.html`)
  - Nameplate Pledge (`/nameplate-pledge.html`)

### 3.2 Missing Blocks & Components

These are some of the key blocks that need to be developed. Additional blocks may be required as more pages are migrated.

#### Content Blocks Needed
1. **Video Hero Block** (for recipes)
   - Video player with play/pause/mute controls
   - Overlay controls with SVG icons
   - Responsive video sizing

2. **Recipe Detail Block**
   - Title with rating display (star icons)
   - Info cards (duration, servings, difficulty, calories) with icons
   - Tags/categories display
   - Recipe description

3. **Ingredients Block**
   - Structured list format
   - Checkbox styling for ingredient items
   - Print-friendly layout

4. **Directions/Steps Block**
   - Numbered step progression with connecting lines
   - Step images alongside instructions
   - Sequential layout design

5. **Chef's Tips Block**
   - Colored heading section
   - Tip list display

6. **Recipe Categories Carousel**
   - Category cards with images
   - Swiper/carousel navigation
   - Links to filtered recipe listings

7. **Blog Hero Block**
   - Article title with colored accent text
   - Featured image display
   - Like/Share integration

8. **Like/Share Block**
   - Like counter with icon toggle
   - Share modal with social platforms (Facebook, WhatsApp)
   - Correct URL handling

9. **Related Articles Block**
   - Article card grid with thumbnails

10. **Image Gallery Block**
   - Grid layout with lightbox

11. **User Showcase Block**
   - User content carousel

#### Backend/Integration Requirements
These require backend services beyond block development:
- User authentication (login/logout, profile management)
- Image upload and processing (Filmy Faces, Family Frames)
- Recipe search and filtering
- Analytics and tracking
- Content sharing APIs

### 3.3 Content & Styling Gaps Analysis

Based on comparison of original pages with migrated versions, here are specific gaps that need addressing:

#### Homepage Analysis
- **Original**: https://familylikefriends.com/
- **Migrated**: https://main--itc-familylikefriends--aemysites.aem.page/
- **Status**: Partially migrated (some content present, significant styling and functionality gaps)

**What's Working:**
- ✅ Basic content structure
- ✅ "Create your filmy family's Fantasy Moment" section
- ✅ "Make family memories move like Magic" section
- ✅ "Family fun showcase" section
- ✅ Footer with social links
- ✅ CTA buttons with links

**What Needs Work:**
- ❌ Hero video banner (if present in original)
- ❌ Styling to match original design
- ❌ Image optimization and proper display
- ❌ "Family fun showcase" carousel functionality
- ❌ "Fun Times Ahead" blog showcase with cards
- ❌ Responsive design and mobile optimization
- ❌ Interactive elements and animations
- ❌ Brand-aligned colors, fonts, and spacing

#### Blog Page Example
- **Original**: https://familylikefriends.com/blogs/10-fun-things-to-do-with-your-family-this-weekend.html
- **Migrated**: https://main--itc-familylikefriends--aemysites.aem.page/blogs/10-fun-things-to-do-with-your-family-this-weekend
- **Status**: Partially migrated (content only, styling incomplete)

**What's Working:**
- ✅ Basic content structure
- ✅ Text content migrated
- ✅ Heading hierarchy

**What Needs Work:**
- ❌ Hero image/banner styling
- ❌ Rich text formatting (blockquotes, lists, inline images)
- ❌ Related articles section
- ❌ Social sharing buttons
- ❌ Breadcrumb navigation
- ❌ Reading time indicator
- ❌ Author information block
- ❌ CTA buttons ("Start Creating", etc.)

#### Recipe Listing Page
- **Original**: https://familylikefriends.com/fantasy-recipes/recipe-listing.html
- **Migrated**: https://main--itc-familylikefriends--aemysites.aem.page/fantasy-recipes/recipe-listing
- **Status**: Migrated with custom `cards-recipe` and `parent-tabs-recipe` blocks

**What's Working:**
- ✅ Recipe cards layout
- ✅ Tab interface for categories
- ✅ Responsive grid
- ✅ Images and descriptions

**What Needs Work:**
- ❌ Filter/search functionality (if present on original)
- ❌ Recipe detail page linking
- ❌ Print recipe functionality
- ❌ Share recipe buttons

#### Filmy Faces Page
- **Original**: https://familylikefriends.com/filmy-faces.html
- **Migrated**: https://main--itc-familylikefriends--aemysites.aem.page/filmy-faces
- **Status**: Migrated with custom blocks

**What's Working:**
- ✅ Hero section
- ✅ Template carousel
- ✅ Basic layout

**What Needs Work:**
- ❌ Upload flow integration
- ❌ Poster template selection
- ❌ User gallery/showcase
- ❌ Download functionality

### 3.4 Integration Requirements

1. **Backend APIs**
   - User authentication service
   - Image processing service
   - Content management APIs
   - Social sharing APIs

2. **Third-Party Services**
   - Social media platforms (Facebook, Instagram, YouTube)
   - Video processing services
   - Email services

3. **Content Management**
   - Connect SharePoint (or Google Drive) for content authoring
   - Set up content workflows
   - Configure publishing permissions

---

## 4. How to Complete the Remaining Work

Use the delivered output as a foundation and build out the remaining pages using AEM Edge Delivery's standard development approach.

**What Needs to Be Done:**
- Use the custom blocks already created (hero-adoption, cards-recipe, etc.) as templates
- Follow the parser patterns in `tools/importer/parsers/` to create new content import scripts
- Develop additional blocks needed (video, blog templates, image galleries - see Section 3.2)
- Author content in Microsoft Word/SharePoint following AEM Edge Delivery conventions
- Style and test all pages for responsive behavior and performance

### 4.1 Using the Delivered Output as Your Foundation

The three migrated pages provide working examples of how to build FLF-specific blocks. Here's how to leverage this foundation:

#### Understanding the Delivered Blocks

Each delivered block follows a consistent pattern. Let's examine `hero-adoption` as an example:

```1:20:blocks/hero-adoption/hero-adoption.js
// The block receives the raw content table from the document
export default async function decorate(block) {
  // 1. Extract content from the block structure
  // 2. Create new DOM elements with semantic HTML
  // 3. Apply classes for styling
  // 4. Replace block content with decorated version
}
```

**Key Learnings:**
- Blocks are self-contained: CSS and JS in their own directory
- `metadata.json` contains style guide info from the original site
- Mobile-first responsive design is built-in
- Performance optimization is standard (lazy loading, efficient DOM manipulation)

#### Reusing Existing Blocks

Before creating new blocks, check if existing ones can be adapted:

1. **Recipe cards** (`cards-recipe`) - Can be adapted for blog post cards
2. **Hero sections** (`hero-adoption`, `hero-poster`) - Templates for other hero variants
3. **Tabs** (`parent-tabs-recipe`) - Reusable for any tabbed content
4. **Accordions** (`accordion-faq`) - Standard collapsible sections

#### Creating New Blocks

When you need a new block (e.g., video block, blog template):

**Step 1: Create Block Structure**
```bash
mkdir blocks/video
touch blocks/video/video.js
touch blocks/video/video.css
```

**Step 2: Study Similar Blocks**
Look at existing blocks for patterns:
- How they extract configuration
- How they build DOM structure
- How they handle responsive design
- How they add interactivity

**Step 3: Implement Using AEM Patterns**
Follow AEM Edge Delivery conventions (see Block Development Best Practices in Section 4.2)

**Step 4: Author Content in Microsoft Word**
Create a document with a table structure that matches your block:

| Video |
|-------|
| https://www.youtube.com/embed/xxxxx |
| Video caption here |

**Step 5: Test Locally**
```bash
aem up
# Visit http://localhost:3000/your-page
```

### 4.2 Block Development Best Practices

For detailed guidance on creating and styling blocks, refer to the official AEM Edge Delivery documentation:

- **[Exploring Blocks](https://www.aem.live/docs/exploring-blocks)** - How blocks work, structure, and decoration
- **[Block Collection](https://www.aem.live/developer/block-collection)** - Reference implementations of common blocks
- **[Keeping it 100](https://www.aem.live/developer/keeping-it-100)** - Performance best practices

**Key Principles:**
- Keep blocks simple, reusable, and self-contained
- Follow mobile-first responsive design (breakpoints: 600px, 900px, 1200px)
- Use progressive enhancement (content works without JS)
- Target Lighthouse scores of 100
- Reference existing blocks in your project as templates

### 4.3 Backend Development

While AEM Edge Delivery is primarily front-end focused, backend services are needed for:

1. **User Authentication** - Login/logout, profile management, session handling
2. **Image/Video Processing** - Filmy Faces poster creation, Family Frames photo-to-video conversion, recipe video transcoding and delivery
3. **Like/Share Functionality** - Like counters, social media sharing APIs
4. **Recipe Features** - Rating system (star ratings, vote counts), search/filtering, category management, print functionality
5. **Content Storage** - User-generated content, uploaded images/videos, recipe media assets (step images, videos)
6. **Analytics** - User behavior tracking, conversion metrics, recipe engagement analytics

### 4.4 Recommended Development Workflow

**If Using Traditional Content Importer**: Follow this phased approach:

#### Phase 1: Content Migration
1. Inventory all remaining pages (refer to Section 3.1 for complete list)
2. Set up content source (SharePoint / Google Drive)
3. Write custom import scripts for each page type
4. Migrate homepage and critical landing pages

#### Phase 2: Block Development
1. Develop remaining custom blocks
2. Implement interactive features
3. Ensure responsive behavior
4. Conduct cross-browser testing

#### Phase 3: Backend Integration
1. Set up authentication services
2. Implement image processing APIs
3. Integrate third-party services
4. Test end-to-end functionality

#### Phase 4: QA & Optimization
1. Performance testing and optimization
2. Accessibility audit
3. Security review
4. User acceptance testing

#### Phase 5: Launch Preparation
1. DNS configuration
2. CDN setup
3. Analytics implementation
4. Final pre-launch checklist

**Go Live Checklist**: [Launch Guide](https://www.aem.live/docs/go-live-checklist)

### 4.5 Testing & Quality Assurance

#### Performance Testing
- **Target**: 100 Lighthouse scores across all metrics
- **Tools**: [PageSpeed Insights](https://pagespeed.web.dev/)
- Test on 3G networks for realistic conditions

#### Cross-Browser Testing
- Chrome, Firefox, Safari, Edge
- iOS Safari, Chrome Mobile
- Test responsive breakpoints: 375px, 768px, 1024px, 1440px

#### Accessibility Testing
- Keyboard navigation
- Semantic HTML validation

---

## 5. Technical Reference

### 5.1 Project Structure

```
itc-familylikefriends/
├── blocks/                  # Custom blocks (hero-adoption, cards-recipe, etc.)
├── styles/                  # Global styles, fonts, lazy-loaded styles
├── scripts/                 # Core JavaScript (aem.js, scripts.js, delayed.js)
├── tools/importer/          # Content migration tools
├── fonts/                   # Web fonts (Bricolage, Nunito, Roboto)
├── icons/                   # SVG icons
├── head.html               # Global HTML head content
├── 404.html                # Custom 404 page
├── fstab.yaml              # Content source configuration (SharePoint)
├── helix-query.yaml        # Query index configuration
└── package.json            # Node.js dependencies
```

### 5.2 Key Files

#### Core AEM Files
| File | Purpose |
|------|---------|
| `scripts/aem.js` | Core AEM Edge Delivery library for page decoration |
| `scripts/scripts.js` | Global utilities and main entry point for page decoration |
| `scripts/delayed.js` | Delayed functionality (analytics, marketing tags) |
| `styles/styles.css` | Minimal global styling for LCP optimization |
| `styles/lazy-styles.css` | Additional styles loaded post-LCP |
| `head.html` | Global meta tags, links, and scripts |
| `fstab.yaml` | Maps content sources (SharePoint or Google Drive) |

#### Migration Tools & Reference Files

These files were created during the initial migration using Experience Catalyst. They provide valuable reference information to help complete the remaining work:

| File | What It Contains | How to Use It |
|------|------------------|---------------|
| `tools/importer/site-urls.json` | Complete inventory of all 33 pages discovered on the original site with source URLs and target paths | Reference this to see all pages that need migration. Each entry includes the original URL and the target path in your AEM site |
| `tools/importer/inventory.json` | Catalog of all unique block types identified across the site (e.g., hero4, cards15, accordion5) | Understand what types of content patterns exist. Each pattern represents a distinct layout or component structure |
| `tools/importer/inventory.pages.json` | Page template classification grouping pages by template type (e.g., "gallery listing", "article page") | Identify which pages share the same template structure. Use this to batch-migrate similar pages together |
| `tools/importer/import.js` | Main import script that orchestrates the content migration process | Central configuration for the import process. Modify this if you need to adjust the overall migration workflow |
| `tools/importer/parsers/*.js` | Block-specific parsers for each content pattern (30+ parser files like `hero4.js`, `cards15.js`, `accordion5.js`) | **Key Reference Files** - Use these as templates when creating parsers for new block patterns. Each parser transforms a specific HTML block structure into AEM Edge Delivery format |
| `tools/importer/transformers/*.js` | Content transformation utilities for cross-cutting concerns:<br>- `images.js` - Image optimization and URL handling<br>- `links.js` - Link rewriting<br>- `sections.js` - Section structure<br>- `cleanup.js` - HTML cleanup | Reuse these utilities for consistent content transformation. These handle common tasks you'll need for any page migration |
| `tools/importer/content_validation.json` | Content accuracy report comparing original vs migrated content (if generated) | Use this to identify any content gaps or differences between the original and migrated pages |
| `blocks/*/metadata.json` | Style guide and usage information extracted from the original site for each custom block | Reference when styling new blocks. Contains notes about colors, spacing, fonts, and behavior from the original implementation |

**Quick Reference Guide:**

**Planning:**
1. Start with `site-urls.json` to see all 33 pages
2. Review `inventory.json` to understand block types
3. Check `inventory.pages.json` to identify page template clusters (pages with similar structure)

**Building New Pages:**
1. Find pages with similar template in `inventory.pages.json` (e.g., all "gallery listing" pages)
2. Review `inventory.json` to see which block patterns those pages use
3. Reference parsers in `parsers/` directory for those specific block patterns
4. Create or adapt parsers for any new block patterns you encounter
5. Use `transformers/` utilities for common tasks (images, links, cleanup)

**Styling Blocks:**
1. Reference `blocks/*/metadata.json` for original style guide info
2. Look at working examples in delivered pages
3. Test locally with `aem up`

### 5.3 Environment URLs

| Environment | Purpose | URL Pattern |
|-------------|---------|-------------|
| **Local Development** | Development and testing | `http://localhost:3000` |
| **Preview** | Production preview | `https://main--itc-familylikefriends--aemysites.aem.page/` |
| **Live** | Production live | `https://main--itc-familylikefriends--aemysites.aem.live/` |
| **Feature Branch** | Feature preview | `https://{branch}--itc-familylikefriends--aemysites.aem.page/` |

### 5.4 Custom Fonts

The following web fonts are configured in `styles/fonts.css`:

- **Bricolage**: 400, 500, 700 weights
- **Nunito**: 500, 600, 700 weights

**Note**: Roboto font files exist in the `fonts/` directory but are not currently configured for use. Verify font usage matches the original site's typography before going live.

---

## 6. Conclusion

### What Has Been Shared

✅ **3 Migrated Pages (Near Completion)**
- Adopt with Love (styled, minor gaps remaining - see Section 3.3)
- Fantasy Recipes Listing (with custom tabs and cards, minor refinement needed)
- Filmy Faces (with template carousel, additional features needed)

✅ **Foundation for Completing the Site**
- 8+ custom, reusable blocks ready to adapt
- Header, footer, and global styles configured
- Working parser examples in `tools/importer/parsers/`
- Complete page inventory in `site-urls.json`

✅ **Development Environment**
- GitHub repository with all code
- SharePoint content source configured
- Local development tools ready (`aem up`)

---

## Appendix A: Useful Links & Glossary

### AEM Edge Delivery Documentation
- **AEM Edge Delivery Docs**: https://www.aem.live/docs/ - Start here for comprehensive Edge Delivery Services documentation
- **Developer Tutorial**: https://www.aem.live/developer/tutorial - Step-by-step guide to building your first project
- **Block Collection**: https://www.aem.live/developer/block-collection - Reference implementations of common blocks
- **Anatomy of a Project**: https://www.aem.live/developer/anatomy-of-a-project - Understanding project structure
- **Go Live Checklist**: https://www.aem.live/docs/go-live-checklist - Pre-launch checklist
- **Content Importer Guidelines**: https://github.com/adobe/helix-importer-ui/blob/main/importer-guidelines.md - Detailed guide for content migration

### AEM Edge Delivery Terms
- **Block**: A reusable, self-contained component (e.g., hero, carousel, accordion)
- **Sidekick**: Browser extension for authoring and publishing in AEM Edge Delivery
- **fstab.yaml**: Configuration file that maps content sources (SharePoint/Google Drive) to the site

### Migration Terms
- **Experience Catalyst**: Adobe-operated AI-powered migration service used to create this initial migration
- **Content Importer**: Traditional manual self-service approach to migrating content
- **Parser**: JavaScript module that transforms HTML from the original site into AEM Edge Delivery format
- **Transformer**: Utility that handles cross-cutting transformations (images, links, sections, cleanup)
