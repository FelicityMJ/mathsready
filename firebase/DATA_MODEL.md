# Firebase data model

## users/{uid}
- email
- displayName
- activeFamilyId
- role: parent | admin (authoritative admin role should also be a custom claim)

## inviteCodes/{NORMALIZED_CODE}
Server-only collection.
- label
- plan: free
- maxUses
- uses
- maxChildren
- active
- expiresAt
- createdAt

## families/{familyId}
- parentDisplayName
- plan
- inviteCodeId
- maxChildren
- createdAt

### families/{familyId}/members/{uid}
- role: parent
- joinedAt

### families/{familyId}/children/{childId}
Private family record.
- firstName
- stage
- leaderboardAlias
- leaderboardOptIn
- createdAt
- currentProgressSummary (optional cache)

### .../attempts/{attemptId}
Immutable event.
- levelId (stable)
- courseVersion
- levelNameSnapshot
- questionCountSnapshot
- targetSecSnapshot
- startedAt / completedAt
- elapsedSec
- correctCount
- passed
- perQuestion[] (private)

### .../mastery/{levelId}
Derived/server-controlled record.
- levelId
- masteredAt
- masteredTimeSec
- targetSecAtMastery
- questionCountAtMastery
- courseVersionAtMastery

## courses/current
- version
- publishedAt
- fluency: map keyed by stable level IDs
- skills: map keyed by stable skill IDs

## courseVersions/{version}
Immutable snapshot of the published course.

## leaderboards/{levelId}/entries/{childId}
Sanitized only.
- alias
- bestMasteredTimeSec
- courseVersionAtMastery
- masteredAt
No real name, family ID, school stage, email, errors or practice history.


## faceoffCodes/{NORMALIZED_CODE}
Server-only lookup to an invite-only room.
- roomId
- active
- expiresAt

## faceoffs/{roomId}
- name
- hostUid / hostChildId
- scheduledAt / expiresAt
- status
- levelId + levelNameSnapshot + courseVersion
- questionCount
- matchFormat: 1 | 3
- roundsToWin
- allowRematch
- maxPlayers
- memberUids[]
- matchNo / currentRound / scores

### faceoffs/{roomId}/players/{childId}
Sanitized room presence: alias, uid, host, joinedAt, ready, liveAnswered, finished.

### faceoffs/{roomId}/rounds/{roundNo}
Server seed + server start time + winner IDs.

### .../submissions/{childId}
Server-controlled result. Answers may be retained privately for audit; do not expose them to room peers.

Face-Off data never writes to /mastery.
