import { ReactNode } from "react";

import { Card, CardBody } from "@chakra-ui/react";

type CardCustomProps = {
  children: ReactNode;
};

export const CardCustom = ({ children }: CardCustomProps) => {
  return (
    <Card bg="white">
      <CardBody>{children}</CardBody>
    </Card>
  );
};
