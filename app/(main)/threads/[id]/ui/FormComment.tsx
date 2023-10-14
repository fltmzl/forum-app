import PrimaryButton from "@/components/common/PrimaryButton";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncAddCommentThread } from "@/states/shared/action";
import { Box, Heading, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";

const FormComment = ({ threadId }: { threadId: string }) => {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(asyncAddCommentThread({ content: comment, threadId }));
  };

  return (
    <Box rounded="2xl" bgColor="gray.700" p="5">
      <Heading fontSize="2xl" mb="7">
        Beri Komentar
      </Heading>

      <form onSubmit={handleAddComment}>
        <Stack spacing="5" align="end">
          <Textarea placeholder="Tulis komentar anda" value={comment} onChange={handleCommentChange} />
          <PrimaryButton colorScheme="primary" w="fit-content" type="submit">
            Kirim
          </PrimaryButton>
        </Stack>
      </form>
    </Box>
  );
};

export default FormComment;
