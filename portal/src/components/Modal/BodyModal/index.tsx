import React, { useCallback } from "react";

import { IPopupProps } from "..";
import { Button } from "../..";
import { useModal } from "../../../contexts";

import {
  ButtonClose,
  Content,
  Footer,
  Header,
  IconClose,
  ModalContent,
  Title,
} from "./styles";

export const BodyModal: React.FC<IPopupProps> = (props) => {
  const modal = useModal();

  const handleOnClose = useCallback(() => {
    modal.closeModal();

    if (props.onClose) props.onClose();
  }, []);

  return (
    <ModalContent>
      <Header>
        <Title>{props.title}</Title>
        <ButtonClose onClick={handleOnClose}>
          <IconClose size={14} />
        </ButtonClose>
      </Header>

      <Content>{props.content}</Content>

      <Footer>
        <Button
          onClick={props.onClose}
          type={"primary"}
          data-dismiss={"modal"}
          title={props.closeButtonTitle ?? "Fechar"}
        />
      </Footer>
    </ModalContent>
  );
};
