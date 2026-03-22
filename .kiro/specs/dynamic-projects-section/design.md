# Design Document: Modern Portfolio Redesign

## Overview

This design document specifies the technical implementation for a complete modern portfolio redesign that transforms the existing React-based portfolio into a lightweight, interactive, minimalistic experience. The redesign focuses on smooth animations, micro-interactions, centralized data management, and a clean professional aesthetic that immediately engages recruiters and visitors.

### Design Philosophy

The redesign follows a "speak volumes through simplicity" philosophy, emphasizing:
- Minimalist visual design with strategic use of whitespace
- Smooth, purposeful animations that enhance rather than distract
- Centralized data management for maintainability
- Type-safe, modern React patterns
- Performance-first approach with optimized assets and animations
- Accessibility compliance throughout

### Key Design Goals

1. Create immediate visual impact through the hero section
2. Provide delightful micro-interactions throughout the user journey
3. Centralize project data for easy maintenance
4. Implement smooth scroll-triggered animations
5. Maintain excellent performance and accessibility scores
6. Ensure full responsiveness across all device sizes

## Architecture

### High-Level Architecture

The portfolio follows a component-based architecture with clear separation of concerns:

```
Portfolio App
├── Navigation Layer (NavBar)
├── Content Layer
│   ├── Hero Section (About)
│   ├── Projects Section
│   └── Contact Section
├── Footer Layer
├── Data Layer (projectsData.ts)
└── Animation System (Framer Motion + CSS)
```

### Technology Stack


**Core Technologies:**
- React 18.2.0 with TypeScript
- SCSS for styling with existing mixins and variables
- Framer Motion for animations (new dependency)
- React Intersection Observer for scroll-triggered animations (new dependency)
- EmailJS for contact form functionality (existing)
- React Simple Typewriter for hero section (existing)

**Build Tools:**
- Create React App with TypeScript
- Sass compiler
- React Scripts

### Component Architecture

The application uses a flat component structure with clear responsibilities:

1. **App.tsx**: Root component, orchestrates layout and global state
2. **NavBar**: Navigation with smooth scroll and active section tracking
3. **About (Hero)**: Landing section with typewriter animation and fade-in effects
4. **Projects**: Dynamic project grid with scroll animations and hover effects
5. **Contact**: Form with validation and social links
6. **Footer**: Simple copyright footer

### Data Flow Architecture

```
projectsData.ts (Single Source of Truth)
    ↓
Projects Component (Consumer)
    ↓
ProjectCard Component (Renderer)
```

The data flows unidirectionally from the centralized data file to the consuming components, ensuring consistency and maintainability.

## Components and Interfaces

### 1. Project Data Structure


**File Location:** `src/data/projectsData.ts`

**TypeScript Interface:**

```typescript
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectData[] = [
  // Project objects
];
```

**Field Specifications:**
- `id`: Unique identifier for React keys and potential routing
- `title`: Project name displayed prominently
- `description`: Detailed project description with HTML support
- `coverImage`: Path to project thumbnail (relative to src/assets/covers)
- `technologies`: Array of technology names for display
- `githubUrl`: Optional GitHub repository link
- `liveUrl`: Optional live website link
- `featured`: Optional flag for highlighting special projects

**Data Validation:**
- All required fields must be present
- URLs must be valid strings or undefined
- Technologies array must contain at least one item
- Cover image paths must reference existing assets

### 2. NavBar Component

**File Location:** `src/components/NavBar/NavBar.tsx`

**Component Interface:**

```typescript
interface NavBarProps {
  // No props needed - self-contained component
}

interface NavBarState {
  activeSection: string;
  isScrolled: boolean;
}
```


**Responsibilities:**
- Provide smooth scroll navigation to sections
- Track active section based on scroll position
- Display hover micro-interactions
- Maintain sticky positioning with backdrop blur
- Handle keyboard navigation for accessibility

**Key Features:**
- Intersection Observer API for active section tracking
- Smooth scroll behavior with `scrollIntoView`
- CSS transitions for hover states
- Backdrop filter for modern glass effect when scrolled
- ARIA labels for accessibility

### 3. Hero/About Component

**File Location:** `src/components/About/About.tsx`

**Component Interface:**

```typescript
interface HeroProps {
  // No props needed - self-contained component
}
```

**Responsibilities:**
- Display animated typewriter introduction
- Implement staggered fade-in animations
- Provide scroll indicator or CTA
- Maintain responsive typography

**Animation Specifications:**
- Initial fade-in: 0.8s ease-out
- Typewriter effect: Existing react-simple-typewriter
- Stagger delay between elements: 0.2s
- Scroll indicator: Subtle bounce animation

### 4. Projects Component

**File Location:** `src/components/Projects/Projects.tsx`

**Component Interface:**

```typescript
interface ProjectsProps {
  // No props needed - imports data directly
}
```


**Responsibilities:**
- Import and render project data from centralized file
- Implement responsive grid layout
- Trigger scroll animations for cards
- Pass data to ProjectCard components

**Layout Specifications:**
- Mobile: Single column, full width
- Tablet: 2 columns with gap
- Desktop: 3 columns with gap
- Grid gap: 2rem (mobile), 3rem (tablet+)

### 5. ProjectCard Component (New)

**File Location:** `src/components/Projects/ProjectCard.tsx`

**Component Interface:**

```typescript
interface ProjectCardProps {
  project: ProjectData;
  index: number;
}
```

**Responsibilities:**
- Render individual project information
- Implement hover animations (grayscale to color, elevation)
- Display action buttons (GitHub, Live Site)
- Handle responsive image loading

**Animation Specifications:**
- Scroll-triggered fade-in: 0.6s ease-out
- Stagger delay: index * 0.1s
- Hover transition: 0.3s ease
- Grayscale filter: 85% → 0% on hover
- Box shadow: subtle → elevated on hover

### 6. Contact Component

**File Location:** `src/components/Contact/Contact.tsx`

**Component Interface:**

```typescript
interface ContactProps {
  // No props needed - self-contained component
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  success: boolean;
  empty: boolean;
  loading: boolean;
}
```


**Responsibilities:**
- Handle form submission via EmailJS
- Provide input validation and error messaging
- Display social media links with hover animations
- Implement focus states for inputs
- Show loading and success states

**Improvements:**
- Replace page reload with smooth success message
- Add loading spinner during submission
- Implement better error handling
- Add input validation before submission
- Smooth transitions for status messages

### 7. Footer Component

**File Location:** `src/components/Footer/Footer.tsx`

**Component Interface:**

```typescript
interface FooterProps {
  // No props needed - self-contained component
}
```

**Responsibilities:**
- Display copyright information with current year
- Maintain consistent styling with minimalist design
- Provide proper spacing and typography

## Data Models

### ProjectData Model

The central data model for all portfolio projects:

```typescript
export interface ProjectData {
  id: string;              // Unique identifier (e.g., "stockworld")
  title: string;           // Display title (e.g., "StockWorld")
  description: string;     // Full HTML-supported description
  coverImage: string;      // Relative path from src/assets/covers
  technologies: string[];  // Array of tech stack items
  githubUrl?: string;      // Optional GitHub repository URL
  liveUrl?: string;        // Optional live website URL
  featured?: boolean;      // Optional featured flag
}
```


**Example Data:**

```typescript
{
  id: "stockworld",
  title: "StockWorld",
  description: "StockWorld is a Full Stack application where users can buy stocks, retrieve their portfolio, and comment on the platform interacting with other users. I used React, HTML5, JavaScript, SASS, and Figma to complete a high-quality Front End design and user interface, following Agile principles during the development cycle. For developing the Back-End, I built an API on C#, and .NET using Visual Studio Code, utilizing EF Core for communicating with the database running on Microsoft SQL Server, and JWT and Identity for managing the user authentication.",
  coverImage: "stockworld-thumbnail.png",
  technologies: ["React", "TypeScript", "C#", ".NET", "SQL Server", "SASS"],
  githubUrl: undefined,
  liveUrl: undefined,
  featured: true
}
```

### Animation Configuration Model

Configuration for consistent animations across the application:

```typescript
export interface AnimationConfig {
  duration: number;        // Animation duration in seconds
  delay: number;          // Delay before animation starts
  easing: string;         // CSS easing function
  threshold: number;      // Intersection observer threshold
}

export const animationPresets = {
  fadeIn: {
    duration: 0.6,
    delay: 0,
    easing: "ease-out",
    threshold: 0.2
  },
  slideUp: {
    duration: 0.8,
    delay: 0,
    easing: "ease-out",
    threshold: 0.1
  },
  hover: {
    duration: 0.3,
    delay: 0,
    easing: "ease",
    threshold: 0
  }
};
```

### Design System Model

Centralized design tokens for consistent styling:

```typescript
export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    textSecondary: string;
    accent: string;
  };
  typography: {
    fontFamily: string;
    headingSizes: Record<string, string>;
    bodySize: string;
    lineHeight: number;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    mobile: string;
    tablet: string;
    desktop: string;
  };
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Data-to-Rendering Synchronization

*For any* valid array of ProjectData objects in the centralized data file, the Projects component SHALL render exactly the same number of project cards as there are objects in the array, and each rendered card SHALL display the data from its corresponding ProjectData object.

**Validates: Requirements 3.4, 3.5, 5.8**

### Property 2: Project Data Structure Conformance

*For any* ProjectData object in the data file, it SHALL contain all required fields (id, title, description, coverImage, technologies) with valid types, and MAY contain optional fields (githubUrl, liveUrl, featured) that are either valid strings or undefined.

**Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7**



## Error Handling

### Data Layer Error Handling

**Missing or Invalid Project Data:**
- TypeScript compiler will catch type mismatches at build time
- Runtime validation can check for missing required fields
- Default fallback values for optional fields
- Console warnings for development environment

**Image Loading Errors:**
- Implement `onError` handlers for image elements
- Provide fallback placeholder images
- Log errors to console in development
- Graceful degradation with alt text

### Component Error Handling

**Contact Form Errors:**
- Validate all fields before submission
- Display inline error messages for invalid inputs
- Handle EmailJS API failures gracefully
- Provide retry mechanism for failed submissions
- Clear error states appropriately

**Animation Errors:**
- Wrap animation code in try-catch blocks
- Provide fallback static rendering if animations fail
- Respect `prefers-reduced-motion` media query
- Ensure animations don't block critical rendering

**Navigation Errors:**
- Handle missing section IDs gracefully
- Fallback to top of page if section not found
- Log navigation errors in development

### Error Boundaries

Implement React Error Boundaries for:
- Projects section (isolate project rendering errors)
- Contact form (isolate form submission errors)
- Individual project cards (prevent one card error from breaking all)

**Error Boundary Implementation:**

```typescript
class ProjectsErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Projects section error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <div>Unable to load projects. Please refresh the page.</div>;
    }
    return this.props.children;
  }
}
```



## Testing Strategy

### Dual Testing Approach

This project will use both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of component rendering
- Edge cases (empty data, missing fields)
- User interactions (clicks, hovers, form submissions)
- Integration points (EmailJS, scroll behavior)
- Accessibility features (ARIA labels, keyboard navigation)

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Data structure validation across all projects
- Rendering consistency for any valid data set

Together, these approaches provide comprehensive coverage where unit tests catch concrete bugs and property tests verify general correctness.

### Property-Based Testing Configuration

**Library Selection:** `fast-check` for TypeScript/JavaScript property-based testing

**Installation:**
```bash
npm install --save-dev fast-check
```

**Configuration:**
- Minimum 100 iterations per property test
- Each test references its design document property
- Tag format: `Feature: dynamic-projects-section, Property {number}: {property_text}`

### Unit Test Coverage

**NavBar Component Tests:**
- Renders all navigation items
- Smooth scroll function called with correct section IDs
- Active section highlighting updates on scroll
- Hover states apply correct CSS classes
- Keyboard navigation works (Tab, Enter)
- ARIA labels present for accessibility
- Sticky positioning applied when scrolled

**Hero/About Component Tests:**
- Component renders without errors
- Typewriter animation initializes correctly
- Fade-in animation classes applied
- Scroll indicator present
- Responsive classes applied at breakpoints

**Projects Component Tests:**
- Renders correct number of project cards from data
- Grid layout classes applied
- Scroll-triggered animations initialize
- Responsive layout changes at breakpoints
- Handles empty project array gracefully

**ProjectCard Component Tests:**
- Renders project title, description, image
- Technology tags display correctly
- GitHub button renders when URL provided
- Live site button renders when URL provided
- Buttons hidden when URLs not provided
- Hover effects apply correct styles
- Grayscale filter transitions on hover
- Image error handling works

**Contact Component Tests:**
- Form renders all input fields
- Validation prevents empty submissions
- EmailJS called with correct parameters
- Success message displays after submission
- Error message displays on failure
- Loading state shows during submission
- Social media links render correctly
- Focus states apply to inputs
- Form resets after successful submission

**Footer Component Tests:**
- Renders copyright text
- Displays current year dynamically
- Responsive styling applied



### Property-Based Test Specifications

**Property Test 1: Data-to-Rendering Synchronization**

```typescript
// Feature: dynamic-projects-section, Property 1: For any valid array of ProjectData objects, 
// the Projects component SHALL render exactly the same number of project cards
import fc from 'fast-check';
import { render } from '@testing-library/react';
import Projects from './Projects';
import { ProjectData } from '../../data/projectsData';

// Arbitrary generator for ProjectData
const projectDataArbitrary = fc.record({
  id: fc.string(),
  title: fc.string(),
  description: fc.string(),
  coverImage: fc.string(),
  technologies: fc.array(fc.string(), { minLength: 1 }),
  githubUrl: fc.option(fc.webUrl()),
  liveUrl: fc.option(fc.webUrl()),
  featured: fc.option(fc.boolean())
});

test('Property 1: Projects render count matches data array length', () => {
  fc.assert(
    fc.property(
      fc.array(projectDataArbitrary, { minLength: 0, maxLength: 20 }),
      (projects) => {
        // Mock the data import
        jest.mock('../../data/projectsData', () => ({
          projectsData: projects
        }));
        
        const { container } = render(<Projects />);
        const renderedCards = container.querySelectorAll('.projects__item');
        
        return renderedCards.length === projects.length;
      }
    ),
    { numRuns: 100 }
  );
});
```

**Property Test 2: Project Data Structure Conformance**

```typescript
// Feature: dynamic-projects-section, Property 2: For any ProjectData object,
// it SHALL contain all required fields with valid types
import fc from 'fast-check';
import { projectsData, ProjectData } from '../../data/projectsData';

const validateProjectData = (project: any): boolean => {
  // Check required fields exist and have correct types
  if (typeof project.id !== 'string') return false;
  if (typeof project.title !== 'string') return false;
  if (typeof project.description !== 'string') return false;
  if (typeof project.coverImage !== 'string') return false;
  if (!Array.isArray(project.technologies)) return false;
  if (project.technologies.length === 0) return false;
  
  // Check optional fields are either string or undefined
  if (project.githubUrl !== undefined && typeof project.githubUrl !== 'string') return false;
  if (project.liveUrl !== undefined && typeof project.liveUrl !== 'string') return false;
  if (project.featured !== undefined && typeof project.featured !== 'boolean') return false;
  
  return true;
};

test('Property 2: All project data conforms to structure', () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...projectsData),
      (project) => {
        return validateProjectData(project);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Integration Testing

**Scroll Behavior Integration:**
- Test smooth scroll from NavBar to sections
- Verify Intersection Observer triggers active states
- Test scroll-triggered animations fire correctly

**EmailJS Integration:**
- Mock EmailJS service
- Test successful email submission flow
- Test error handling for failed submissions
- Verify correct data passed to EmailJS

**Animation Integration:**
- Test Framer Motion animations render
- Verify animation timing and sequencing
- Test reduced motion preferences respected

### Accessibility Testing

**Automated Accessibility Tests:**
- Use `jest-axe` for automated a11y testing
- Test all components for ARIA compliance
- Verify keyboard navigation paths
- Check color contrast ratios
- Validate focus management

**Manual Accessibility Testing:**
- Screen reader testing (NVDA, JAWS, VoiceOver)
- Keyboard-only navigation testing
- Reduced motion preference testing
- High contrast mode testing

### Performance Testing

**Metrics to Monitor:**
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1
- Total bundle size < 500KB

**Performance Testing Tools:**
- Lighthouse CI for automated performance checks
- Bundle analyzer for identifying large dependencies
- React DevTools Profiler for component render performance

### Test Execution Strategy

**Development:**
- Run unit tests on file save (watch mode)
- Run property tests before commits
- Use test coverage reports to identify gaps

**CI/CD Pipeline:**
- Run all tests on pull requests
- Require 80% code coverage minimum
- Run Lighthouse tests on preview deployments
- Run accessibility tests automatically

**Pre-Release:**
- Full test suite execution
- Manual accessibility testing
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS, Android)



## Animation System Design

### Animation Library Selection

**Primary Library: Framer Motion**
- Declarative animation API
- React-first design
- Excellent TypeScript support
- Built-in scroll animations
- Gesture support for interactions
- Reduced motion support

**Installation:**
```bash
npm install framer-motion
```

### Animation Patterns

**1. Fade-In Animation**

Used for: Hero section, section headers

```typescript
import { motion } from 'framer-motion';

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.8, ease: 'easeOut' }
  }
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={fadeInVariants}
>
  {content}
</motion.div>
```

**2. Staggered Children Animation**

Used for: Project cards, navigation items

```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

<motion.ul variants={containerVariants} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.li key={item.id} variants={itemVariants}>
      {item.content}
    </motion.li>
  ))}
</motion.ul>
```

**3. Scroll-Triggered Animation**

Used for: Projects section, contact section

```typescript
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ref = useRef(null);
const isInView = useInView(ref, { once: true, amount: 0.2 });

<motion.div
  ref={ref}
  initial={{ opacity: 0, y: 50 }}
  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
  {content}
</motion.div>
```

**4. Hover Animation**

Used for: Project cards, buttons, navigation items

```typescript
<motion.div
  whileHover={{ 
    scale: 1.02,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: { duration: 0.3, ease: 'easeInOut' }
  }}
  whileTap={{ scale: 0.98 }}
>
  {content}
</motion.div>
```

### Reduced Motion Support

All animations must respect user preferences:

```typescript
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

const variants = {
  hidden: { opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 }
};
```

**CSS Fallback:**

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Animation Performance Optimization

**Best Practices:**
- Animate only transform and opacity properties
- Use `will-change` sparingly and remove after animation
- Avoid animating layout properties (width, height, margin)
- Use `transform: translateZ(0)` for GPU acceleration
- Debounce scroll event listeners
- Use Intersection Observer instead of scroll events

**Performance Monitoring:**

```typescript
// Monitor animation frame rate
const measurePerformance = () => {
  let lastTime = performance.now();
  let frames = 0;
  
  const checkFrame = () => {
    const currentTime = performance.now();
    frames++;
    
    if (currentTime >= lastTime + 1000) {
      const fps = Math.round((frames * 1000) / (currentTime - lastTime));
      if (fps < 30) {
        console.warn('Low FPS detected:', fps);
      }
      frames = 0;
      lastTime = currentTime;
    }
    
    requestAnimationFrame(checkFrame);
  };
  
  requestAnimationFrame(checkFrame);
};
```



## Design System Specification

### Color Palette

**Modernized Minimalist Palette:**

```scss
// Primary Colors
$color-primary: #2e8bc0;           // Main brand color
$color-primary-light: #6699cc;     // Lighter variant
$color-primary-dark: #145da0;      // Darker variant

// Background Colors
$color-bg-primary: #ffffff;        // Main background
$color-bg-secondary: #f8f9fa;      // Alternate sections
$color-bg-dark: #0c2d48;          // Dark sections (projects)
$color-bg-footer: #1a1a1a;        // Footer background

// Text Colors
$color-text-primary: #1a1a1a;     // Main text
$color-text-secondary: #6c757d;   // Secondary text
$color-text-light: #ffffff;       // Light text on dark backgrounds
$color-text-muted: #adb5bd;       // Muted text

// Accent Colors
$color-accent: #bfd7ed;           // Accent/highlight color
$color-success: #28a745;          // Success states
$color-error: #dc3545;            // Error states
$color-warning: #ffc107;          // Warning states

// Interactive States
$color-hover: rgba(46, 139, 192, 0.1);
$color-focus: rgba(46, 139, 192, 0.2);
$color-active: #145da0;
```

**Usage Guidelines:**
- Use `$color-bg-primary` for main content areas
- Use `$color-bg-dark` for projects section to create contrast
- Maintain 4.5:1 contrast ratio for text (WCAG AA)
- Use accent colors sparingly for emphasis

### Typography

**Font Stack:**

```scss
// Existing custom fonts
$font-primary: 'TrajanPro', serif;
$font-secondary: 'FuturaMdMedium', sans-serif;

// System font fallbacks
$font-system: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 
              'Helvetica Neue', Arial, sans-serif;
```

**Type Scale:**

```scss
// Font Sizes
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 1.875rem;  // 30px
$font-size-4xl: 2.25rem;   // 36px
$font-size-5xl: 3rem;      // 48px

// Line Heights
$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.75;

// Font Weights
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-extrabold: 800;
```

**Typography Usage:**

```scss
// Headings
h1 {
  font-family: $font-primary;
  font-size: $font-size-5xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
  
  @include tablet {
    font-size: 4rem;
  }
}

h2 {
  font-family: $font-primary;
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  line-height: $line-height-tight;
}

h3 {
  font-family: $font-primary;
  font-size: $font-size-2xl;
  font-weight: $font-weight-semibold;
  line-height: $line-height-normal;
}

// Body Text
body {
  font-family: $font-secondary;
  font-size: $font-size-base;
  line-height: $line-height-relaxed;
  color: $color-text-primary;
}

// Links
a {
  color: $color-primary;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: $color-primary-dark;
  }
}
```

### Spacing System

**Spacing Scale:**

```scss
$spacing-xs: 0.25rem;   // 4px
$spacing-sm: 0.5rem;    // 8px
$spacing-md: 1rem;      // 16px
$spacing-lg: 1.5rem;    // 24px
$spacing-xl: 2rem;      // 32px
$spacing-2xl: 3rem;     // 48px
$spacing-3xl: 4rem;     // 64px
$spacing-4xl: 6rem;     // 96px
$spacing-5xl: 8rem;     // 128px
```

**Section Spacing:**

```scss
// Vertical spacing between sections
.section {
  padding: $spacing-3xl $spacing-md;
  
  @include tablet {
    padding: $spacing-4xl $spacing-2xl;
  }
  
  @include desktop {
    padding: $spacing-5xl $spacing-3xl;
  }
}

// Component spacing
.component {
  margin-bottom: $spacing-xl;
  
  @include tablet {
    margin-bottom: $spacing-2xl;
  }
}
```

### Shadows and Elevation

**Shadow Scale:**

```scss
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
$shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.25);

// Interactive shadows
$shadow-hover: 0 10px 30px rgba(46, 139, 192, 0.2);
$shadow-focus: 0 0 0 3px rgba(46, 139, 192, 0.3);
```

**Usage:**
- Cards at rest: `$shadow-md`
- Cards on hover: `$shadow-lg` or `$shadow-hover`
- Modals/overlays: `$shadow-2xl`
- Focus states: `$shadow-focus`

### Border Radius

```scss
$radius-sm: 0.25rem;   // 4px
$radius-md: 0.5rem;    // 8px
$radius-lg: 0.75rem;   // 12px
$radius-xl: 1rem;      // 16px
$radius-full: 9999px;  // Fully rounded
```

### Transitions

**Timing Functions:**

```scss
$ease-in: cubic-bezier(0.4, 0, 1, 1);
$ease-out: cubic-bezier(0, 0, 0.2, 1);
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
```

**Duration Scale:**

```scss
$duration-fast: 150ms;
$duration-normal: 300ms;
$duration-slow: 500ms;
$duration-slower: 800ms;
```

**Standard Transitions:**

```scss
$transition-base: all $duration-normal $ease-in-out;
$transition-color: color $duration-fast $ease-in-out;
$transition-transform: transform $duration-normal $ease-out;
$transition-opacity: opacity $duration-normal $ease-in-out;
```

### Breakpoints

```scss
// Existing breakpoints (maintain compatibility)
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1280px;

// Additional breakpoints for finer control
$breakpoint-mobile-sm: 375px;
$breakpoint-mobile-lg: 425px;
$breakpoint-tablet-lg: 1024px;
$breakpoint-desktop-lg: 1440px;
$breakpoint-desktop-xl: 1920px;
```

### Grid System

**Container:**

```scss
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $spacing-md;
  
  @include tablet {
    padding: 0 $spacing-xl;
  }
  
  @include desktop {
    padding: 0 $spacing-2xl;
  }
}
```

**Grid Layout:**

```scss
.grid {
  display: grid;
  gap: $spacing-xl;
  
  &--2-col {
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  
  &--3-col {
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
    }
    
    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
```



## Implementation Details

### Project Data File Implementation

**File: `src/data/projectsData.ts`**

```typescript
export interface ProjectData {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

export const projectsData: ProjectData[] = [
  {
    id: 'stockworld',
    title: 'StockWorld',
    description: `StockWorld is a Full Stack application where users can buy stocks, retrieve their portfolio, and comment on the platform interacting with other users.<br/><br/>I used React, HTML5, JavaScript, SASS, and Figma to complete a high-quality Front End design and user interface, following Agile principles during the development cycle. For developing the Back-End, I built an API on C#, and .NET using Visual Studio Code, utilizing EF Core for communicating with the database running on Microsoft SQL Server, and JWT and Identity for managing the user authentication.`,
    coverImage: 'stockworld-thumbnail.png',
    technologies: ['React', 'TypeScript', 'C#', '.NET', 'SQL Server', 'SASS', 'Figma'],
    featured: true
  },
  {
    id: 'jamesv',
    title: 'JAMES V',
    description: `JAMES V is a Full Stack application made in collaboration with another Full Stack Developer for the Vancouver based artist <a href="https://jamesvmusic.com/" class="projects__item-link">JAMES V</a>.<br/><br/>To build an outstanding interface, we used ReactJS for the Front End. For the BackEnd we used FireBase for hosting the web app's database and domain and creating cloud functions to retrieve data automatically daily for the videos section.`,
    coverImage: 'jamesv-thumbnail.png',
    technologies: ['React', 'Firebase', 'Cloud Functions', 'SASS'],
    liveUrl: 'https://jamesvmusic.com/'
  },
  {
    id: 'ravefinder',
    title: 'RaveFinder',
    description: `RaveFinder application is a promotional search engine where users can look for concerts where their favorite artists are playing, find a safe purchase link to buy the ticket for that event and find out about other upcoming events. This is a Front End application made in ReactJS that utilizes TicketMaster's API to retrieve all the information about the events.`,
    coverImage: 'ravefinder-thumbnail.png',
    technologies: ['React', 'TicketMaster API', 'SASS'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/RaveFinder',
    liveUrl: 'https://ravefinder.netlify.app/'
  },
  {
    id: 'brainflix',
    title: 'BrainFlix',
    description: `BrainFlix is a video streaming website similar in design and functionality to Vimeo. The tech stack of this project includes ReactJs for the Front End and ExpressJs for the Back End API. The user can select and view videos from a suggestion bar as well as upload videos.`,
    coverImage: 'brainflix-thumbnail.png',
    technologies: ['React', 'Express.js', 'Node.js', 'SASS'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/brainflix'
  },
  {
    id: 'tutoring-system',
    title: 'Tutoring System',
    description: `Tutoring System is a management system for tutorials and reviews of practices and exams developed with the purpose of it being used by teachers and students. This project's UI was made using PHP, HTML, CSS, and Full Calendar. Regarding the Back End, the tutoring's system was built with XAMPP, phpMyAdmin, MySQL, Apache and Google Calendar's API.`,
    coverImage: 'tutoring-system-cover.png',
    technologies: ['PHP', 'MySQL', 'HTML', 'CSS', 'Google Calendar API'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/tutoring-system-final-degree-project-'
  },
  {
    id: 'buckettrips',
    title: 'BucketTrips',
    description: `BucketTrips is a travel planning application that helps users organize and track their dream destinations. The application allows users to create bucket lists of places they want to visit, add notes and details about each destination, and mark trips as completed.`,
    coverImage: 'buckettrips-thumbnail.PNG',
    technologies: ['React', 'TypeScript', 'SASS'],
    githubUrl: 'https://github.com/jaimevillanuadejuan/buckettrips'
  }
];
```

### NavBar Implementation

**Enhanced NavBar with Active Section Tracking:**

```typescript
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './NavBar.scss';

interface NavItem {
  id: string;
  label: string;
  href?: string;
}

const navItems: NavItem[] = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
  { 
    id: 'cv', 
    label: 'CV',
    href: 'https://drive.google.com/file/d/1YnxlpK1VsFh6ldZY-J49JrGNiip7Ys6E/view?usp=sharing'
  }
];

function NavBar() {
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    // Track scroll position for navbar styling
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Track active section using Intersection Observer
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    navItems.forEach(item => {
      if (item.id !== 'cv') {
        const element = document.getElementById(item.id);
        if (element) observer.observe(element);
      }
    });

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      className={`nav ${isScrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="nav__container">
        {navItems.map((item, index) => (
          <motion.div
            key={item.id}
            className={`nav__item ${activeSection === item.id ? 'nav__item--active' : ''}`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {item.href ? (
              <a
                href={item.href}
                className="nav__item-title nav__item-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${item.label}`}
              >
                {item.label}
              </a>
            ) : (
              <button
                onClick={() => scrollToSection(item.id)}
                className="nav__item-title"
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.nav>
  );
}

export default NavBar;
```

**NavBar Styles:**

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: $spacing-md $spacing-md;
  transition: all $duration-normal $ease-in-out;
  
  @include tablet {
    padding: $spacing-lg $spacing-xl;
  }
  
  &--scrolled {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: $shadow-sm;
  }
  
  &__container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-lg;
    max-width: 1280px;
    margin: 0 auto;
    
    @include tablet {
      gap: $spacing-2xl;
    }
  }
  
  &__item {
    position: relative;
    cursor: pointer;
    
    &--active::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      right: 0;
      height: 2px;
      background: $color-primary;
      animation: slideIn 0.3s ease-out;
    }
    
    &-title {
      font-family: $font-primary;
      font-size: $font-size-sm;
      font-weight: $font-weight-bold;
      color: $color-text-primary;
      background: none;
      border: none;
      cursor: pointer;
      transition: color $duration-fast $ease-in-out;
      
      @include tablet {
        font-size: $font-size-base;
      }
      
      &:hover {
        color: $color-primary;
      }
      
      &:focus-visible {
        outline: 2px solid $color-primary;
        outline-offset: 4px;
        border-radius: $radius-sm;
      }
    }
    
    &-link {
      text-decoration: none;
      display: inline-block;
    }
  }
}

@keyframes slideIn {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav {
    transition: none;
  }
  
  .nav__item-title {
    transition: none;
  }
  
  @keyframes slideIn {
    from, to {
      transform: scaleX(1);
    }
  }
}
```



### Hero/About Component Implementation

**Enhanced Hero with Staggered Animations:**

```typescript
import { motion } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import './About.scss';

const AboutMe = () => {
  const [text] = useTypewriter({
    words: [
      "Hi 👋, I'm Jaime Villanua De Juan",
      "Welcome to my portfolio!",
      "Let me introduce myself :)",
      "I'm a Full Stack Developer 👨‍💻",
      "I love 🖥️, playing 🎮 and drinking 🍵",
      "I'm also a huge ⚽ fan",
      "Feel free to check out any of my projects😇",
    ],
    loop: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="about"
      className="hero"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="hero__content" variants={itemVariants}>
        <p className="hero__text">
          <span className="hero__typewriter">{text}</span>
          <span className="hero__cursor">|</span>
        </p>
      </motion.div>

      <motion.button
        className="hero__scroll-indicator"
        variants={itemVariants}
        onClick={scrollToProjects}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Scroll to projects section"
      >
        <span className="hero__scroll-text">View My Work</span>
        <motion.svg
          className="hero__scroll-arrow"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </motion.svg>
      </motion.button>
    </motion.section>
  );
};

export default AboutMe;
```

**Hero Styles:**

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: $spacing-3xl $spacing-md;
  background: linear-gradient(135deg, $color-bg-primary 0%, $color-bg-secondary 100%);
  position: relative;
  
  @include tablet {
    padding: $spacing-4xl $spacing-xl;
  }
  
  &__content {
    max-width: 800px;
    text-align: center;
  }
  
  &__text {
    font-family: $font-primary;
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    line-height: $line-height-relaxed;
    
    @include tablet {
      font-size: $font-size-3xl;
    }
    
    @include desktop {
      font-size: $font-size-4xl;
    }
  }
  
  &__typewriter {
    display: inline-block;
  }
  
  &__cursor {
    display: inline-block;
    animation: blink 1s step-end infinite;
    color: $color-primary;
  }
  
  &__scroll-indicator {
    position: absolute;
    bottom: $spacing-2xl;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $spacing-sm;
    background: none;
    border: none;
    color: $color-primary;
    cursor: pointer;
    transition: color $duration-fast $ease-in-out;
    
    &:hover {
      color: $color-primary-dark;
    }
    
    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 4px;
      border-radius: $radius-sm;
    }
  }
  
  &__scroll-text {
    font-family: $font-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  &__scroll-arrow {
    width: 24px;
    height: 24px;
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__scroll-arrow {
    animation: none;
  }
  
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
  }
}
```

### Projects Component Implementation

**Projects Component with Dynamic Rendering:**

```typescript
import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projectsData } from '../../data/projectsData';
import './Projects.scss';

const Projects = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="projects">
      <div className="projects__container">
        <motion.h2
          className="projects__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Featured Projects
        </motion.h2>

        <motion.ul
          className="projects__list"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projectsData.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Projects;
```

**ProjectCard Component:**

```typescript
import { motion } from 'framer-motion';
import { ProjectData } from '../../data/projectsData';
import './ProjectCard.scss';

interface ProjectCardProps {
  project: ProjectData;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.li
      className="project-card"
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className="project-card__image-wrapper">
        <img
          src={require(`../../assets/covers/${project.coverImage}`)}
          alt={`${project.title} preview`}
          className="project-card__image"
          loading="lazy"
        />
      </div>

      <div className="project-card__content">
        <h3 className="project-card__title">{project.title}</h3>

        <div className="project-card__technologies">
          {project.technologies.map((tech) => (
            <span key={tech} className="project-card__tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div
          className="project-card__description"
          dangerouslySetInnerHTML={{ __html: project.description }}
        />

        {(project.githubUrl || project.liveUrl) && (
          <div className="project-card__buttons">
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__button project-card__button--github"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`View ${project.title} on GitHub`}
              >
                GitHub
              </motion.a>
            )}
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__button project-card__button--live"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label={`Visit ${project.title} live site`}
              >
                Live Site
              </motion.a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
};

export default ProjectCard;
```



**Projects Styles:**

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.projects {
  background: $color-bg-dark;
  padding: $spacing-3xl $spacing-md;
  
  @include tablet {
    padding: $spacing-4xl $spacing-xl;
  }
  
  @include desktop {
    padding: $spacing-5xl $spacing-2xl;
  }
  
  &__container {
    max-width: 1280px;
    margin: 0 auto;
  }
  
  &__title {
    font-family: $font-primary;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-text-light;
    text-align: center;
    margin-bottom: $spacing-3xl;
    
    @include tablet {
      font-size: $font-size-4xl;
    }
  }
  
  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: $spacing-2xl;
    
    @include tablet {
      grid-template-columns: repeat(2, 1fr);
      gap: $spacing-3xl;
    }
    
    @include desktop {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

.project-card {
  background: rgba(255, 255, 255, 0.05);
  border-radius: $radius-lg;
  overflow: hidden;
  transition: all $duration-normal $ease-out;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    box-shadow: $shadow-hover;
    border-color: rgba(46, 139, 192, 0.3);
  }
  
  &__image-wrapper {
    width: 100%;
    height: 250px;
    overflow: hidden;
    position: relative;
    
    @include tablet {
      height: 280px;
    }
  }
  
  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(85%);
    transition: all $duration-slow $ease-out;
    
    .project-card:hover & {
      filter: grayscale(0%);
      transform: scale(1.05);
    }
  }
  
  &__content {
    padding: $spacing-xl;
    color: $color-text-light;
  }
  
  &__title {
    font-family: $font-primary;
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    margin-bottom: $spacing-md;
    color: $color-text-light;
  }
  
  &__technologies {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-sm;
    margin-bottom: $spacing-lg;
  }
  
  &__tech-tag {
    font-family: $font-secondary;
    font-size: $font-size-xs;
    padding: $spacing-xs $spacing-sm;
    background: rgba(46, 139, 192, 0.2);
    border: 1px solid rgba(46, 139, 192, 0.4);
    border-radius: $radius-full;
    color: $color-accent;
    font-weight: $font-weight-medium;
  }
  
  &__description {
    font-family: $font-secondary;
    font-size: $font-size-sm;
    line-height: $line-height-relaxed;
    color: rgba(255, 255, 255, 0.8);
    margin-bottom: $spacing-lg;
    max-height: 200px;
    overflow-y: auto;
    
    a {
      color: $color-accent;
      text-decoration: underline;
      
      &:hover {
        color: $color-primary-light;
      }
    }
  }
  
  &__buttons {
    display: flex;
    gap: $spacing-md;
    flex-wrap: wrap;
  }
  
  &__button {
    font-family: $font-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    padding: $spacing-sm $spacing-lg;
    border-radius: $radius-md;
    text-decoration: none;
    text-align: center;
    transition: all $duration-fast $ease-in-out;
    cursor: pointer;
    
    &--github {
      background: transparent;
      border: 2px solid $color-primary;
      color: $color-primary;
      
      &:hover {
        background: $color-primary;
        color: white;
      }
    }
    
    &--live {
      background: $color-primary;
      border: 2px solid $color-primary;
      color: white;
      
      &:hover {
        background: $color-primary-dark;
        border-color: $color-primary-dark;
      }
    }
    
    &:focus-visible {
      outline: 2px solid $color-accent;
      outline-offset: 2px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: none;
  }
  
  .project-card__image {
    transition: none;
  }
}
```

### Contact Component Implementation

**Enhanced Contact Form:**

```typescript
import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { ReactComponent as Linkedin } from '../../assets/svg/linkedin.svg';
import { ReactComponent as Gh } from '../../assets/svg/gh.svg';
import { ReactComponent as Cv } from '../../assets/svg/cv.svg';
import './Contact.scss';

interface FormStatus {
  success: boolean;
  error: boolean;
  loading: boolean;
  message: string;
}

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<FormStatus>({
    success: false,
    error: false,
    loading: false,
    message: ''
  });

  const validateForm = (): boolean => {
    if (!formRef.current) return false;
    
    const name = formRef.current.name.value.trim();
    const email = formRef.current.email.value.trim();
    const message = formRef.current.message.value.trim();
    
    if (!name || !email || !message) {
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Please fill out all fields.'
      });
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Please enter a valid email address.'
      });
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !formRef.current) return;
    
    setStatus({ success: false, error: false, loading: true, message: '' });
    
    try {
      await emailjs.sendForm(
        process.env.REACT_APP_SERVICE_ID!,
        process.env.REACT_APP_TEMPLATE_ID!,
        formRef.current,
        process.env.REACT_APP_PUBLIC_KEY!
      );
      
      setStatus({
        success: true,
        error: false,
        loading: false,
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      
      formRef.current.reset();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setStatus({ success: false, error: false, loading: false, message: '' });
      }, 5000);
      
    } catch (error) {
      console.error('Email send error:', error);
      setStatus({
        success: false,
        error: true,
        loading: false,
        message: 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <motion.section
      id="contact"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="contact__container">
        <motion.h2
          className="contact__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Get In Touch
        </motion.h2>

        <motion.form
          ref={formRef}
          className="contact__form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="contact__form-group">
            <label htmlFor="name" className="contact__label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="contact__input"
              placeholder="Your name"
              disabled={status.loading}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="email" className="contact__label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="contact__input"
              placeholder="your.email@example.com"
              disabled={status.loading}
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="message" className="contact__label">Message</label>
            <textarea
              id="message"
              name="message"
              className="contact__textarea"
              placeholder="Write me anything! // Écrivez-moi en français aussi!"
              rows={6}
              disabled={status.loading}
            />
          </div>

          <motion.button
            type="submit"
            className="contact__button"
            disabled={status.loading}
            whileHover={{ scale: status.loading ? 1 : 1.05 }}
            whileTap={{ scale: status.loading ? 1 : 0.95 }}
          >
            {status.loading ? 'Sending...' : 'Send Message'}
          </motion.button>

          {status.message && (
            <motion.div
              className={`contact__status ${status.success ? 'contact__status--success' : 'contact__status--error'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>

        <motion.div
          className="contact__socials"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="contact__socials-title">Connect With Me</h3>
          <div className="contact__socials-links">
            <motion.a
              href="https://www.linkedin.com/in/jaime-villanua-de-juan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="LinkedIn profile"
            >
              <Linkedin />
            </motion.a>
            <motion.a
              href="https://github.com/jaimevillanuadejuan"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="GitHub profile"
            >
              <Gh />
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1YnxlpK1VsFh6ldZY-J49JrGNiip7Ys6E/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="contact__social-link"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Download CV"
            >
              <Cv />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
```



**Contact Styles:**

```scss
@use "../../styles/variables" as *;
@use "../../styles/mixins" as *;

.contact {
  background: $color-bg-secondary;
  padding: $spacing-3xl $spacing-md;
  
  @include tablet {
    padding: $spacing-4xl $spacing-xl;
  }
  
  @include desktop {
    padding: $spacing-5xl $spacing-2xl;
  }
  
  &__container {
    max-width: 800px;
    margin: 0 auto;
  }
  
  &__title {
    font-family: $font-primary;
    font-size: $font-size-3xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
    text-align: center;
    margin-bottom: $spacing-3xl;
    
    @include tablet {
      font-size: $font-size-4xl;
    }
  }
  
  &__form {
    background: white;
    padding: $spacing-2xl;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
    margin-bottom: $spacing-3xl;
    
    @include tablet {
      padding: $spacing-3xl;
    }
  }
  
  &__form-group {
    margin-bottom: $spacing-lg;
  }
  
  &__label {
    display: block;
    font-family: $font-secondary;
    font-size: $font-size-sm;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-sm;
  }
  
  &__input,
  &__textarea {
    width: 100%;
    font-family: $font-secondary;
    font-size: $font-size-base;
    padding: $spacing-md;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-radius: $radius-md;
    transition: all $duration-fast $ease-in-out;
    background: $color-bg-primary;
    color: $color-text-primary;
    
    &::placeholder {
      color: $color-text-muted;
    }
    
    &:focus {
      outline: none;
      border-color: $color-primary;
      box-shadow: $shadow-focus;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  &__textarea {
    resize: vertical;
    min-height: 150px;
  }
  
  &__button {
    width: 100%;
    font-family: $font-secondary;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    padding: $spacing-md $spacing-xl;
    background: $color-primary;
    color: white;
    border: none;
    border-radius: $radius-md;
    cursor: pointer;
    transition: all $duration-fast $ease-in-out;
    
    &:hover:not(:disabled) {
      background: $color-primary-dark;
      box-shadow: $shadow-lg;
    }
    
    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  
  &__status {
    margin-top: $spacing-lg;
    padding: $spacing-md;
    border-radius: $radius-md;
    font-family: $font-secondary;
    font-size: $font-size-sm;
    text-align: center;
    
    &--success {
      background: rgba(40, 167, 69, 0.1);
      color: $color-success;
      border: 1px solid $color-success;
    }
    
    &--error {
      background: rgba(220, 53, 69, 0.1);
      color: $color-error;
      border: 1px solid $color-error;
    }
  }
  
  &__socials {
    text-align: center;
  }
  
  &__socials-title {
    font-family: $font-primary;
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    margin-bottom: $spacing-lg;
  }
  
  &__socials-links {
    display: flex;
    justify-content: center;
    gap: $spacing-xl;
  }
  
  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 60px;
    background: white;
    border-radius: $radius-full;
    box-shadow: $shadow-md;
    transition: all $duration-fast $ease-in-out;
    
    svg {
      width: 30px;
      height: 30px;
      fill: $color-primary;
      transition: fill $duration-fast $ease-in-out;
    }
    
    &:hover {
      box-shadow: $shadow-lg;
      
      svg {
        fill: $color-primary-dark;
      }
    }
    
    &:focus-visible {
      outline: 2px solid $color-primary;
      outline-offset: 2px;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact__input,
  .contact__textarea,
  .contact__button,
  .contact__social-link {
    transition: none;
  }
}
```

### Performance Optimization Strategies

**1. Code Splitting**

Implement route-based code splitting for better initial load times:

```typescript
import { lazy, Suspense } from 'react';

const Projects = lazy(() => import('./components/Projects/Projects'));
const Contact = lazy(() => import('./components/Contact/Contact'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </Suspense>
  );
}
```

**2. Image Optimization**

- Use WebP format with fallbacks
- Implement lazy loading for images
- Optimize image sizes for different viewports
- Use responsive images with srcset

```typescript
<picture>
  <source
    srcSet={`${imagePath}.webp`}
    type="image/webp"
  />
  <img
    src={`${imagePath}.png`}
    alt={altText}
    loading="lazy"
  />
</picture>
```

**3. Animation Performance**

- Use CSS transforms instead of position changes
- Implement `will-change` for animated elements
- Use `requestAnimationFrame` for JS animations
- Debounce scroll event listeners

```typescript
const useDebounce = (callback: Function, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return (...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};
```

**4. Bundle Size Optimization**

- Tree-shake unused code
- Use dynamic imports for heavy libraries
- Analyze bundle with webpack-bundle-analyzer
- Remove unused dependencies

```bash
npm install --save-dev webpack-bundle-analyzer
```

**5. Caching Strategy**

Configure service worker for offline support and caching:

```typescript
// serviceWorker.ts
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});
```

**6. Font Loading Optimization**

Use font-display for better perceived performance:

```scss
@font-face {
  font-family: 'TrajanPro';
  src: url('./assets/font/TrajanProRegular.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
}
```

**7. Critical CSS**

Inline critical CSS for above-the-fold content:

```html
<style>
  /* Critical CSS for hero section */
  .hero {
    min-height: 100vh;
    display: flex;
    /* ... */
  }
</style>
```

**8. Preload Key Resources**

```html
<link rel="preload" href="/fonts/TrajanPro.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero-bg.webp" as="image">
```

## Accessibility Implementation

### Keyboard Navigation

**Focus Management:**

```typescript
// Trap focus within modal/dialog
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
};
```

### ARIA Labels

Ensure all interactive elements have appropriate labels:

```typescript
<button
  onClick={handleClick}
  aria-label="Navigate to projects section"
  aria-describedby="projects-description"
>
  View Projects
</button>

<span id="projects-description" className="sr-only">
  Scroll down to view my portfolio projects
</span>
```

### Screen Reader Support

```scss
// Screen reader only class
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Color Contrast

Ensure WCAG AA compliance (4.5:1 for normal text, 3:1 for large text):

```scss
// Use contrast checker during development
$text-on-light: #1a1a1a;  // Contrast ratio: 16.1:1 ✓
$text-on-dark: #ffffff;   // Contrast ratio: 21:1 ✓
$link-color: #145da0;     // Contrast ratio: 5.2:1 ✓
```

## Deployment and Build Configuration

### Environment Variables

```env
REACT_APP_SERVICE_ID=your_emailjs_service_id
REACT_APP_TEMPLATE_ID=your_emailjs_template_id
REACT_APP_PUBLIC_KEY=your_emailjs_public_key
```

### Build Optimization

```json
{
  "scripts": {
    "build": "react-scripts build",
    "build:analyze": "npm run build && npx webpack-bundle-analyzer build/static/js/*.js",
    "build:prod": "GENERATE_SOURCEMAP=false npm run build"
  }
}
```

### Deployment Checklist

- [ ] Run full test suite
- [ ] Check Lighthouse scores (Performance, Accessibility, Best Practices, SEO)
- [ ] Verify all images are optimized
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify all links work
- [ ] Test form submission
- [ ] Check console for errors
- [ ] Verify environment variables are set
- [ ] Test keyboard navigation
- [ ] Test with screen reader
- [ ] Verify reduced motion preferences work

