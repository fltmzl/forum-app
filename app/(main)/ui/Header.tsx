"use client";

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { asyncUnsetAuthUser } from "@/states/authUser/action";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Box, Container, Flex, HStack, Text, IconButton, Icon, Center } from "@chakra-ui/react";
import { Federant } from "next/font/google";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineLeaderboard } from "react-icons/md";

const Header = () => {
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <Box as="header" bgColor="gray.700" py="3">
      <Container maxW="container.xl">
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/" fontSize="md" fontWeight="bold" _hover={{ color: "primary.500" }}>
            ForumApp
          </Link>
          <Flex alignItems="center" gap="10">
            <Link href="/leaderboards">
              <Center _hover={{ color: "primary.500" }}>
                <Icon as={MdOutlineLeaderboard} fontSize="2xl" />
              </Center>
            </Link>

            <HStack>
              <Avatar size="sm" name={authUser.name} src={authUser.avatar} />
              <Text>{authUser.name}</Text>
              <IconButton isRound aria-label="Logout" onClick={handleLogout} icon={<LuLogOut />} bgColor="transparent" />
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
