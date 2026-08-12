Nat5 Ready Maths — Platform V4: Live Maths Face-Off
=====================================================

OPEN LOCALLY
1. Double-click index.html.
2. Open a learner and choose ⚔ Face-Off.
3. Create a room. Choose the session name/time, maths level, question count and single-round or best-of-3.
4. To test without another device, use “Add demo rival”.
5. To test with another learner stored in the same browser, switch child and join using the MATH-xxxxx room code.

WHAT V4 ADDS
- Child-created invite-only Maths Face-Off rooms.
- Session name and scheduled start time.
- Short join code.
- Host chooses operation/mastery question set and 10–50 questions.
- Single-round or best-of-3 (first to 2 wins).
- Optional rematch with the same room/players.
- Same deterministic question sequence for every player in a round.
- Ranking is accuracy first, then completion speed.
- Live completion bars (not live correctness, to discourage rushing).
- Separate Face-Off history/win records.
- Face-Off NEVER unlocks or changes formal fluency mastery.
- Parent can disable Face-Off for an individual child.
- Alias-only, invite-only safety model; no chat or public room browser.

IMPORTANT: LOCAL VS TRUE LIVE CROSS-DEVICE
The downloaded HTML is a complete local prototype. Rooms are stored in this browser, so a friend on another device cannot see them yet. The firebase/ folder contains the real-time backend design needed for production.

For a real online session, Firestore should be the source of truth for the lobby, players, server start time, round seed, progress and results. A backend function should grade answers and declare winners rather than trusting the client.
