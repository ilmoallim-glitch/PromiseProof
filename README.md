# PromiseProof Starter V3 Admin

PromiseProof is a starter Next.js + Supabase project for verified creator challenges, funded rewards, creator trust scores, admin verification, support, and messaging.

## Setup

1. Create a Supabase project.
2. Run `supabase/reset_promiseproof_schema.sql` only if you already ran an older schema and need a clean reset.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Create `.env.local` in the project root.
5. Add your Supabase keys and admin gate secrets.
6. Run `npm install` then `npm run dev`.

## Admin password

The admin page is `/admin`.

Do not hard-code the password in the frontend. Put it in `.env.local` locally and in Vercel Environment Variables when deployed:

```env
ADMIN_GATE_PASSWORD=your-private-password
ADMIN_SESSION_SECRET=any-long-random-secret
```

`.env.local` is ignored by Git, so it should not be uploaded to GitHub.

This admin password is only a gate for the demo admin page. Production admin actions should also check Supabase roles such as `admin` and `moderator`, and every important action should be logged.
