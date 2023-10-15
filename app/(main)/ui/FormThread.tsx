"use client";

import { useRouter } from "next/navigation";
import { Avatar, Grid, GridItem, Input, Stack, Textarea } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import React, { useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import useInput from "@/hooks/useInput";
import PrimaryButton from "@/components/common/PrimaryButton";
import { asyncAddThread } from "@/states/threads/action";

const FormThread = () => {
  const authUser: User = useAppSelector((states) => states.authUser);
  const [title, handleTitle] = useInput();
  const [category, handleCategory] = useInput();
  const [body, setBody] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleBody = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleCreateThread = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(asyncAddThread({ body, title, category }));

    router.push("/");
  };

  return (
    <Grid templateColumns="40px 1fr" w="full" maxW="container.md">
      <GridItem>
        <Avatar name={authUser.name} src={authUser.avatar} size="sm" />
      </GridItem>
      <GridItem>
        <form onSubmit={handleCreateThread}>
          <Stack spacing="4" align="end">
            <Input placeholder="Judul Thread" value={title} onChange={handleTitle} isRequired />
            <Input placeholder="Category" value={category} onChange={handleCategory} isRequired />
            <Textarea placeholder="Apa yang anda pikirkan" rows={10} value={body} onChange={handleBody} isRequired />
            <PrimaryButton type="submit" leftIcon={<AiOutlinePlus />} colorScheme="primary" w="fit-content">
              Buat Thread
            </PrimaryButton>
          </Stack>
        </form>
      </GridItem>
    </Grid>
  );

  // return (
  //   <Grid templateColumns="40px 1fr" w="full" maxW="container.md">
  //     <GridItem>
  //       <Avatar name={authUser.name} src={authUser.avatar} size="sm" />
  //     </GridItem>
  //     <GridItem>
  //       <form onSubmit={handleCreateThread}>
  //         <Stack spacing="4" align="end">
  //           <Input placeholder="Judul Thread" onFocus={() => setShowCategoryContent(true)} />

  //           <AnimatePresence>
  //             {showCategoryContent && (
  //               <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.5 }} style={{ width: "100%" }}>
  //                 <Input placeholder="Category" />
  //                 <Textarea placeholder="Apa yang anda pikirkan" rows={10} />
  //                 <PrimaryButton leftIcon={<AiOutlinePlus />} colorScheme="primary" w="fit-content">
  //                   Buat Thread
  //                 </PrimaryButton>
  //               </motion.div>
  //             )}
  //           </AnimatePresence>
  //         </Stack>
  //       </form>
  //     </GridItem>
  //   </Grid>
  // );
};

export default FormThread;
