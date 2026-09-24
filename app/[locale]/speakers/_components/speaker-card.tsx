import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { SpeakerSessions } from "@/utils/speaker-sessions";
import { Flex, Text } from "@chakra-ui/react";

interface SpeakerCardProps {
  speakerSessions: SpeakerSessions;
}

export function SpeakerCard({ speakerSessions }: SpeakerCardProps) {
  const { speaker, sessions } = speakerSessions;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{speaker}</CardTitle>
      </CardHeader>
      <CardContent>
        <Flex direction="column" gap="2">
          {sessions.map((session) => (
            <Link key={session.id} href={`/sessions/${session.id}`}>
              <Flex justify="space-between" gap="3">
                <Text truncate color="var(--text-primary)">
                  {session.title}
                </Text>
                <Text color="var(--text-muted)" flexShrink="0">
                  {session.startTime}
                </Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
