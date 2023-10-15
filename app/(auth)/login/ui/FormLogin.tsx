"use client";

import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import PrimaryButton from "@/components/common/PrimaryButton";
import useInput from "@/hooks/useInput";
import { asyncSetAuthUser } from "@/states/authUser/action";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import AlertSuccess from "@/components/common/AlertSuccess";

const FormLogin = () => {
  const [email, handleEmail] = useInput();
  const [password, handlePassword] = useInput();
  const dispatch = useAppDispatch();
  const [cookies, , removeCookie] = useCookies(["register-success-message"]);
  const registerSuccessMsg = cookies["register-success-message"];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    return () => {
      removeCookie("register-success-message");
    };
  }, [setIsClient, removeCookie]);

  const isRegisterMessageReadyToShow = () => isClient && registerSuccessMsg;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {isRegisterMessageReadyToShow() && <AlertSuccess message={registerSuccessMsg} />}

      <Stack spacing="6">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" focusBorderColor="primary.500" size="lg" py="7" placeholder="name@email.com" autoComplete="username" value={email} onChange={handleEmail} isRequired />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" focusBorderColor="primary.500" size="lg" py="7" placeholder="Your Password" autoComplete="current-password" value={password} onChange={handlePassword} isRequired />
        </FormControl>
        <PrimaryButton colorScheme="primary" size="lg" py="7" type="submit">
          LOGIN
        </PrimaryButton>
      </Stack>
    </form>
  );
};

export default FormLogin;
