import React, { createContext, useContext, useState, useCallback } from 'react';
import { Modal, ModalType } from '@components';

interface IModalProps {
  title: string;
  type: ModalType;
  content?: any;

  icon?: any;
}

interface IModalContext {
  toggleModal: () => void;
  openModal: (props: IModalProps) => void;// eslint-disable-line no-unused-vars
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext | null>(null);

export const ModalProvider: React.FC = ({ children }) => {
  const [Opened, setOpened] = useState(false);
  const [Content, setContent] = useState(null);
  const [Title, setTitle] = useState('');
  const [Type, setType] = useState<ModalType>(null);
  const [Icon, setIcon] = useState<ModalType>(null);

  const toggleModal = useCallback(() => {
    setOpened((opened) => !opened);
  }, []);

  const openModal = useCallback(({ title, type, content, icon }) => {
    setTitle(title);
    setContent(content);
    setType(type);
    setOpened(true);

    if (icon) setIcon(icon);

    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setOpened(false);

    document.getElementsByTagName('body')[0].style.overflow = 'auto';
  }, []);

  return (
    <ModalContext.Provider value={{ toggleModal, openModal, closeModal }}>
      {Opened && (
        <Modal
          title={Title}
          type={Type}
          content={Content}
          icon={Icon}
          onClose={closeModal}
        />
      )}

      {children}
    </ModalContext.Provider>
  );
};

export function useModal(): IModalContext {
  const context = useContext(ModalContext);

  if (!context) throw new Error('useModal must be used within a ModalProvider');

  return context;
}
