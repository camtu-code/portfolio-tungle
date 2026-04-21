## Portfolio Tung Le (Next.js 16)

### Tech stack
- Next.js 16 (App Router)
- React 19
- Prisma
- NextAuth v5 (Credentials)

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
   - `AUTH_SECRET`
   - `AUTH_URL` (for example: `https://your-domain.vercel.app`)
   - `AUTH_TRUST_HOST=true`
   - `DATABASE_URL`

### Database note for Vercel
- Current setup can run with SQLite using `DATABASE_URL=file:/tmp/dev.db`.
- `/tmp` on Vercel is writable but ephemeral (data can reset).
- For persistent production data, use managed Postgres and update Prisma datasource accordingly.

### Avatar upload note
- Avatar is served through `/api/avatar`.
- On Vercel, uploaded avatar is written to `/tmp/avatar.jpg` (ephemeral).
- On local machine, uploaded avatar is written to `public/avatar.jpg`.

### Commands
- `npm run dev`
- `npm run lint`
- `npm run build`
- `npm run db:push`
