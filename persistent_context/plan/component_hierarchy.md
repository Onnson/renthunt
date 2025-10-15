# Component Hierarchy Design - RentHunt MVP

**Design Date**: 2025-10-15  
**Pattern**: Atomic Design (Atoms → Molecules → Organisms → Templates → Pages)  
**Screens Covered**: 16 screens (9 onboarding + 7 main app)  
**Framework**: React 19 + TypeScript + shadcn/ui + TailwindCSS

---

## Design Principles

### Atomic Design Pattern
- **Atoms**: Basic UI elements (buttons, inputs, text)
- **Molecules**: Simple combinations (form fields, badges)
- **Organisms**: Complex UI sections (headers, cards, forms)
- **Templates**: Page layouts with placeholders
- **Pages**: Specific screen implementations

### Naming Conventions
- Components: PascalCase (Button, FormField)
- Files: PascalCase.tsx (Button.tsx, FormField.tsx)
- Directories: lowercase (atoms/, molecules/, organisms/, templates/, pages/)

### Reusability Focus
- Maximize component reuse across screens
- Consistent props interfaces
- Flexible composition patterns

---

## Component Inventory

### Atoms (12 components)
Basic building blocks with minimal props.

1. **Button** - Action triggers
   - Variants: primary, secondary, ghost, destructive
   - Sizes: sm, md, lg
   - States: loading, disabled

2. **Input** - Text/number input fields
   - Types: text, number, email, password
   - States: error, disabled
   - Validation: required, pattern

3. **Text** - Typography components
   - Variants: h1-h6, body, caption, label
   - Weights: regular, medium, bold

4. **Icon** - Lucide icons wrapper
   - Size variants: sm (16px), md (20px), lg (24px)
   - Color variants: primary, secondary, muted

5. **Badge** - Status indicators
   - Variants: success, warning, error, info
   - Sizes: sm, md
   - Content: text or icon

6. **Avatar** - User/profile images
   - Sizes: sm (32px), md (40px), lg (48px)
   - Fallback: initials or icon
   - Border variants

7. **Card** - Basic containers
   - Variants: default, elevated, outlined
   - Padding: sm, md, lg
   - Clickable state

8. **Checkbox** - Boolean selection
   - Sizes: sm, md
   - States: checked, indeterminate, disabled

9. **Radio** - Single selection
   - Sizes: sm, md
   - Group context required

10. **Select** - Dropdown selection
    - Single/multi select
    - Searchable option
    - Custom options

11. **Textarea** - Multi-line text input
    - Auto-resize option
    - Character count
    - Validation

12. **ProgressBar** - Linear progress indicator
    - Value: 0-100
    - Sizes: sm, md
    - Animated option

---

### Molecules (15 components)
Combinations of atoms for common patterns.

13. **FormField** - Label + input + error
    - Required indicator
    - Error messaging
    - Helper text

14. **FormCheckbox** - Label + checkbox
    - Description text
    - Error state

15. **FormRadio** - Label + radio group
    - Options array
    - Validation

16. **FormSelect** - Label + select dropdown
    - Placeholder text
    - Options source

17. **CompatibilityBadge** - Score display
    - Value: 0-100
    - Color coding: red (<40), yellow (40-70), green (>70)
    - Size variants

18. **RoommateProfile** - Avatar + name + score
    - Compact layout
    - Clickable for detail
    - Score optional

19. **ApartmentImage** - Image with overlay
    - Aspect ratio variants
    - Loading states
    - Fallback image

20. **SwipeCard** - Apartment card for swiping
    - Image + basic info
    - Compatibility badges
    - Swipe actions

21. **NavigationTab** - Bottom nav item
    - Icon + label
    - Active state
    - Badge support

22. **DatePicker** - Calendar date selection
    - Single/multi date
    - Time slots
    - Disabled dates

23. **TimeSlot** - Time selection button
    - Available/occupied states
    - Duration display

24. **FeedbackRating** - Star or numeric rating
    - Scale: 1-5 stars
    - Editable/read-only

25. **SettingsItem** - List item with action
    - Icon + title + subtitle
    - Chevron or switch
    - Press handler

26. **OnboardingStep** - Progress indicator
    - Step number
    - Title + description
    - Current/completed states

27. **FilterChip** - Active filter display
    - Removable
    - Multiple selection

---

### Organisms (18 components)
Complex sections combining molecules.

28. **OnboardingHeader** - Step progress + title
    - Step indicator (1/9)
    - Title + subtitle
    - Back button

29. **ApartmentCard** - Full apartment display
    - Image carousel
    - Title, price, location
    - Key features list
    - Compatibility badges

30. **RoommateSection** - Roommate profiles list
    - Title + count
    - Profile grid/list
    - Expandable details

31. **SwipeControls** - Like/pass/dislike buttons
    - Positioned overlay
    - Gesture feedback
    - Action handlers

32. **ShortlistItem** - Saved apartment row
    - Thumbnail image
    - Title + price
    - Remove action
    - Tap to detail

33. **CalendarGrid** - Date/time selection
    - Month navigation
    - Available slots
    - Same-day highlighting

34. **FeedbackForm** - Dual-section form
    - Personal ratings
    - Fairness questions
    - Submit validation

35. **SettingsList** - Profile/settings sections
    - Section headers
    - Item groups
    - Navigation

36. **BottomNavigation** - App navigation bar
    - 4-5 tabs
    - Active state management
    - Badge support

37. **LocationSelector** - City → neighborhood flow
    - Search input
    - Popular cities
    - Neighborhood grid

38. **BudgetSlider** - Range input with display
    - Min/max values
    - Currency formatting
    - Preset options

39. **AmenitiesGrid** - Checkbox grid
    - Categories (kitchen, bathroom, etc.)
    - Required/preferred states

40. **TimelinePicker** - Move-in date + duration
    - Date picker
    - Duration options
    - Lease type

41. **PreferenceSliders** - Roommate compatibility inputs
    - 7 dimensions (cleanliness, social, etc.)
    - Scale labels
    - Weight hints

42. **ReviewSummary** - Onboarding data review
    - Sectioned display
    - Edit actions
    - Complete button

43. **SearchFilters** - Active filter bar
    - Applied filters
    - Clear all action
    - Filter count

44. **ViewingDetails** - Scheduled viewing info
    - Date/time display
    - Address details
    - Contact info

45. **ProfileHeader** - User profile section
    - Avatar + name
    - Edit actions
    - Status badges

---

### Templates (6 components)
Page layouts with component placeholders.

46. **OnboardingTemplate** - Onboarding screen layout
    - Header (step indicator)
    - Content area (scrollable)
    - Navigation (back/next)

47. **SwipeTemplate** - Swipe interface layout
    - Card stack area
    - Action buttons overlay
    - Progress indicators

48. **DetailTemplate** - Detail view layout
    - Hero image
    - Content sections
    - Action buttons

49. **FormTemplate** - Form screen layout
    - Header with title
    - Form content (scrollable)
    - Submit area

50. **ListTemplate** - List view layout
    - Header with filters
    - Scrollable list
    - Empty states

51. **CalendarTemplate** - Calendar view layout
    - Month header
    - Calendar grid
    - Action buttons

---

## Screen-to-Component Mapping

### Onboarding Screens (9/16)

**Screen 1: Welcome**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader
- Molecules: Button
- Atoms: Text, Icon

**Screen 2: Living Situation**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader
- Molecules: FormRadio, Button
- Atoms: Text, Radio

**Screen 3: Location**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, LocationSelector
- Molecules: FormField, Button
- Atoms: Input, Text

**Screen 4: Budget & Size**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, BudgetSlider
- Molecules: FormField, Button
- Atoms: Input, Text

**Screen 5: Space Requirements**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader
- Molecules: FormCheckbox, Button
- Atoms: Checkbox, Text

**Screen 6: Apartment Preferences**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, AmenitiesGrid
- Molecules: FormCheckbox, Button
- Atoms: Checkbox, Text

**Screen 7: Timeline**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, TimelinePicker
- Molecules: FormSelect, DatePicker, Button
- Atoms: Select, Text

**Screen 8: Roommate Preferences** (conditional)
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, PreferenceSliders
- Molecules: FormField, Button
- Atoms: Input (range), Text

**Screen 9: Review & Complete**
- Template: OnboardingTemplate
- Organisms: OnboardingHeader, ReviewSummary
- Molecules: Button
- Atoms: Text, Icon

### Main App Screens (7/16)

**Screen 10: Swipe Interface**
- Template: SwipeTemplate
- Organisms: SwipeControls, SearchFilters
- Molecules: SwipeCard, CompatibilityBadge
- Atoms: Button, Badge

**Screen 11: Shortlist View**
- Template: ListTemplate
- Organisms: SearchFilters
- Molecules: ShortlistItem, Button
- Atoms: Text, Icon

**Screen 12: Apartment Detail**
- Template: DetailTemplate
- Organisms: ApartmentCard, RoommateSection
- Molecules: CompatibilityBadge, RoommateProfile, Button
- Atoms: Text, Icon

**Screen 13: Viewing Scheduler**
- Template: CalendarTemplate
- Organisms: CalendarGrid, ViewingDetails
- Molecules: DatePicker, TimeSlot, Button
- Atoms: Text, Icon

**Screen 14: Post-Viewing Feedback**
- Template: FormTemplate
- Organisms: FeedbackForm
- Molecules: FeedbackRating, FormField, Button
- Atoms: Text, Textarea

**Screen 15: Profile/Settings**
- Template: ListTemplate
- Organisms: ProfileHeader, SettingsList
- Molecules: SettingsItem, Button
- Atoms: Avatar, Text

**Screen 16: Navigation Shell**
- Template: MainAppTemplate
- Organisms: BottomNavigation
- Molecules: NavigationTab
- Atoms: Icon, Text

---

## Implementation Notes

### Component Dependencies
- All atoms used by molecules
- Molecules compose organisms
- Organisms fill templates
- Templates instantiated as pages

### File Structure Plan
```
src/
├── components/
│   ├── atoms/
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── ...
│   ├── molecules/
│   │   ├── FormField.tsx
│   │   ├── CompatibilityBadge.tsx
│   │   └── ...
│   ├── organisms/
│   │   ├── OnboardingHeader.tsx
│   │   ├── ApartmentCard.tsx
│   │   └── ...
│   ├── templates/
│   │   ├── OnboardingTemplate.tsx
│   │   ├── SwipeTemplate.tsx
│   │   └── ...
│   └── pages/
│       ├── Welcome.tsx
│       ├── Swipe.tsx
│       └── ...
```

### Reusability Metrics
- **Atoms**: 100% reusable across screens
- **Molecules**: 80% reusable (some screen-specific)
- **Organisms**: 60% reusable (context-dependent)
- **Templates**: 40% reusable (layout patterns)
- **Pages**: 0% reusable (screen-specific)

### Testing Strategy
- Unit tests for atoms/molecules
- Integration tests for organisms
- E2E tests for critical user flows
- Visual regression for templates/pages

---

**Component hierarchy designed for maximum reusability and maintainability across 16 screens.**
