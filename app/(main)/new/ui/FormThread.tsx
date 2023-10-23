"use client";

import { useRouter } from "next/navigation";
import { Avatar, Grid, GridItem, Input, Stack, Textarea } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import useInput from "@/hooks/useInput";
import PrimaryButton from "@/components/common/PrimaryButton";

type IFormThreadProps = {
  createNewThread: ({ body, title, category }: CreateThreadParams) => void;
  authUser: User;
};

const FormThread = ({ createNewThread, authUser }: IFormThreadProps) => {
  const [title, handleTitle] = useInput();
  const [category, handleCategory] = useInput();
  const [body, setBody] = useState("");
  const router = useRouter();

  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleCreateThread = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewThread({ body, title, category });
    router.push("/");
  };

  return (
    <Grid templateColumns="40px 1fr" w="full" maxW="container.md">
      <GridItem>
        <Avatar name={authUser?.name} src={authUser?.avatar} size="sm" />
      </GridItem>
      <GridItem>
        <form onSubmit={handleCreateThread}>
          <Stack spacing="4" align="end">
            <Input placeholder="Judul Thread" value={title} onChange={handleTitle} isRequired />
            <Input placeholder="Kategori" value={category} onChange={handleCategory} isRequired />
            <Textarea placeholder="Apa yang anda pikirkan" rows={10} value={body} onChange={handleBody} isRequired />
            <PrimaryButton type="submit" leftIcon={<AiOutlinePlus />} colorScheme="primary" w="fit-content">
              Buat Thread
            </PrimaryButton>
          </Stack>
        </form>
      </GridItem>
    </Grid>
  );
};

export default FormThread;
