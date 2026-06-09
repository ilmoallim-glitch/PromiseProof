# Game verification model

PromiseProof should not pretend every game can be automatically verified. Use proof levels.

## 1. API Verified — highest trust

Use this when the game/platform has an official or reliable API. The user links their username/account, the challenge stores the match ID or leaderboard URL, and the backend checks the result.

Good first targets:
- Chess.com / Lichess style match history
- Game APIs that expose ranked match results
- Achievement/stat systems for specific challenges

## 2. Controlled Match Room — high trust

This replaces the confusing old name “Creator Room Verified.” It means PromiseProof controls or records the match setup:

1. Creator creates challenge.
2. PromiseProof generates a match room record.
3. Both usernames, server, region, deadline, stream URL, and lobby code are locked.
4. A moderator or trusted bot watches/records the result.
5. The proof page shows who won and how it was confirmed.

This is best for Discord game nights, Roblox/Fortnite/private lobby matches, livestream challenges, and tournaments.

## 3. Moderator Verified — medium trust

A real admin/moderator reviews screenshots, stream footage, timestamps, usernames, and locked rules. This is slower but works for many games.

## 4. Manual Proof — lower trust

The creator uploads proof without trusted confirmation. This should be allowed but should give fewer Promise Score points.

## 5. Community Dispute

Users can challenge results. Admins review evidence and mark the challenge verified, disputed, failed, refunded, or paid.

## Leaderboard Crown Rush

Use this name instead of “#1 thingy.” It sounds much better for viewers.

A Crown Rush challenge must lock:
- exact game/server/region
- leaderboard source URL
- deadline and timezone
- proof method: API check, moderator capture, or scheduled screenshot
- tie-break rules

