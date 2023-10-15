import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncDownVoteCommentDetailThread, asyncNeutralVoteCommentDetailThread } from "@/states/detailThread/action";

type IDownVoteCommentButtonProps = {
  commentId: string;
};

const DownVoteCommentButton = ({ commentId }: IDownVoteCommentButtonProps) => {
  const thread: DetailThread = useAppSelector((states) => states.detailThread);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const currentComment = thread.comments.find((comment) => comment.id === commentId);

  const handleDownVoteThread = () => {
    dispatch(
      asyncDownVoteCommentDetailThread({
        commentId,
        threadId: thread.id,
      })
    );
  };

  const handleUnDownVoteThread = () => {
    dispatch(
      asyncNeutralVoteCommentDetailThread({
        commentId,
        threadId: thread.id,
      })
    );
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Down Vote" fontSize="xs" placement="top">
        {currentComment?.downVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnDownVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiDislike />} aria-label="Down Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleDownVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{currentComment?.downVotesBy.length}</Text>
    </Flex>
  );
};

export default DownVoteCommentButton;
