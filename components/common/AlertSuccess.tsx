"use client";

import { Alert, AlertIcon } from "@chakra-ui/react";

const AlertSuccess = ({ message }: { message: string }) => {
  return (
    <Alert status="success" variant="subtle" mb="7" rounded="md">
      <AlertIcon />
      {message}
    </Alert>
  );
};

export default AlertSuccess;
