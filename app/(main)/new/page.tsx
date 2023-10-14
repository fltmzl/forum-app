import { Container } from "@chakra-ui/react";
import FormThread from "../ui/FormThread";

const NewThread = () => {
  return (
    <Container maxW="container.xl" py="5" display="flex" justifyContent="center">
      <FormThread />
    </Container>
  );
};

export default NewThread;
