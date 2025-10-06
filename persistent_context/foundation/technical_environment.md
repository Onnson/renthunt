# Technical Environment - RentHunt MVP

**Last Updated**: 2025-10-06  
**Environment Status**: Pre-implementation (planned configuration)  
**Development Mode**: Local development, no deployment yet

---

## Core Technology Stack

### Frontend Framework
- **React**: 19.x (latest)
  - Hooks-based architecture
  - Functional components only
  - No class components
  
### Build Tool
- **Vite**: 5.x
  - Fast HMR (Hot Module Replacement)
  - Optimized production builds
  - Native ESM support
  - Plugin ecosystem

### Language
- **TypeScript**: 5.x
  - Strict mode enabled
  - No implicit `any`
  - Full type coverage target: 95%+

### Styling
- **TailwindCSS**: 3.x
  - Utility-first CSS
  - Custom design tokens
  - JIT (Just-In-Time) compilation
  - Mobile-first responsive utilities

### UI Component Library
- **shadcn/ui**: Latest
  - Copy-paste components (no npm package)
  - Built on Radix UI primitives
  - Fully customizable
  - Components to install:
    - `button`, `card`, `form`, `input`
    - `select`, `slider`, `calendar`
    - `dialog`, `sheet`, `tabs`
    - `badge`, `progress`, `separator`

### Animation Library
- **Framer Motion**: 11.x
  - Declarative animations
  - Gesture recognition (drag, swipe)
  - Spring physics
  - Layout animations

### State Management
- **Zustand**: 4.x
  - Lightweight (< 1KB)
  - No providers needed
  - DevTools support
  - Middleware: persist (LocalStorage)

### Icons
- **Lucide React**: Latest
  - Consistent icon set
  - Tree-shakeable
  - Customizable size/color

### Date Handling
- **date-fns**: 3.x
  - Lightweight vs Moment.js
  - Tree-shakeable
  - Immutable
  - Used for: viewing scheduler, move-in dates

---

## Development Tools

### Package Manager
- **pnpm**: 8.x (preferred) OR **npm**: 10.x
  - Faster installs with pnpm
  - Strict dependency resolution
  
### Code Quality
- **ESLint**: 8.x
  - `@typescript-eslint` plugin
  - React hooks rules
  - Import order enforcement
  
- **Prettier**: 3.x
  - Auto-formatting on save
  - Integrated with ESLint
  
- **Husky**: 9.x
  - Pre-commit hooks
  - Run linting before commits

### Dev Server
- **Vite Dev Server**
  - Port: 5173 (default)
  - Host: localhost
  - HMR enabled
  - Network access for mobile testing

---

## Starter Boilerplate

### Source
- **Repository**: `github.com/RicardoValdovinos/vite-react-boilerplate`
- **Stars**: 982
- **Last Updated**: July 2025
- **License**: MIT

### Pre-configured Features
- ✅ Vite + React + TypeScript
- ✅ TailwindCSS
- ✅ shadcn/ui setup
- ✅ ESLint + Prettier
- ✅ Husky hooks
- ✅ Auto-import support
- ✅ Path aliases (`@/components`, `@/lib`, etc.)
- ✅ Docker configuration (not used for MVP)

### Customizations Needed
- Install additional shadcn/ui components
- Add Framer Motion dependency
- Add Zustand + persist middleware
- Add date-fns
- Configure TailwindCSS theme (colors, fonts)
- Set up project-specific path aliases

---

## External Code Sources

### hover.dev Swipe Cards
- **Source**: https://www.hover.dev/components/cards
- **Component**: Swipe Cards (FREE tier)
- **Tech Stack**: React + Framer Motion + TailwindCSS
- **License**: Free for personal/commercial use
- **Integration Approach**:
  1. Copy SwipeCards.jsx code from hover.dev
  2. Convert to TypeScript
  3. Create domain-specific wrapper (ApartmentCard)
  4. Customize styling for RentHunt branding

### Reference Tutorial
- **Source**: "Tinder Style Swipe Cards with React & Framer Motion"
- **Author**: Tom Is Loading (YouTube)
- **Duration**: 18 minutes
- **Published**: August 2024
- **Usage**: Reference for customization patterns

---

## Target Platform

### Primary Targets
- **iOS Safari**: 15.0+ (iPhone 12 and newer)
- **Chrome Android**: Latest 2 versions

### Screen Sizes
- **Primary**: 375x667 (iPhone SE) to 428x926 (iPhone 14 Pro Max)
- **Breakpoint**: Single mobile breakpoint (no responsive for MVP)

### Browser Features Required
- ES2020+ support
- CSS Grid, Flexbox
- LocalStorage API
- Touch events (for swipe gestures)
- CSS transforms (for animations)

### Testing Devices (Recommended)
- iPhone (any recent model)
- Android phone (any recent model)
- Chrome DevTools mobile emulation

---

## Data Storage (MVP)

### LocalStorage Schema
```typescript
// Key: 'renthunt:userPreferences'
interface StoredUserPreferences {
  apartmentPreferences: ApartmentPreferences
  roommatePreferences: RoommatePreferences | null
  onboardingComplete: boolean
  lastUpdated: string // ISO timestamp
}

// Key: 'renthunt:shortlist'
interface StoredShortlist {
  apartmentIds: string[]
  lastUpdated: string
}

// Key: 'renthunt:viewings'
interface StoredViewings {
  scheduled: Viewing[]
  completed: string[] // apartment IDs
}

// Key: 'renthunt:feedback'
interface StoredFeedback {
  submissions: Feedback[]
}
```

### Storage Limits
- LocalStorage: ~5-10MB per origin (browser-dependent)
- Sufficient for MVP (10 apartments, user data)

### Data Persistence Strategy
- Zustand persist middleware auto-syncs stores to LocalStorage
- No manual localStorage calls in components
- Clear on logout (mock auth)

---

## Mock Data Strategy

### Mock Data Files (to be created in IMPLEMENT phase)
```
src/data/
├── mockApartments.ts        # 10 apartment objects
├── mockRoommateProfiles.ts  # 4-5 roommate personas
├── mockViewingSlots.ts      # Available time slots generator
└── mockNeighborhoods.ts     # Brooklyn neighborhoods list
```

### Data Generation Approach
- **Option A**: Manual creation (higher quality, more time)
- **Option B**: Scripted generation (faster, less realistic)
- **Chosen**: Hybrid - manual for roommate personas, scripted for variations

### Mock Apartment Breakdown
1. 3 whole apartments (solo seekers)
2. 4 whole apartments (groups 2-3 people)
3. 3 room-available apartments (roommate matching)

### Mock Roommate Personas
- Alex (28, Software Engineer, clean, quiet, WFH)
- Jordan (26, Graphic Designer, social, night owl, pets)
- Sam (30, Teacher, organized, 9-5, non-smoker)
- Casey (27, Nurse, night shift, quiet, no pets)
- Taylor (25, Freelancer, flexible, moderate, neutral)

---

## Development Workflow

### Setup Steps (Planned)
1. Clone boilerplate repository
2. `pnpm install` (or `npm install`)
3. Install additional dependencies:
   - `pnpm add zustand framer-motion date-fns lucide-react`
   - `pnpm add -D @types/node`
4. Initialize shadcn/ui: `npx shadcn-ui@latest init`
5. Add shadcn components: `npx shadcn-ui@latest add button card form ...`
6. Configure TailwindCSS theme
7. Set up project structure (folders, aliases)
8. Copy hover.dev swipe cards code
9. Create mock data files
10. Start dev server: `pnpm dev`

### Development Commands
- `pnpm dev` - Start dev server (port 5173)
- `pnpm build` - Production build
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint
- `pnpm format` - Run Prettier
- `pnpm type-check` - TypeScript checking (no emit)

### Git Workflow
- Branch strategy: `main` (stable), `develop` (active work)
- Commit convention: Conventional Commits
  - `feat:`, `fix:`, `refactor:`, `docs:`, `style:`, `test:`
- Pre-commit: Lint + format (via Husky)

---

## Environment Variables (MVP)

Minimal for MVP (no backend):

```bash
# .env.local
VITE_APP_NAME=RentHunt
VITE_APP_VERSION=0.1.0-mvp
VITE_MOCK_DATA_ENABLED=true
```

Future (post-MVP):
```bash
VITE_API_BASE_URL=https://api.renthunt.com
VITE_API_KEY=xxx
VITE_MAPS_API_KEY=xxx
```

---

## Known Constraints & Limitations

### Technical Constraints
- **No backend**: All data is local, no persistence across devices
- **No authentication**: Single mock user session
- **No real-time**: No WebSocket, no live updates
- **No analytics**: No tracking (deferred to post-MVP)
- **LocalStorage only**: No IndexedDB, no cookies

### Platform Constraints
- **Mobile-only**: Desktop users see mobile viewport
- **Modern browsers only**: No IE11, no legacy support
- **Touch-required**: Swipe gesture needs touch or mouse drag

### Development Constraints
- **Solo developer**: No CI/CD, no staging environment
- **Local development only**: No deployment planned for MVP
- **Mock data limits**: Only 10 apartments, not realistic scale

---

## Future Technical Enhancements

### Post-MVP (V1)
- Backend API integration (REST or GraphQL)
- Authentication (NextAuth, Auth0, or custom)
- Real database (PostgreSQL, MongoDB)
- File uploads (Cloudinary for images)
- Email service (SendGrid, Postmark)
- Analytics (Google Analytics, Mixpanel)
- Error tracking (Sentry)
- CDN for static assets

### V2+
- Native mobile apps (React Native)
- Desktop responsive design
- Progressive Web App (PWA)
- Offline support (Service Workers)
- Push notifications
- Real-time features (Socket.io)
- Microservices architecture
- Kubernetes deployment

---

## References

- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **TailwindCSS Docs**: https://tailwindcss.com
- **shadcn/ui Docs**: https://ui.shadcn.com
- **Framer Motion Docs**: https://www.framer.com/motion
- **Zustand Docs**: https://docs.pmnd.rs/zustand
- **Boilerplate Repo**: https://github.com/RicardoValdovinos/vite-react-boilerplate
- **hover.dev**: https://www.hover.dev/components/cards

---

**Environment is fully specified and ready for IMPLEMENT phase.**
