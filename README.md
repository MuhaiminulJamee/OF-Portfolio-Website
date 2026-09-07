# Md. Omer Faruque — Research Labs Website

A responsive research, education, mentorship, and consulting website for Md. Omer Faruque. It brings together the AI in Power Systems Lab and Quantum Cyber Intelligence Lab, publications, courses, research resources, insights, inquiry forms, and a protected administration workspace.

## Live website

[ai-power-quantum-labs.yingdanong7.chatgpt.site](https://ai-power-quantum-labs.yingdanong7.chatgpt.site)

The published website is currently private and may require the owning ChatGPT account to sign in.

## Requirements

Install the following before running the project:

- [Node.js](https://nodejs.org/) 22.13 or newer
- npm, included with Node.js
- [Git](https://git-scm.com/) if downloading with `git clone`
- [Visual Studio Code](https://code.visualstudio.com/), recommended

Confirm that Node.js and npm are available:

```bash
node --version
npm --version
```

## Download the project

Choose either method below.

### Option 1: Clone with Git

Use this option when you have access to the project's Git repository:

```bash
git clone <repository-url>
cd <downloaded-folder>
```

Replace `<repository-url>` with the shared repository URL and `<downloaded-folder>` with the folder created by Git.

### Option 2: Download a ZIP

1. Download the shared project ZIP. On GitHub, select **Code → Download ZIP**.
2. Extract the ZIP to a normal writable folder such as `Documents`.
3. Open the extracted project folder. The correct folder contains `package.json`, `package-lock.json`, `app`, `components`, and `public`.

The project owner can create a clean ZIP from a committed checkout with:

```bash
git archive --format=zip --output=md-omer-faruque-website-source.zip HEAD
```

This includes tracked source files while excluding generated folders such as `node_modules` and `dist`.

## Run in Visual Studio Code

1. Open Visual Studio Code.
2. Select **File → Open Folder** and choose the downloaded or extracted project folder.
3. Select **Terminal → New Terminal**.
4. Install the exact dependency versions from `package-lock.json`:

```bash
npm ci
```

5. Start the development server:

```bash
npm run dev
```

6. Open the `Local` address printed in the terminal, normally [http://localhost:3000](http://localhost:3000).

Changes to the source update automatically while the development server is running. Press `Ctrl+C` in the terminal to stop it.

You can also open the project from a terminal:

```bash
cd path/to/downloaded-folder
code .
```

If PowerShell does not recognize `npm`, close and reopen Visual Studio Code after installing Node.js. On Windows, `npm.cmd ci` and `npm.cmd run dev` can be used if PowerShell prevents the `npm.ps1` launcher from running.

## Test a production build locally

Create the optimized build:

```bash
npm run build
```

Then start the generated Cloudflare Worker locally:

```bash
npm run start
```

The build output is written to `dist/`. Run `npm run build` again after making source changes before using `npm run start`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with live reloading |
| `npm run build` | Create the optimized production build |
| `npm run start` | Run the generated Cloudflare Worker locally |
| `npm run lint` | Check the source for lint problems |
| `npm run format` | Format project files |
| `npm run db:generate` | Generate a database migration after schema changes |

## Main pages

- `/` — homepage and research overview
- `/about` — professional profile, education, experience, and research capabilities
- `/labs/power-systems` — AI in Power Systems Lab
- `/labs/quantum-cyber` — Quantum Cyber Intelligence Lab
- `/research` — searchable publication database
- `/courses` — course catalog and enrollment routes
- `/research-with-us` — six-month research pathway and application form
- `/consulting` — consulting services and inquiry form
- `/resources` — code, datasets, notebooks, and source PDFs
- `/insights` — research notes and newsletter
- `/contact` — general contact form
- `/admin` — protected content and submission management

## Project structure

```text
app/                  Pages, layouts, and API routes
components/           Shared interface and form components
components/ui/        Reusable UI primitives
db/                   D1 database bindings and schema
drizzle/              Generated SQLite migrations
lib/                  Site content and server-side utilities
public/               Images, favicon, and public assets
.openai/hosting.json  Sites runtime binding configuration
```

## Local data and hosted services

The published website uses:

- Cloudflare D1 for subscribers, inquiries, enrollments, and published content
- Cloudflare R2 for admin-uploaded images, videos, PDFs, datasets, notebooks, and scripts
- ChatGPT sign-in protection for the administration workspace

Local development uses local bindings and does not expose or overwrite the published website's stored data. Some protected administration features require the hosted environment and its authenticated owner account.

If `db/schema.ts` changes, generate and inspect a migration before rebuilding:

```bash
npm run db:generate
npm run build
```

## Editing the website

- Initial publications, courses, projects, resources, and profile information: `lib/content.ts`
- Homepage structure: `app/page.tsx`
- Shared visual styling and responsive behavior: `app/globals.css`
- Header and navigation: `components/site-header.tsx`
- About page: `app/about/page.tsx`

Additional content can be created from `/admin` on the hosted website without editing source files. The administration workspace also shows inquiries, enrollment requests, subscribers, and uploaded files.

## Sharing safely

Share the source repository or a clean ZIP created with `git archive`. Do not include these local or generated items:

- `.env` files
- passwords, API keys, or access tokens
- `node_modules/`
- `dist/`
- `.wrangler/`

Keep `.openai/hosting.json` in the source because it declares the logical database and file-storage bindings used by the Sites deployment.

## Troubleshooting

- **Wrong Node.js version:** install Node.js 22.13 or newer, then reopen the terminal.
- **Dependencies fail to install:** confirm the internet connection and run `npm ci` again from the folder containing `package.json`.
- **Port 3000 is already in use:** stop the other development server with `Ctrl+C`, or use the alternate local URL printed by the development command.
- **Changes are not visible:** confirm `npm run dev` is still running, save the edited file, and refresh the browser.
- **Production start fails:** run `npm run build` successfully before `npm run start`.

## Notes

- Course enrollment requests are implemented.
- Automatic payment processing requires a separate payment-provider integration.
- Do not commit secrets or local `.env` files.
