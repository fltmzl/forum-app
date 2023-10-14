import { Button, ButtonProps, LightMode } from "@chakra-ui/react";

type PrimaryButtonProps = {
  children: React.ReactNode;
} & ButtonProps;

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, ...props }) => {
  return (
    <LightMode>
      <Button {...props}>{children}</Button>
    </LightMode>
  );
};

export default PrimaryButton;
