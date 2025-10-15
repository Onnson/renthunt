# hover.dev Integration Plan - RentHunt MVP

**Design Date**: 2025-10-15  
**Source**: hover.dev Swipe Cards (FREE component)  
**Time Saved**: 4-8 days of custom swipe development  
**Integration**: TypeScript conversion + domain adaptation  

---

## Integration Overview

### What We're Integrating
**hover.dev Swipe Cards**: A production-ready React swipe component with:
- Touch and mouse gesture support
- Hardware-accelerated animations (Framer Motion)
- Customizable card stack behavior
- Like/pass/super-like actions
- Stack management and callbacks

### Why This Component
- **Time Savings**: Replaces 4-8 days of custom swipe development
- **Quality**: Production-tested component with smooth animations
- **Free**: No licensing costs
- **Compatible**: Works with React 19 and TypeScript
- **Customizable**: Can be themed for apartment cards

---

## Integration Strategy

### Phase 1: Code Extraction
**Objective**: Obtain clean, unmodified source code from hover.dev

#### Steps:
1. Visit hover.dev website
2. Locate Swipe Cards component
3. Download or copy source code
4. Save to `src/vendor/hover-dev/` directory
5. Preserve original licensing and attribution

#### Deliverables:
```
src/vendor/hover-dev/
├── SwipeCards.tsx          # Main component
├── SwipeCards.css          # Original styles
├── package.json            # Dependencies
├── README.md              # Original documentation
└── LICENSE                # Original license
```

### Phase 2: TypeScript Conversion
**Objective**: Convert JavaScript to TypeScript with proper typing

#### Type Definitions:
```typescript
// types/swipe.ts
export interface SwipeCardData {
  id: string;
  content: React.ReactNode;
  metadata?: Record<string, any>;
}

export interface SwipeAction {
  type: 'like' | 'pass' | 'superLike';
  cardId: string;
  timestamp: number;
}

export interface SwipeCallbacks {
  onSwipe?: (action: SwipeAction) => void;
  onCardChange?: (cardIndex: number) => void;
  onStackEmpty?: () => void;
}

export interface SwipeConfig {
  maxCards?: number;
  animationDuration?: number;
  enableSuperLike?: boolean;
  hapticFeedback?: boolean;
}
```

#### Conversion Process:
1. Add TypeScript interfaces for props
2. Convert prop destructuring to typed parameters
3. Add return type annotations
4. Handle any type assertions needed
5. Update import statements

#### Result:
```typescript
// components/vendor/SwipeCards.tsx
import React, { useState, useRef } from 'react';
import { motion, PanInfo } from 'framer-motion';

interface SwipeCardsProps extends SwipeCallbacks, SwipeConfig {
  cards: SwipeCardData[];
  className?: string;
}

export const SwipeCards: React.FC<SwipeCardsProps> = ({
  cards,
  onSwipe,
  onCardChange,
  onStackEmpty,
  maxCards = 3,
  animationDuration = 0.3,
  enableSuperLike = true,
  className
}) => {
  // Converted implementation...
};
```

### Phase 3: Domain Adaptation
**Objective**: Transform generic swipe component into apartment-focused interface

#### Apartment-Specific Features:
```typescript
// types/apartment-swipe.ts
export interface ApartmentSwipeCard extends SwipeCardData {
  apartment: Apartment;
  compatibilityScore?: number;
  roommateProfiles?: RoommateProfile[];
}

export interface ApartmentSwipeCallbacks extends SwipeCallbacks {
  onLike?: (apartment: Apartment) => void;
  onPass?: (apartment: Apartment) => void;
  onSuperLike?: (apartment: Apartment) => void;
  onViewDetails?: (apartment: Apartment) => void;
}
```

#### Custom Components:
```typescript
// components/swipe/ApartmentSwipeCard.tsx
interface ApartmentSwipeCardProps {
  apartment: Apartment;
  compatibilityScore?: number;
  roommateProfiles?: RoommateProfile[];
  onViewDetails: () => void;
}

export const ApartmentSwipeCard: React.FC<ApartmentSwipeCardProps> = ({
  apartment,
  compatibilityScore,
  roommateProfiles,
  onViewDetails
}) => (
  <Card className="apartment-swipe-card">
    <ApartmentImageCarousel images={apartment.images} />
    <CardContent>
      <ApartmentHeader
        title={apartment.title}
        price={apartment.price}
        address={apartment.address}
      />
      {compatibilityScore && (
        <CompatibilityBadge score={compatibilityScore} />
      )}
      {roommateProfiles && roommateProfiles.length > 0 && (
        <RoommatePreview profiles={roommateProfiles} />
      )}
      <ApartmentDetails details={apartment.details} />
      <AmenitiesList amenities={apartment.amenities} />
    </CardContent>
    <CardActions>
      <Button onClick={onViewDetails}>View Details</Button>
    </CardActions>
  </Card>
);
```

#### Swipe Overlay Controls:
```typescript
// components/swipe/SwipeOverlay.tsx
interface SwipeOverlayProps {
  isVisible: boolean;
  action: 'like' | 'pass' | 'superLike' | null;
  position: { x: number; y: number };
}

export const SwipeOverlay: React.FC<SwipeOverlayProps> = ({
  isVisible,
  action,
  position
}) => {
  const getOverlayStyle = () => {
    switch (action) {
      case 'like': return { backgroundColor: 'rgba(34, 197, 94, 0.1)', borderColor: '#22c55e' };
      case 'pass': return { backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' };
      case 'superLike': return { backgroundColor: 'rgba(168, 85, 247, 0.1)', borderColor: '#a855f7' };
      default: return {};
    }
  };

  return (
    <motion.div
      className="swipe-overlay"
      style={{
        ...getOverlayStyle(),
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <Icon name={action === 'like' ? 'heart' : action === 'pass' ? 'x' : 'star'} />
      <Text variant="h2">{action?.toUpperCase()}</Text>
    </motion.div>
  );
};
```

### Phase 4: Store Integration
**Objective**: Connect swipe actions to Zustand stores

#### Swipe Handler:
```typescript
// hooks/useApartmentSwipe.ts
import { useApartmentsStore } from '@/stores';
import { useCallback } from 'react';

export const useApartmentSwipe = () => {
  const { swipeLike, swipePass, swipeSuperLike } = useApartmentsStore();

  const handleSwipe = useCallback((action: SwipeAction) => {
    const apartmentId = action.cardId;

    switch (action.type) {
      case 'like':
        swipeLike(apartmentId);
        break;
      case 'pass':
        swipePass(apartmentId);
        break;
      case 'superLike':
        swipeSuperLike(apartmentId);
        break;
    }
  }, [swipeLike, swipePass, swipeSuperLike]);

  return { handleSwipe };
};
```

#### Main Swipe Component:
```typescript
// components/swipe/ApartmentSwipeStack.tsx
import { SwipeCards } from '@/components/vendor/SwipeCards';
import { ApartmentSwipeCard } from './ApartmentSwipeCard';
import { SwipeOverlay } from './SwipeOverlay';
import { useApartmentsStore } from '@/stores';
import { useApartmentSwipe } from '@/hooks';

export const ApartmentSwipeStack: React.FC = () => {
  const { selectCurrentApartments, selectCurrentIndex } = useApartmentsStore();
  const apartments = selectCurrentApartments();
  const currentIndex = selectCurrentIndex();
  const { handleSwipe } = useApartmentSwipe();

  const cards = apartments.map(apartment => ({
    id: apartment.id,
    content: (
      <ApartmentSwipeCard
        apartment={apartment}
        compatibilityScore={apartment.compatibilityScore}
        roommateProfiles={apartment.roommateInfo?.currentRoommates}
        onViewDetails={() => navigate(`/apartment/${apartment.id}`)}
      />
    ),
    metadata: { apartment }
  }));

  return (
    <div className="apartment-swipe-container">
      <SwipeCards
        cards={cards}
        onSwipe={handleSwipe}
        onCardChange={(index) => {
          // Update current index in store
          useApartmentsStore.getState().goToApartment(index);
        }}
        onStackEmpty={() => {
          // Handle empty stack (load more or show message)
        }}
        maxCards={3}
        enableSuperLike={true}
        className="apartment-swipe-stack"
      />
      <SwipeOverlay
        isVisible={true} // Logic for visibility
        action={null} // Current action state
        position={{ x: 0, y: 0 }} // Drag position
      />
    </div>
  );
};
```

---

## Implementation Timeline

### Week 1: Code Acquisition & Setup
- Day 1: Extract hover.dev code
- Day 2: Set up vendor directory structure
- Day 3: Install dependencies (Framer Motion, etc.)
- Day 4: Basic TypeScript conversion
- Day 5: Initial integration test

### Week 2: Domain Adaptation
- Day 6-7: Create apartment card components
- Day 8: Implement compatibility score display
- Day 9: Add roommate profile previews
- Day 10: Style customization for apartment theme

### Week 3: Store Integration & Polish
- Day 11-12: Connect to Zustand stores
- Day 13: Implement swipe action handlers
- Day 14: Add error handling and edge cases
- Day 15: Performance optimization and testing

---

## Technical Considerations

### Performance Optimizations
- **Virtualization**: Only render visible cards + buffer
- **Image Lazy Loading**: Load apartment images on demand
- **Memoization**: Memoize expensive computations (compatibility scores)
- **Hardware Acceleration**: Leverage Framer Motion's GPU acceleration

### Accessibility
- **Keyboard Navigation**: Arrow keys for swipe actions
- **Screen Reader**: Card content properly labeled
- **Touch Targets**: Minimum 44px touch targets
- **Focus Management**: Proper focus flow between cards

### Error Handling
- **Network Failures**: Graceful degradation for image loads
- **Empty States**: Handle no apartments available
- **Loading States**: Show skeleton while loading new cards
- **Undo Functionality**: Allow undoing recent swipes

### Browser Compatibility
- **Mobile First**: iOS Safari 15+, Chrome Android
- **Touch Events**: Proper touch event handling
- **Gesture Conflicts**: Prevent scroll interference
- **Performance**: 60fps animations on target devices

---

## Testing Strategy

### Unit Tests
```typescript
// __tests__/components/swipe/ApartmentSwipeCard.test.tsx
describe('ApartmentSwipeCard', () => {
  it('displays apartment information correctly', () => {
    // Test rendering
  });

  it('shows compatibility score when provided', () => {
    // Test conditional rendering
  });

  it('calls onViewDetails when button clicked', () => {
    // Test interaction
  });
});
```

### Integration Tests
- Swipe gesture recognition
- Store state updates on swipe
- Navigation between cards
- Empty stack handling

### E2E Tests
- Complete swipe flow
- Apartment detail navigation
- Shortlist integration
- Cross-device compatibility

---

## Future Enhancements

### Advanced Features
- **Swipe History**: Allow users to review past swipes
- **Card Previews**: Show next card preview
- **Custom Gestures**: Add custom swipe directions
- **Animation Variants**: Different animation styles

### Analytics Integration
- **Swipe Metrics**: Track like/pass ratios
- **Session Analytics**: Time spent swiping
- **Conversion Tracking**: Swipes to viewings

### A/B Testing
- **Card Layouts**: Test different information hierarchies
- **Animation Speeds**: Optimize for engagement
- **Super Like Placement**: Test different trigger zones

---

## Risk Mitigation

### Technical Risks
- **Component Compatibility**: Test thoroughly with React 19
- **Performance Issues**: Monitor frame rates on target devices
- **Bundle Size**: Ensure component doesn't bloat bundle

### Business Risks
- **Source Reliability**: hover.dev component may change
- **Licensing Issues**: Verify free usage terms
- **Maintenance Burden**: Plan for future updates

### Contingency Plans
- **Fallback Component**: Have basic swipe implementation ready
- **Vendor Lock-in**: Design abstraction layer for easy replacement
- **Documentation**: Comprehensive docs for maintenance

---

**hover.dev integration planned with complete TypeScript conversion, domain adaptation, and store integration strategy.**
