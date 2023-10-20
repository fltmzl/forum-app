import { Box, Heading, Stack } from "@chakra-ui/react";
import CommentItem from "../components/CommentItem";

const CommentsList = ({ comments }: { comments: CommentThread[] }) => {
  return (
    <Box rounded="2xl" bg="gray.100" _dark={{ bg: "gray.700" }} p="5">
      <Heading fontSize="2xl" mb="10">
        Komentar
        <span> ({comments.length})</span>
      </Heading>
      <Stack spacing="10">
        {comments.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </Stack>
    </Box>
  );
};

export default CommentsList;
