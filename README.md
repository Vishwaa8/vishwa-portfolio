# Vishwa Portfolio — Home Page

## Local development
Install Node.js 22 LTS or newer. Open this folder in VS Code and run:

```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production / Vercel
Run `npm run build` to generate static files in `out/`. Push the source folder to GitHub, import the repository in Vercel, select Next.js and deploy with the default build settings. No environment variables, backend or database are needed. For locally serving the static production output, use `npx serve out` (not `next start`).

## Scope
Homepage only; About, Projects, Contact are short preview panels. LinkedIn URL and CV PDFs remain placeholders. Original portrait is in public/images/portrait.webp. Responsive CSS switches to portrait-first mobile layout at 760px. Review availability status and public contact details before publishing. The project uses plain CSS for precise control over the reference layout instead of Tailwind, and CSS animations instead of Motion.
