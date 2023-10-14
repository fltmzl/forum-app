import { Avatar, Box, Flex, HStack, Icon, Text } from "@chakra-ui/react";
import { PiMedalFill } from "react-icons/pi";

type ILeaderboardItemProps = {
  ranking: number | string;
} & Leaderboard;

const LeaderboardItem = ({ user, score, ranking }: ILeaderboardItemProps) => {
  return (
    <Flex bgColor="gray.700" py="3" px="5" justifyContent="space-between" alignItems="center" rounded="xl">
      <HStack spacing="6">
        <Box>
          {ranking == 1 && <Icon as={PiMedalFill} boxSize={7} color="yellow.400" />}
          {ranking == 2 && <Icon as={PiMedalFill} boxSize={7} color="gray.400" />}
          {ranking == 3 && <Icon as={PiMedalFill} boxSize={7} color="yellow.800" />}
          {Number(ranking) > 3 && (
            <Text align="center" boxSize={7}>
              {ranking}
            </Text>
          )}
        </Box>
        <HStack spacing="4">
          <Avatar name={user.name} />
          <Text fontSize="md">{user.name}</Text>
        </HStack>
      </HStack>
      <Box fontSize="xl" fontWeight="semibold">
        {score}
      </Box>
    </Flex>
  );
};

export default LeaderboardItem;
