import { Container, Heading } from "@chakra-ui/react";
import LeaderboardsList from "./ui/LeaderboardsList";

const LeaderboardsPage = () => {
  return (
    <Container maxW="container.md" py="5">
      <Heading mb="10">Leaderboards</Heading>
      <LeaderboardsList />
    </Container>
  );
};

export default LeaderboardsPage;
