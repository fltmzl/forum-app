"use client";

import { useEffect } from "react";
import { Container, Icon, Stack } from "@chakra-ui/react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "@chakra-ui/next-js";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncReceiveDetailThread, clearDetailThreadActionCreator } from "@/states/detailThread/action";
import DetailThread from "./ui/DetailThread";
import FormComment from "./ui/FormComment";
import CommentsList from "./ui/CommentsList";
import { asyncAddCommentThread } from "@/states/shared/action";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const detailThread: DetailThread = useAppSelector((states) => states.detailThread);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(params.id));

    return () => {
      dispatch(clearDetailThreadActionCreator());
    };
  }, [dispatch, params.id]);

  const addComment = ({ content, threadId }: CreateCommentParams) => {
    dispatch(asyncAddCommentThread({ content, threadId }));
  };

  if (!detailThread) return null;

  return (
    <Container maxW="container.xl" py="5" display="flex" justifyContent="center">
      <Stack spacing="4" w="full" maxW="container.md">
        <Link href="/" display="flex" alignItems="center" gap="1" color="gray.400" fontSize="sm" _hover={{ color: "white" }}>
          <Icon as={FiArrowLeft} display="inline" />
          <span>Kembali ke Thread</span>
        </Link>
        <DetailThread {...detailThread} />
        <FormComment threadId={params.id} addComment={addComment} />
        <CommentsList comments={detailThread.comments} />
      </Stack>
    </Container>
  );
};

export default DetailPage;
