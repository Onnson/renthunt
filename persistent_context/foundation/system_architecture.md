# System Architecture - RentHunt MVP

**Last Updated**: 2025-10-06  
**Architecture Pattern**: Clean Architecture + Mobile-First SPA  
**Status**: Design phase (pre-implementation)

---

## Architectural Principles

### 1. Separation of Concerns
- **UI Layer**: React components (presentational + container)
- **State Layer**: Zustand stores (business logic)
- **Data Layer**: Mock data services (will become API adapters)
- **Domain Layer**: Type definitions, business rules, compatibility algorithms

### 2. Mobile-First, Progressive Enhancement
- Primary target: Mobile browsers (iOS Safari, Chrome Android)
- Touch-optimized interactions (swipe gestures)
- No desktop responsive for MVP (deferred)
- Future: Scale up to tablet/desktop

### 3. Component Composition
- Atomic Design methodology (atoms → molecules → organisms → templates → pages)
- Reusable, testable components
- shadcn/ui as foundation (copy-paste, full ownership)
- Custom domain components built on top

### 4. Type Safety
- TypeScript throughout (strict mode)
- Domain models as interfaces/types
- No `any` types in production code
- Compile-time error prevention

### 5. Stateless Where Possible
- Functional components (React hooks)
- Pure functions for calculations (compatibility scoring)
- Side effects isolated in stores and custom hooks

---

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        USER (Mobile)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Onboarding │  │  Discovery   │  │  Evaluation  │     │
│  │    Pages     │  │    Pages     │  │    Pages     │     │
│  │  (9 screens) │  │ (Swipe, etc) │  │(Schedule,etc)│     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌────────────────────────────────────────────────────┐   │
│  │         Shared UI Components (shadcn/ui)           │   │
│  │  Button, Card, Form, Calendar, Dialog, etc.       │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    STATE MANAGEMENT LAYER                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │userPreferences│  │ apartments   │  │  shortlist   │     │
│  │    Store     │  │    Store     │  │    Store     │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│  ┌──────────────┐  ┌──────────────┐                        │
│  │  viewings    │  │  feedback    │                        │
│  │   Store      │  │    Store     │                        │
│  └──────────────┘  └──────────────┘                        │
│                                                             │
│         Zustand (lightweight, TypeScript-friendly)          │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                    BUSINESS LOGIC LAYER                      │
│  ┌──────────────────────────────────────────────────┐      │
│  │       Compatibility Scoring Algorithm            │      │
│  │  - apartmentMatchScore(userPrefs, apt)           │      │
│  │  - roommateCompatibilityScore(userPrefs, rm)     │      │
│  └──────────────────────────────────────────────────┘      │
│  ┌──────────────────────────────────────────────────┐      │
│  │          Filtering & Ranking Logic               │      │
│  │  - filterApartmentsByPreferences()               │      │
│  │  - rankByCompatibility()                         │      │
│  └──────────────────────────────────────────────────┘      │
│  ┌──────────────────────────────────────────────────┐      │
│  │           Viewing Scheduler Logic                │      │
│  │  - generateAvailableSlots()                      │      │
│  │  - optimizeSameDayRoute()                        │      │
│  └──────────────────────────────────────────────────┘      │
└────────────────────────┬───────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │          Mock Data Services (MVP)                │      │
│  │  - mockApartments.ts (10 apartments)             │      │
│  │  - mockRoommateProfiles.ts (4-5 personas)        │      │
│  │  - mockViewingSlots.ts (calendar availability)   │      │
│  └──────────────────────────────────────────────────┘      │
│                                                             │
│  Future: API adapters for backend integration               │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Architecture

### Atomic Design Structure

```
src/
├── components/
│   ├── atoms/                    # Base UI elements
│   │   ├── Button.tsx
│   │   ├── Badge.tsx
│   │   ├── ProgressBar.tsx
│   │   └── ...
│   │
│   ├── molecules/                # Simple component combos
│   │   ├── AmenityTag.tsx
│   │   ├── PriceDisplay.tsx
│   │   ├── CompatibilityBadge.tsx
│   │   ├── RoommatePreferenceInput.tsx
│   │   └── ...
│   │
│   ├── organisms/                # Complex, domain-specific
│   │   ├── ApartmentCard.tsx            # Swipeable card
│   │   ├── RoommateProfileCard.tsx      # Current roommate display
│   │   ├── OnboardingStep.tsx           # Wizard step wrapper
│   │   ├── ViewingCalendar.tsx          # Calendar UI
│   │   ├── FeedbackForm.tsx             # Post-viewing form
│   │   └── ...
│   │
│   ├── templates/                # Page layouts
│   │   ├── OnboardingLayout.tsx
│   │   ├── MainAppLayout.tsx
│   │   └── ...
│   │
│   └── ui/                       # shadcn/ui components (copied)
│       ├── button.tsx
│       ├── card.tsx
│       ├── form.tsx
│       ├── calendar.tsx
│       └── ...
```

---

## State Management Architecture

### Zustand Store Design

**Why Zustand**:
- Lightweight (no boilerplate like Redux)
- TypeScript-first design
- No context provider hell
- Devtools support
- Easy to test (stores are just functions)

**Store Separation**:

1. **userPreferencesStore** - User's search criteria
   - Apartment preferences (budget, location, size, amenities)
   - Roommate preferences (lifestyle, habits, etc.)
   - Seeking status (solo, has group, seeking roommates)
   - Persistence: LocalStorage for MVP

2. **apartmentsStore** - Apartment inventory & filtering
   - Raw apartment data
   - Filtered apartments (by user preferences)
   - Current swipe index
   - Computed compatibility scores

3. **shortlistStore** - User's saved apartments
   - Shortlisted apartment IDs
   - Actions: add, remove, clear
   - Persistence: LocalStorage

4. **viewingsStore** - Viewing schedule management
   - Scheduled viewings
   - Available time slots
   - Same-day optimization logic

5. **feedbackStore** - Post-viewing feedback
   - Submitted feedback entries
   - Pending feedback (viewed but not reviewed)

**Data Flow Pattern**:
```
User Action (Component)
    ↓
Action Creator (Store)
    ↓
State Update (Zustand)
    ↓
Re-render (React)
    ↓
Updated UI
```

---

## Key Architectural Decisions

### Decision 1: Frontend-Only MVP (Mock Data)

**Rationale**:
- Validate UX and matching logic before backend investment
- Faster iteration on UI/UX
- No server costs during development
- Easy to demo/test

**Implications**:
- All data lives in LocalStorage or in-memory
- No real-time sync
- No authentication (mock user)
- Backend integration deferred to post-MVP

**Migration Path**:
- Data services abstracted into separate layer
- Easy to swap mock services for API calls
- TypeScript interfaces remain same

### Decision 2: Swipe Gesture via hover.dev (Not Custom-Built)

**Rationale**:
- Production-quality swipe physics (spring animations, drag thresholds)
- Saves 4-8 days of gesture tuning
- Well-documented, customizable
- Free tier includes swipe cards

**Implications**:
- Dependency on Framer Motion library (already in stack)
- Need to adapt hover.dev code to apartment domain
- Limited by what hover.dev component supports (acceptable trade-off)

**Integration Strategy**:
- Copy SwipeCards.jsx from hover.dev
- Create ApartmentCard wrapper component
- Pass apartment data as props
- Customize styling for RentHunt branding

### Decision 3: Compatibility Scoring Algorithm (Weighted Dimensions)

**Approach**: Linear weighted scoring, not ML

**Rationale**:
- Transparent (users can understand why score is X%)
- Debuggable (no black box)
- No training data needed (cold start problem)
- Fast to compute (client-side)

**Algorithm Structure**:
```typescript
function calculateRoommateCompatibility(
  userPrefs: RoommatePreferences,
  roommateProfile: RoommateProfile
): number {
  const weights = {
    cleanliness: 0.20,     // 20%
    socialLevel: 0.15,     // 15%
    noiseLevel: 0.15,      // 15%
    workSchedule: 0.10,    // 10%
    smoking: 0.15,         // 15% (hard constraint)
    pets: 0.15,            // 15%
    drinking: 0.10         // 10%
  };
  
  // Calculate dimension scores (0-100)
  // Weight and sum
  // Return overall 0-100 score
}
```

**Future Enhancement**:
- ML-based scoring using feedback data
- Personalized weights (user adjusts importance)
- Collaborative filtering (users like you also liked...)

### Decision 4: Onboarding as Separate Flow (Not Progressive)

**Rationale**:
- Preference collection is critical for matching quality
- Better to complete upfront than partial/interrupted
- Creates commitment (users who finish onboarding are serious)
- Mobile wizard pattern is proven UX

**Implications**:
- Cannot skip onboarding (mandatory)
- Higher drop-off risk (mitigated by progress indicator, clear value prop)
- All preferences collected before showing apartments

**UX Enhancements**:
- Progress bar (Step 2 of 9)
- Ability to go back/edit
- Save draft (LocalStorage)
- Estimated time (2-3 minutes)

### Decision 5: Mobile-Only MVP (No Responsive)

**Rationale**:
- Primary use case: on-the-go apartment hunting
- Swipe gesture optimized for touch
- Faster development (one breakpoint)
- Mobile-first aligns with target demographic (25-35 year olds)

**Implications**:
- Desktop users see mobile viewport (acceptable for MVP)
- Post-MVP: Responsive design with different interaction patterns for desktop

---

## Security & Privacy (MVP Scope)

**Data Storage**:
- LocalStorage for user preferences (client-side only)
- No server transmission of personal data
- No authentication (mock user session)

**Future Considerations**:
- HTTPS for API calls
- JWT-based authentication
- Encrypted preference storage
- GDPR compliance (data export, deletion)
- Background check integration for roommate safety

---

## Performance Considerations

**Target Metrics**:
- First Contentful Paint: < 1.5s
- Swipe gesture responsiveness: 60fps
- Compatibility score calculation: < 50ms per apartment

**Optimization Strategies**:
- Lazy loading for off-screen apartments
- Memoization for compatibility scores (React.useMemo)
- Virtual scrolling for shortlist (if > 20 items)
- Image optimization (WebP, lazy loading)
- Code splitting by route

**Bundle Size Target**: < 500KB initial load (gzipped)

---

## Testing Strategy (Deferred to IMPLEMENT)

**Unit Tests**:
- Compatibility scoring algorithm
- Filtering logic
- Store actions/reducers

**Component Tests**:
- Isolated component rendering
- User interaction simulation

**Integration Tests**:
- Onboarding flow (all 9 steps)
- Swipe → Shortlist → Schedule flow
- Feedback submission

**E2E Tests** (Post-MVP):
- Complete user journey
- Mobile device testing (real devices)

---

## Future Architecture Evolution

**V1 - Backend Integration**:
```
Frontend (React) ←→ API Gateway ←→ Backend Services
                                    ├─ Auth Service
                                    ├─ Apartment Service
                                    ├─ User Service
                                    ├─ Matching Service
                                    └─ Viewing Service
```

**V2 - Microservices**:
- Event-driven architecture
- Real-time notifications (WebSockets)
- ML recommendation engine
- Analytics pipeline

MVP architecture designed for easy evolution to these future states.
