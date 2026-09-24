import type { Session } from "@/types/session";

export interface SpeakerSessions {
  speaker: string;
  sessions: Session[];
}

/** Placeholder speaker used on the closing panel session — not a real speaker. */
const EXCLUDED_SPEAKERS = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker, sorted by speaker name. Each speaker's own
 * sessions are sorted chronologically.
 */
export function getSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    if (EXCLUDED_SPEAKERS.has(session.speaker)) continue;

    const existing = bySpeaker.get(session.speaker);
    if (existing) {
      existing.push(session);
    } else {
      bySpeaker.set(session.speaker, [session]);
    }
  }

  return Array.from(bySpeaker, ([speaker, speakerSessions]) => ({
    speaker,
    sessions: [...speakerSessions].sort((a, b) =>
      a.startTime.localeCompare(b.startTime),
    ),
  })).sort((a, b) => a.speaker.localeCompare(b.speaker));
}
