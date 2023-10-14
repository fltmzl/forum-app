"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import FormLogin from "./ui/FormLogin";

const Login = () => {
  return (
    <Container display="flex" justifyContent="center" alignItems="center" maxW="container.xl" minH="full">
      <Stack w="full" maxW="lg">
        <Heading as="h1" mb="10" textAlign="center">
          Masuk ke akun anda
        </Heading>
        <FormLogin />
        <Box mt="4">
          <Text mr="3" color="gray.400" display="inline">
            Belum mempunyai akun ?
          </Text>
          <Link href="/register" color="primary.400">
            Daftar Sekarang
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
