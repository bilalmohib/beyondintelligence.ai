# Beyond Intelligence - Frontend Application

A Next.js-based frontend application for the Satori platform, featuring a comprehensive multi-step signup wizard for parent and child information collection.

## Table of Contents

- [Tech Stack & Libraries](#tech-stack--libraries)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Signup Flow](#signup-flow)
- [Form Implementation](#form-implementation)
- [Phone Number Handling](#phone-number-handling)
- [Error Handling & UX](#error-handling--ux)
- [State Management](#state-management)
- [Responsiveness & Accessibility](#responsiveness--accessibility)
- [Analytics & Privacy](#analytics--privacy)
- [API Integration](#api-integration)
- [Deployment](#deployment)

---

## Tech Stack & Libraries

### Core Framework
- **Next.js** `16.1.1` - React framework with App Router
- **React** `19.2.3` - UI library
- **TypeScript** `5.x` - Type safety

### Form Management & Validation
- **React Hook Form** `7.71.1` - Form state management and validation
- **Zod** `4.3.5` - Schema validation library
- **@hookform/resolvers** `5.2.2` - Integration between React Hook Form and Zod

### State Management
- **Redux Toolkit** `2.11.2` - State management (`@reduxjs/toolkit`)
- **React Redux** `9.2.0` - React bindings for Redux
- **RTK Query** - Data fetching and caching (included in Redux Toolkit)

### UI Components & Styling
- **Radix UI** - Headless UI primitives:
  - `@radix-ui/react-accordion` `1.2.12`
  - `@radix-ui/react-dialog` `1.1.15`
  - `@radix-ui/react-label` `2.1.8`
  - `@radix-ui/react-navigation-menu` `1.2.14`
  - `@radix-ui/react-popover` `1.1.15`
  - `@radix-ui/react-radio-group` `1.3.8`
  - `@radix-ui/react-separator` `1.1.8`
  - `@radix-ui/react-slot` `1.2.4`
  - `@radix-ui/react-switch` `1.2.6`
  - `@radix-ui/react-tooltip` `1.2.8`
- **Tailwind CSS** `4.x` - Utility-first CSS framework
- **class-variance-authority** `0.7.1` - Component variant management
- **clsx** `2.1.1` - Conditional className utility
- **tailwind-merge** `3.4.0` - Merge Tailwind classes intelligently
- **lucide-react** `0.562.0` - Icon library
- **react-icons** `5.5.0` - Additional icon library
- **next-themes** `0.4.6` - Dark mode support
- **cmdk** `1.1.1` - Command menu component

### Development Tools
- **Biome** `2.2.0` - Fast formatter and linter (`@biomejs/biome`)
- **Babel React Compiler** `1.0.0` - React compiler plugin
- **TypeScript** `5.x` - Type checking

### Build & Runtime
- **Node.js** - Runtime environment
- **PostCSS** `4.x` - CSS processing

---

## Project Structure

### Router Architecture
**Next.js App Router** (latest recommended approach)

The application uses the App Router pattern with route groups and dynamic segments:

```
src/app/
├── (auth)/
│   └── signup/
│       ├── start/                    # Initial signup page
│       ├── steps/
│       │   ├── (components)/          # Shared step components
│       │   │   ├── ContinueButton/
│       │   │   ├── SignupFormContext/
│       │   │   ├── SignupStepper/
│       │   │   └── StepTitle/
│       │   ├── (pages)/               # Step pages
│       │   │   ├── parent-information/
│       │   │   ├── child-information/
│       │   │   ├── how-their-breathing-behaves/
│       │   │   ├── home-and-school-environment/
│       │   │   ├── allergies-and-sensitivities/
│       │   │   ├── indoor-air/
│       │   │   ├── illness-and-recovery-tendencies/
│       │   │   └── your-experience-as-a-parent/
│       │   └── layout.tsx             # Steps layout wrapper
│       └── success/                   # Success page
├── components/                        # Shared components
├── hooks/                             # Custom React hooks
├── lib/                               # Utility libraries
├── redux/                             # Redux store and slices
└── utils/                             # Helper functions
```

### Signup Flow Routes

The signup process follows this multi-step wizard flow:

1. **Start**: `/signup/start`
2. **Step 1**: `/signup/steps/parent-information`
3. **Step 2**: `/signup/steps/child-information`
4. **Step 3**: `/signup/steps/how-their-breathing-behaves`
5. **Step 4**: `/signup/steps/home-and-school-environment`
6. **Step 5**: `/signup/steps/allergies-and-sensitivities`
7. **Step 6**: `/signup/steps/indoor-air`
8. **Step 7**: `/signup/steps/illness-and-recovery-tendencies`
9. **Step 8**: `/signup/steps/your-experience-as-a-parent`
10. **Success**: `/signup/success`

Each step is a separate page component with its own form validation, connected via a shared context and Redux store for state persistence.

---

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm run start
```

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

---

## Environment Configuration

### Environment Variables

The application expects the following environment variables:

- **`NEXT_PUBLIC_API_BASE_URL`** or **`API_BASE_URL`** - Backend API base URL

**Convention**: Using `NEXT_PUBLIC_` prefix for client-accessible variables, or `API_BASE_URL` for server-side only.

**Example**:
```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
# or
API_BASE_URL=https://api.example.com
```

**Note**: Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Use non-prefixed variables for server-only configuration.

---

## Signup Flow

### Flow Type
**Multi-step wizard** - Each step is a separate route with its own form validation.

### State Persistence
- Form data is stored in **Redux** as users progress through steps
- Data persists across navigation until final submission
- Form validation occurs on each step before proceeding

### Step Navigation
- Users navigate forward using the "Continue" button
- Each step validates before allowing progression
- On the final step, "Continue" becomes "Submit"
- After submission, users are redirected to `/signup/success`

### Form Context
A custom `SignupFormContext` manages form registration and validation across steps, allowing the shared `ContinueButton` component to validate and extract data from the current step's form.

---

## Form Implementation

### Form Library
**React Hook Form** (`react-hook-form`) with **Zod** schema validation via `@hookform/resolvers/zod`.

### Validation Strategy

#### Client-Side Validation
All forms use **Zod schemas** for comprehensive client-side validation:

- **Required Fields**: Enforced via `.min(1)` or `.enum()` constraints
- **Email Format**: Validated using Zod's `.email()` validator
- **Phone Format**: E.164 format validation (see [Phone Number Handling](#phone-number-handling))
- **Enum Enforcement**: Radio groups and selects use `.enum()` with specific allowed values
- **Age Validation**: Currently required; min/max constraints can be added (currently `.min(1).max(18)` for child age)
- **String Length**: Minimum length requirements where applicable

#### Validation Mode
Forms use `mode: "onChange"` for real-time validation feedback.

### Optional Fields Handling
**All fields are currently required** - No optional fields in the current implementation. Empty strings are not sent; all fields must have valid values before submission.

### Multi-Select Fields
Multi-select fields are represented as **arrays of strings** (not comma-separated strings).

Example:
```typescript
triggers: string[]  // ["pollen", "dust", "exercise"]
allergies: string[] // ["peanuts", "dairy"]
```

### Data Normalization
All form data is normalized before submission using the `normalizeFormData` utility function:

- **String Trimming**: All string values are trimmed (leading/trailing whitespace removed)
- **Recursive Processing**: Handles nested objects and arrays
- **Primitive Preservation**: Numbers, booleans, and other primitives remain unchanged

This normalization occurs:
1. When saving to Redux (via `ContinueButton`)
2. Before final API submission (via `useSignupData` hook)

---

## Phone Number Handling

### Phone Input Component
Custom implementation using:
- `@/components/ui/input` with `type="tel"`
- Wrapped in React Hook Form `Controller` component
- No specialized phone input library

### E.164 Format Compliance

#### Storage Format
Phone numbers are stored and submitted in **canonical E.164 format** with leading `+`:
- Format: `+[country code][subscriber number]`
- Example: `+1234567890`, `+923081511889`
- Validation: Regex `/^\+[1-9]\d{1,14}$/` ensures:
  - Starts with `+`
  - Country code is 1-3 digits starting with 1-9
  - Total digits after `+` must be 1-15
  - No leading zeros in country code

#### Display Format
The UI shows formatted phone numbers for better UX while preserving E.164 in form state:

- **US/Canada**: `+1 (234) 567-8900`
- **UK**: `+44 20 1234 5678`
- **Generic International**: Progressive formatting based on length

#### Implementation Details
- **Normalization Function**: `normalizePhoneToE164()` converts user input to E.164
- **Display Function**: `formatPhoneDisplay()` formats E.164 for display
- **Two-Way Binding**: Display value updates as user types, canonical value stored in form state
- **Real-time Validation**: Visual feedback shows valid E.164 format confirmation

### International Support
- **Not US-only**: Supports international phone numbers
- **No Country Dropdown**: Currently no country selector in the design
- **E.164 Standard**: All numbers follow E.164 international standard
- **Progressive Formatting**: Display formatting adapts based on detected country code patterns

---

## Error Handling & UX

### Error Display Components

#### Inline Field Errors
✅ **Implemented** - Each form field displays validation errors inline:
- Error messages appear below the field in red text
- Fields show red border on validation error
- ARIA attributes (`aria-invalid`, `aria-describedby`) for accessibility
- Error messages have `role="alert"` for screen readers

#### Global Error Banner
⚠️ **Planned** - Global error banner for API-level errors (422, 409, 500) will be implemented.

### Backend Error Mapping

#### 422 Validation Errors
**Status**: ✅ Can map `422.detail[].loc` to fields cleanly

The application structure supports mapping backend validation errors to specific form fields. Implementation will:
- Parse `422.detail[]` array from backend response
- Map `loc` array (field path) to React Hook Form field names
- Display errors inline on corresponding fields
- Handle nested field paths (e.g., `["parentInformation", "phone"]`)

#### 409 Phone Already Exists
**Status**: ⚠️ **Planned** - UX will:
- Stop signup flow
- Display clear error message
- Show instructions for phone verification/login
- Prevent resubmission with same phone number

#### 500 Server Errors (Stripe/S3 Failures)
**Status**: ⚠️ **Planned** - UX will:
- Display user-friendly error message
- Indicate temporary service issue
- Provide retry option (manual, not automatic)
- No silent resubmission or auto-retry

### Error Handling Principles
- ✅ **No Auto Retry**: Confirmed - no automatic retry logic
- ✅ **No Silent Resubmission**: Confirmed - user must explicitly retry
- ✅ **User-Friendly Messages**: Error messages will be clear and actionable
- ✅ **Accessibility**: Error states include proper ARIA attributes

---

## State Management

### Redux Store Structure

The application uses **Redux Toolkit** for state management:

```typescript
store/
├── signupSlice.ts    # Signup form data state
└── apiSlice.ts       # RTK Query API endpoints
```

### Signup Form State

Form data is organized by step in the Redux store:

```typescript
interface SignupFormData {
  parentInformation?: { ... }
  childInformation?: { ... }
  howTheirBreathingBehaves?: { ... }
  homeAndSchoolEnvironment?: { ... }
  allergiesAndSensitivities?: { ... }
  indoorAir?: { ... }
  illnessAndRecoveryTendencies?: { ... }
  yourExperienceAsAParent?: { ... }
}
```

### Data Flow
1. User fills form on current step
2. On "Continue", form validates and saves to Redux
3. Data persists across navigation
4. On final step, all data is aggregated and prepared for API submission
5. Data normalization occurs before saving and before submission

---

## Responsiveness & Accessibility

### Mobile Strategy
**Status**: ⚠️ **Pending Design** - Currently desktop-first implementation

**Planned Approach**:
- Full responsive design once mobile designs are provided
- Form inputs will be optimized for mobile:
  - Adequate tap targets (minimum 44x44px)
  - Font sizes preventing auto-zoom
  - Touch-friendly form controls
  - Responsive layout stacking

### Accessibility Features

#### ARIA Attributes
- ✅ `aria-label` on form elements
- ✅ `aria-required` for required fields
- ✅ `aria-invalid` for error states
- ✅ `aria-describedby` linking fields to error messages
- ✅ `role="alert"` on error messages

#### Semantic HTML
- ✅ Proper form structure
- ✅ Label associations
- ✅ Input types (`email`, `tel`, `number`)
- ✅ Form submission handling

#### Keyboard Navigation
- ✅ Tab order follows visual flow
- ✅ Form submission via Enter key
- ✅ Focus management on errors

---

## Analytics & Privacy

### PII Logging
**Status**: ⚠️ **Needs Production Fix**

**Current State**:
- Development logging exists in `useSignupData.ts` hook
- Console logs complete signup data (includes PII)

**Production Requirements**:
- ✅ **No PII Logging**: Console logs must be removed or gated behind development mode
- ✅ **No Monitoring Tools**: PII must not be sent to monitoring/analytics tools
- ✅ **Data Sanitization**: Any logging must sanitize sensitive fields

### Analytics Tools
**Status**: ✅ **No Analytics Currently**

- No analytics tools capturing form field values
- No third-party tracking scripts
- Privacy-compliant implementation

### Privacy Best Practices
- Form data only stored in Redux (client-side)
- No persistent storage of PII
- Data cleared after successful submission
- No tracking pixels or analytics on form pages

---

## API Integration

### Submission Method
**Planned**: **Next.js Server Actions** or **Server Routes**

The final submission will use one of:
- **Server Actions**: Next.js server actions for type-safe API calls
- **Server Routes**: API routes (`/api/*`) proxying to backend

**Current State**: Form data collection and validation complete. API integration pending backend endpoint confirmation.

### API Contract

#### Expected Payload Structure
The aggregated form data structure matches the Redux store:

```typescript
{
  // Parent Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string; // E.164 format
  smsConsent: string;

  // Child Information
  firstName: string;
  lastName: string;
  age: number;
  asthmaDescription: "mild" | "moderate" | "severe" | "not sure";

  // How Their Breathing Behaves
  symptomsWorseTime: string;
  triggers: string[]; // Array of strings
  symptoms: string[];
  timeOutdoors: string;
  mostActiveTime: string;
  playsSports: string;
  awayFromChild: string[];

  // Home & School Environment
  usesAirPurifier: string;
  homeAddress: string;
  schoolAddress: string;

  // Allergies & Sensitivities
  hasAllergies: string;
  allergies: string[]; // Array of strings

  // Indoor Air
  hasPets: string;
  homeFeelsHumid: string;
  waterLeaksOrMustySmells: string;
  usesGasStove: string;

  // Illness & Recovery Tendencies
  catchesColdsOften: string;
  usesGasStove: string;

  // Your Experience as a Parent
  worries: string[]; // Array of strings
}
```

#### Data Formatting
- All strings are **trimmed** (no leading/trailing whitespace)
- Phone numbers in **E.164 format** (`+1234567890`)
- Multi-select fields as **arrays** (not comma-separated)
- No empty strings for required fields
- Enum values match backend expectations

### Error Response Handling

#### 422 Validation Errors
```json
{
  "detail": [
    {
      "loc": ["field", "path"],
      "msg": "Error message",
      "type": "error_type"
    }
  ]
}
```

**Mapping Strategy**: Parse `loc` array to determine field path and display error inline.

#### 409 Conflict (Phone Exists)
```json
{
  "detail": "Phone number already registered"
}
```

**UX**: Display error banner with verification instructions.

#### 500 Server Error
```json
{
  "detail": "Internal server error"
}
```

**UX**: Display user-friendly error message, allow manual retry.

---

## Deployment

### Current Deployment
**Vercel**: https://beyondintelligence-ai.vercel.app

**Staging URL**: https://beyondintelligence-ai.vercel.app/signup/start

**Note**: This deployment is temporary and will be removed once integration is approved.

### Deployment Configuration
- **Platform**: Vercel
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### Environment Variables
Set in Vercel dashboard:
- `NEXT_PUBLIC_API_BASE_URL` or `API_BASE_URL`

---

## Integration Deliverables

### Typed Contract
✅ **Requested** - TypeScript types and Zod schemas can be extracted to a shared contract file for backend alignment.

### Integration Guide Format
✅ **Requested** - Final integration guide will be provided in **Notion** format with:
- Complete API contract
- Field definitions and enums
- Example payloads
- Error handling specifications
- Testing guidelines

---

## Development Notes

### Code Quality
- **Linter**: Biome for fast linting and formatting
- **Type Safety**: Full TypeScript coverage
- **React Compiler**: Enabled for optimized React rendering

### Best Practices
- ✅ Form validation before navigation
- ✅ Data normalization before submission
- ✅ Accessibility-first approach
- ✅ Type-safe form handling
- ✅ Clean separation of concerns
- ✅ Reusable component architecture

---

## License

Private - Internal use only

---

## Contact & Support

For integration questions or issues, please refer to the integration guide or contact the development team.
