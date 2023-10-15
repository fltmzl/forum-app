"use client";

import { useCookies } from "react-cookie";
import { redirect } from "next/navigation";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import PrimaryButton from "@/components/common/PrimaryButton";
import useInput from "@/hooks/useInput";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { asyncRegisterUser } from "@/states/users/action";

const FormRegister = () => {
  const [username, handleUsername] = useInput();
  const [email, handleEmail] = useInput();
  const [password, handlePassword] = useInput();
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(["register-success-message"]);
  const registerSuccessMsg = cookies["register-success-message"];

  if (registerSuccessMsg) {
    redirect("/login");
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(asyncRegisterUser({ email, name: username, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="6">
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input type="text" focusBorderColor="primary.500" size="lg" py="7" placeholder="your name" autoComplete="username" value={username} onChange={handleUsername} isRequired />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" focusBorderColor="primary.500" size="lg" py="7" placeholder="name@email.com" autoComplete="username" value={email} onChange={handleEmail} isRequired />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" focusBorderColor="primary.500" size="lg" py="7" placeholder="Your Password" autoComplete="current-password" value={password} onChange={handlePassword} isRequired />
        </FormControl>
        <PrimaryButton colorScheme="primary" size="lg" py="7" type="submit">
          REGISTER
        </PrimaryButton>
      </Stack>
    </form>
  );
};

export default FormRegister;
