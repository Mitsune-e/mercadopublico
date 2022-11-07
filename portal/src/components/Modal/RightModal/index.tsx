import React, { useCallback } from "react";
import { ButtonClose, Header, IconClose, ModalContent } from "./styles";
import { IPopupProps } from "..";
import { useModal } from "@contexts";

export const RightModal: React.FC<IPopupProps> = (props) => {
  const modal = useModal();

  const handleOnClose = useCallback(() => {
    modal.closeModal();

    if (props.onClose) props.onClose();
  }, []);

  return (
    <ModalContent>
      <Header>
        <ButtonClose onClick={handleOnClose}>
          <IconClose size={14} />
        </ButtonClose>
      </Header>

      {props.content}
    </ModalContent>
  );
};
