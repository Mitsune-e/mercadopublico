import React from "react";
import { IPopupProps } from "..";
import {
  ModalContent,
  ModalMessage,
  ModalMessageBody,
  ModalMessageHeader,
  ModalMessageLink,
} from "./styles";

export const MessageModal: React.FC<IPopupProps> = (props) => {

  return (
    <ModalContent>
      <ModalMessage className={"text-center"}>
        <ModalMessageHeader>
          {props.icon}

          {props.title && <h3>{props.title}</h3>}
        </ModalMessageHeader>

        <ModalMessageBody>{props.content}</ModalMessageBody>

        <div className="text-center">
        <ModalMessageLink
          onClick={props.onClose}
          type={"link"}
          data-dismiss={"modal"}
          title={props.closeButtonTitle ?? "Fechar"}
        />
      </div>
      </ModalMessage>
    </ModalContent>
  );
};
