"use client";

import { useEffect, useState } from "react";
import { Container, GridItem, IconButton, LightMode } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { AiOutlinePlus } from "react-icons/ai";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncPopulateThreadsAndUsers } from "@/states/shared/action";
import ThreadItem from "./ui/ThreadItem";
import { getCategoriesFromAllThread } from "@/utils/common";
import CategoryList from "./ui/CategoryList";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const threads: Thread[] = useAppSelector((states) => states.threads);
  const users: User[] = useAppSelector((states) => states.users);
  const dispatch = useAppDispatch();
  const categories = getCategoriesFromAllThread(threads);

  useEffect(() => {
    dispatch(asyncPopulateThreadsAndUsers());
  }, [dispatch]);

  const handleChangeCategory = (category: string) => {
    if (selectedCategory === category) return setSelectedCategory("");
    return setSelectedCategory(category);
  };

  const threadsList: ThreadItem[] = threads
    .map((thread) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { ownerId, ...others } = thread;
      const owner = users.find((user) => user.id === thread.ownerId);

      return {
        ...others,
        owner,
      };
    })
    .filter((thread) => {
      if (selectedCategory) {
        return thread.category === selectedCategory;
      }
      return true;
    });

  return (
    <Container maxW="container.md" py="5">
      <Link href="/new">
        <LightMode>
          <IconButton icon={<AiOutlinePlus />} position="fixed" bottom="20" right="10" isRound colorScheme="primary" aria-label="buat thread" />
        </LightMode>
      </Link>

      <CategoryList categories={categories} handleChangeCategory={handleChangeCategory} selectedCategory={selectedCategory} />

      <GridItem>
        {threadsList.map((thread) => (
          <ThreadItem key={thread.id} {...thread} />
        ))}
      </GridItem>
    </Container>
  );
}
