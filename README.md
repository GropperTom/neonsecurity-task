## Project Architecture & Decisions

### Approach
The project is structured for clarity and scalability, using Next.js for routing and SSR, colocating components and their styles, and separating utility logic and types. TypeScript ensures type safety throughout. Storybook is used for isolated UI development, and Jest for robust testing.

### Trade-offs & Decisions
- **Colocation vs. Centralization:** Styles are colocated with components for modularity and maintainability.
- **Mocking in Tests:** Used simple mocks for CSS and flags to keep tests fast and focused on logic, not rendering.
- **CI Simplicity:** Chose GitHub Actions for its integration and ease of use, running lint, type-check, tests, and build on every push/PR.
 - **Static Data Fetching:** Used Next.js `getStaticProps` with a utility (`mapCountryTimesToEntries`) to load and transform country/timezone data at build time. This provides fast page loads and avoids runtime data fetching, but means updates to the data require a rebuild/deploy. Since our data is not frequently (or ever) changed, this is a reasonable trade-off for this project.

### "Behind the Scenes" Answers
1. **How did you handle time zone data?**
	- Used a static JSON file for country/timezone data, mapped to UI entries via a utility function for flexibility and testability.
2. **How would you scale this for more countries or dynamic data?**
	- Abstract the data source (API or DB), and update the mapping utility to handle new formats.
3. **How did you ensure code quality?**
	- Enforced with ESLint, TypeScript, and CI. Logic is covered by unit tests, and UI by Storybook stories.
4. **What would you improve with more time?**
	- Add e2e tests (e.g., Cypress), improve accessibility, and add more robust error handling and loading states.

# NeonSecurity Task

This project is a Next.js-based application, featuring country/timezone pickers and related UI components. It includes Storybook for UI development, Jest for testing, and ESLint/TypeScript for code quality.

## Features
- **Next.js** for SSR/SSG React app
- **TypeScript** for type safety
- **Storybook** for component development
- **Jest** for unit testing
- **ESLint** and **Prettier** for code quality
- **CI/CD** via GitHub Actions

## Getting Started

### Prerequisites
- Node.js 20+
- npm (comes with Node.js)

### Installation
```bash
npm ci
```

### Development
Start the development server:
```bash
npm run dev
```

### Storybook
Run Storybook for isolated component development:
```bash
npm run storybook
```

### Linting
Check code quality with ESLint:
```bash
npm run lint
```

### Type Checking
Run TypeScript type checks:
```bash
npm run type-check || npx tsc --noEmit
```

### Testing
Run all unit tests:
```bash
npm test
```

### Build
Build the production app:
```bash
npm run build
```

## Project Structure
- `components/` — React UI components
- `pages/` — Next.js pages
- `data/` — Static data (e.g., countryTimes.json)
- `utils/` — Utility functions
- `types/` — TypeScript types
- `public/` — Static assets
- `__mocks__/` — Jest/Storybook mocks
- `.github/workflows/ci.yml` — CI pipeline

## Continuous Integration
GitHub Actions runs lint, type-check, tests, and build on every push/PR to main/master.

## License
MIT

