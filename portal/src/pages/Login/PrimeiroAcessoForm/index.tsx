import React, { useState } from 'react';
import { LoginEntidade } from '@entidades';
import { Alert, Button, Col, Form, Input, Row } from '@components';
import { AuthService } from '@services';
import { useRef } from 'react';
import { FaArrowLeft, FaPaperPlane } from 'react-icons/fa';
import Header from '../Header';
import { LongForm } from '../styles';

const PrimeiroAcessoActive: React.FC<any> = ({ onGoBack }) => {
  const form = useRef<Form>(null);

  const [Erros, setErros] = useState<JSX.Element | null>(null);

  const [Cnpj, setCnpj] = useState('');
  // const [DataNascimento, setDataNascimento] = useState('');

  async function handleEnviar() {
    setErros(null);

    const erros = await form?.current?.validate();

    if (erros) {
      setErros(erros);
      return;
    }

    try {
      const user: LoginEntidade = {
        Cnpj: Cnpj,
        Origem: 1
        // DataNascimento: DataNascimento
      };

      const resultado = await AuthService.Criar(user);

      alert(resultado);
      onGoBack();
    } catch (e: any) {
      setErros(e.toString());
    }
  }

  return (
    <LongForm>
      <Header />

      <Form ref={form}>
        <Input
          id="input-cnpj"
          value={Cnpj}
          labelPosition="up"
          onChange={setCnpj}
          title="CNPJ"
          required
        />

        <br />

        {/* <Input
          id="input-data-nascimento"
          value={DataNascimento}
          labelPosition="up"
          onChange={setDataNascimento}
          title="Data de Nascimento"
          type="date"
          required
        />

        <br /> */}

        <Alert id="alert-erro" type="danger">
          {Erros}
        </Alert>

        <Row>
          <Col>
            <Button
              id="button-voltar"
              onClick={onGoBack}
              title="Voltar"
              icon={<FaArrowLeft />}
              block
            />
          </Col>

          <Col>
            <Button
              id="button-enviar"
              onClick={handleEnviar}
              type="primary"
              title="Enviar Nova Senha"
              icon={<FaPaperPlane />}
              block
              usesLoading
              loadingText="Carregando..."
            />
          </Col>
        </Row>
      </Form>
    </LongForm>
  );
};

export default PrimeiroAcessoActive;
