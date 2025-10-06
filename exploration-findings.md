# RentHunt - Exploration Findings & Architectural Context

**Status**: EXPLORE MODE  
**Date**: 2025-10-06  
**Phase**: Pre-implementation context discovery

---

## Executive Summary

RentHunt is a preference-driven long-term rental apartment matching platform that combines matching algorithms (OKCupid-style) with property browsing (Airbnb-style) while providing end-to-end rental services including viewing coordination, feedback aggregation, and platform-mediated landlord-tenant relationships.

**Core Value Proposition**: Remove friction from long-term rental process through intelligent matching, transparent rankings, and full-service intermediation.

---

## Domain Model - Core Concepts

### Bounded Contexts Identified

1. **Discovery Context** (Current Focus - Prototype)
   - Apartment card browsing with swipe gestures
   - Preference-based filtering and matching
   - Shortlist management

2. **Evaluation Context** (Deferred)
   - Virtual tour viewing
   - Physical viewing scheduling
   - Post-viewing feedback collection
   - Dual ranking system (personal + global)

3. **Transaction Context** (Deferred)
   - Contract signing via platform
   - Ongoing landlord-tenant intermediation

4. **Supply Context** (Deferred)
   - Landlord onboarding
   - Representative management
   - Commission tracking per close

### Entities & Aggregates

**Apartment** (Aggregate Root)
- Properties: images, price, location, descriptions
- Relationships: landlord, viewing_slots, feedback_entries
- Invariants: Must have truthful representations (enforced via transparency rankings)

**User**
- Properties: preferences, shortlist, viewing_history
- Behavior: Swipe interactions, feedback submission

**Shortlist** (Aggregate)
- Owned by User
- Contains: shortlisted apartments with personal ranking scores
- Operations: add_via_swipe, remove, view_details, schedule_viewing

**Feedback** (Value Object)
- Personal preferences (subjective)
- Fairness/transparency metrics (objective, affects global ranking)

### Roommate Arrangements
- **Strategic Decision**: Native support required (not bolted-on)
- **Implication**: Apartment entity must support multi-occupant configurations
- **Deferred**: Exact modeling pending PLAN phase

---

## Technical Architecture Decisions

### Technology Stack (Approved)

**Frontend Foundation**:
```
React 19 + Vite + TypeScript
├── UI Framework: TailwindCSS
├── Component Library: shadcn/ui (copy-paste architecture)
├── Animation: Framer Motion
└── Icons: Lucide (shadcn default)
```

**Rationale**:
- **Vite**: Fast HMR, optimized builds, modern tooling
- **shadcn/ui**: Zero lock-in, own the code, TailwindCSS native
- **Framer Motion**: Declarative animations, physics-based gestures
- **TypeScript**: Type safety for domain model integrity

**Starter Template**: 
- `github.com/RicardoValdovinos/vite-react-boilerplate`
- Features: Pre-configured ESLint, Prettier, Husky, Docker, auto-imports
- Stars: 982, Last updated: Jul 2025

### Swipe Card Implementation (Approved)

**Source**: hover.dev Swipe Cards (FREE component)
- URL: https://www.hover.dev/components/cards
- Tech: React + Framer Motion + TailwindCSS
- Reference: Tom Is Loading YouTube tutorial (18min) for customizations

**Implementation Approach**:
```typescript
// Conceptual API (from hover.dev)
- Uses motion.div with drag="x"
- dragConstraints for snap-back behavior
- Motion values for rotation/opacity effects
- Transform animations on swipe completion
```

**Why this over libraries**:
- Active maintenance (2024 code)
- Full control over UX customization
- No dependency on stale npm packages (react-tinder-card is 2 years old)
- Direct access to source for apartment-specific adaptations

---

## User Journey - Current Understanding

### Primary Flow (MVP Focus)

```
┌─────────────────────────────────────────────────────────────┐
│ 1. DISCOVERY (Prototype Scope)                             │
├─────────────────────────────────────────────────────────────┤
│ Input: User preferences (filters)                           │
│ Action: Browse apartment cards via swipe interface          │
│   ↓ Swipe Right → Shortlist                                │
│   ↓ Swipe Left → Dismiss                                   │
│ Output: Shortlist of potential matches                      │
└─────────────────────────────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│ 2. EVALUATION (Deferred)                                    │
├─────────────────────────────────────────────────────────────┤
│ → View shortlist with virtual tours                         │
│ → Schedule physical viewing (company rep coordinates)       │
│ → Submit post-viewing feedback (2-part system)              │
└─────────────────────────────────────────────────────────────┘
          │
          ↓
┌─────────────────────────────────────────────────────────────┐
│ 3. TRANSACTION (Deferred)                                   │
├─────────────────────────────────────────────────────────────┤
│ → Sign contract via platform                                │
│ → Platform mediates ongoing landlord-tenant relationship    │
└─────────────────────────────────────────────────────────────┘
```

### Feedback System Architecture

**Type 1: Personal Preferences** (User-Scoped)
- Questions: "What did you like?", "What didn't you like?"
- Purpose: Refine personal shortlist rankings using ML/preference learning
- Visibility: Affects only that user's future recommendations

**Type 2: Fairness & Transparency** (Global)
- Questions: "True to descriptions?", "Worth the price?"
- Purpose: Global apartment quality score
- Visibility: Affects apartment's ranking for ALL users
- Anti-fraud: Protects against misleading listings

---

## Prototype Scope - Feature Boundaries

### In Scope (Frontend Prototype)
✅ Apartment card UI (image, price, basic location)
✅ Swipe gesture interactions (left/right)
✅ Shortlist indication on swipe right
✅ Basic card stack rendering

### Explicitly Deferred
❌ Backend integration (mock data for now)
❌ Actual filtering/matching algorithms
❌ Shortlist detail view
❌ Virtual tours
❌ Viewing scheduling
❌ Feedback forms
❌ User authentication
❌ Roommate arrangement UI

**Rationale**: Validate swipe UX and visual design before investing in complex backend logic.

---

## Research Artifacts

### Evaluated Alternatives

**Swipe Libraries Considered**:
1. `react-tinder-card` - ❌ Last updated 2 years ago (stale)
2. `react-native-swipeable-deck` - ❌ React Native only
3. Custom Framer Motion - ✅ **Selected** (via hover.dev code)

**Boilerplate Options Evaluated**:
1. Next.js property rental templates - ❌ Need Vite, not Next
2. Slash-admin (Vite + React 19) - ❌ Too admin-focused
3. RicardoValdovinos/vite-react-boilerplate - ✅ **Selected**

**Component Libraries**:
1. Material-UI - ❌ Heavy, opinionated styling
2. Untitled UI React - ⚠️ Professional but paid
3. shadcn/ui - ✅ **Selected** (copy-paste, no lock-in)

---

## Architectural Risks & Mitigations

### Risk 1: Swipe Performance on Low-End Devices
**Severity**: Medium  
**Mitigation**: 
- Use Framer Motion's hardware-accelerated transforms
- Lazy load off-screen cards
- Validate on mobile devices early

### Risk 2: Roommate Feature Complexity
**Severity**: High  
**Mitigation**: 
- Native design from start (not retrofitted)
- Defer detailed modeling to PLAN phase
- User research on roommate matching patterns

### Risk 3: Dual Ranking System Confusion
**Severity**: Medium  
**Mitigation**: 
- Clear UX distinction between personal vs. global scores
- Transparent communication of how feedback affects rankings

### Risk 4: Representative Coordination Scalability
**Severity**: High (Business Model)  
**Mitigation**: 
- Outside scope of prototype
- Requires marketplace dynamics modeling in future phases

---

## Design Decisions - Rationale Log

### Decision 1: Why Vite over Next.js?
**Context**: Multiple Next.js rental templates exist  
**Decision**: Vite  
**Rationale**:
- User explicitly requested frontend-first approach
- Backend integration deferred
- Vite's dev server faster for rapid prototyping
- No need for SSR/SSG in prototype phase
- Easier to migrate to Next.js later if needed

### Decision 2: Why shadcn/ui over component libraries?
**Context**: Many mature UI libraries available  
**Decision**: shadcn/ui  
**Rationale**:
- Copy-paste = full ownership of code
- No runtime dependency = smaller bundle
- TailwindCSS native = consistent styling
- Easy customization for domain-specific components

### Decision 3: Why hover.dev code over custom implementation?
**Context**: Could build swipe from scratch  
**Decision**: hover.dev starter code  
**Rationale**:
- Well-tested, production-quality foundation
- Saves 4-8 hours of gesture tuning
- Reference tutorial available for customizations
- Free tier includes swipe cards component

---

## Open Questions for PLAN Phase

1. **Roommate Arrangements**: 
   - How do users specify roommate preferences?
   - How does apartment capacity factor into matching?
   - Split rent calculations in UI?

2. **Preference Input**:
   - What are the core preference dimensions? (price, location, size, amenities)
   - How detailed should initial filtering be?
   - Progressive disclosure vs. upfront form?

3. **Card Content**:
   - Minimum viable information per card?
   - Image gallery vs. single hero image?
   - Truncation strategy for long descriptions?

4. **Shortlist Feedback**:
   - Visual indication when card added to shortlist?
   - Undo swipe functionality?
   - Maximum shortlist size?

5. **Data Modeling**:
   - Apartment data schema?
   - Mock data generation strategy?
   - How many sample apartments for prototype?

---

## Next Actions (Pending Approval to Enter PLAN Mode)

### Immediate
1. ✅ Document exploration findings (this file)
2. ⏳ Await user approval to transition to PLAN mode
3. ⏳ Create persistent_context/ structure per CREW.md

### PLAN Phase (Once Approved)
1. Define apartment data schema
2. Create detailed component hierarchy
3. Design state management approach (context vs. zustand)
4. Establish mock data structure
5. Plan file/folder architecture
6. Define integration points with hover.dev code

### IMPLEMENT Phase (Future)
1. Initialize project from boilerplate
2. Integrate hover.dev swipe cards
3. Build apartment card component
4. Implement shortlist state management
5. Create basic navigation/layout

---

## References

- **hover.dev Swipe Cards**: https://www.hover.dev/components/cards
- **Boilerplate Repo**: https://github.com/RicardoValdovinos/vite-react-boilerplate
- **Tom Is Loading Tutorial**: YouTube (search: "Tinder Style Swipe Cards with React & Framer Motion")
- **shadcn/ui**: https://ui.shadcn.com
- **Framer Motion**: https://www.framer.com/motion

---

**Document Status**: Living document, will evolve through PLAN and IMPLEMENT phases  
**Last Updated**: 2025-10-06 (EXPLORE mode)
