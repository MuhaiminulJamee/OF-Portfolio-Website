# AI in Power Systems & Quantum Cyber Intelligence Labs

A research, education, and consulting website for Md. Omer Faruque. The site combines two research labs, a publication database, course catalog, research mentorship, consulting services, resources, insights, and a protected content-management workspace.

## Live site

[ai-power-quantum-labs.yingdanong7.chatgpt.site](https://ai-power-quantum-labs.yingdanong7.chatgpt.site)

The published site is private by default and may ask you to sign in with the owning ChatGPT account.

## Requirements

- Node.js 22.13 or newer
- npm
- Visual Studio Code, recommended

Check your installed versions:

```powershell
node --version
npm --version
```

## Run in VS Code

Open PowerShell and run:

```powershell
cd "C:\Users\Admin\Documents\ChatGPT\MIN"
code .
```

In VS Code, open **Terminal → New Terminal** and install the dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open the `Local` URL shown in the terminal. Stop the server with `Ctrl+C`.

## Production build

Create and run a local production build:

```powershell
npm run build
npm run start
```

The build output is generated in `dist/`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with live reloading |
| `npm run build` | Create the production build |
| `npm run start` | Run the generated Cloudflare Worker locally |
| `npm run lint` | Check the source for lint problems |
| `npm run format` | Format the project files |
| `npm run db:generate` | Generate a database migration after schema changes |

## Main pages

- `/` — homepage and overview
- `/labs/power-systems` — AI in Power Systems Lab
- `/labs/quantum-cyber` — Quantum Cyber Intelligence Lab
- `/research` — searchable publication database
- `/courses` — course catalog and enrollment routes
- `/research-with-us` — six-month research pathway and application form
- `/consulting` — consulting services and inquiry form
- `/resources` — code, datasets, notebooks, and source PDFs
- `/insights` — research notes and newsletter
- `/about` — professional profile and experience
- `/contact` — general contact form
- `/admin` — protected content and submission management

## Project structure

```text
app/                 Pages, layouts, and API routes
components/          Shared interface and form components
components/ui/       Reusable UI primitives
db/                  D1 database bindings and schema
drizzle/             Generated SQLite migrations
lib/                 Site content and server-side utilities
public/              Images, favicon, and public assets
.openai/hosting.json Sites runtime binding configuration
```

## Data and uploads

The deployed site uses:

- Cloudflare D1 for subscribers, inquiries, enrollments, and published content
- Cloudflare R2 for admin-uploaded images, videos, PDFs, datasets, notebooks, and scripts
- ChatGPT sign-in protection for the admin workspace

Local development data and uploads are separate from the data stored by the published site.

If you change `db/schema.ts`, generate and inspect a new migration before rebuilding:

```powershell
npm run db:generate
npm run build
```

## Editing content

Most initial publications, courses, projects, resources, and profile information are defined in `lib/content.ts`. Shared visual styling is in `app/globals.css`.

Additional content can be created and published from `/admin` without editing source files. The admin page also shows submitted inquiries, enrollment requests, subscribers, and uploaded files.

## Notes

- Do not commit passwords, API keys, access tokens, or `.env` files.
- Keep `.openai/hosting.json` in the project because it declares the hosted database and file-storage bindings.
- Course enrollment requests are implemented. Automatic payment processing requires a separate payment-provider integration.
