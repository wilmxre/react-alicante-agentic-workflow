import { describe, expect, it } from "vitest";

import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";
import type { SpeakerSessions } from "@/utils/speaker-sessions";

import { SpeakerCard } from "./speaker-card";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "opening-keynote",
    title: "Opening Keynote",
    speaker: "Marta Fernandez",
    track: "React",
    level: "beginner",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("SpeakerCard", () => {
  it("shows the speaker's name and each session's title and start time", () => {
    const speakerSessions: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [session()],
    };

    render(<SpeakerCard speakerSessions={speakerSessions} />);

    expect(screen.getByText("Marta Fernandez")).toBeInTheDocument();
    expect(screen.getByText("Opening Keynote")).toBeInTheDocument();
    expect(screen.getByText("09:00")).toBeInTheDocument();
  });

  it("links each session to its session page", () => {
    const speakerSessions: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [session()],
    };

    render(<SpeakerCard speakerSessions={speakerSessions} />);

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/en/sessions/opening-keynote",
    );
  });

  it("renders one link per session for a speaker with multiple sessions", () => {
    const speakerSessions: SpeakerSessions = {
      speaker: "Marta Fernandez",
      sessions: [
        session({ id: "opening-keynote", title: "Opening Keynote" }),
        session({ id: "closing-panel", title: "Closing Panel" }),
      ],
    };

    render(<SpeakerCard speakerSessions={speakerSessions} />);

    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
