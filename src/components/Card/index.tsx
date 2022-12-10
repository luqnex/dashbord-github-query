import { ReactNode } from "react";

import { Card, CardBody } from "@chakra-ui/react";

type CardCustomProps = {
  children: ReactNode;
  onClick?: () => void;
};

export const CardCustom = ({ children, onClick }: CardCustomProps) => {
  return (
    <Card
      bg="white"
      h="100%"
      boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
      _hover={
        onClick && {
          cursor: "pointer",
        }
      }
      onClick={onClick}
    >
      <CardBody>{children}</CardBody>
    </Card>
  );
};
