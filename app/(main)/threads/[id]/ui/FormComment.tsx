import React, { useState } from "react";
import { Box, Heading, Stack, Textarea } from "@chakra-ui/react";
import PrimaryButton from "@/components/common/PrimaryButton";

type IFormCommentProps = {
  threadId: string;
  addComment: ({ content, threadId }: CreateCommentParams) => void;
};

const FormComment = ({ threadId, addComment }: IFormCommentProps) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment({ content: comment, threadId });
    setComment("");
  };

  return (
    <Box rounded="2xl" bgColor="gray.700" bg="gray.100" _dark={{ bg: "gray.700" }} p="5">
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
