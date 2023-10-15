import { Avatar, Badge, Box, Flex, HStack, Heading, Icon, Text } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { LiaCommentAlt } from "react-icons/lia";
import { timeAgo } from "@/utils/common";
import UpVoteButton from "@/components/common/UpVoteButton";
import DownVoteButton from "@/components/common/DownVoteButton";

const ThreadItem = ({ id, title, category, body, owner, createdAt, totalComments }: ThreadItem) => {
  return (
    <Box mb="5" bg="gray.700" maxW="container.md" rounded="2xl" p="5">
      <Heading size="md" mb="3">
        <Link href={`/threads/${id}`} _hover={{ color: "primary.500" }}>
          {title}
        </Link>
      </Heading>

      <Flex mb="4">
        <Badge textTransform="lowercase" variant="subtle" px="3" py="1" rounded="full">
          #{category}
        </Badge>
      </Flex>

      <Text dangerouslySetInnerHTML={{ __html: body }} noOfLines={4} fontSize="sm"></Text>

      <Flex mt="6" justifyContent="space-between" rowGap="4" direction={["column", "row"]}>
        <HStack spacing="3">
          <Avatar size="sm" name={owner?.name} src={owner?.avatar} />
          <Flex direction="column">
            <Text fontSize="sm" fontWeight="bold">
              {owner?.name}
            </Text>
            <Text fontSize="xs" color="gray.400">
              {timeAgo(new Date(createdAt))}
            </Text>
          </Flex>
        </HStack>

        <HStack spacing="5">
          <UpVoteButton threadId={id} />
          <DownVoteButton threadId={id} />

          <Flex alignItems="center" gap="2">
            <Icon as={LiaCommentAlt} fontSize="xl" boxSize="6" />
            <Text>{totalComments}</Text>
          </Flex>
        </HStack>
      </Flex>
    </Box>
  );
};

export default ThreadItem;
