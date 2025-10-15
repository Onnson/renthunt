# File Structure Specification - RentHunt MVP

**Design Date**: 2025-10-15  
**Framework**: Vite 5.x + React 19 + TypeScript 5.x  
**Build Tool**: Vite  
**Project Root**: `/home/onnsys/renthunt`  

---

## Directory Structure Overview

```
renthunt/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── atoms/          # Basic elements (Button, Input, etc.)
│   │   ├── molecules/      # Simple combinations (FormField, Badge)
│   │   ├── organisms/      # Complex sections (ApartmentCard, Forms)
│   │   ├── templates/      # Page layouts (OnboardingTemplate)
│   │   └── pages/          # Screen-specific components
│   ├── stores/             # Zustand state management
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Utility functions
│   ├── hooks/              # Custom React hooks
│   ├── constants/          # Configuration constants
│   ├── lib/                # External library configurations
│   ├── data/               # Mock data and generators
│   ├── assets/             # Static assets (images, icons)
│   ├── styles/             # Global styles and CSS variables
│   ├── App.tsx             # Root component
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # Vite type definitions
├── public/                 # Public static assets
├── node_modules/           # Dependencies (generated)
├── package.json            # Project dependencies and scripts
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.js      # TailwindCSS configuration
├── components.json         # shadcn/ui configuration
└── index.html              # HTML template
```

---

## Naming Conventions

### Files and Directories
- **Components**: PascalCase (`Button.tsx`, `FormField.tsx`)
- **Directories**: lowercase (`atoms/`, `molecules/`)
- **Utilities**: camelCase (`dateUtils.ts`, `validationHelpers.ts`)
- **Types**: PascalCase with suffix (`UserPreferences.ts`, `Apartment.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`, `VALIDATION_RULES.ts`)
- **Assets**: kebab-case (`apartment-placeholder.jpg`, `logo.svg`)

### Component Files
- **Main Component**: `ComponentName.tsx`
- **Index Barrel**: `index.ts` (for clean imports)
- **Types**: `ComponentName.types.ts`
- **Styles**: `ComponentName.styles.ts` (if needed)
- **Tests**: `ComponentName.test.tsx`

### Import Patterns
- **Relative imports**: `./ComponentName` (same directory)
- **Barrel imports**: `../atoms` (from index.ts)
- **Absolute imports**: `@/components/atoms/Button` (with path mapping)

---

## Detailed Directory Breakdown

### `/src/components/`
Component organization following atomic design pattern.

#### `atoms/` (12 files)
```
atoms/
├── index.ts                    # Barrel export
├── Button.tsx                  # Action buttons
├── Button.types.ts
├── Input.tsx                   # Text inputs
├── Input.types.ts
├── Text.tsx                    # Typography
├── Icon.tsx                    # Lucide icons
├── Badge.tsx                   # Status badges
├── Avatar.tsx                  # Profile images
├── Card.tsx                    # Basic containers
├── Checkbox.tsx                # Boolean inputs
├── Radio.tsx                   # Single selection
├── Select.tsx                  # Dropdown selection
├── Textarea.tsx                # Multi-line input
├── ProgressBar.tsx             # Progress indicators
└── index.ts
```

#### `molecules/` (15 files)
```
molecules/
├── index.ts
├── FormField.tsx               # Label + input + error
├── FormCheckbox.tsx
├── FormRadio.tsx
├── FormSelect.tsx
├── CompatibilityBadge.tsx      # Score display
├── RoommateProfile.tsx         # Avatar + name + score
├── ApartmentImage.tsx          # Image with overlay
├── SwipeCard.tsx               # Apartment card for swiping
├── NavigationTab.tsx           # Bottom nav items
├── DatePicker.tsx              # Calendar picker
├── TimeSlot.tsx                # Time selection
├── FeedbackRating.tsx          # Rating component
├── SettingsItem.tsx            # Settings list item
├── OnboardingStep.tsx          # Step indicator
├── FilterChip.tsx              # Active filter
└── index.ts
```

#### `organisms/` (18 files)
```
organisms/
├── index.ts
├── OnboardingHeader.tsx        # Step progress header
├── ApartmentCard.tsx           # Full apartment display
├── RoommateSection.tsx         # Roommate profiles list
├── SwipeControls.tsx           # Like/pass buttons
├── ShortlistItem.tsx           # Saved apartment row
├── CalendarGrid.tsx            # Date/time grid
├── FeedbackForm.tsx            # Dual feedback form
├── SettingsList.tsx            # Settings sections
├── BottomNavigation.tsx        # App navigation
├── LocationSelector.tsx        # City/neighborhood picker
├── BudgetSlider.tsx            # Budget range input
├── AmenitiesGrid.tsx           # Amenities checkboxes
├── TimelinePicker.tsx          # Move-in date picker
├── PreferenceSliders.tsx       # Roommate preferences
├── ReviewSummary.tsx           # Onboarding review
├── SearchFilters.tsx           # Active filters bar
├── ViewingDetails.tsx          # Viewing info display
├── ProfileHeader.tsx           # Profile section
└── index.ts
```

#### `templates/` (6 files)
```
templates/
├── index.ts
├── OnboardingTemplate.tsx      # Onboarding layout
├── SwipeTemplate.tsx           # Swipe interface
├── DetailTemplate.tsx          # Detail view
├── FormTemplate.tsx            # Form layout
├── ListTemplate.tsx            # List view
├── CalendarTemplate.tsx        # Calendar view
└── index.ts
```

#### `pages/` (16 files)
```
pages/
├── index.ts
├── Welcome.tsx                 # Screen 1
├── LivingSituation.tsx         # Screen 2
├── Location.tsx                # Screen 3
├── BudgetSize.tsx              # Screen 4
├── SpaceRequirements.tsx       # Screen 5
├── ApartmentPreferences.tsx    # Screen 6
├── Timeline.tsx                # Screen 7
├── RoommatePreferences.tsx     # Screen 8
├── ReviewComplete.tsx          # Screen 9
├── Swipe.tsx                   # Screen 10
├── Shortlist.tsx               # Screen 11
├── ApartmentDetail.tsx         # Screen 12
├── ViewingScheduler.tsx        # Screen 13
├── Feedback.tsx                # Screen 14
├── Profile.tsx                 # Screen 15
├── NavigationShell.tsx         # Screen 16 (wrapper)
└── index.ts
```

### `/src/stores/` (5 stores)
Zustand stores with persistence.

```
stores/
├── index.ts                    # Store exports
├── userPreferencesStore.ts     # Onboarding + preferences
├── apartmentsStore.ts          # Inventory + filtering + swipe
├── shortlistStore.ts           # Saved apartments
├── viewingsStore.ts            # Scheduled viewings
├── feedbackStore.ts            # Submitted feedback
└── index.ts
```

### `/src/types/` (Core domain types)
TypeScript interfaces and types.

```
types/
├── index.ts
├── apartment.ts                # Apartment, RoommateProfile
├── user.ts                     # User, UserPreferences
├── viewing.ts                  # Viewing, Feedback
├── common.ts                   # Shared types (ID, Status, etc.)
└── index.ts
```

### `/src/utils/` (Utility functions)
Helper functions and business logic.

```
utils/
├── index.ts
├── dateUtils.ts                # Date formatting, validation
├── validationUtils.ts          # Form validation helpers
├── compatibilityUtils.ts       # Scoring algorithms
├── storageUtils.ts             # LocalStorage helpers
├── formatUtils.ts              # Number/currency formatting
└── index.ts
```

### `/src/hooks/` (Custom hooks)
Reusable React logic.

```
hooks/
├── index.ts
├── useOnboarding.ts            # Onboarding flow logic
├── useSwipe.ts                 # Swipe gesture handling
├── useCompatibility.ts         # Compatibility calculations
├── useLocalStorage.ts          # Storage persistence
└── index.ts
```

### `/src/constants/` (Configuration)
Static configuration values.

```
constants/
├── index.ts
├── config.ts                   # App configuration
├── validation.ts               # Validation rules
├── compatibility.ts            # Scoring weights
├── ui.ts                       # UI constants (colors, sizes)
└── index.ts
```

### `/src/lib/` (Library setup)
External library configurations.

```
lib/
├── index.ts
├── supabase.ts                 # Supabase client (future)
├── analytics.ts                # Analytics setup (future)
└── index.ts
```

### `/src/data/` (Mock data)
Test data and generators.

```
data/
├── index.ts
├── apartments.ts               # Mock apartment data
├── roommates.ts                # Mock roommate profiles
├── users.ts                    # Mock user data
├── generators.ts               # Data generation utilities
└── index.ts
```

### `/src/assets/` (Static assets)
Images, icons, and media.

```
assets/
├── images/
│   ├── apartments/             # Apartment photos
│   ├── roommates/              # Profile photos
│   └── icons/                  # Custom icons
├── fonts/                      # Custom fonts (future)
└── index.ts                    # Asset exports
```

### `/src/styles/` (Global styles)
CSS and styling utilities.

```
styles/
├── index.css                   # Global styles import
├── globals.css                 # TailwindCSS + custom CSS
├── variables.css               # CSS custom properties
└── index.ts
```

---

## Import Path Mapping

### `vite.config.ts`
```typescript
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/components': path.resolve(__dirname, './src/components'),
      '@/stores': path.resolve(__dirname, './src/stores'),
      '@/types': path.resolve(__dirname, './src/types'),
      '@/utils': path.resolve(__dirname, './src/utils'),
    },
  },
});
```

### `tsconfig.json` Path Mapping
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/stores/*": ["src/stores/*"],
      "@/types/*": ["src/types/*"],
      "@/utils/*": ["src/utils/*"]
    }
  }
}
```

---

## File Organization Principles

### Barrel Exports
Every directory has an `index.ts` that re-exports its contents:
```typescript
// components/atoms/index.ts
export { Button } from './Button';
export { Input } from './Input';
// ... etc
```

### Component Structure
Components follow consistent internal structure:
```typescript
// ComponentName.tsx
import { ComponentNameProps } from './ComponentName.types';

export const ComponentName = ({ prop }: ComponentNameProps) => {
  // Implementation
};

// ComponentName.types.ts
export interface ComponentNameProps {
  prop: string;
}
```

### Store Structure
Zustand stores follow consistent patterns:
```typescript
// userPreferencesStore.ts
interface UserPreferencesState {
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences) => void;
}

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set) => ({
      // Implementation
    }),
    { name: 'userPreferences' }
  )
);
```

---

## Build and Development

### Development Scripts
```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "test": "vitest",
    "type-check": "tsc --noEmit"
  }
}
```

### Type Checking
- Strict TypeScript configuration
- Path mapping for clean imports
- Type-only imports where possible

### Testing Structure
```
src/
├── __tests__/                  # Unit tests
│   ├── components/
│   ├── stores/
│   └── utils/
├── __mocks__/                  # Mock implementations
└── test-utils/                 # Testing utilities
```

---

## Maintenance Guidelines

### Adding New Components
1. Determine appropriate level (atom/molecule/organism)
2. Create files: `Component.tsx`, `Component.types.ts`
3. Add to directory `index.ts`
4. Update main `components/index.ts` if needed

### File Size Limits
- Components: < 200 lines (split if larger)
- Utilities: < 150 lines (split into modules)
- Stores: < 100 lines (use selectors for complex logic)

### Import Order
1. React imports
2. External libraries
3. Internal imports (absolute paths)
4. Type imports
5. Relative imports

---

**File structure designed for scalability, maintainability, and developer experience.**
