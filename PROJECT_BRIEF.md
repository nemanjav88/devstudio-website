# Dev Studio — Website Project Brief

## 1. Purpose and authority

This document is the permanent specification and source of truth for the new official Dev Studio website. Future Codex sessions should read it before planning, designing, or implementing the site and preserve its positioning, visual direction, content requirements, and planned stack.

The current scope is documentation only. Do not implement the website, scaffold application code, install dependencies, or deploy anything as part of creating this brief. Implementation begins only when separately requested.

Requirements below capture the agreed direction. Details explicitly listed as unresolved are not final decisions. Update this brief when the project owner agrees to changes so it remains current.

## 2. Studio positioning

Dev Studio is an integrated product development and technology studio based in **Banja Luka, Bosnia & Herzegovina**.

It is not a typical web agency, software house, or fabrication shop. Its defining advantage is the integration of the disciplines needed to turn an idea into a finished, installed product or experience:

- Concept development.
- Industrial design and design thinking.
- Mechanical engineering and mechanics.
- Electronics and hardware.
- Software.
- CNC and manufacturing.
- Installation and support.

The website must communicate this complete offering clearly. Individual services should reinforce the integrated studio identity rather than fragment the business into unrelated specialties.

## 3. Brand idea and messaging

**FROM IDEA TO REALITY.**

**One team for concept, design, hardware, software, manufacturing and installation.**

This is the central brand idea and organizing principle for the website. Messaging, project presentation, process storytelling, and calls to action should make the one-team advantage tangible.

The primary conversion direction is **Start a Project**. The site should help visitors understand what Dev Studio builds, see evidence of its capabilities, and initiate a relevant project conversation.

## 4. Visual and interaction direction

The website must feel ultra-modern, premium, engineering-driven, and visually impressive. The quality reference is **Apple / Nothing / Linear combined with industrial product design**. These references establish a quality bar, not a requirement to copy their layouts or branding.

### Visual language

- Dark near-black and warm white as the core palette.
- Dev Studio yellow as the accent.
- Large typography with a clear hierarchy.
- Strong whitespace and deliberate composition.
- Real product photography and video as major storytelling elements.
- A visual emphasis on physical products, engineering, materials, and production.

### Motion

- Use restrained, premium animation with a clear purpose.
- Support cinematic storytelling and the interactive process presentation.
- Use GSAP for major motion and scroll effects.
- Use Motion where useful for microinteractions.

### Avoid

- Generic corporate templates.
- Excessive card-based layouts.
- Stock imagery.
- Generic AI-startup purple/blue gradients.
- Motion or decoration that overwhelms the work and messaging.

Exact colors, typography, animation treatments, and asset selections remain to be defined during design.

## 5. Planned technology and hosting

| Area | Planned choice |
| --- | --- |
| Web framework | Next.js |
| Language | TypeScript |
| Content management | Payload CMS |
| Database | PostgreSQL |
| Styling | Tailwind CSS |
| Major motion and scroll effects | GSAP |
| Microinteractions | Motion, where useful |
| Hosting | Self-hosted through Coolify |
| Repository | GitHub |
| Development domain | https://new.devstudio.biz |
| Future production domain | https://devstudio.biz |

Package versions, deployment configuration, and application architecture are implementation decisions to resolve later. The production domain is a future destination; this brief does not authorize deployment or a domain cutover.

## 6. Languages

The site must have **BHS and English** versions. Resource downloads must also support **BHS and ENG** versions.

Plan multilingual content across the main pages and dynamic CMS content. Language labels, URL structure, default language, translation workflow, and missing-translation behavior remain to be defined. Do not assume that BHS requires three separate site versions.

## 7. Main site structure

| Section | Purpose |
| --- | --- |
| Home | Present the integrated studio, selected work, process, production capability, and primary project CTA. |
| Solutions | Organize the offering into the five solution groups. |
| Projects | Showcase completed work through structured project details and rich media. |
| Capabilities | Explain the disciplines and production capabilities behind the complete offering. |
| About | Introduce Dev Studio, its Banja Luka base, and its integrated approach. |
| Stories | Keep the site fresh with ongoing editorial content over the years. |
| Resources / Downloads | Provide catalogs, product/flyer PDFs, and thematic brochures in both languages. |
| Contact / Start a Project | Provide a clear route to begin a project conversation. |

Navigation wording, page templates, and exact routes will be refined later while preserving this structure.

## 8. Solution groups

The offering must be organized into these five groups:

1. **Digital & Retail**
2. **Brand Experiences**
3. **Entertainment**
4. **Custom Engineering**
5. **Production**

Solutions should be managed through the CMS and connected to relevant project content. Detailed descriptions and the mapping of specific offerings to each group remain to be supplied or confirmed.

## 9. Home page direction

The home page should tell a coherent story from the brand promise to evidence and a project invitation. The following is the intended content sequence; final composition will be developed during design.

1. **Cinematic hero:** Establish the visual standard and introduce “FROM IDEA TO REALITY.” through strong product imagery or video.
2. **Strong positioning statement:** Explain the integrated product development and technology studio and its one-team offering.
3. **Selected projects:** Demonstrate the offering through real work.
4. **What We Build:** Introduce the breadth of solutions in a clear, tangible way.
5. **Interactive process:** Present the complete journey: **Concept → Design & Engineering → Hardware + Software → Production → Installation**.
6. **Why Dev Studio / one-team advantage:** Explain the value of bringing the disciplines together.
7. **Made Here / production capability:** Show the studio's manufacturing and production capabilities through real evidence.
8. **Own Products:** Feature Dev Studio's own products, especially **Kids Play**.
9. **Client references:** Present confirmed clients and references.
10. **Latest Stories:** Surface recent content so the home page evolves over time.
11. **Strong Start a Project CTA:** Close with a clear invitation to contact the studio.

Support remains part of the overall studio offering even though the displayed process sequence ends at Installation.

## 10. Dynamic CMS content

The CMS must support the following content types or editorial capabilities:

| Content | Required role |
| --- | --- |
| Projects | Structured showcases of Dev Studio work. |
| Stories | Ongoing editorial publishing that sustains the website over the years. |
| Videos | Video content for storytelling and showcasing work. |
| News | Studio updates and announcements. |
| Case Studies | More detailed accounts of project work. |
| Downloads / PDFs | Catalogs, individual product/flyer PDFs, and thematic brochures. |
| Solutions | The five solution groups and their content. |
| Clients / references | Confirmed client and reference content. |
| Media | Photography, video assets, and other supporting media. |

These are required content capabilities, not a finalized collection schema. Decide later whether related formats such as Stories, News, Videos, and Case Studies use separate collections or a shared editorial model. Preserve the ability to manage and present each format.

### Stories and long-term publishing

Stories must keep the website fresh over the years **without redesigning the core site**. The content model and templates should allow regular publishing within a stable visual system. Latest Stories must be available for the home page.

## 11. Structured project content

Projects must support these structured fields:

| Field | Content |
| --- | --- |
| Client | Client associated with the project. |
| Year | Project year. |
| Industry | Relevant industry. |
| Services | Dev Studio services involved. |
| Technologies | Technologies used. |
| Gallery | Project image gallery. |
| Video | Associated project video content. |
| Description | Project narrative and explanation. |
| Related solution | Relationship to the relevant solution group. |
| Downloads | Related downloadable resources. |

Content relationships should let project pages connect work, solutions, and supporting resources. Required versus optional fields, relationship cardinality, media behavior, and additional publishing metadata will be defined during CMS design.

## 12. Resources and downloads

Resources must support:

- A complete Dev Studio catalog download.
- Individual product and flyer PDFs.
- Grouped thematic brochures.
- BHS and ENG versions of downloadable materials.

Visitors should be able to distinguish resource types and language versions clearly. The content model must support grouping thematic materials and associating relevant downloads with projects.

Exact resource categories, file metadata, version management, and download presentation remain to be defined. Actual PDFs and translated versions must be supplied or prepared; their availability is not assumed by this brief.

## 13. Content integrity and assets

Use real Dev Studio work, product photography, video, manufacturing imagery, and confirmed references to substantiate the positioning. Kids Play is a priority within the Own Products presentation.

Do not invent client names, project results, technical specifications, testimonials, product claims, or company facts. Missing content should remain explicitly identified until confirmed. The brief does not establish a detailed product specification for Kids Play.

## 14. Decisions and materials still needed

Resolve these during later planning, design, and implementation without treating assumptions as approved requirements:

- Brand assets, exact palette values, and typography.
- Available product, project, team, and production photography/video.
- Confirmed project content, client references, and case studies.
- Detailed solution descriptions and offering assignments.
- Own-product content, especially Kids Play.
- Catalogs, flyers, thematic brochures, and their language versions.
- Final copy and BHS/English translations.
- Localization routes and editorial translation workflow.
- CMS collection design, publishing workflow, and field validation.
- Contact details and the Start a Project interaction or form requirements.
- Responsive layouts, accessibility, performance, and motion behavior.
- Deployment details and the eventual production launch plan.

## 15. Future implementation alignment

Future work should be reviewed against this brief for the following outcomes:

- The site clearly positions Dev Studio as an integrated product development and technology studio from Banja Luka.
- “FROM IDEA TO REALITY.” and the one-team advantage guide the experience.
- The visual result meets the premium industrial design direction and avoids the listed generic treatments.
- All main sections, five solution groups, and both language versions are covered.
- The home page includes the specified storytelling elements and Start a Project CTA.
- The CMS supports the required content capabilities and structured projects.
- Stories enable continued publishing without a core redesign.
- Resources cover all three download formats and both language versions.
- The planned stack and hosting direction are respected unless explicitly revised.

This file is the deliverable for the current task. Website implementation is outside its scope.
