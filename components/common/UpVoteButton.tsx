import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncNeutralVoteThread, asyncUpVoteThread } from "@/states/threads/action";
import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiLike, BiSolidLike } from "react-icons/bi";

type IUpVoteButtonProps = {
  threadId: string;
};

const UpVoteButton = ({ threadId }: IUpVoteButtonProps) => {
  const threads: Thread[] = useAppSelector((states) => states.threads);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const currentThread = threads.find((thread) => thread.id === threadId);

  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteThread(threadId));
  };

  const handleUnUpVoteThread = () => {
    dispatch(asyncNeutralVoteThread(threadId));
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Up Vote" fontSize="xs" placement="top">
        {currentThread?.upVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnUpVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUpVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{currentThread?.upVotesBy.length}</Text>
    </Flex>
  );
};

export default UpVoteButton;
