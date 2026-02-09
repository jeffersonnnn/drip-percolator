# Percolator Web - Agent Guidelines

## Build & Development
- **Dev server**: `npm run dev` (http://localhost:3000)
- **Build**: `npm run build`
- **Production start**: `npm start`
- **Lint**: `next lint` (no unit tests configured; uses ESLint for type checking)

## Architecture
**Next.js 14 app** with App Router (TypeScript, ES2020). Solana perpetual futures trading terminal.
- **App**: `/src/app/` - Root layout + main TradingTerminal page (`page.tsx` - client component)
- **Components**: `/src/components/` - UI by category (layout, trading, charts, market, ui, providers)
- **Stores**: `/src/stores/` - Zustand state (useMarketStore, usePriceStore, useTradeStore, useAccountStore, usePositionStore)
- **Hooks**: `/src/hooks/` - Custom hooks (usePrices, useSlabData, useKeyboardShortcuts, etc.)
- **Lib**: `/src/lib/` - Business logic (Solana connection/transactions, Percolator protocol client, Pyth oracle integration, utils)
- **Config**: `/src/config/` - Constants and configuration

## Code Style & Conventions
- **TypeScript strict mode** enabled; use `@/*` path alias for imports
- **Components**: React 18 functional components, use `"use client"` for client-side features
- **Styling**: Tailwind CSS (dark mode enabled); Radix UI components for headless functionality
- **State**: Zustand for global state; follow `useNameStore` naming
- **Error handling**: Graceful degradation; use toast notifications via `ToastContainer`
- **Types**: Prefer inline types in `.tsx` files; avoid `any`; strict null checks
- **Naming**: camelCase for vars/functions, PascalCase for components, UPPER_SNAKE_CASE for constants
