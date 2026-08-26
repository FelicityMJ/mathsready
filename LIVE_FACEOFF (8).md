# Live Maths Face-Off — production contract

## Safety / privacy
- Authenticated family accounts only.
- Invite-code rooms; no public room directory.
- Show only the child’s chosen alias.
- No room chat, DMs, school, age, location, email or real surname fields.
- Parent can disable Face-Off for each child.
- Room codes expire after the session window.

## Fairness
- Server creates the round seed and authoritative start timestamp.
- Every player derives/receives the identical question sequence.
- First submitted answer is final for each question.
- Server grades answers; client never decides correctCount/winner.
- Rank each round by: (1) correct count descending, (2) elapsed time ascending.
- Live lobby may show progress (e.g. 8/20 answered) but not live correctness.
- Competition does not create mastery records.

## Suggested Firestore
### faceoffCodes/{NORMALIZED_CODE}
Server-only lookup: roomId, expiresAt, active.

### faceoffs/{roomId}
name, hostUid, hostChildId, scheduledAt, expiresAt, status, levelId, levelNameSnapshot, courseVersion, questionCount, matchFormat, roundsToWin, allowRematch, maxPlayers, memberUids[], matchNo, currentRound, scores{}.

### faceoffs/{roomId}/players/{childId}
alias, uid, host, joinedAt, ready, liveAnswered, finished.

### faceoffs/{roomId}/rounds/{roundNo}
seed, serverStartedAt, status, winnerChildIds[], completedAt.

### .../rounds/{roundNo}/submissions/{childId}
Private/server-write summary: answers[], correctCount, elapsedMs, finishedAt.
Client should submit answers through a callable function; do not permit direct result writes.

## Callable functions
- createFaceoffRoom
- joinFaceoffRoom
- startFaceoffRound
- submitFaceoffRound
- createFaceoffRematch
- expireFaceoffRooms (scheduled cleanup)
