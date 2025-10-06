# Decision Log - RentHunt MVP

**Purpose**: Comprehensive record of all major architectural and technical decisions  
**Last Updated**: 2025-10-06 13:12 UTC+3  
**Total Decisions**: 12 major + multiple minor

---

## Decision Index

| ID | Decision | Date | Status |
|----|----------|------|--------|
| D001 | Frontend Framework & Build Tool | 2025-10-06 09:00 | ✅ Locked |
| D002 | UI Component Library | 2025-10-06 09:15 | ✅ Locked |
| D003 | Swipe Implementation Approach | 2025-10-06 09:30 | ✅ Locked |
| D004 | State Management Solution | 2025-10-06 09:45 | ✅ Locked |
| D005 | Roommate Matching Architecture | 2025-10-06 11:30 | ✅ Locked |
| D006 | Stranger Matching Priority | 2025-10-06 11:45 | ✅ Locked |
| D007 | Group Size Limit | 2025-10-06 12:00 | ✅ Locked |
| D008 | Budget Split Handling | 2025-10-06 12:05 | ✅ Locked |
| D009 | Platform Target | 2025-10-06 10:30 | ✅ Locked |
| D010 | Virtual Tours Inclusion | 2025-10-06 11:00 | ✅ Locked |
| D011 | Design Fidelity Level | 2025-10-06 10:45 | ✅ Locked |
| D012 | Viewing Scheduler Constraints | 2025-10-06 12:10 | ✅ Locked |

---

## D001: Frontend Framework & Build Tool

**Date**: 2025-10-06 09:00  
**Category**: Technology Stack  
**Priority**: Critical

### Question
Which frontend framework and build tool should we use for the MVP?

### Options Considered

**Option A: Next.js + TypeScript**
- Pros: SSR/SSG built-in, API routes, great ecosystem, React 19 support
- Cons: Overkill for frontend-only MVP, slower dev server than Vite, more complexity
- Use case: Best for production with backend needs

**Option B: Vite + React + TypeScript** ✅
- Pros: Fastest dev server, optimized builds, native ESM, perfect for SPA, modern tooling
- Cons: No SSR out of box (not needed for MVP), separate backend needed (already deferred)
- Use case: Perfect for frontend prototypes

**Option C: Create React App (CRA)**
- Pros: Official React starter, zero config
- Cons: Slower than Vite, webpack-based, being deprecated
- Use case: Legacy projects

### Decision
**Selected: Option B - Vite + React 19 + TypeScript**

### Rationale
1. **Frontend-First Approach**: User explicitly deferred backend, focus is on UI/UX validation
2. **Development Speed**: Vite's HMR is significantly faster than Next.js or CRA
3. **Modern Tooling**: Native ESM, fast builds, better DX
4. **Type Safety**: TypeScript strict mode for catching errors early
5. **Future-Proof**: Easy to migrate to Next.js post-MVP if SSR needed

### Impact
- Development velocity optimized for rapid prototyping
- No SSR complexity overhead
- Smaller learning curve (pure React, no Next.js patterns)
- Estimated time savings: ~3-5 days vs Next.js setup

### Related Decisions
- Affects D002 (component library must work with Vite)
- Enables D003 (Framer Motion works great with Vite)

---

## D002: UI Component Library

**Date**: 2025-10-06 09:15  
**Category**: Technology Stack  
**Priority**: High

### Question
Which UI component library for rapid MVP development with customization flexibility?

### Options Considered

**Option A: Material-UI (MUI)**
- Pros: Mature, comprehensive, good documentation
- Cons: Opinionated styling, large bundle, harder to customize deeply
- Evaluation: Too heavy for MVP, styling feels enterprise

**Option B: Ant Design**
- Pros: Complete component set, good for dashboards
- Cons: Very opinionated design, Chinese company (potential concerns), harder to brand
- Evaluation: Design doesn't match modern consumer app aesthetic

**Option C: Untitled UI React**
- Pros: Modern design, professional, comprehensive
- Cons: Paid (free tier limited), proprietary, vendor lock-in
- Evaluation: Good but introduces dependency

**Option D: shadcn/ui** ✅
- Pros: Copy-paste (no npm package, own the code), Radix UI primitives, TailwindCSS native, fully customizable
- Cons: Manual component installation, need to understand component code
- Evaluation: Perfect for ownership and customization

### Decision
**Selected: Option D - shadcn/ui**

### Rationale
1. **Ownership**: Copy-paste architecture means we own the code, no runtime dependency
2. **No Lock-In**: Not a library, just code we control
3. **TailwindCSS Native**: Already using Tailwind, perfect integration
4. **Customization**: Full control to adapt components to RentHunt branding
5. **Quality**: Built on Radix UI (accessible, robust primitives)
6. **Boilerplate Support**: RicardoValdovinos boilerplate pre-configures shadcn/ui

### Impact
- Full component ownership (can modify without library constraints)
- Zero runtime dependencies for UI (smaller bundle)
- Easy to customize for RentHunt-specific needs
- Initial setup time: +1 hour (component installation)
- Long-term flexibility: High

### Implementation Notes
Components to install:
- button, card, form, input, select, slider, calendar
- dialog, sheet, tabs, badge, progress, separator

### Related Decisions
- Works perfectly with D001 (Vite + TailwindCSS)
- Enables D011 (functional MVP - use shadcn defaults initially)

---

## D003: Swipe Implementation Approach

**Date**: 2025-10-06 09:30  
**Category**: Feature Implementation  
**Priority**: Critical

### Question
Build swipe cards from scratch or use existing library/component?

### Options Considered

**Option A: react-tinder-card (npm library)**
- Pros: Purpose-built for Tinder-style swipes, simple API
- Cons: Last updated 2 years ago (stale), only 9 dependents, uses @react-spring
- Evaluation: Maintenance risk, may be abandoned

**Option B: Custom Implementation with Framer Motion**
- Pros: Full control, exact UX we want, modern library
- Cons: 4-8 days to build and tune gesture physics
- Evaluation: Time-intensive for MVP

**Option C: hover.dev Swipe Cards Component** ✅
- Pros: Free, production-quality, uses Framer Motion, tutorial available, recently updated (2024)
- Cons: Need to adapt to apartment domain, some customization needed
- Evaluation: Best balance of speed and quality

### Decision
**Selected: Option C - hover.dev Swipe Cards (FREE component)**

### Rationale
1. **Time Savings**: 4-8 days saved vs custom build
2. **Production Quality**: Tested gesture physics (spring animations, drag thresholds, snap-back)
3. **Modern Stack**: Uses Framer Motion (already in our stack)
4. **Tutorial Available**: Tom Is Loading YouTube (18 min) shows customization patterns
5. **Free Tier**: No cost, can use commercially
6. **Recent**: August 2024 update shows active maintenance

### Impact
- Swipe feature implementation: 3-4 days (vs 7-12 days custom)
- Time saved: ~4-8 days
- Risk: Low (code is copy-paste, we own it after)

### Implementation Plan
1. Copy SwipeCards.jsx from hover.dev
2. Convert to TypeScript (SwipeCards.tsx)
3. Create ApartmentCard wrapper component
4. Adapt for apartment data (images, price, roommate info)
5. Customize styling for RentHunt branding

### Related Decisions
- Requires D001 (Vite + React + Framer Motion)
- Enables core discovery UX

---

## D004: State Management Solution

**Date**: 2025-10-06 09:45  
**Category**: Technology Stack  
**Priority**: High

### Question
Which state management library for handling user preferences, apartments, shortlist, viewings, and feedback?

### Options Considered

**Option A: Redux Toolkit**
- Pros: Industry standard, excellent DevTools, mature ecosystem
- Cons: Boilerplate heavy, more complex setup, overkill for MVP
- Evaluation: Enterprise-grade but too much for prototype

**Option B: React Context API**
- Pros: Built-in, no dependencies, simple for small apps
- Cons: Performance issues with frequent updates, provider hell, no DevTools
- Evaluation: Not suitable for apartment list updates (re-renders)

**Option C: Jotai**
- Pros: Atomic state, modern, minimal
- Cons: Newer library, smaller ecosystem, learning curve
- Evaluation: Interesting but less proven

**Option D: Zustand** ✅
- Pros: Lightweight (<1KB), no providers, great TypeScript support, DevTools available, persist middleware
- Cons: Smaller ecosystem than Redux
- Evaluation: Perfect balance for MVP

### Decision
**Selected: Option D - Zustand**

### Rationale
1. **Lightweight**: ~1KB gzipped vs Redux Toolkit ~11KB
2. **Simple API**: No providers, no boilerplate, just hooks
3. **TypeScript-First**: Excellent type inference
4. **DevTools Support**: Redux DevTools integration available
5. **Persist Middleware**: Built-in LocalStorage sync (critical for MVP)
6. **No Context Hell**: Direct store access, no provider wrapping
7. **Boilerplate Support**: Works great with Vite setup

### Impact
- Simpler state management code (less boilerplate)
- Faster development (no action creators, reducers setup)
- Better performance (selective subscriptions)
- LocalStorage persistence: Easy (built-in middleware)

### Store Architecture
Planned stores:
1. `userPreferencesStore` - Apartment + roommate preferences
2. `apartmentsStore` - Apartment data, filtering, current index
3. `shortlistStore` - Shortlisted apartment IDs
4. `viewingsStore` - Scheduled viewings, available slots
5. `feedbackStore` - Submitted feedback

### Related Decisions
- Works with D001 (Vite + TypeScript)
- Supports all features in D005-D012

---

## D005: Roommate Matching Architecture

**Date**: 2025-10-06 11:30  
**Category**: Feature Architecture  
**Priority**: Critical (Core Differentiator)

### Question
How should roommate matching work? What architectural model best serves the "OKCupid + Airbnb hybrid" vision?

### Context
User described product as "hybrid between OKCupid and Airbnb" where users input preferences and match apartments. Must natively include roommate arrangements. This is THE core differentiator.

### Options Considered (27-thought sequential analysis)

**Option A: Model A - Proactive People-Matching** (Dating App Style)
- **Flow**: User creates profile → Swipes on OTHER USERS → Matches with compatible people → Searches apartments as group
- **Pros**: Maximum compatibility (people choose each other first), works for N-person groups, social matching like OKCupid
- **Cons**: Two-phase UX (find people, then apartments), requires user-to-user messaging, group coordination tools, very complex
- **Complexity**: +15-20 implementation days
- **Evaluation**: Too complex for MVP, splits focus from apartment discovery

**Option B: Model B - Property-First with Compatibility Scoring** (Hybrid) ✅
- **Flow**: User completes preferences (apt + roommate) → Browses APARTMENTS (filtered by apt prefs) → Sees compatibility scores for existing roommates in room-available apartments
- **Pros**: Single swipe interface, natural filtering (same price/location), simpler implementation, unique value prop
- **Cons**: Lower match rate than proactive matching, assumes apartments have roommates already
- **Complexity**: +5-8 implementation days
- **Evaluation**: Perfect balance of differentiation and feasibility

**Option C: Model C - Simplified (Existing Groups Only)**
- **Flow**: User specifies "searching with N roommates" → Shows apartments for group size → Displays split pricing
- **Pros**: Very simple, 2-3 days implementation, serves real use case
- **Cons**: Doesn't help strangers find each other (not differentiated), loses core value prop
- **Complexity**: +2-3 implementation days
- **Evaluation**: Too simple, doesn't validate unique positioning

### Decision
**Selected: Option B - Model B (Property-First with Compatibility Scoring)**

### Rationale
1. **Aligns with "OKCupid + Airbnb"**: Uses OKCupid's ALGORITHM (compatibility scoring) on Airbnb's FLOW (property browsing)
2. **Core Differentiator Preserved**: Roommate compatibility is unique value, without excessive complexity
3. **Natural Filtering**: Users see apartments that fit their budget/location FIRST, then evaluate roommate compatibility
4. **Feasible for MVP**: 5-8 days vs 15-20 days for Model A
5. **User-Centric**: One swipe decision (apartment + roommates as package) vs two decisions (people then apartment)
6. **Stranger Matching Enabled**: Shows room-available apartments with existing roommates (validates stranger matching use case)

### Key Insight from Analysis
User said "budget is already considered once the user gets to a point where the roommates are evaluated" - this confirms Model B approach. Apartment preferences filter first, THEN roommate compatibility scores help user decide among viable apartments.

### Impact
- Implementation: +5-8 days for compatibility scoring and roommate profile display
- UX: Simplified (single swipe interface vs dual)
- Differentiation: Maintained (compatibility algorithm is unique)
- Scope: Manageable for MVP

### Implementation Components
- Dual preference onboarding (apartment + roommate preferences)
- Compatibility scoring algorithm (weighted dimensions)
- Roommate profile cards in apartment detail
- Compatibility badge on swipe cards (for room-available apartments)
- Pre-filtering by apartment preferences

### Related Decisions
- Enables D006 (stranger matching confirmed)
- Constrains D007 (group size) and D008 (budget splits)

---

## D006: Stranger Matching Priority

**Date**: 2025-10-06 11:45  
**Category**: Feature Scope  
**Priority**: Critical

### Question
Is helping strangers find compatible roommates a must-have for MVP, or can it be deferred to V2?

### Options Considered

**Option A: Must-Have (Core Differentiator)** ✅
- Rationale: This IS the unique value proposition vs competitors
- Impact: Validates product-market fit for core use case
- Implementation: Requires Model B architecture (compatibility scoring, roommate profiles)
- Risk: Higher complexity, but necessary for validation

**Option B: Nice-to-Have (Defer to V2)**
- Rationale: Launch faster with existing groups only (Model C)
- Impact: Loses differentiation, becomes generic apartment search
- Implementation: Simpler, but doesn't validate unique positioning
- Risk: May not attract target users (roommate-seekers)

### Decision
**Selected: Option A - Must-Have for MVP**

### Rationale
1. **Core Value Proposition**: Helping strangers find compatible roommates IS the product
2. **Market Differentiation**: Without this, we're just another apartment listing site
3. **User Feedback Critical**: Need to validate if compatibility scoring resonates
4. **Model B Makes It Feasible**: Property-first approach keeps complexity manageable (vs Model A)
5. **User Explicitly Confirmed**: When asked, user said "Option A" (must-have)

### Impact
- Confirms Model B implementation (D005)
- Requires compatibility algorithm (weighted scoring)
- Requires roommate preference onboarding
- Requires roommate profile display in UI
- Validates or invalidates core hypothesis

### Success Metrics for MVP
- 60%+ of roommate-seekers find compatibility scores helpful
- Users report preferring compatibility scores vs manual evaluation
- Compatibility scores influence apartment decisions (track swipe patterns)

### Related Decisions
- Validates D005 (Model B architecture)
- Informs D007 and D008 (group constraints)

---

## D007: Group Size Limit

**Date**: 2025-10-06 12:00  
**Category**: Feature Scope  
**Priority**: Medium

### Question
What's the maximum group size to support for roommate searches?

### Options Considered

**Option A: 2 People Only**
- Pros: Simplest (1-to-1 compatibility), covers common case (2BR apartments)
- Cons: Misses 3BR use case (significant market segment)
- Evaluation: Too limiting

**Option B: Up to 3 People** ✅
- Pros: Covers majority (2BR and 3BR apartments), manageable complexity, realistic for MVP
- Cons: Excludes 4+ person groups (edge case)
- Evaluation: Sweet spot

**Option C: Up to 4+ People**
- Pros: Comprehensive coverage
- Cons: Complexity grows (4-way compatibility, rare use case)
- Evaluation: Overkill for MVP

### Decision
**Selected: Option B - Max 3 People**

### Rationale
1. **Market Coverage**: 2BR and 3BR apartments are most common long-term rentals
2. **Complexity Bounded**: 3-person compatibility is manageable (vs 4+ combinatorial explosion)
3. **Realistic**: Groups >3 are rare for long-term apartment sharing
4. **MVP Focus**: Validate core flow with most common use cases

### Impact
- Onboarding: Group size selector (1-3)
- Compatibility: Calculate up to 2 roommate profiles per apartment (for 3BR with 1 seeking)
- UI: Design for displaying 1-2 current roommate cards
- Constraints: Enforce max 3 in group search flow

### Edge Cases Deferred
- 4+ person groups → Post-MVP
- Larger apartments (4BR+) → Post-MVP

### Related Decisions
- Works with D005 (Model B can handle 1-2 existing roommates)
- Simplifies D008 (split calculations)

---

## D008: Budget Split Handling

**Date**: 2025-10-06 12:05  
**Category**: Feature Scope  
**Priority**: Medium

### Question
Support equal rent splits only, or handle unequal splits (e.g., master bedroom costs more)?

### Options Considered

**Option A: Equal Splits Only** ✅
- Pros: Simple math ($2400 ÷ 3 = $800 each), no room selection needed, fast to implement
- Cons: Doesn't reflect reality (some rooms worth more)
- Evaluation: Good enough for MVP

**Option B: Unequal Splits (Room-Based Pricing)**
- Pros: Realistic (master bedroom costs more), fair pricing
- Cons: Requires room selection, price negotiation, complex UI
- Evaluation: Too complex for MVP

### Decision
**Selected: Option A - Equal Splits Only for MVP**

### Rationale
1. **Simplicity**: Straightforward calculation, no negotiation needed
2. **MVP Scope**: Validates core flow without edge case complexity
3. **Assumption**: Group members work out fairness offline if needed
4. **Time Savings**: 2-3 days saved vs implementing room selection + split negotiation

### Impact
- Onboarding: Single "total budget" input for groups
- Display: "X bedrooms, $Y total ($Z per person)" format
- Logic: Simple division (total / groupSize)
- Deferred: Room selection, unequal splits, master bedroom premiums

### Post-MVP Enhancement Path
When adding unequal splits:
- Room selection flow (which bedroom do you want?)
- Price adjustment per room
- Group agreement workflow (all members approve splits)
- Negotiation features

### Related Decisions
- Works with D007 (max 3 people, simple math)
- Supports D005 (Model B doesn't need split complexity)

---

## D009: Platform Target

**Date**: 2025-10-06 10:30  
**Category**: Platform Strategy  
**Priority**: High

### Question
Mobile-first with desktop responsive, or mobile-only for MVP?

### Options Considered

**Option A: Mobile-First + Desktop Responsive**
- Pros: Broader reach, works on all devices
- Cons: +10-15 days for responsive breakpoints, more testing
- Evaluation: Overkill for MVP

**Option B: Mobile-Only** ✅
- Pros: Faster development, swipe gesture optimized for touch, clear scope
- Cons: Desktop users see mobile viewport (acceptable for MVP)
- Evaluation: Perfect for prototype validation

**Option C: Desktop-First**
- Pros: Easier development (larger screen)
- Cons: Swipe gesture awkward with mouse, wrong primary use case
- Evaluation: Misaligned with user behavior

### Decision
**Selected: Option B - Mobile-Only MVP**

### Rationale
1. **Primary Use Case**: Apartment hunting is mobile activity (on-the-go viewing scheduling)
2. **Swipe Gesture**: Touch-optimized, feels natural on mobile
3. **Development Speed**: -10-15 days vs responsive design
4. **Target Demographic**: 25-35 year-olds are mobile-first
5. **MVP Philosophy**: Validate core UX on primary platform first

### Impact
- Single breakpoint: 375px-428px width (iPhone SE to iPhone 14 Pro Max)
- No media queries for desktop (accept mobile viewport on desktop)
- Faster development (no responsive debugging)
- Clear testing scope (iOS Safari, Chrome Android only)

### Implementation Notes
- Bottom tab navigation (mobile pattern)
- Touch-optimized controls (min 44px tap targets)
- Vertical scrolling only (standard mobile UX)
- Full-screen modals (mobile best practice)

### Post-MVP Enhancement
- Add responsive breakpoints (tablet, desktop)
- Desktop-specific interactions (hover states, keyboard shortcuts)
- Sidebar navigation for desktop

### Related Decisions
- Works with D003 (swipe cards designed for mobile)
- Informs D011 (mobile-first design fidelity)

---

## D010: Virtual Tours Inclusion

**Date**: 2025-10-06 11:00  
**Category**: Feature Scope  
**Priority**: Medium

### Question
Include virtual tours (360° photos or video) in MVP, or defer to post-MVP?

### Options Considered

**Option A: 360° Photo Viewer** (e.g., Pannellum, Photo Sphere Viewer)
- Pros: Immersive experience, competitive with modern listings
- Cons: Library integration (2-3 days), large file sizes, complex UX
- Impact: +4-6 days total

**Option B: Video Embed** (YouTube/Vimeo)
- Pros: Simple implementation (1-2 days), familiar UX
- Cons: Requires video creation for mock data (complex)
- Impact: +2-3 days

**Option C: Enhanced Photo Slideshow**
- Pros: Very simple, uses existing images
- Cons: Not "tour" experience, less impressive
- Impact: +1 day

**Option D: Defer to Post-MVP** ✅
- Pros: Focus on core flow (swipe → shortlist → schedule → feedback)
- Cons: Less impressive, potential competitive disadvantage
- Impact: 0 days for MVP

### Decision
**Selected: Option D - Defer Virtual Tours to Post-MVP**

### Rationale
1. **MVP Focus**: Core value is compatibility matching + swipe UX, not tours
2. **Critical Path**: Tours don't validate roommate matching hypothesis
3. **Time Savings**: -5 days (can be reinvested in core features)
4. **Photo Gallery Sufficient**: Apartment detail page has swipeable photo gallery (good enough for MVP)
5. **User Confirmed**: Explicitly approved deferring virtual tours

### Impact
- Apartment detail page: Photo gallery only (no 360° viewer)
- 5 days saved for core feature development
- Post-MVP enhancement clear (tours as V2 feature)

### Post-MVP Implementation Path
When adding virtual tours:
- Choose format: 360° photos vs video vs 3D models
- Integrate library (Pannellum for 360°, or custom video player)
- Create/source tour content for apartments
- Add "Take Virtual Tour" CTA in detail page

### Related Decisions
- Frees up time for D005 (roommate feature complexity)
- Aligns with D011 (functional MVP focus)

---

## D011: Design Fidelity Level

**Date**: 2025-10-06 10:45  
**Category**: Design Strategy  
**Priority**: Medium

### Question
High-polish custom design with animations, or functional MVP using shadcn defaults?

### Options Considered

**Option A: High-Polish Custom Design**
- Pros: Impressive, professional, memorable
- Cons: +20% time on animations, micro-interactions, custom components
- Impact: +6-8 days total

**Option B: Functional MVP (shadcn Defaults)** ✅
- Pros: Faster development, focus on functionality, good baseline quality
- Cons: Less "wow factor", more generic looking
- Impact: Standard timeline (32-40 days)

### Decision
**Selected: Option B - Functional MVP over High Polish**

### Rationale
1. **Validation First**: Need to test compatibility matching, not visual design
2. **shadcn Quality**: Default styling is professional enough for MVP
3. **Iteration Strategy**: Get feedback on UX, then polish based on what works
4. **Time Efficiency**: 20% faster development
5. **User Confirmed**: "Functional MVP, high polish post-MVP"

### Impact
- Use shadcn components mostly as-is (minimal customization)
- Focus animations on swipe gesture only (core interaction)
- Basic transitions (no elaborate micro-interactions)
- Neutral color palette (black, white, grays, one accent color)
- System fonts initially (no custom web fonts)

### Design Standards for MVP
- **Acceptable**: Clean, functional, consistent
- **Not Required**: Custom illustrations, elaborate animations, branded assets
- **Focus**: Usability > aesthetics

### Post-MVP Polish Path
- Custom color palette (brand colors)
- Custom typography (web fonts)
- Micro-interactions (button hovers, transitions)
- Loading states (skeletons, spinners)
- Empty state illustrations
- Onboarding animations

### Related Decisions
- Works with D002 (shadcn/ui provides good defaults)
- Aligns with D009 (mobile-only, don't need responsive polish)

---

## D012: Viewing Scheduler Constraints

**Date**: 2025-10-06 12:10  
**Category**: Business Logic  
**Priority**: High

### Question
What are the business hours and constraints for viewing scheduling?

### User Specification
"Calendar view, 1hr blocks, prioritize same-day tours, this will most likely be the user preference 80% of times. Exclude Sat completely and Fri evening."

### Options Considered

**Option A: 7 Days/Week, 9 AM - 8 PM**
- Pros: Maximum flexibility
- Cons: Requires Saturday staffing (user said exclude Sat)

**Option B: Mon-Fri Only, 9 AM - 6 PM**
- Pros: Standard business hours
- Cons: Excludes Sunday (when many people are free)

**Option C: Custom Schedule (User-Specified)** ✅
- **Monday-Thursday**: 10 AM - 7 PM (last slot 6 PM)
- **Friday**: 10 AM - 5 PM (last slot 4 PM) - NO FRIDAY EVENING
- **Saturday**: CLOSED
- **Sunday**: 11 AM - 5 PM (last slot 4 PM)
- **Slot Duration**: 1 hour blocks
- **Same-Day Priority**: Show "Available Today" section first

### Decision
**Selected: Option C - Custom Business Hours Schedule**

### Rationale
1. **User Requirement**: Explicitly specified "exclude Sat completely and Fri evening"
2. **Same-Day Focus**: 80% of users prefer same-day viewings (prioritize in UI)
3. **Realistic Constraints**: Reflects actual business operations (reps have weekends)
4. **Work-Life Balance**: No Saturday staffing needed

### Impact
- Slot generation logic: Respect business hours per day of week
- UI: "Available Today" priority section (always shown first)
- Multi-viewing route optimization: Calculate travel time between same-day slots
- Max viewings per day: 3 (allows quality tours, not rushed)
- Minimum lead time: 2 hours (can't book within 2 hours of now)

### Implementation Details
```typescript
const BUSINESS_HOURS = {
  monday: { start: 10, end: 19, lastSlot: 18 },
  tuesday: { start: 10, end: 19, lastSlot: 18 },
  wednesday: { start: 10, end: 19, lastSlot: 18 },
  thursday: { start: 10, end: 19, lastSlot: 18 },
  friday: { start: 10, end: 17, lastSlot: 16 }, // NO FRIDAY PM
  saturday: null, // CLOSED
  sunday: { start: 11, end: 17, lastSlot: 16 }
};
```

### Calendar UI Design
- Top section: "Available Today" with quick-book buttons (2PM, 4PM, 6PM if available)
- Below: Week calendar view (scrollable)
- Same-day slots highlighted in accent color
- Suggest optimal route for multi-viewing bookings

### Related Decisions
- Works with D009 (mobile calendar UI)
- Supports core user preference (same-day scheduling)

---

## Decision Review Process

### How Decisions Are Made

1. **Research**: Explore options via web search, sequential thinking, architectural analysis
2. **Document**: Capture all viable options with pros/cons
3. **Analyze**: Use techniques (Zero-Trust Validation, Self-Ask, Architectural Lens)
4. **Recommend**: Shadow provides recommendation with rationale
5. **Approve**: User approves via approval gates
6. **Lock**: Decision documented here and in other persistent_context files

### Decision Revision Process

If a locked decision needs reconsideration:
1. Document in `open_questions.md` with context
2. Note what changed (new information, requirement shift, technical blocker)
3. Discuss trade-offs (scope vs timeline vs quality)
4. Get user approval for change
5. Update decision log with revision note
6. Update affected files (constraints.md, system_architecture.md, etc.)

### Cross-References

All decisions documented in:
- This file (decision_log.md) - detailed rationale
- constraints.md - as enforced constraints
- system_architecture.md - as architectural choices
- progress_tracker.md - as completed work
- checkpoints/*.md - as snapshots

---

**All major architectural decisions are now locked and documented. Ready for PLAN phase.**
