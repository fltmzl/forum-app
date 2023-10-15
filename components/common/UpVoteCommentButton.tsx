import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncNeutralVoteCommentDetailThread, asyncUpVoteCommentDetailThread } from "@/states/detailThread/action";

type IUpVoteCommentButtonProps = {
  commentId: string;
};

const UpVoteCommentButton = ({ commentId }: IUpVoteCommentButtonProps) => {
  const thread: DetailThread = useAppSelector((states) => states.detailThread);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const currentComment = thread.comments.find((comment) => comment.id === commentId);

  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteCommentDetailThread({ commentId, threadId: thread.id }));
  };

  const handleUnUpVoteThread = () => {
    dispatch(asyncNeutralVoteCommentDetailThread({ commentId, threadId: thread.id }));
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Up Vote" fontSize="xs" placement="top">
        {currentComment?.upVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnUpVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUpVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{currentComment?.upVotesBy.length}</Text>
    </Flex>
  );
};

export default UpVoteCommentButton;
