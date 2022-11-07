import React from 'react';
import { Button } from '@components';
import { FaCheck } from 'react-icons/fa';

interface IProps {
  onAceitarTermos: () => void;
}

const LGPDModal: React.FC<IProps> = ({ onAceitarTermos }) => {
  return (
    <>
      <h5 className="mt-5">
        <b>TERMO DE CONSENTIMENTO E AUTORIZAÇÃO LIVRE, ESCLARECIDO E INEQUÍVOCO DE UTILIZAÇÃO DE DADOS PESSOAIS</b>
      </h5>

      <p style={{ textAlign: 'justify' }}>
        Em observância a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais), autorizo a realizar o tratamento dos meus dados
        pessoais, fornecidos desde minha adesão ao CNAE (Classificação Nacional de Atividades Econômicas), utilizando tais
        informações tão somente para os fins lícitos e previstos na consecução das compras governamentais, bem como utilizá-las nas
        avaliações atuariais e financeiras e, ainda, compartilhá-las com os órgãos governamentais que legalmente os requererem.
      </p>

      <Button
        id="button-aceitar"
        title={'Li e concordo com o termo acima'}
        onClick={onAceitarTermos}
        type="primary"
        block
        icon={<FaCheck />}
        usesLoading
        loadingText="Carregando..."
      />
    </>
  );
};

export default LGPDModal;
