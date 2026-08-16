# Hosted deployment checklist

The current `index.html` is deliberately local-first so the family/account/course UX can be tested immediately. To let separate households use the same codes and leaderboards, move the V3 data contract to Firebase.

1. Create/register a Firebase web app.
2. Enable Firebase Authentication (email/password is sufficient for the first pilot).
3. Create Cloud Firestore in production mode.
4. Deploy `firestore.rules` and the indexes file in this folder.
5. Create callable Cloud Functions based on `functions-index.example.js` for invite-code creation/redemption.
6. Give the owner account an admin custom claim server-side; never expose owner/admin powers through a public client flag.
7. Store learner attempts under their family only. Attempt events should be immutable.
8. Publish only sanitized leaderboard documents containing alias + mastery timing fields.
9. Store each published course definition separately from learner progress; keep stable level/skill IDs.
10. When a scoring standard changes, advance that level's leaderboard revision rather than comparing incompatible old/new times.

The local PIN in the prototype is not a production authentication mechanism and should be removed in the hosted build.
