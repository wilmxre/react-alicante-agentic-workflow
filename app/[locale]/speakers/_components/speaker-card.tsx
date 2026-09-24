import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speaker-sessions";
import { Flex, List, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speakerSessions: SpeakerSessions;
}

export function SpeakerCard({ speakerSessions }: SpeakerCardProps) {
  const { speaker, sessions } = speakerSessions;

  return (
    <Card>
      <CardHeader>
        <CardTitle as="h2">{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <List.Root
          role="list"
          listStyle="none"
          display="flex"
          direction="column"
          gap="2"
        >
          {sessions.map((session) => (
            <List.Item key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex justify="space-between" gap="3" paddingY="1">
                  <Text
                    truncate
                    color="var(--text-primary)"
                    title={session.title}
                  >
                    {session.title}
                  </Text>
                  <time
                    dateTime={session.startTime}
                    style={{
                      color: "var(--text-secondary)",
                      flexShrink: 0,
                    }}
                  >
                    {session.startTime}
                  </time>
                </Flex>
              </Link>
            </List.Item>
          ))}
        </List.Root>
      </CardContent>
    </Card>
  );
}
