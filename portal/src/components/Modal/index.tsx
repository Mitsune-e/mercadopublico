import React from 'react';
import { MessageModal } from './MessageModal';
import { BodyModal } from './BodyModal';
import { ModalContainer } from './styles';
import { RightModal } from './RightModal';

export type ModalType = 'message' | 'body' | 'right' | 'avaliacao';

export interface IPopupProps {
  type: ModalType;
  content?: any;

  icon?: any;
  title?: string;
  onClose?: any;
  closeButtonTitle?: string;
  id?: string;
}

export const Modal: React.FC<IPopupProps> = ({ type, content, icon, id, ...rest }) => {
  function chooseModalType() {
    switch (type) {
      case 'message':
        return <MessageModal type={type} content={content} icon={icon} {...rest} />;
      case 'body':
        return <BodyModal type={type} content={content} {...rest} />;
      case 'right':
        return <RightModal type={type} content={content} {...rest} />;
      // case 'avaliacao':
      //   return <AvaliacaoModal cdPlano={cdPlano} numFuncionalidade={numFuncionalidade} onSend={onSend} {...rest} />;
      default:
        return null;
    }
  }

  const align = type === 'right' ? 'right' : 'default';

  return (
    <ModalContainer id={id} align={align}>
      {chooseModalType()}
    </ModalContainer>
  );
};
