# Open Questions - RentHunt MVP

**Purpose**: Track unresolved questions and document resolutions  
**Last Updated**: 2025-10-06 13:12 UTC+3  
**Status Summary**: 7 resolved (EXPLORE phase), 3 pending (for PLAN phase)

---

## Question Format

Each question includes:
- **Question ID**: Unique identifier
- **Question**: The actual question
- **Priority**: Critical / High / Medium / Low
- **Context**: Why this matters
- **Status**: Open / Resolved
- **Asked**: When question arose
- **Resolved**: When answer was determined (if resolved)
- **Answer**: The resolution (if resolved)
- **Documented In**: Where answer is captured

---

## RESOLVED QUESTIONS

### Q001: Which Roommate Matching Model?

**Question**: Should roommate matching be proactive (Model A: match people first), property-first (Model B: match to apartments), or simplified (Model C: existing groups only)?

**Priority**: Critical  
**Context**: Core architectural decision affecting entire roommate feature design. User wants "native roommate support" and "OKCupid + Airbnb hybrid."

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 10:30  
**Resolved**: 2025-10-06 11:30  

**Answer**: Model B - Property-First with Compatibility Scoring
- Users browse apartments (Airbnb-style)
- Compatibility scores shown for existing roommates (OKCupid-style algorithm)
- No proactive people-matching
- Stranger matching enabled via room-available apartments

**Rationale**: 
- Aligns with "OKCupid algorithm + Airbnb browsing" vision
- Budget already filtered before roommate evaluation (user confirmed)
- Simpler than Model A (+5-8 days vs +15-20 days)
- Maintains differentiation vs Model C

**Documented In**: 
- decision_log.md (D005)
- exploration-findings.md
- domain_model.md

---

### Q002: Virtual Tour Format for MVP?

**Question**: Should MVP include virtual tours (360° photos, video, or slideshow), and if so, which format?

**Priority**: Medium  
**Context**: Modern apartment listings often have virtual tours. Question is whether this is critical for MVP validation.

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 10:15  
**Resolved**: 2025-10-06 11:00  

**Answer**: Defer virtual tours to post-MVP entirely

**Rationale**:
- Not critical for validating roommate compatibility UX (core hypothesis)
- Saves 5 days implementation time
- Photo gallery sufficient for MVP apartment details
- Can add in V2 based on user feedback

**Documented In**:
- decision_log.md (D010)
- constraints.md (explicitly deferred features)
- exploration-findings.md

---

### Q003: Navigation Model for Mobile App?

**Question**: What navigation pattern? Bottom tab bar, hamburger menu, or top navigation?

**Priority**: High  
**Context**: Mobile-only MVP needs clear navigation pattern optimized for touch.

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 10:30  
**Resolved**: 2025-10-06 10:40  

**Answer**: Bottom tab navigation with 3 tabs
- Tab 1: Discover (swipe interface)
- Tab 2: Shortlist (saved apartments)
- Tab 3: Profile (settings, preferences)

**Rationale**:
- Standard mobile pattern (iOS/Android convention)
- Always accessible (thumb-friendly)
- Clear information architecture
- Supports primary flows

**Documented In**:
- system_architecture.md
- exploration-findings.md

---

### Q004: Maximum Group Size for Roommate Searches?

**Question**: Support groups up to what size? 2 people, 3, 4+, unlimited?

**Priority**: Medium  
**Context**: Larger groups = more complexity (compatibility permutations, group coordination).

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 11:45  
**Resolved**: 2025-10-06 12:00  

**Answer**: Maximum 3 people per group for MVP

**Rationale**:
- Covers majority use cases (2BR and 3BR apartments most common)
- Manageable complexity (up to 2 existing roommates to display)
- Realistic constraint (3+ person groups rare for long-term rentals)
- Can expand to 4+ post-MVP if needed

**Documented In**:
- decision_log.md (D007)
- constraints.md
- domain_model.md (User entity, groupSize: 1-3)

---

### Q005: Budget Split Handling - Equal or Unequal?

**Question**: Support only equal rent splits ($2400 ÷ 3 = $800 each), or allow unequal splits (master bedroom costs more)?

**Priority**: Medium  
**Context**: Real-world accuracy vs implementation complexity trade-off.

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 11:50  
**Resolved**: 2025-10-06 12:05  

**Answer**: Equal splits only for MVP

**Rationale**:
- Simple calculation (no room selection/negotiation needed)
- Saves 2-3 implementation days
- Good enough for MVP validation
- Groups can negotiate offline if needed
- Unequal splits deferred to post-MVP

**Documented In**:
- decision_log.md (D008)
- constraints.md
- exploration-findings.md

---

### Q006: Location Input Method - How Do Users Specify Where They Want to Live?

**Question**: Map-based selection, predefined neighborhood chips, city dropdown, or combination?

**Priority**: Medium  
**Context**: Need balance between precision and UX simplicity for mobile.

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 11:55  
**Resolved**: 2025-10-06 12:00  

**Answer**: Two-step: City selection → Neighborhood refinement
- Step 1: Select city (for MVP: Brooklyn only)
- Step 2: Multi-select neighborhoods (chips: Williamsburg, Bushwick, Park Slope, Greenpoint)

**Rationale**:
- Simple mobile UX (no map interaction complexity)
- Clear options (predefined neighborhoods)
- Multi-select allows flexibility
- Defer map-based selection to post-MVP

**Documented In**:
- exploration-findings.md (onboarding flow Step 3)
- constraints.md (single city for MVP)

---

### Q007: Onboarding Flow Control - Can Users Skip?

**Question**: Is onboarding mandatory, or can users skip and browse with default preferences?

**Priority**: High  
**Context**: Mandatory ensures preference data quality, but creates friction/drop-off risk.

**Status**: ✅ Resolved  
**Asked**: 2025-10-06 11:58  
**Resolved**: 2025-10-06 12:10  

**Answer**: Mandatory onboarding (cannot skip)

**Rationale**:
- Preference collection is critical for compatibility matching quality
- Better to get complete data upfront than partial/interrupted
- Creates commitment (users who complete are serious)
- Mobile wizard pattern is proven
- Mitigate drop-off with progress indicator, clear value prop, ability to go back

**Documented In**:
- constraints.md (onboarding section)
- system_architecture.md
- exploration-findings.md

---

## PENDING QUESTIONS (For PLAN Phase)

### Q008: Exact Compatibility Scoring Algorithm Weights

**Question**: What should the exact dimension weights be for roommate compatibility scoring?

**Priority**: High  
**Context**: Need to finalize algorithm for implementation. Current draft:
- Cleanliness: 20%
- Social level: 15%
- Noise level: 15%
- Work schedule: 10%
- Smoking: 15% (hard constraint)
- Pets: 15%
- Drinking: 10%

**Status**: ⏳ Open  
**Asked**: 2025-10-06 12:00  
**Target Resolution**: PLAN phase (when designing algorithm implementation)

**Options to Explore**:
1. Use draft weights above (balanced approach)
2. User research to determine importance ranking
3. Make weights configurable (users adjust in settings - post-MVP feature)
4. Equal weights (all 14.3%) for simplicity

**Blocker**: No - can proceed with draft weights and iterate based on feedback

**Next Steps**:
- Finalize in PLAN phase algorithm design
- Consider A/B testing different weight configurations post-MVP
- Document final weights in implementation

---

### Q009: Mock Data Generation Strategy

**Question**: Manual creation or scripted generation for 10 apartments and 4-5 roommate personas?

**Priority**: Medium  
**Context**: Need realistic mock data for testing and demo. Quality vs speed trade-off.

**Status**: ⏳ Open  
**Asked**: 2025-10-06 12:30  
**Target Resolution**: PLAN phase (when planning mock data structure)

**Options**:
1. **Manual Creation**: Handcraft each apartment and persona (higher quality, 4-6 hours)
2. **Scripted Generation**: Write TypeScript script to generate (faster, 2-3 hours + script time)
3. **Hybrid** (likely best): Manual personas (5 detailed profiles), scripted apartment variations

**Considerations**:
- Roommate personas need depth (bio, preferences, realistic attributes) → manual better
- Apartments can have variations (different images, prices, amenities) → script-friendly
- Need diverse scenarios (solo, group, room-available mix)

**Blocker**: No - can start with manual and optimize later

**Next Steps**:
- Create roommate persona templates in PLAN phase
- Design apartment JSON schema
- Decide generation approach per data type

---

### Q010: Roommate Profile Photo Strategy

**Question**: Stock photos, illustrations, or text-only for roommate profiles in MVP?

**Priority**: Low  
**Context**: Visual representation affects perceived authenticity, but introduces sourcing complexity.

**Status**: ⏳ Open  
**Asked**: 2025-10-06 12:35  
**Target Resolution**: PLAN phase or early IMPLEMENT

**Options**:
1. **Stock Photos** (e.g., Unsplash, Pexels): Realistic, free, diverse
2. **AI-Generated** (e.g., thispersondoesnotexist.com): Unique, no licensing
3. **Illustrations/Avatars**: Simpler, clearly not real people
4. **Text-Only**: No photos (name, age, occupation only)

**Considerations**:
- Privacy: Mock data so not an issue
- Authenticity: Photos make personas feel real
- Effort: Sourcing/curating 4-5 photos is low effort
- Future: Real users will upload photos, so good to test with photos

**Recommendation (Preliminary)**: Stock photos (Unsplash - free, high quality, diverse)

**Blocker**: No - can start text-only and add photos later if needed

**Next Steps**:
- Decide during mock data creation
- If stock photos: curate 4-5 professional/friendly headshots
- If illustrations: find avatar library (e.g., DiceBear Avatars)

---

## RESOLVED BUT WORTH TRACKING

### Q011: shadcn/ui Component Customization Level

**Question**: Use shadcn components as-is, or customize heavily for RentHunt branding?

**Priority**: Low  
**Context**: Functional MVP vs high polish decision.

**Status**: ✅ Resolved (mostly as-is)  
**Asked**: 2025-10-06 10:50  
**Resolved**: 2025-10-06 10:55  

**Answer**: Use mostly as-is for MVP, minimal customization
- Keep default shadcn styling
- Add RentHunt-specific components where needed (ApartmentCard, RoommateProfileCard)
- Basic color palette (neutral + one accent color)
- Defer heavy customization to post-MVP

**Why Worth Tracking**: May revisit during IMPLEMENT if defaults don't feel right

**Documented In**: decision_log.md (D011), constraints.md

---

## Question Lifecycle

**Question States**:
1. **Open**: Needs answer, blocking or informing work
2. **Under Investigation**: Actively researching/analyzing
3. **Resolved**: Answer determined and documented
4. **Deferred**: Explicitly punted to future phase
5. **Invalidated**: No longer relevant due to other decisions

**Resolution Triggers**:
- User approval gate response
- Sequential thinking conclusion
- Architectural analysis completion
- Constraint acceptance
- Scope decision

**Documentation Requirements**:
- Every resolved question documented in at least one persistent_context file
- Cross-reference to source (decision_log.md, constraints.md, etc.)
- Rationale captured for future context

---

## Questions Pipeline

### Expected Questions for PLAN Phase

1. Component prop interface specifics (what props does ApartmentCard take?)
2. Zustand action naming conventions
3. Route structure (/discover, /shortlist, /apartment/:id, etc.)
4. Form validation strategy (Zod? React Hook Form?)
5. Error handling patterns
6. Loading state implementations
7. Exact file naming conventions

### Expected Questions for IMPLEMENT Phase

1. Framer Motion animation timing values
2. TailwindCSS custom color definitions
3. Image optimization strategy
4. LocalStorage key namespacing
5. DevTools setup for debugging
6. Testing approach (manual only vs some automation)

---

**All EXPLORE phase questions resolved. PLAN phase questions identified and tracked.**
