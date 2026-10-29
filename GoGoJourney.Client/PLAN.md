# SkyLimit Front-End Plan

## Product and scope

SkyLimit is an Android and iOS mobile app that will connect travel agencies, travellers, and drivers for trip management. This repository contains the front end only; the future .NET and PostgreSQL backend is explicitly out of scope.

The flow will be authentication, agency onboarding, and a four-tab agency shell, Fleet, Trip, and Profile functionality.

Public branding:

- App name: **SkyLimit**
- Native identifiers: `com.skylimit.app` and `skylimit`
- WhatsApp support target: `+919677540499`
- Logo source: `e:\Downloads\Skylimit Helping Hand Logo.png`
- Use the supplied logo in the app and derive a square native icon from its helping-hand mark.

## Technology and architectural boundaries

- Expo SDK 57, React Native, TypeScript strict mode, and Expo Router.
- Keep routes in `src/app/`; keep UI, services, hooks, mocks, types, and theme under `src/`.
- Use Expo Router native tabs (`expo-router/unstable-native-tabs`) for navigation.
- Use NativeWind and its approved Tailwind CSS development dependency.
- Use `@clerk/clerk-expo` with `expo-secure-store` for authentication/session token caching.
- Use React Query for data access, React Hook Form and Zod for forms, and Expo Google Inter fonts.
- Do not add any other packages without approval.
- Use a service boundary for every domain. Screens call React Query hooks only; hooks call async service modules. Mock services will later be replaced by REST/JSON calls without changing UI screens.
- The future API contract is REST/JSON using Clerk JWTs. The .NET backend will verify tokens and resolve the agency/user relationship.

## Security, environments, and current constraints

- Configure only `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY` in the mobile app environment. Never include a Clerk secret key in client code, `.env` files committed to Git, or Expo public configuration.
- Rotate the Clerk secret previously shared in chat before any backend use.
- Google is enabled in the configured Clerk instance and is the only real social provider enabled in the first review.
- The first review uses Expo Go on Android and iOS.
- No analytics or third-party error-reporting SDK is included in v1.
- Use English copy, structured to permit future localization.
- Step 1 uses the specified light visual design. A persisted light/dark/system selector belongs in the later Profile milestone.

## Visual and accessibility direction

- Primary UI color: teal `#0F766E`; accent: amber `#F59E0B`; white cards and neutral grays.
- The supplied blue SkyLimit logo is branding-only; it does not replace the teal primary interaction palette.
- Use Inter typography, rounded cards, generous mobile spacing, and a minimal mobile-first layout.
- Provide semantic labels and roles, at least 44pt touch targets, keyboard-safe forms, visible focus behavior, and cues that do not depend on color alone.

## Step 1: authentication, onboarding, and tab shell

### Routes and session gating

1. Signed-out users see a SkyLimit welcome screen with a Google sign-in action.
2. After successful sign-in, users without a stored role choose Agency, Traveller, or Driver.
3. An Agency user without a completed agency profile is required to complete onboarding before accessing tabs.
4. A completed Agency user opens the agency tab shell.
5. Traveller and Driver users see a friendly Coming soon screen with a WhatsApp support action and sign-out control.

Roles are fixed in v1. Local records are keyed by Clerk user ID, so one device cannot leak an agency profile to another account. Signing out preserves that user's profile; signing in as a different Clerk user starts a separate onboarding flow.

### Agency profile

Required fields:

- Agency name
- Valid Indian mobile number
- Address

Optional fields:

- Clerk email, prefilled and editable
- Business details

Persist onboarding and agency-profile data securely on-device. A small local onboarding/profile service and React Query hooks provide the same boundary that future API-backed profile services will use.

### Tab shell

Provide four native tabs: Home, Fleet, Trip, and Profile.

- Home shows a greeting using the saved agency name.
- Fleet, Trip, and Profile are polished placeholders that state the relevant functionality is coming in its next milestone.
- No Fleet CRUD, trip workflow, notifications, feedback, demo controls, or profile editor is implemented in Step 1.

### Step 2: Fleet

- Vehicles, Drivers, and Travellers segmented Fleet views with search, list, add, detail, edit, and deletion confirmation.
- Vehicle category/type rules, registration number, and model.
- Driver contact data, gender, supported vehicle types, availability, completed-trip count, and feedback summary.
- Traveller contact data and an invitation sheet supporting WhatsApp or email with mock sending and Sent/Registered state.
- Seed realistic South Indian agency, people, routes, vehicles, and INR values in mock services.

### Step 3: Trips

- Status-filtered trips using New, Clarification, Accepted, Assigned, In Progress, Completed, and Rejected states.
- Trip detail with traveller, route, vehicle, Agency-only payment information, notes, actions, and timeline.
- Accept, reject with reason, clarification thread, review-again action, compatible available-driver assignment, and simulated driver responses.
- Completion feedback display with rating and comment.

### Step 4: Notifications, profile, and demo controls

- Notification list and deep links to related trips.
- Agency profile viewing/editing, per-driver feedback, and logout.
- Development-only demo controls that simulate driver/traveller events, mutate mock state, and create notifications.
- Persisted light/dark/system appearance selector.

## Domain data and mock-service rules

- Put future Vehicles, Drivers, Travellers, Trips, Notifications, and Feedback access in separate `src/services/` async modules.
- Use an in-memory store with a small artificial delay until backend services exist.
- React Query owns loading, error, cache, and mutation state; every list must eventually show loading, empty, and error states.
- Use the defined status colors: New blue, Clarification amber, Accepted teal, Assigned purple, In Progress orange, Completed green, and Rejected red.

## Validation and acceptance criteria

For Step 1, run:

```powershell
npx expo lint
npx tsc --noEmit
```

Manually verify on Android and iOS through Expo Go:

- Signed-out welcome state and Google sign-in.
- Required role selection and required agency onboarding fields.
- Profile persistence across app restarts.
- Per-Clerk-user isolation on a shared device.
- Home greeting after completed agency setup.
- Fleet, Trip, and Profile placeholders.
- Traveller/Driver Coming soon state, WhatsApp action, and sign-out.
- Accessibility basics for touch targets, labels, and keyboard behavior.

## Remaining delivery prerequisites and risks

- Future store distribution requires native build configuration and credentials despite the current Expo Go review approach.
- A future backend must implement Clerk JWT verification, agency ownership, and API authorization before replacing mock services.
- Replace the temporary/generated square icon with an approved final asset if brand review requires one.
