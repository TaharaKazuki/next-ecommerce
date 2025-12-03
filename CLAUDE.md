# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Lint and format code (ESLint + Prettier)
```

## Tech Stack

- **Next.js 16** with App Router (`app/` directory)
- **React 19** with React Compiler enabled
- **TypeScript** (strict mode)
- **Tailwind CSS v4** via PostCSS

## Project Structure

- `app/` - Next.js App Router pages and layouts
- `public/` - Static assets
- Path alias: `@/*` maps to project root

## Code Style

Import order is enforced by ESLint (eslint-plugin-import):

1. Built-in modules
2. External packages (React first)
3. Internal (`@/*` paths)
4. Parent/sibling imports
5. Index/object/type imports

Unused imports are auto-removed. Prettier formats on lint.
