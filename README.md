# Full-Stack Cloudflare Workers Template

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/return200-ok/astroweb-99-cyber-mystic-astrology)

A production-ready full-stack application template powered by Cloudflare Workers, featuring a React frontend, Hono backend, and Durable Objects for scalable state management. Includes pre-built entities for users and chat boards with real-time messaging, pagination, and CRUD operations.

## Features

- **Edge-Native Architecture**: Deploy globally on Cloudflare's edge network with zero cold starts.
- **Durable Objects for State**: Efficient single-instance storage for multiple entities (Users, Chats) using a shared GlobalDurableObject.
- **Indexed Pagination**: Built-in prefix-based indexes for fast listing and cursors.
- **Type-Safe Full-Stack**: Shared types between frontend and backend with end-to-end TypeScript.
- **Modern React Frontend**: shadcn/ui components, TanStack Query for data fetching, Tailwind CSS, and dark mode support.
- **API-First Backend**: Hono router with CORS, logging, and error handling.
- **Hot Module Replacement**: Vite-powered dev server with automatic Worker reloading.
- **Production-Ready**: Includes error reporting, health checks, and client error logging.
- **Demo Entities**: Users (CRUD), ChatBoards (with embedded messages), batch operations.

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects
- **Frontend**: React 18, Vite, TypeScript, TanStack Query
- **UI**: shadcn/ui, Tailwind CSS, Lucide Icons, Framer Motion
- **State & Forms**: Zustand, React Hook Form, Zod
- **Data Visualization**: Recharts
- **Other**: Immer, Sonner (toasts), Sidebar layout

## Prerequisites

- [Bun](https://bun.sh/) (package manager)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (for deployment)
  ```bash
  bunx wrangler login
  bunx wrangler whoami
  ```

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   bun install
   ```

## Development

Start the development server (frontend + Worker proxy):

```bash
bun dev
```

- Frontend: http://localhost:3000 (Vite HMR)
- API: http://localhost:3000/api/* (proxied to Worker)
- Edit `src/pages/HomePage.tsx` for your UI.
- Add routes in `worker/user-routes.ts`.
- Extend entities in `worker/entities.ts` using `IndexedEntity`.

### Key Development Files

| File/Directory | Purpose |
|----------------|---------|
| `worker/user-routes.ts` | Add your API routes here |
| `worker/entities.ts` | Define entities extending `IndexedEntity` |
| `src/pages/HomePage.tsx` | Main app UI |
| `src/components/` | shadcn/ui components & custom |
| `shared/types.ts` | Shared types between FE/BE |

### Example: Adding a New Entity

1. In `worker/entities.ts`:
   ```typescript
   export class MyEntity extends IndexedEntity<MyState> {
     static readonly entityName = "myentity";
     static readonly indexName = "myentities";
     static readonly initialState: MyState = { id: "", ... };
   }
   ```

2. In `worker/user-routes.ts`:
   ```typescript
   import { MyEntity } from "./entities";
   // Use static methods: MyEntity.create(env, state), MyEntity.list(env), etc.
   ```

3. Use in frontend with `api` helper from `src/lib/api-client.ts`.

## Build & Preview

```bash
bun build      # Builds static assets to `dist/`
bun preview    # Preview production build
```

## Deployment

Deploy to Cloudflare Workers (builds frontend + deploys Worker):

```bash
bun run deploy
```

Or manually:

```bash
bun build
bunx wrangler deploy
```

- Configured in `wrangler.jsonc` (Durable Objects auto-migrated).
- Assets served as SPA with API precedence.
- Update `wrangler.jsonc` > `name` for your Worker name.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/return200-ok/astroweb-99-cyber-mystic-astrology)

### Custom Domain & Observability

```bash
bunx wrangler deploy --name my-app
bunx wrangler pages deploy dist --project-name my-app
```

Enable analytics/tail logs:

```bash
bunx wrangler tail
bunx wrangler pages tail
```

## Customization Guide

- **Remove Sidebar**: Delete `AppLayout` usage in `HomePage.tsx`.
- **New Pages**: Add routes in `src/main.tsx` (React Router).
- **API Queries**: Use `api<T>(path)` + TanStack Query.
- **Theming**: Edit `tailwind.config.js` / CSS vars in `src/index.css`.
- **Seeds**: Add to `static seedData` in entities.

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server |
| `bun build` | Build for production |
| `bun lint` | Lint code |
| `bun preview` | Preview build |
| `bun deploy` | Full deploy |
| `bunx wrangler types` | Regenerate types |

## License

MIT - See [LICENSE](LICENSE) for details.