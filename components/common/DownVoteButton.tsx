import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncDownVoteThread, asyncNeutralVoteThread } from "@/states/threads/action";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiDislike, BiSolidDislike } from "react-icons/bi";

type IDownVoteButtonProps = {
  threadId: string;
};

const DownVoteButton = ({ threadId }: IDownVoteButtonProps) => {
  const threads: Thread[] = useAppSelector((states) => states.threads);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const currentThread = threads.find((thread) => thread.id === threadId);

  const handleDownVoteThread = () => {
    dispatch(asyncDownVoteThread(threadId));
  };

  const handleUnDownVoteThread = () => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Down Vote" fontSize="xs" placement="top">
        {currentThread?.downVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnDownVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleDownVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{currentThread?.downVotesBy.length}</Text>
    </Flex>
  );
};

export default DownVoteButton;
