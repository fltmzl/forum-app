"use client";

import { useEffect } from "react";
import { LuLogOut } from "react-icons/lu";
import { MdOutlineLeaderboard } from "react-icons/md";
import { redirect } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { Avatar, Box, Container, Flex, HStack, Text, IconButton, Icon, Center, Skeleton, SkeletonCircle } from "@chakra-ui/react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncUnsetAuthUser } from "@/states/authUser/action";
import { asyncSetIsPreload } from "@/states/isPreload/action";

const Header = () => {
  const isPreload = useAppSelector((states) => states.isPreload);
  const authUser: User = useAppSelector((states) => states.authUser);
  const dispatch = useAppDispatch();
  // const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    dispatch(asyncSetIsPreload());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  if (!authUser && !isPreload) return redirect("/login");

  return (
    <Box as="header" bgColor="gray.100" _dark={{ bgColor: "gray.700" }} py="3">
      <Container maxW="container.xl">
        <Flex alignItems="center" justifyContent="space-between">
          <Link href="/" fontSize="md" fontWeight="bold" _hover={{ color: "primary.500" }}>
            ForumApp
          </Link>
          <Flex alignItems="center" gap="10">
            {/* <Button onClick={toggleColorMode}>{colorMode}</Button> */}

            <Link href="/leaderboards">
              <Center _hover={{ color: "primary.500" }}>
                <Icon as={MdOutlineLeaderboard} fontSize="2xl" />
              </Center>
            </Link>

            <HStack>
              {isPreload ? (
                <>
                  <SkeletonCircle size="9" />
                  <Skeleton w="14" h="5" />
                </>
              ) : (
                <>
                  <Avatar size="sm" name={authUser?.name} src={authUser?.avatar} />
                  <Text>{authUser?.name}</Text>
                </>
              )}
              <IconButton isRound aria-label="Logout" onClick={handleLogout} icon={<LuLogOut />} bgColor="transparent" />
            </HStack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
