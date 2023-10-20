"use client";

import { Flex, IconButton, Text, Tooltip } from "@chakra-ui/react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncNeutralVoteDetailThread, asyncUpVoteDetailThread } from "@/states/detailThread/action";

const UpVoteButtonDetailPage = () => {
  const detailThread: DetailThread = useAppSelector((states) => states.detailThread);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const handleUpVoteThread = () => {
    dispatch(asyncUpVoteDetailThread(detailThread.id));
  };

  const handleUnUpVoteThread = () => {
    dispatch(asyncNeutralVoteDetailThread(detailThread.id));
  };

  return (
    <Flex alignItems="center">
      <Tooltip label="Up Vote" fontSize="xs" placement="top">
        {detailThread.upVotesBy.includes(authUser.id) ? (
          <IconButton isRound icon={<BiSolidLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUnUpVoteThread} textColor="primary.500" />
        ) : (
          <IconButton isRound icon={<BiLike />} aria-label="Up Vote Thread" bgColor="transparent" fontSize="xl" onClick={handleUpVoteThread} />
        )}
      </Tooltip>
      <Text fontSize="md">{detailThread.upVotesBy.length}</Text>
    </Flex>
  );
};

export default UpVoteButtonDetailPage;
