import { Avatar, Flex, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import { timeAgo } from "@/utils/common";
import UpVoteCommentButton from "@/components/common/UpVoteCommentButton";
import DownVoteCommentButton from "@/components/common/DownVoteCommentButton";

const CommentItem = ({ id, content, createdAt, owner }: CommentThread) => {
  return (
    <Grid templateColumns="min-content 1fr" gap="3" borderBottom="1px" borderBottomColor="whiteAlpha.200" pb="6">
      <GridItem py="1">
        <Avatar size="sm" name={owner.name} src={owner.avatar} />
      </GridItem>
      <GridItem>
        <Stack spacing="0">
          <Flex alignItems={["start", "center"]} justifyContent="space-between" direction={["column", "row"]}>
            <Text fontWeight="bold" fontSize="md">
              {owner.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {timeAgo(new Date(createdAt))}
            </Text>
          </Flex>
          <Text mt="3" dangerouslySetInnerHTML={{ __html: content }}></Text>
          <HStack mt="3">
            <UpVoteCommentButton commentId={id} />
            <DownVoteCommentButton commentId={id} />
          </HStack>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default CommentItem;
