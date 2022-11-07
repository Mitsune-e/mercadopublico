import React, { useState } from 'react';
import { LoginEntidade } from '@entidades';
import { Alert, Button, Col, Form, Input, Row } from '@components';
import { LGPDService, AuthService } from '@services';
import { useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Header from '../Header';
import { LGPDModal } from '../LGPDModal';

import { useMasterPage, useModal } from '@contexts';
import { Session } from '@session';
import { LongForm } from '../styles';

const LoginForm: React.FC<any> = ({ onGoBack }) => {
  const modal = useModal();
  const masterPage = useMasterPage();

  const form = useRef<Form>(null);

  const [Erros, setErros] = useState<JSX.Element | null>(null);

  const [Cnpj, setCnpj] = useState('');
  const [Senha, setSenha] = useState('');

  async function handleEntrar() {
    setErros(null);

    const erros = await form?.current?.validate();

    if (erros) {
      setErros(erros);
      return;
    }

    try {
      const user: LoginEntidade = {
        Cnpj: Cnpj,
        Senha: Senha,
        Origem: 1
      };

      const login = await AuthService.Login(user);

      await Session.setToken(login);

      // await criarAcesso(Cpf, 'PORTAL');

      const termoLGPD = await LGPDService.Buscar();

      if (!termoLGPD) {
        modal.openModal({
          title: 'TERMO DE CONSENTIMENTO E AUTORIZAÇÃO LIVRE, ESCLARECIDO E INEQUÍVOCO DE UTILIZAÇÃO DE DADOS PESSOAIS',
          type: 'right',
          content: <LGPDModal onSuccess={handleSuccess} termoLGPD={termoLGPD} />
        });
      } else {
        handleSuccess();
      }
    } catch (err: any) {
      setErros(err);
    }
  }

  function handleSuccess() {
    masterPage.navigate('/');
    masterPage.showMenu(true);
    masterPage.setUserName(Cnpj);
  }

  return (
    <LongForm>
      <Header />

      <Form ref={form}>
        <Input
          value={Cnpj}
          labelPosition={"up"}
          onChange={setCnpj}
          title={"CNPJ"}
          required
        />

        <br />

        <Input
          id={"input-senha"}
          value={Senha}
          labelPosition={"up"}
          onChange={setSenha}
          title={"Senha"}
          type={"password"}
          required
        />

        <br />

        <Alert type="danger">
          {Erros}
        </Alert>

        <Row>
          <Col>
            <Button
              onClick={onGoBack}
              title={"Voltar"}
              icon={<FaArrowLeft />}
              block
            />
          </Col>

          <Col>
            <Button
              onClick={handleEntrar}
              type={"primary"}
              submit
              title={"Entrar"}
              icon={<FaArrowRight />}
              usesLoading
              loadingText={"Carregando..."}
              block
            />
          </Col>
        </Row>
      </Form>
    </LongForm>
  );
};

export default LoginForm;
