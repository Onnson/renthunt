# Product Intent - RentHunt

**Last Updated**: 2025-10-06  
**Status**: EXPLORE phase complete, entering PLAN phase

---

## Core Problem Statement

Long-term apartment rental is a friction-filled process plagued by:
- **Information asymmetry**: Listings misrepresent properties, leading to wasted viewings
- **Matching inefficiency**: Manual browsing doesn't account for deep preferences
- **Roommate uncertainty**: Finding compatible strangers to share costs is hard and risky
- **Process fragmentation**: Landlords, agents, tenants all manage separately
- **Lack of accountability**: Bad listings and bad landlords face no consequences

For renters seeking roommates, the problem compounds: finding both a compatible living space AND compatible people requires using multiple platforms (Craigslist, Facebook groups, traditional rental sites) with no quality control.

---

## Vision Statement

**RentHunt transforms long-term apartment search into an intelligent, transparent, and delightful experience that matches people with their ideal homes AND ideal roommates through preference-based algorithms and end-to-end service.**

We envision a world where:
- Renters find apartments that truly match their needs in hours, not weeks
- Roommate compatibility is scored algorithmically, reducing bad living situations
- All parties (landlords, renters, roommates) are held accountable through transparent feedback
- The rental process from discovery to signing to ongoing tenancy is seamlessly managed

---

## What Makes RentHunt Unique

### Hybrid Model: "OKCupid + Airbnb for Rentals"

**OKCupid Element** (Matching Algorithm):
- Users complete detailed preference questionnaires
- Platform calculates compatibility scores (apartment-to-user, roommate-to-user)
- Apartments ranked by match quality, not just price/location
- Preference learning: feedback improves future recommendations

**Airbnb Element** (Property Browsing):
- Swipe-based discovery interface (intuitive, mobile-first)
- Rich visual presentation (photos, virtual tours post-MVP)
- Transparent pricing and amenity information
- Company-managed viewings (like Airbnb experiences)

### Native Roommate Support

Unlike competitors who treat roommate finding as afterthought:
- **Built-in from foundation**: Roommate preferences captured during onboarding
- **Compatibility scoring**: See how well you'd match with current roommates before viewing
- **Preference-based**: Match based on lifestyle (cleanliness, social level, schedule), not just budget
- **Integrated workflow**: Single app for finding apartments AND compatible roommates

### Dual Ranking System

**Personal Ranking** (User-Scoped):
- "What did you like?" feedback trains recommendation algorithm
- Future apartments ranked by predicted fit for YOUR preferences
- Creates personalized apartment feed

**Fairness Ranking** (Global):
- "Was listing accurate?" feedback affects apartment's score for ALL users
- Protects community from misleading listings
- Landlords incentivized to maintain quality and honesty

### Full-Service Model

RentHunt doesn't just list apartments—company handles:
- ✅ Listing management (landlords hand off to us)
- ✅ Viewing coordination (company reps show properties)
- ✅ Contract signing (platform-mediated)
- ✅ Ongoing landlord-tenant intermediation (post-signing support)

This removes friction and creates accountability layer missing from traditional rentals.

---

## Target Users

### Primary Personas

**Solo Seeker**:
- Age: 25-40
- Occupation: Professional, remote worker
- Pain point: Tired of misleading listings, wants accurate match
- Value: Preference-based filtering, fairness rankings

**Roommate Seeker** (Stranger Matching):
- Age: 22-35
- Occupation: Early career, student, freelancer
- Pain point: Can't afford solo apartment, needs compatible roommate
- Value: Compatibility scoring, safe platform vs Craigslist
- **KEY DIFFERENTIATOR USER**

**Group Searcher** (Has Roommates):
- Age: 23-35
- Group: 2-3 friends or partners
- Pain point: Hard to coordinate group search, split budget calculations
- Value: Group-friendly filters, per-person pricing display

### Secondary (Post-MVP)
- Families seeking multi-bedroom apartments
- Pet owners needing pet-friendly verification
- International relocators needing full-service support

---

## Success Criteria - MVP

### Product Validation Metrics

**User Engagement**:
- 80%+ complete onboarding (both apartment + roommate preferences)
- Average 20+ apartments swiped per session
- 50%+ return for second session within 48 hours

**Feature Validation**:
- 60%+ of roommate-seekers find compatibility scores helpful (survey)
- 70%+ schedule at least one viewing from shortlist
- 80%+ submit feedback after viewing (required, but high completion validates UX)

**Value Proposition**:
- Users report "more relevant" apartments than traditional rental sites (qualitative)
- Roommate-seekers prefer compatibility scores vs manual evaluation (qualitative)
- Same-day viewing feature used by 60%+ of viewers (validates priority)

### Technical Success

- Swipe interface performs smoothly on mobile (60fps)
- Compatibility scoring algorithm produces reasonable scores (validated via user feedback)
- No critical bugs blocking core flow (onboarding → swipe → shortlist → schedule → feedback)

### Learning Objectives

**Validate Assumptions**:
1. Do users value compatibility scoring for roommates? ← Core differentiator
2. Is swipe interface appropriate for apartment search? ← UX bet
3. Does dual ranking system (personal + fairness) resonate? ← Business model validation
4. Is same-day viewing scheduling a killer feature? ← Operational bet

**Discovery Questions**:
1. What preference dimensions matter most? (cleanliness vs social level vs schedule)
2. What compatibility threshold feels "good enough" to proceed to viewing?
3. Do users want whole apartments OR room-available OR mixed feed?
4. How many apartments do users shortlist before scheduling viewings?

---

## Business Model (Deferred, Noted for Context)

**Revenue Streams** (Not implemented in MVP):
- Landlord fees (monthly listing fee or per-close commission)
- Premium user features (priority listings, advanced filters)
- Roommate matching fee (for stranger-matching service)

**Unit Economics**:
- Company reps compensated per close
- Platform fee structure TBD based on market analysis

**Scalability**:
- Geographic expansion (start with single city for MVP)
- Vertical expansion (short-term rentals, commercial spaces)

MVP focuses on validation, not monetization.

---

## Out of Scope (Explicitly Deferred)

### Post-MVP Features
- Virtual tours (360° photos, videos)
- User-to-user messaging
- Proactive people-matching (swipe on users, not just apartments)
- Desktop responsive design
- Backend API integration
- Real payment processing
- Legal contract generation
- Background checks for roommates
- Mid-lease roommate replacement marketplace

### MVP Constraints (Accepted)
- Mobile-only (no desktop)
- Frontend-only (mock data, no real backend)
- 10 mock apartments (limited inventory for testing)
- Equal budget splits only (no complex room price negotiations)
- Max 3-person groups (no larger groups)
- No Saturday viewings, no Friday PM slots
- Single city/market (Brooklyn neighborhoods for mock data)

---

## Strategic North Star

**For MVP**: Validate that preference-based apartment matching + roommate compatibility scoring solves a real problem better than existing solutions.

**For V1 (Post-MVP)**: Prove that full-service model (company-managed viewings, signing, mediation) creates defensible moat vs traditional rental platforms.

**For V2+**: Build network effects through community trust (fairness rankings) and preference learning (better recommendations over time).

---

## Alignment with Shadow Crew Principles

This product embodies:
- **Radical Transparency**: Fairness rankings expose misleading listings
- **User Authority**: Dual ranking system ensures user feedback shapes platform
- **Unified Intelligence**: Preference algorithms + human curation (company reps)
- **Respectful Disagreement**: Platform suggests but user decides (swipe-based agency)

Product intent remains anchored to real user problems, avoiding hype-driven features.
