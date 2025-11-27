# ITC Family Like Friends - Project Handover Document

## Summary

This document outlines the work completed on the Family Like Friends website migration to AEM Edge Delivery Services, what is being delivered in this handover, and guidance on completing the remaining work.

The migration leverages **Experience Catalyst**, an AI based migration tool that accelerates the transition to AEM Edge Delivery Services by automating content extraction and block generation.

### Project Overview

- **Original Site**: https://familylikefriends.com/
- **AEM Edge Delivery Site**: https://main--itc-familylikefriends--aemysites.aem.page/
- **Repository**: https://github.com/aemysites/itc-familylikefriends
- **Migration Approach**: Experience Catalyst + Manual Refinement
- **Status**: 3 pages migrated and styled (requiring minor refinement), 30+ pages partially migrated (requiring iterative refinement)

### Quick Start

**Ready to build on this foundation?** Jump to [Section 4: Completing the Remaining Work](#4-completing-the-remaining-work) for guidance.

**Want to understand what needs refinement?** Check [Section 3.3: Content & Styling Gaps](#33-content--styling-gaps-analysis) for page-by-page analysis.

**Want to set up locally?** See [Section 2.2: Local Development Setup](#22-local-development-setup) to start developing.

**Want to understand the codebase?** Review [Section 4.1: Using the Delivered Output](#41-using-the-delivered-output-as-your-foundation) for guidance on leveraging existing blocks.

---

## 1. What You're Receiving in This Handover

### 1.1 Migrated and Styled Pages

Three pages have been migrated and styled with custom blocks (near completion, minor refinements needed):

| Page | Original URL | Migrated URL |
|------|-------------|--------------|
| **Adopt with Love** | [familylikefriends.com/adopt-with-love.html](https://familylikefriends.com/adopt-with-love.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/adopt-with-love) |
| **Fantasy Recipes Listing** | [familylikefriends.com/fantasy-recipes/recipe-listing.html](https://familylikefriends.com/fantasy-recipes/recipe-listing.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/fantasy-recipes/recipe-listing) |
| **Filmy Faces** | [familylikefriends.com/filmy-faces.html](https://familylikefriends.com/filmy-faces.html) | [View Page](https://main--itc-familylikefriends--aemysites.aem.page/filmy-faces) |

### 1.2 Additional Migrated Pages

30+ additional pages have been partially migrated through Experience Catalyst with content present. These pages require iterative refinement for styling, content completeness, and functionality via Experience Catalyst or manually. See Section 3.1 for complete status and list.

### 1.3 Custom Blocks Developed

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

### 1.4 Core Infrastructure

- **Header/Footer**: Basic styling matches original - navigation structure requires work
- **Mobile Optimization**: Responsive design implemented across 3 migrated pages
- **Global Styles**: Some brand-aligned color schemes, typography, icons

### 1.5 Configuration Files

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

## 3. Remaining Work & Refinements

### 3.1 Page Refinement Status

Most pages from the original site have been partially migrated through Experience Catalyst (based on `tools/importer/site-urls.json`). These pages require iterative refinement for styling, content completeness, and functionality via Experience Catalyst or manually:

- **Homepage** (`/`) - Requires styling refinement, carousel functionality, and blog showcase
- **Family Frames** (`/family-frames.html`) - Main page and upload flow pages need styling and interactive features
- **Fantasy Recipes Landing** (`/fantasy-recipes.html`) - Needs styling refinement
- **Individual Recipe Pages** (10 pages under `/fantasy-recipes/recipe-listing/`) - Require recipe detail blocks and styling
- **Filmy Faces Sub-Pages** - Upload flow and gallery pages need refinement
- **Blog Pages** - Content present but needs blog-specific styling and components
- **User Authentication & Profile** - Require backend integration and styling
- **Informational Pages** (About Us, FAQs, Privacy Policy, Terms, etc.) - Need styling consistency

**Complete page list available in**: `tools/importer/site-urls.json`

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

Key refinements needed across migrated pages:

#### Homepage
- ✅ Content structure, sections, footer present
- ❌ Needs: Styling refinement, carousel functionality, blog showcase, interactive elements

#### Blog Pages
- ✅ Content and heading hierarchy present
- ❌ Needs: Hero styling, rich text formatting, related articles, social sharing, breadcrumbs

#### Recipe Listing Page
- ✅ Recipe cards, tabs, responsive grid implemented
- ❌ Needs: Search/filter functionality, print feature, enhanced linking

#### Filmy Faces Page
- ✅ Hero, carousel, layout implemented
- ❌ Needs: Upload flow, template selection, user gallery, download functionality

**Compare pages at:**
- Original: https://familylikefriends.com/
- Migrated: https://main--itc-familylikefriends--aemysites.aem.page/

### 3.4 Integration Requirements

- **Backend APIs**: Authentication, image processing, content management, social sharing
- **Third-Party Services**: Social media platforms, video processing, email
- **Content Management**: SharePoint/Google Drive connection, workflows, permissions

See Section 4.3 for backend development details.

---

## 4. Completing the Remaining Work

Build on the delivered foundation to refine migrated pages and complete missing functionality:

- Reuse and adapt existing custom blocks (hero-adoption, cards-recipe, etc.)
- Develop additional blocks as needed (see Section 3.2)
- Refine styling and responsive behavior
- Implement backend integrations (see Section 4.3)

### 4.1 Using the Delivered Output as Your Foundation

The three migrated pages provide working examples of how to build FLF-specific blocks. Here's how to leverage this foundation:

#### Understanding the Delivered Blocks

Each custom block follows AEM Edge Delivery patterns:
- Self-contained with CSS and JS in its own directory
- `metadata.json` contains style guide info from original site
- Mobile-first responsive design
- Performance-optimized (lazy loading, efficient DOM manipulation)

Reference existing blocks (e.g., `hero-adoption`, `cards-recipe`) as templates when creating new ones.

#### Reusing Existing Blocks

Before creating new blocks, check if existing ones can be adapted. The codebase includes both custom-styled blocks and standard AEM blocks:

**Custom Blocks (Styled for FLF):**
1. **Recipe cards** (`cards-recipe`) - Can be adapted for blog post cards
2. **Hero sections** (`hero-adoption`, `hero-poster`) - Templates for other hero variants
3. **Tabs** (`parent-tabs-recipe`) - Reusable for any tabbed content
4. **Accordions** (`accordion-faq`) - Standard collapsible sections
5. **Stats cards** (`cards-stats`) - Can be adapted for various data display needs
6. **Step cards** (`cards-steps`) - Reusable for process/tutorial content

**Standard Blocks (Available to Adapt):**
- `hero`, `cards`, `columns`, `carousel`, `accordion`, `tabs`, `quote`, `video`, `embed`, `fragment`, `modal`, `table`, `search`

These standard blocks provide starting templates that can be customized with FLF-specific styling and functionality.

#### Creating New Blocks

When you need a new block, follow the standard AEM Edge Delivery workflow:

1. **Create block structure** in `blocks/blockname/`
2. **Study similar blocks** for patterns (DOM manipulation, responsive design, interactivity)
3. **Author content** in Microsoft Word using table structure
4. **Test locally** with `aem up`

See Section 4.2 for detailed best practices and [Block Collection](https://www.aem.live/developer/block-collection) for reference implementations.

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

Backend services are needed for:
- User authentication (login, profile, sessions)
- Image/video processing (Filmy Faces, Family Frames)
- Interactive features (likes, shares, ratings)
- Recipe functionality (search, filtering, print)
- User-generated content storage
- Analytics and tracking

See Section 3.2 for detailed integration requirements.

### 4.4 Recommended Development Workflow

#### Phase 1: Content Refinement
1. Review migrated pages (see Section 3.1 for status)
2. Refine styling and content completeness
3. Test responsive behavior across devices

#### Phase 2: Block Development
1. Develop missing blocks (see Section 3.2)
2. Implement interactive features
3. Conduct cross-browser testing

#### Phase 3: Backend Integration
1. Set up authentication services
2. Implement image/video processing
3. Integrate third-party services

#### Phase 4: QA & Launch
1. Performance testing (target: 100 Lighthouse scores)
2. Accessibility and security review
3. User acceptance testing
4. DNS, CDN, and analytics setup

**Go Live Checklist**: [Launch Guide](https://www.aem.live/docs/go-live-checklist)

### 4.5 Testing & Quality Assurance

- **Performance**: Target 100 Lighthouse scores ([PageSpeed Insights](https://pagespeed.web.dev/))
- **Cross-Browser**: Chrome, Firefox, Safari, Edge, mobile browsers
- **Responsive**: Test at 375px, 768px, 1024px, 1440px breakpoints
- **Accessibility**: Keyboard navigation, semantic HTML, ARIA labels

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

### What Has Been Delivered

✅ **Pages Migrated and Styled (Near Completion)**
- Adopt with Love - Custom adoption blocks implemented
- Fantasy Recipes Listing - Tabs and cards with styling
- Filmy Faces - Template carousel and hero

✅ **Additional Pages (Require Iterative Refinement)**
- 30+ pages partially migrated through Experience Catalyst with content present
- Refinement can be done via Experience Catalyst or manually
- See Section 3.1 for complete status

✅ **Foundation for Completion**
- 8+ custom, reusable blocks
- Standard AEM blocks available for adaptation
- Header, footer, global styles configured
- Parser examples and migration tools in `tools/importer/`

✅ **Ready Development Environment**
- Project repository with code
- Imported pages/content
- Local development ready (`aem up`)

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
- **Experience Catalyst**: AI-powered migration tool used to accelerate Edge Delivery Service migration
- **Parser**: JavaScript module that transforms HTML from the original site into AEM Edge Delivery format
- **Transformer**: Utility that handles cross-cutting transformations (images, links, sections, cleanup)
