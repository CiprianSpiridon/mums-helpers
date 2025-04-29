# Maid Booking UI (Next.js)

This project is a user interface for booking maid cleaning services, built with Next.js and TypeScript.

## Project Structure

```
maid-booking-ui/
├── .next/           # Next.js build output (auto-generated)
├── public/          # Static assets (images, fonts, etc.) served directly
│   └── maid1.jpg
│   └── maid2.jpg
│   └── maid3.jpg
│   └── ...
├── src/             # Main application source code
│   ├── app/         # Next.js App Router pages and layouts
│   │   ├── my-bookings/ # Page for viewing past/scheduled bookings
│   │   │   └── page.tsx
│   │   ├── _not-found/  # Custom Not Found page (auto-generated)
│   │   ├── favicon.ico/ # Favicon handling (auto-generated)
│   │   ├── layout.tsx   # Root layout for the application
│   │   └── page.tsx     # Home page (booking form) of the application
│   ├── components/  # Reusable React components
│   │   ├── booking/     # Components specific to the booking form process
│   │   │   ├── steps/   # Individual step components for the multi-step form
│   │   │   │   ├── ServiceTypeStep.tsx
│   │   │   │   ├── PropertyStep.tsx
│   │   │   │   ├── ScheduleStep.tsx
│   │   │   │   ├── LocationStep.tsx
│   │   │   │   ├── ContactStep.tsx
│   │   │   │   └── ConfirmationStep.tsx
│   │   │   ├── AddressMapSelector.tsx # Combined address input and map selector
│   │   │   ├── BookingIcons.tsx       # Icons used in the booking form
│   │   │   ├── DesktopPriceDisplay.tsx# Component for desktop price summary
│   │   │   ├── FormSummary.tsx        # Summary component shown during booking steps
│   │   │   ├── GoogleMapComponent.tsx # Google Maps component with fixed center marker
│   │   │   ├── PriceBreakdownModal.tsx# Modal to show price details
│   │   │   ├── ProgressSteps.tsx      # Visual progress bar for the steps
│   │   │   └── StepNavigation.tsx     # Reusable Next/Back navigation buttons
│   │   ├── my-bookings/ # Components specific to the My Bookings page
│   │   │   ├── BookingCard.tsx      # Displays a single booking item
│   │   │   ├── BookingFilters.tsx   # Contains status tabs and service filter
│   │   │   └── EmptyState.tsx       # Displayed when no bookings match filters
│   │   ├── ui/          # General UI components (like FormField)
│   │   │   └── FormField.tsx        # Reusable form input component
│   │   ├── BookingForm.tsx # Main component orchestrating the multi-step booking form
│   │   ├── ClientLayoutWrapper.tsx # Client component applying dynamic html attrs
│   │   ├── Footer.tsx      # Application footer component
│   │   └── Header.tsx      # Application header component
│   ├── config/      # Configuration files
│   │   ├── pricingConfig.ts # Defines pricing rules and calculations
│   │   └── translations.ts  # Text strings for EN/AR localization
│   ├── context/     # React Context providers
│   │   ├── BookingContext.tsx   # Manages state for the booking form data
│   │   └── LanguageContext.tsx  # Manages current language state
│   └── lib/         # Utility functions
│       └── formatters.ts      # Helper functions for formatting/translation keys
│   └── hooks/       # Custom React hooks
│       └── useTranslation.ts  # Hook for accessing translations
├── .env.local       # Local environment variables (API keys, etc. - **DO NOT COMMIT**)
├── .gitignore       # Files and directories ignored by Git
├── eslint.config.mjs# ESLint configuration
├── next-env.d.ts    # TypeScript definitions for Next.js environment
├── next.config.ts   # Next.js configuration file
├── package.json     # Project dependencies and scripts
├── package-lock.json# Exact dependency versions
├── postcss.config.mjs # PostCSS configuration (for Tailwind CSS)
├── README.md        # This file
└── tsconfig.json    # TypeScript configuration
```

## Key Areas

*   **Routing & Pages (`src/app`)**: Uses the Next.js App Router.
    *   The main booking form is located at the root (`/`) defined in `src/app/page.tsx`.
    *   The "My Bookings" page is at `/my-bookings`.
    *   The root layout (`src/app/layout.tsx`) sets up providers and uses `ClientLayoutWrapper`.
*   **State Management (`src/context`)**: Uses React Context API.
    *   `LanguageContext`: Manages the application language (`en`/`ar`). Provided globally in `layout.tsx`.
    *   `BookingContext`: Manages the state of the multi-step booking form. Provided specifically around the form in `src/app/page.tsx`.
*   **Booking Form (`src/components/booking/`, `src/components/BookingForm.tsx`)**: Orchestrates the form flow, validation, and step rendering.
*   **Reusable UI (`src/components/ui/`, `src/components/booking/StepNavigation.tsx`, etc.)**: Contains general components like `FormField` and specific reusable parts like `StepNavigation`.
*   **My Bookings Page (`src/app/my-bookings/`, `src/components/my-bookings/`)**: Displays user bookings with filtering and uses extracted components (`BookingCard`, `BookingFilters`).
*   **Internationalization (i18n)**: Handled via `LanguageContext`, `useTranslation` hook (`src/hooks/`), and text definitions in `src/config/translations.ts`.
*   **Utilities (`src/lib/`)**: Contains shared helper functions like formatters.

## Key Libraries & Technologies

*   **[Next.js](https://nextjs.org/)**: React framework providing server-side rendering, routing (App Router), and build optimization.
*   **[React](https://react.dev/)**: JavaScript library for building user interfaces.
*   **[TypeScript](https://www.typescriptlang.org/)**: Superset of JavaScript adding static typing.
*   **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development.
*   **[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)**: Used for the interactive map and address geocoding (loaded via external script).
*   **[ESLint](https://eslint.org/)**: Pluggable linter tool for identifying and reporting on patterns in JavaScript/TypeScript.

## Environment Variables

Create a `.env.local` file in the project root for necessary API keys:

```dotenv
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
NEXT_PUBLIC_GOOGLE_MAPS_ID=YOUR_GOOGLE_MAPS_MAP_ID
```

Replace `YOUR_GOOGLE_MAPS_API_KEY` and `YOUR_GOOGLE_MAPS_MAP_ID` with your actual credentials from the Google Cloud Console. Ensure the Maps JavaScript API and Geocoding API are enabled.

## Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Set up environment variables:** Create `.env.local` as described above.
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Building for Production

```bash
npm run build
npm start
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
