import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { getSessionsBySpeaker } from "@/utils/speaker-sessions";
import { Flex, List } from "@chakra-ui/react";

export default async function SpeakersPage() {
  const sessions = await fetchSessions();
  const speakerSessions = getSessionsBySpeaker(sessions);

  return (
    <Flex direction="column" gap="8" flex="1" width="full">
      <PageHeading title="Speakers">
        Every speaker at React Alicante, and the sessions they&apos;re giving.
      </PageHeading>

      <List.Root
        role="list"
        listStyle="none"
        display="grid"
        gap="6"
        gridTemplateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
      >
        {speakerSessions.map((entry) => (
          <List.Item key={entry.speaker}>
            <SpeakerCard speakerSessions={entry} />
          </List.Item>
        ))}
      </List.Root>
    </Flex>
  );
}
