"use client";

import { Link } from "@chakra-ui/next-js";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import FormRegister from "./ui/FormRegister";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncRegisterUser } from "@/states/users/action";

const Register = () => {
  const dispatch = useAppDispatch();

  const register = async ({ email, name, password }: UserRegisterParams) => {
    dispatch(asyncRegisterUser({ email, name, password }));
  };

  return (
    <Container display="flex" justifyContent="center" alignItems="center" maxW="container.xl" minH="full">
      <Stack w="full" maxW="lg">
        <Heading as="h1" mb="10" textAlign="center">
          Daftar Akun
        </Heading>
        <FormRegister register={register} />
        <Box mt="4">
          <Text mr="3" color="gray.400" display="inline">
            Sudah mempunyai akun ?
          </Text>
          <Link href="/login" color="primary.400">
            Login Disini
          </Link>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
