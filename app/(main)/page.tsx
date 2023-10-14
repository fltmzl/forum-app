"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { Container, GridItem, IconButton, LightMode } from "@chakra-ui/react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncPopulateThreadsAndUsers } from "@/states/shared/action";
import ThreadItem from "./ui/ThreadItem";
import { Link } from "@chakra-ui/next-js";
import { AiOutlinePlus } from "react-icons/ai";

export default function Home() {
  const { threads, users }: { threads: Thread[]; users: User[] } = useAppSelector((states) => states);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const threadsList: ThreadItem[] = threads.map((thread) => {
    const { ownerId, ...others } = thread;
    const owner = users.find((user) => user.id === thread.ownerId);

    return {
      ...others,
      owner,
    };
  });

  return (
    <Container maxW="container.xl" py="5" display="grid" gridTemplateColumns="1fr" placeItems="center">
      <Link href="/new">
        <LightMode>
          <IconButton icon={<AiOutlinePlus />} position="fixed" bottom="20" right="10" isRound colorScheme="primary" aria-label="buat thread" />
        </LightMode>
      </Link>
      <GridItem>
        {threadsList.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </GridItem>
    </Container>
  );
}
