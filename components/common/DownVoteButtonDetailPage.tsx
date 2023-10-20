import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncDownVoteDetailThread, asyncNeutralVoteDetailThread } from "@/states/detailThread/action";

const DownVoteButtonDetailPage = () => {
  const detailThread: DetailThread = useAppSelector((states) => states.detailThread);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const handleDownVoteThread = () => {
    dispatch(asyncDownVoteDetailThread(detailThread.id));
  };

  const handleUnDownVoteThread = () => {
    dispatch(asyncNeutralVoteDetailThread(detailThread.id));
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Down Vote" fontSize="xs" placement="top">
        {detailThread.downVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnDownVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleDownVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{detailThread.downVotesBy.length}</Text>
    </Flex>
  );
};

export default DownVoteButtonDetailPage;
