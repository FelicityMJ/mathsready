// Firebase Cloud Functions v2 skeleton for the hosted version.
// Install firebase-functions + firebase-admin in a functions project.
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
initializeApp();
const db = getFirestore();

exports.redeemInviteCode = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Sign in first.');
  const code = String(request.data?.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!code) throw new HttpsError('invalid-argument', 'Code required.');
  const ref = db.collection('inviteCodes').doc(code);
  return db.runTransaction(async tx => {
    const snap = await tx.get(ref);
    if (!snap.exists) throw new HttpsError('not-found', 'Code not found.');
    const c = snap.data();
    if (!c.active) throw new HttpsError('failed-precondition', 'Code is inactive.');
    if ((c.uses || 0) >= c.maxUses) throw new HttpsError('resource-exhausted', 'Code fully used.');
    if (c.expiresAt && c.expiresAt.toDate() < new Date()) throw new HttpsError('deadline-exceeded', 'Code expired.');
    const familyRef = db.collection('families').doc();
    const memberRef = familyRef.collection('members').doc(request.auth.uid);
    tx.set(familyRef, { plan:'free', inviteCodeId:ref.id, maxChildren:c.maxChildren || 4, createdAt:FieldValue.serverTimestamp() });
    tx.set(memberRef, { role:'parent', joinedAt:FieldValue.serverTimestamp() });
    tx.update(ref, { uses:FieldValue.increment(1) });
    return { familyId:familyRef.id, maxChildren:c.maxChildren || 4 };
  });
});

exports.createInviteCode = onCall(async (request) => {
  if (!request.auth || request.auth.token.role !== 'admin') throw new HttpsError('permission-denied', 'Admin only.');
  const raw = String(request.data?.code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!raw) throw new HttpsError('invalid-argument', 'Code required.');
  await db.collection('inviteCodes').doc(raw).set({
    label: request.data?.label || 'Friends & family', plan:'free', maxUses:Number(request.data?.maxUses || 1),
    uses:0, maxChildren:Number(request.data?.maxChildren || 4), active:true,
    expiresAt: request.data?.expiresAt || null, createdAt:FieldValue.serverTimestamp()
  });
  return { code:raw };
});


// ---- Face-Off production skeleton ----
function normalCode(s){ return String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, ''); }

exports.createFaceoffRoom = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated','Sign in first.');
  // Production: verify family membership + child ownership + child Face-Off permission.
  // Read courses/current server-side, snapshot the selected level, generate a short unique code,
  // create faceoffs/{roomId} and a server-only faceoffCodes/{code} lookup in one transaction.
  throw new HttpsError('unimplemented','Wire to the V4 Face-Off data contract before production use.');
});
exports.joinFaceoffRoom = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated','Sign in first.');
  // Resolve server-only code, verify capacity/expiry, add uid + sanitized child alias atomically.
  throw new HttpsError('unimplemented','Implement server-side room join.');
});
exports.startFaceoffRound = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated','Sign in first.');
  // Host only. Generate unpredictable round seed + server timestamp; do not trust client clock.
  throw new HttpsError('unimplemented','Implement server-authoritative round start.');
});
exports.submitFaceoffRound = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated','Sign in first.');
  // Accept first-attempt answers, derive the deterministic question set from the server seed,
  // grade on the server, calculate elapsed time from authoritative timestamps, then resolve
  // the round only when all players finish or the round timeout fires. Never accept client winner.
  throw new HttpsError('unimplemented','Implement server-side grading before production use.');
});
exports.createFaceoffRematch = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated','Sign in first.');
  // Host only; keep members/config, increment matchNo, reset scores/rounds, create fresh seeds.
  throw new HttpsError('unimplemented','Implement server-side rematch.');
});
