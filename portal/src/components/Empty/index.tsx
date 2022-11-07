import React from "react";
import { FaBoxOpen } from "react-icons/fa";

import { Container, Title } from "./styles";

interface IProps {
  id?: string;
  title?: string;
  icon?: any;
}

export const Empty: React.FC<IProps> = ({ id, icon, title }) => {
  return (
    <Container id={id}>
      {icon}
      {!icon && <FaBoxOpen size={100} />}
      <Title id="empty">{title}</Title>
    </Container>
  );
};
