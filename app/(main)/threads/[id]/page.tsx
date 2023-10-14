"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncReceiveDetailThread, clearDetailThreadActionCreator } from "@/states/detailThread/action";
import { useEffect } from "react";
import DetailThread from "./ui/DetailThread";
import { Container, Icon, Stack } from "@chakra-ui/react";
import FormComment from "./ui/FormComment";
import CommentsList from "./ui/CommentsList";
import { Link } from "@chakra-ui/next-js";
import { FiArrowLeft } from "react-icons/fi";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const detailThread: DetailThread = useAppSelector((states) => states.detailThread);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(params.id));

    return () => {
      dispatch(clearDetailThreadActionCreator());
    };
  }, [dispatch]);

  if (!detailThread) return null;

  return (
    <Container maxW="container.xl" py="5" display="flex" justifyContent="center">
      <Stack spacing="4" w="full" maxW="container.md">
        <Link href="/" display="flex" alignItems="center" gap="1" color="gray.400" fontSize="sm" _hover={{ color: "white" }}>
          <Icon as={FiArrowLeft} display="inline" />
          <span>Kembali ke Thread</span>
        </Link>
        <DetailThread {...detailThread} />
        <FormComment threadId={params.id} />
        <CommentsList comments={detailThread.comments} />
      </Stack>
    </Container>
  );
};

export default DetailPage;
