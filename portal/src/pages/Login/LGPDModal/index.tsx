import React, { useState } from 'react';
import { Alert, Button } from '@components';
import { useModal } from '@contexts';
import { LGPDService } from '@services';
import { FaTimes } from 'react-icons/fa';
import TermosLGPD from './TermosLGPD';

interface IProps {
  onSuccess: () => void;
  termoLGPD?: boolean;
}

export const LGPDModal: React.FC<IProps> = ({ onSuccess, termoLGPD }) => {
  const modal = useModal();

  const [Erro, setErro] = useState('');

  async function handleAceitarTermosLGPD() {
    try {
      await LGPDService.Inserir();
      modal.closeModal();
      onSuccess();
    } catch (e: any) {
      setErro(e);
    }
  }

  function handleRecusarTermosLGPD() {
    window.alert(
      'Sem o consentimento expresso no termo, o acesso ao portal do Participante não será permitido. Para mais informações, entre em contato conosco através dos nossos canais de atendimento.'
    );

    modal.closeModal();
  }

  return (
    <div id="modal-primeiro-acesso">
      <Alert type={"danger"}>{Erro}</Alert>

      {!termoLGPD && <TermosLGPD onAceitarTermos={handleAceitarTermosLGPD} />}

      <Button id="button-cancelar" title={'Agora não'} onClick={handleRecusarTermosLGPD} type={'light'} block icon={<FaTimes />} />
    </div>
  );
};
