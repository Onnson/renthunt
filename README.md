# RentHunt

**Status**: EXPLORE Phase Complete | Ready for PLAN Phase  
**Last Updated**: 2025-10-06

---

## Overview

RentHunt is a mobile-first long-term apartment rental platform that combines preference-based matching (OKCupid-style) with property browsing (Airbnb-style), featuring native roommate compatibility scoring.

**Core Value Proposition**: Help renters find apartments AND compatible roommates through intelligent matching algorithms and end-to-end rental services.

---

## Project Status

### Current Phase: EXPLORE → PLAN Transition

**Completed**:
- ✅ Technology stack finalized
- ✅ Roommate architecture designed (Model B: property-first with compatibility scoring)
- ✅ Complete user journey mapped (16 screens)
- ✅ Domain model established
- ✅ MVP scope locked
- ✅ Persistent context created (13 files, 4,485 lines)

**Next Steps**:
- Component hierarchy design
- Detailed file structure planning
- Zustand store implementation specs
- Mock data generation
- Implementation roadmap

---

## Technology Stack

```
Frontend: Vite 5.x + React 19 + TypeScript 5.x
Styling: TailwindCSS 3.x + shadcn/ui
Animation: Framer Motion 11.x
State: Zustand 4.x
Icons: Lucide React
Dates: date-fns 3.x
```

**Boilerplate**: RicardoValdovinos/vite-react-boilerplate  
**Swipe Component**: hover.dev Swipe Cards (FREE)

---

## Key Features (MVP)

### Core User Journey
1. **Onboarding** (9 screens) - Dual preference collection (apartment + roommate)
2. **Discovery** - Swipe-based apartment browsing with compatibility scores
3. **Shortlist** - Save and review apartments
4. **Detail** - Full apartment info with roommate profiles
5. **Scheduler** - Book physical viewings (same-day priority)
6. **Feedback** - Post-viewing dual feedback (personal + fairness)

### Roommate Matching (Model B)
- Property-first approach (browse apartments, not people)
- Compatibility scoring for existing roommates in room-available apartments
- Weighted algorithm: cleanliness, social level, noise, schedule, smoking, pets, drinking
- Stranger matching enabled (core differentiator)

---

## MVP Constraints

- **Platform**: Mobile-only (iOS Safari 15+, Chrome Android)
- **Group Size**: Max 3 people
- **Budget Splits**: Equal only
- **Data**: 10 mock apartments, LocalStorage persistence
- **Deferred**: Virtual tours, user messaging, desktop responsive

---

## Project Structure

```
renthunt/
├── persistent_context/          # Complete architectural context
│   ├── foundation/              # Product intent, architecture, domain model
│   ├── workflow_state/          # Current mode, transitions
│   ├── reasoning/               # Decisions, open questions
│   └── checkpoints/             # Session snapshots
├── exploration-findings.md      # Exploration phase documentation
└── README.md                    # This file
```

---

## Documentation

### Essential Reading (In Order)
1. `persistent_context/foundation/product_intent.md` - Why this exists
2. `persistent_context/foundation/system_architecture.md` - How it's built
3. `persistent_context/foundation/domain_model.md` - Core entities and business rules
4. `persistent_context/reasoning/decision_log.md` - All major decisions with rationale
5. `persistent_context/checkpoints/checkpoint_20251006_1334.md` - Complete session snapshot

### Quick Reference
- **Constraints**: `persistent_context/foundation/constraints.md`
- **Progress**: `persistent_context/foundation/progress_tracker.md`
- **Tech Stack**: `persistent_context/foundation/technical_environment.md`

---

## Development Setup (Planned)

```bash
# Clone boilerplate (PLAN phase)
git clone https://github.com/RicardoValdovinos/vite-react-boilerplate.git

# Install dependencies
pnpm install

# Add RentHunt-specific dependencies
pnpm add zustand framer-motion date-fns lucide-react

# Initialize shadcn/ui
npx shadcn-ui@latest init

# Start dev server
pnpm dev
```

---

## Implementation Timeline

- **PLAN Phase**: 4-6 hours (component design, file structure, store specs)
- **IMPLEMENT Phase**: 32-40 days (6-8 weeks full-time)
  - Onboarding: 7-9 days
  - Discovery: 6-8 days
  - Evaluation: 10-12 days
  - Infrastructure: 3-4 days
  - Testing: 4-6 days

---

## Architecture Highlights

### Roommate Matching (Model B)
Users browse apartments (Airbnb-style) with compatibility scores for existing roommates (OKCupid-style algorithm). Budget is pre-filtered, roommate compatibility helps decide among viable options.

### Zustand Stores (5 Planned)
1. `userPreferencesStore` - Search criteria
2. `apartmentsStore` - Inventory, filtering, compatibility
3. `shortlistStore` - Saved apartments
4. `viewingsStore` - Scheduling, same-day optimization
5. `feedbackStore` - Post-viewing feedback

### Domain Model
- **Bounded Contexts**: Discovery, Evaluation, Transaction
- **Core Entities**: Apartment, User, RoommateProfile, Viewing, Feedback
- **Business Rules**: Max 3 people, equal splits, viewing hours constraints

---

## Contributing

This project follows Shadow Crew principles:
- Radical transparency (all decisions documented)
- User authority (user has final say)
- Unified intelligence (human-AI collaboration)

See `persistent_context/` for complete architectural context.

---

## License

TBD

---

## Contact

Project maintained by @Onnson

**Repository**: https://github.com/Onnson/renthunt
