"use client";

import { Container } from "@chakra-ui/react";
import FormThread from "./ui/FormThread";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncAddThread } from "@/states/threads/action";
import { useAppSelector } from "@/hooks/useAppSelector";

const NewThread = () => {
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const createNewThread = ({ body, title, category }: CreateThreadParams) => {
    dispatch(asyncAddThread({ body, title, category }));
  };

  return (
    <Container maxW="container.xl" py="5" display="flex" justifyContent="center">
      <FormThread createNewThread={createNewThread} authUser={authUser} />
    </Container>
  );
};

export default NewThread;
