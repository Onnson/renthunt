# Constraints - RentHunt MVP

**Last Updated**: 2025-10-06  
**Purpose**: Document known limitations, boundaries, and explicit decisions to constrain scope  
**Status**: EXPLORE phase constraints locked for PLAN phase

---

## Platform Constraints

### Target Platform
✅ **Mobile-Only**
- iOS Safari 15.0+ and Chrome Android (latest 2 versions)
- Screen sizes: 375px - 428px width
- Touch-optimized interactions required
- Single breakpoint (no responsive for desktop)

❌ **Explicitly Excluded**:
- Desktop browsers (no responsive design)
- Tablet-specific optimization
- Landscape orientation optimization
- IE11 or legacy browser support

### Technical Platform
✅ **Frontend-Only MVP**
- React SPA with mock data
- LocalStorage for persistence
- No backend API integration
- No real authentication

❌ **Deferred Post-MVP**:
- Backend API (REST/GraphQL)
- Database (PostgreSQL/MongoDB)
- Real authentication system
- Server-side rendering (SSR)
- API rate limiting
- CDN for assets

---

## Feature Scope Constraints

### Onboarding
✅ **MVP Scope**:
- Mandatory completion (cannot skip)
- 9-step wizard (Welcome through Review)
- Dual preference collection (apartment + roommate)
- LocalStorage persistence of preferences
- Progress indicator
- Back navigation within wizard

❌ **Deferred**:
- Progressive onboarding (partial completion)
- Social auth (Google, Facebook login)
- Profile photos (use default avatar)
- Email verification
- Phone verification
- Background checks

### Roommate Feature
✅ **MVP Scope** (Model B - Property-First):
- Compatibility scoring for existing roommates
- Display roommate profiles in apartment details
- Max group size: 3 people
- Equal budget splits only
- Preference-based compatibility calculation
- Show compatibility scores (0-100%) on cards

❌ **Explicitly Excluded from MVP**:
- Proactive people-matching (swipe on users)
- User-to-user messaging
- Group chat for coordination
- Roommate finder (separate from apartment search)
- Unequal budget splits (e.g., $1400 vs $1000 for different rooms)
- 4+ person groups
- Mid-lease roommate replacement marketplace
- Roommate contracts/agreements
- Background checks for roommates

### Apartment Discovery
✅ **MVP Scope**:
- Swipe-based interface (hover.dev component)
- 10 mock apartments total
- Pre-filtered by user preferences
- Compatibility scoring display
- Shortlist management (add/remove)
- Card details: image, price, location, bed/bath, amenities

❌ **Deferred**:
- Map view
- List view toggle
- Advanced filters (real-time application)
- Search functionality
- Save searches
- Price alerts
- New listing notifications
- Favorites separate from shortlist
- Apartment comparison (side-by-side)
- Share apartment with friends

### Apartment Detail
✅ **MVP Scope**:
- Photo gallery (swipeable)
- Basic info (price, size, location, amenities)
- Roommate profiles section (for room-available)
- Compatibility breakdown display
- Schedule viewing CTA
- Add/remove from shortlist

❌ **Deferred**:
- Virtual tours (360° photos, video walkthroughs)
- 3D floor plans
- Neighborhood information
- Commute calculator
- School districts
- Crime statistics
- Walk score / transit score
- Historical price data
- Availability calendar
- Similar apartments suggestions

### Viewing Scheduler
✅ **MVP Scope**:
- Calendar UI (week view)
- 1-hour time slots
- Same-day priority (top section)
- Business hours: Mon-Thu 10AM-7PM, Fri 10AM-5PM, Sun 11AM-5PM
- Saturday: CLOSED
- Friday PM (after 5PM): CLOSED
- Max 3 viewings per day per user
- Multi-viewing route suggestions

❌ **Deferred**:
- Real-time availability sync
- Rep profiles/bios
- Video viewings (virtual tours with live rep)
- Group viewing coordination (multiple users)
- Viewing reminders (email/SMS)
- Add to device calendar
- Reschedule functionality
- Cancellation with notice period
- Viewing history with notes

### Feedback System
✅ **MVP Scope**:
- Required after viewing (cannot skip)
- Single-form (not multi-step)
- Structured inputs (checkboxes, radio buttons, ratings)
- Dual sections: Personal + Fairness
- No photo uploads
- Submit once per apartment

❌ **Deferred**:
- Photo uploads (document discrepancies)
- Video evidence
- Anonymous vs public feedback toggle
- Edit submitted feedback
- Flag for review
- Dispute resolution system
- Landlord response to feedback

---

## Data Constraints

### Mock Data Limits
✅ **MVP Constraints**:
- **10 apartments total**:
  - 3 whole apartments (solo)
  - 4 whole apartments (groups)
  - 3 room-available apartments
- **4-5 roommate personas** (reused across apartments)
- **Single city**: Brooklyn, NY (neighborhoods: Williamsburg, Bushwick, Park Slope, Greenpoint)
- **Price range**: $900 - $3,600/month
- **Static data** (no real-time updates)

❌ **Post-MVP**:
- Hundreds of apartments
- Multiple cities
- Dynamic data from backend
- Real landlord uploads
- Live availability updates

### Storage Constraints
✅ **LocalStorage Only**:
- ~5-10MB limit (browser-dependent)
- Client-side only (no sync across devices)
- No encryption (acceptable for mock data)
- Clear on browser cache clear

❌ **Not Available**:
- IndexedDB
- Cookies for preferences
- Server-side persistence
- Cloud sync
- Data export functionality

---

## Business Logic Constraints

### Compatibility Scoring
✅ **MVP Algorithm**:
- Linear weighted scoring (transparent)
- Predefined dimension weights
- 0-100 percentage scale
- Calculated client-side (instant)
- No ML/AI

❌ **Future Enhancements**:
- Machine learning models
- Collaborative filtering
- Personalized weight adjustment
- A/B testing different algorithms
- Feedback-driven retraining

### Preference Matching
✅ **MVP Filtering**:
- Hard filters (budget, location, size)
- Must-have amenities (boolean)
- Soft ranking (nice-to-have amenities)
- Static weights

❌ **Advanced Features**:
- Dynamic weight adjustment
- Learn from swipe behavior
- Fuzzy matching
- Semantic search
- Natural language queries

### Group Search
✅ **MVP Constraints**:
- **Max 3 people** per group
- **Equal budget splits only** ($2400 ÷ 3 = $800 each)
- All group members assumed present (no coordination needed)
- Single shared preferences

❌ **Deferred**:
- 4+ person groups
- Unequal splits (master bedroom costs more)
- Different budgets per person
- Preference conflicts resolution
- Group voting on apartments
- Multi-user session sync

---

## Temporal Constraints

### Viewing Scheduler Business Hours

✅ **Available Times**:
- **Monday - Thursday**: 10:00 AM - 7:00 PM (last slot 6:00 PM)
- **Friday**: 10:00 AM - 5:00 PM (last slot 4:00 PM)
- **Sunday**: 11:00 AM - 5:00 PM (last slot 4:00 PM)

❌ **NOT Available**:
- **Saturday**: CLOSED (all day)
- **Friday evening**: After 5:00 PM
- **Weekday mornings**: Before 10:00 AM
- **Weekday late**: After 7:00 PM

### Slot Granularity
✅ **1-hour blocks only**:
- 10:00 AM, 11:00 AM, 12:00 PM, etc.
- Fixed 60-minute duration
- 1-hour buffer between viewings (travel + viewing time)

❌ **Not Supported**:
- 30-minute slots
- 90-minute extended viewings
- Back-to-back viewings (no buffer)
- Custom duration requests

### Scheduling Window
✅ **MVP Constraints**:
- Same-day bookings allowed (if slots available)
- Up to 2 weeks advance booking
- Max 3 viewings per day per user

❌ **Limitations**:
- No same-hour booking (need lead time - enforce 2 hour minimum)
- Cannot schedule past 2 weeks
- Cannot schedule more than 3 per day

---

## UX/Design Constraints

### Navigation
✅ **MVP Pattern**:
- Bottom tab navigation (3 tabs):
  - Discover
  - Shortlist
  - Profile
- Linear onboarding flow (wizard)
- Modal overlays for details

❌ **Not Implemented**:
- Hamburger menu
- Top navigation bar
- Breadcrumbs
- Deep linking
- Browser back button (breaks SPA)

### Interactions
✅ **Touch-Optimized**:
- Swipe gestures (horizontal only)
- Tap to view details
- Scroll (vertical only)
- Form inputs optimized for mobile

❌ **Not Optimized For**:
- Mouse interactions (hover states)
- Keyboard shortcuts
- Right-click context menus
- Drag-and-drop (except swipe)

### Visual Design
✅ **MVP Constraints**:
- Functional fidelity (not high polish)
- shadcn/ui default styling (minimal customization)
- Neutral color palette
- System fonts (no custom web fonts initially)

❌ **Deferred**:
- Custom brand illustrations
- Animations beyond swipe (transitions, micro-interactions)
- Dark mode
- Accessibility beyond WCAG AA basics
- Multiple themes
- Custom icon set

---

## Integration Constraints

### Third-Party Services
✅ **MVP - None Required**:
- No map APIs (static neighborhood names)
- No payment processing
- No email service
- No SMS notifications
- No analytics tracking
- No error monitoring (Sentry, etc.)

❌ **Post-MVP Integrations**:
- Google Maps API (location, routing)
- Stripe (payments)
- SendGrid/Postmark (email)
- Twilio (SMS)
- Mixpanel/Google Analytics
- Sentry (error tracking)
- Cloudinary (image hosting)

### Authentication
✅ **MVP - Mock Only**:
- Single hardcoded user session
- No login/signup screens
- No password management
- No session expiry

❌ **Real Auth (Post-MVP)**:
- OAuth providers (Google, Facebook)
- Email/password auth
- JWT tokens
- Refresh tokens
- Password reset flow
- Multi-factor authentication

---

## Performance Constraints

### Acceptable for MVP
- First Contentful Paint: < 2 seconds (lenient for prototype)
- Swipe gesture: 60fps target (may dip to 30fps acceptable)
- Compatibility calculation: < 100ms
- Page transitions: No specific target
- Bundle size: No hard limit for MVP

### Post-MVP Targets
- FCP: < 1 second
- TTI: < 3 seconds
- Bundle: < 200KB gzipped
- Lighthouse score: 90+ performance

---

## Testing Constraints

### MVP Testing Scope
✅ **Manual Testing Only**:
- Developer testing on real devices
- No automated tests required for MVP
- No CI/CD pipeline

❌ **Deferred**:
- Unit tests
- Integration tests
- E2E tests (Playwright, Cypress)
- Visual regression tests
- Accessibility automated testing
- Performance testing (Lighthouse CI)

---

## Deployment Constraints

### MVP Deployment
✅ **Local Development Only**:
- Run on localhost
- No production deployment
- No staging environment
- Demo via screen sharing or local network

❌ **Not in Scope**:
- Hosting (Vercel, Netlify, AWS)
- Domain registration
- SSL certificates
- Environment management (dev/staging/prod)
- Docker containers
- CI/CD pipelines
- Monitoring/alerting

---

## Compliance & Legal Constraints

### MVP - Not Addressed
❌ **Deferred to Production**:
- GDPR compliance
- Privacy policy
- Terms of service
- Cookie consent
- Data export/deletion (right to be forgotten)
- Fair Housing Act compliance
- ADA accessibility requirements
- Background check regulations

Note: Mock data and local-only MVP means these are not immediate concerns.

---

## Security Constraints

### MVP Security Posture
✅ **Acceptable for Prototype**:
- Client-side only (no attack surface on server)
- Mock data (no PII)
- LocalStorage (unencrypted, acceptable for MVP)
- No authentication (single mock user)

❌ **Production Requirements (Deferred)**:
- HTTPS everywhere
- Input sanitization
- XSS prevention
- CSRF tokens
- API authentication
- Rate limiting
- Data encryption at rest
- Secure session management
- Vulnerability scanning

---

## Maintainability Constraints

### Code Quality - MVP Acceptance Criteria
✅ **Required**:
- TypeScript strict mode (no `any` types)
- ESLint passing (no errors)
- Prettier formatted
- Meaningful variable/function names
- Component file size: < 300 lines

❌ **Nice to Have (Not Required)**:
- 80%+ test coverage
- JSDoc comments
- Storybook documentation
- Comprehensive error handling
- Logging/debugging infrastructure

---

## Change Control

### How to Update Constraints

1. Identify constraint to relax/tighten
2. Document in `reasoning/decision_log.md` with rationale
3. Update this file
4. Update `progress_tracker.md` if scope changes
5. Communicate impact on timeline/complexity

### Constraint Violation Policy

If implementation reveals constraint is blocking progress:
1. Flag in `reasoning/open_questions.md`
2. Discuss trade-offs (scope vs timeline vs quality)
3. User approval required to change locked constraints
4. Document as decision in decision_log.md

---

**These constraints define the MVP boundaries and will guide PLAN phase scoping.**
