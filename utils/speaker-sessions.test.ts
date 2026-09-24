import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { getSessionsBySpeaker } from "./speaker-sessions";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("getSessionsBySpeaker", () => {
  it("groups sessions by speaker, sorted by speaker name", () => {
    const grouped = getSessionsBySpeaker([
      session({ id: "b", speaker: "Bea Soto" }),
      session({ id: "a", speaker: "Ana Ruiz" }),
      session({ id: "b2", speaker: "Bea Soto" }),
    ]);

    expect(grouped.map((entry) => entry.speaker)).toEqual([
      "Ana Ruiz",
      "Bea Soto",
    ]);
    expect(grouped[1].sessions.map((s) => s.id)).toEqual(["b", "b2"]);
  });

  it("sorts each speaker's sessions chronologically", () => {
    const grouped = getSessionsBySpeaker([
      session({ id: "late", speaker: "Ana Ruiz", startTime: "14:00" }),
      session({ id: "early", speaker: "Ana Ruiz", startTime: "09:00" }),
    ]);

    expect(grouped[0].sessions.map((s) => s.id)).toEqual(["early", "late"]);
  });

  it("excludes the closing panel's placeholder speaker", () => {
    const grouped = getSessionsBySpeaker([
      session({ speaker: "Full speaker lineup" }),
      session({ speaker: "Ana Ruiz" }),
    ]);

    expect(grouped.map((entry) => entry.speaker)).toEqual(["Ana Ruiz"]);
  });

  it("returns nothing for no sessions", () => {
    expect(getSessionsBySpeaker([])).toEqual([]);
  });
});
