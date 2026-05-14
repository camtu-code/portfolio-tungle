## Portfolio Tung Le (Next.js 16)

### Tech stack
- Next.js 16 (App Router)
- React 19
- Prisma
- NextAuth v5 (Credentials)
- TiDB Serverless (MySQL)

### Local setup
```bash
npm install
cp .env.example .env
npm run dev
```

### Quality checks
```bash
npm run lint
npm run build
```

### Deploy to Vercel (safe checklist)
1. Push repo to GitHub.
2. Import project in Vercel.
3. Build command: `npm run build`
4. Install command: `npm install` (default)
5. Add environment variables in Vercel:
   - `DATABASE_URL` (TiDB connection string)
   - `AUTH_SECRET`
   - `AUTH_URL` (for example: `https://your-domain.vercel.app`)
   - `AUTH_TRUST_HOST=true`

### Database note for Vercel
- Prisma datasource is configured for MySQL-compatible databases (TiDB).
- Use TiDB URL format:
  `mysql://<USER>:<PASSWORD>@<HOST>:4000/<DATABASE>?sslaccept=strict`
- Apply schema to TiDB:
  `npm run db:push`

### Avatar upload note
- Avatar is served through `/api/avatar`.
- On Vercel, uploaded avatar is written to `/tmp/avatar.jpg` (ephemeral).
- On local machine, uploaded avatar is written to `public/avatar.jpg`.

### Commands
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run db:push`
- `npm run db:seed`

### Default local admin accounts
- `admin@example.com` / `admin123`
- `editor@example.com` / `editor123`
- `manager@example.com` / `manager123`
