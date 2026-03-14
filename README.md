This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. Push this directory to a new GitHub repository.
2. In Vercel, import the repo and choose the `sean-site` project folder (root).
3. Use default Next.js build settings. Vercel will detect `next build`.
4. Optional environment variables:
   - `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Measurement ID (e.g., G-XXXXXXX)
5. Custom domain: add your domain in Vercel → Domains and update DNS per instructions.

Notes:
- Vercel Analytics is enabled via `@vercel/analytics` and renders automatically.
- Contact form posts to `/api/contact`. Wire to email/CRM provider in `src/app/api/contact/route.ts`.
- Open Graph/Twitter card uses `public/og.svg`. Replace with your design when ready.

## Environment variables

Create a `.env.local` in the project root with any of the below as needed:

```
# Analytics
NEXT_PUBLIC_GA_ID=

# Contact email via Resend
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CONTACT_FROM_EMAIL=no-reply@seanbeckford.site

# Notion (optional for /work/notion)
NOTION_TOKEN=

# Calendly (optional embed on /contact)
NEXT_PUBLIC_CALENDLY_URL=

# Supabase (content + admin for beckfordmoves.com)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_COOKIE_SECRET=min-16-chars-random-string
```

**Admin (beckfordmoves.com):** Open `/admin`, sign in with the password stored in Supabase `beckford.admin_secrets` (default: Milo1234). Set `ADMIN_COOKIE_SECRET` (min 16 chars) for session signing.

## Content (MDX via Contentlayer)

- Add/edit MDX files under `content/work/*.mdx` with frontmatter:

```md
---
title: "Project Title"
date: "2025-01-01"
summary: "Short blurb"
cover: "/og.svg"
---

Your MDX here...
```

- The list page is at `/work`, detail pages at `/work/[slug]`.
- Notion-sourced examples are available at `/work/notion` when `NOTION_TOKEN` is set.
