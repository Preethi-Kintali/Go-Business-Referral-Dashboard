# Referral Dashboard

## Project Overview
A frontend React application built for Go Business to help users track their referrals, view earnings, and monitor partner activity. It includes a login flow, an overview dashboard, a searchable referral table, and detailed views for individual referrals.

## Tech Stack
- **React 18**
- **React Router v6** (Routing)
- **Tailwind CSS** (Styling)
- **Axios** (Data fetching)
- **js-cookie** (Session management)
- **Vite** (Build tool)

## Project Structure
The folder structure is kept flat and easy to navigate:
- `src/components/`: Reusable UI elements (buttons, inputs) and larger sections like `ReferralTable`.
- `src/pages/`: Main route components (`Login`, `Dashboard`, `ReferralDetails`, `NotFound`).
- `src/api.js`: Unified Axios instance and API fetch functions.
- `src/AuthContext.jsx`: Authentication state provider.
- `src/App.jsx`: Main entry point handling all routes and layout wrappers.

## Implementation Notes
- I placed all external requests in a single `api.js` file instead of fetching directly inside components. This keeps the endpoints easy to track and update.
- I kept the component hierarchy shallow. The `Dashboard` component handles its own layout and renders the metrics, which avoids hiding logic behind too many wrapper files.
- The table component handles its own client-side pagination, sorting, and debounced searching to keep the parent dashboard component clean.

## State Management
- Global state is handled using React Context (`AuthContext`). It only manages the authentication token and user session data.
- Local state (`useState` and `useEffect`) handles data fetching for specific pages, such as loading the dashboard metrics or tracking the current page of the table.
- Since the data requirements are straightforward, adding Redux or a heavy state management library wasn't necessary.

## Routing
- React Router manages the client-side navigation.
- A `ProtectedRoute` component wraps private routes, checking the `AuthContext` for a valid token. If no token is found, it redirects the user to the `/login` page.
- Users who visit the login page while already authenticated are automatically redirected to the dashboard.

## Handling Edge Cases
- **Missing referrals**: If a user navigates to a referral ID that doesn't exist, the error is caught and a clean empty state is shown instead of a blank screen.
- **Search input**: The table search bar uses a custom `useDebounce` hook to wait 500ms before triggering a filter update, preventing unnecessary re-renders while typing.

## Installation & Running the Project

1. Install the dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
