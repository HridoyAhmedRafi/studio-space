# StudioSpace — Creative Studio Booking Platform

StudioSpace is a full-stack marketplace where creators discover production-ready
spaces (photo studios, sound stages, podcast rooms, music suites, and art
workshops) and book them by the hour. Hosts can list and manage their own
studios, while creators track every booking request from a personal dashboard.

## Live Site

**URL:** https://studio-space-three.vercel.app

> Deployment note: replace the URL above with the production link once the app
> is deployed.

## Features

- **Browse & search the marketplace** — filter studios by category (Photo
  Studio, Film Stage, Podcast Lounge, Music Suite, Workshop, Creative Space) or
  search across title, location, amenities, and overview.
- **Shareable category deep links** — `/studios?category=Film%20Stage` pre-selects
  the matching filter, so category cards on the homepage jump straight to the
  right results.
- **Rich studio detail pages** — gallery, amenities, capacity, location, host
  details, pricing, and booking sidebar.
- **Hourly booking flow** — pick date, start/end time, and guest count; the modal
  calculates duration, hourly total, security deposit, and estimated total live
  before submitting a request.
- **Host dashboard** — add, edit, and delete your own studio listings, with
  instant feedback on every action.
- **Booking management** — a personal bookings list with status badges (Pending
  Host Approval, Confirmed, Completed, Cancelled), receipt/cancel actions, and
  live cancellation updates.
- **Authentication** — email & password plus Google OAuth via Better Auth, with
  guarded booking and dashboard routes.
- **Polished UX** — light/dark theme, branded toast notifications, loading
  feedback, friendly empty states, and a custom 404 page.

## Tech Stack

| Layer     | Technology                                             |
| --------- | ------------------------------------------------------ |
| Framework | Next.js 16.4.3 (App Router, Turbopack, React Compiler) |
| UI        | React 19.3, Tailwind CSS v4, shadcn/ui, Base UI        |
| Language  | TypeScript 5                                           |
| Auth      | Better Auth + MongoDB adapter                          |
| Database  | MongoDB                                                |
| Feedback  | react-hot-toast                                        |
| Icons     | lucide-react (custom inline SVG brand icons)           |
| Linting   | ESLint 9 (eslint-config-next)                          |

## Local Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd studio-space
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** in the project root:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   BETTER_AUTH_URL=http://localhost:3000
   MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/StudioSpace
   GOOGLE_CLIENT_ID=<google-oauth-client-id>
   GOOGLE_CLIENT_SECRET=<google-oauth-client-secret>
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open** http://localhost:3000 in your browser.

> The client expects the StudioSpace API (bookings, studios, auth) to be running
> at `NEXT_PUBLIC_API_URL`.

### Available Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server on port 3000    |
| `npm run build` | Create an optimized production build |
| `npm start`     | Serve the production build           |
| `npm run lint`  | Run ESLint                           |

## Examiner Test Credentials

Use the demo account below to review authenticated flows (booking, host
dashboard, booking management):

| Field    | Value                      |
| -------- | -------------------------- |
| Email    | `examiner@studiospace.com` |
| Password | `Examiner@123`             |

> These are demo credentials for evaluation only and can be changed at any time
> from the account settings.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           # Login & register
│   ├── (dashboard)/      # My listings, my bookings, add studio
│   ├── studios/          # Marketplace + studio detail routes
│   ├── layout.tsx        # Root layout (navbar, toaster)
│   └── page.tsx          # Homepage
├── components/
│   ├── dashboard-components/
│   ├── home/
│   ├── shared/           # Navbar, footer, theme toggle
│   └── ui/               # shadcn/Base UI primitives
└── lib/                  # Auth client/config, types, helpers
```

## License

Built for educational and portfolio purposes.
