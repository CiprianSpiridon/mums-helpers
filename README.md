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
│   │   ├── (booking)/ # Route group for booking form pages
│   │   │   └── page.tsx # Main booking form page
│   │   ├── my-bookings/ # Page for viewing past/scheduled bookings
│   │   │   └── page.tsx
│   │   ├── _not-found/  # Custom Not Found page (auto-generated)
│   │   ├── favicon.ico/ # Favicon handling (auto-generated)
│   │   ├── layout.tsx   # Root layout for the application
│   │   └── page.tsx     # Home page of the application
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
│   │   │   ├── FormStepProgress.tsx   # Progress indicator for steps (potentially unused)
│   │   │   ├── FormSummary.tsx        # Summary component shown during booking steps
│   │   │   ├── GoogleMapComponent.tsx # Google Maps component with fixed center marker
│   │   │   ├── PriceBreakdownModal.tsx# Modal to show price details
│   │   │   └── ProgressSteps.tsx      # Visual progress bar for the steps
│   │   ├── BookingForm.tsx # Main component orchestrating the multi-step booking form
│   │   ├── Footer.tsx      # Application footer component
│   │   └── Header.tsx      # Application header component
│   ├── config/      # Configuration files
│   │   └── pricingConfig.ts # Defines pricing rules and calculations
│   └── lib/         # Utility functions or library code (if any)
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
    *   The main booking form is located at the root (`/`) defined in `src/app/(booking)/page.tsx`.
    *   The "My Bookings" page is at `/my-bookings`.
    *   The root layout (`src/app/layout.tsx`) likely includes the `Header` and `Footer`.
*   **Booking Form Logic (`src/components/BookingForm.tsx`)**: This component manages the state for the multi-step form, handles navigation between steps, performs validation, and calculates the total cost using the pricing configuration.
*   **Booking Steps (`src/components/booking/steps/`)**: Each file in this directory represents a distinct step in the booking process (Service Type, Property Details, Schedule, Location, Contact Info, Confirmation).
*   **Map Component (`src/components/booking/GoogleMapComponent.tsx`)**: Provides the interactive map for address selection, featuring a marker fixed to the center of the viewport. Requires Google Maps API keys set in `.env.local`.
*   **Pricing (`src/config/pricingConfig.ts`)**: Contains the core logic for calculating the booking cost based on service type, property details, number of rooms, and duration.
*   **Styling**: Primarily uses Tailwind CSS, configured via `tailwind.config.ts` (implicitly included via PostCSS) and `globals.css` (likely imported in `layout.tsx`).

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
