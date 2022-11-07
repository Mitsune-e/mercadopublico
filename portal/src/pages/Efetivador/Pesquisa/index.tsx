import React, { useState } from "react";
import { ParametrosBuscaEfetivador, ParametrosEfetivador } from "@entidades";
import { Alert, Box, Button, Col, ComboBox, Row } from "@components";
import { FaSearch } from "react-icons/fa";
import { TYPE_IND_SITUACAO } from "@domains";

interface IProps {
  parametros: ParametrosEfetivador;
  realizarPesquisa: (p: ParametrosBuscaEfetivador) => void; // eslint-disable-line no-unused-vars
}

export const Pesquisa: React.FC<IProps> = ({ parametros, realizarPesquisa }) => {
  const [Funcionalidade, setFuncionalidade] = useState<number>(0);
  const [Situacao, setSituacao] = useState<TYPE_IND_SITUACAO>(null);
  const [Erro, setErro] = useState<string>('');

  async function handlePesquisar() {
    try {
      const parametrosPesquisa = new ParametrosBuscaEfetivador();
      parametrosPesquisa.Funcionalidade = Funcionalidade;
      parametrosPesquisa.Situacao = Situacao;

      await realizarPesquisa(parametrosPesquisa);
    }
    catch (e: any) {
      setErro(e);
    }
  }

  return (
    <Box title={"Pesquisar"}>
      <Row>
        <Col>
          <ComboBox
            title={"Funcionalidade"}
            value={Funcionalidade}
            data={parametros.Funcionalidades}
            onChange={setFuncionalidade}
            memberName={"DES_FUNCIONALIDADE"}
            memberValue={"OID_FUNCIONALIDADE"}
            emptyText={"Todas"}
            labelPosition={"up"}
          />
        </Col>

        <Col>
          <ComboBox
            title={"Situação"}
            value={Situacao}
            data={parametros.Situacoes}
            onChange={setSituacao}
            memberName={"Value"}
            memberValue={"Key"}
            emptyText={"Todas"}
            labelPosition={"up"}
          />
        </Col>

        <Col>
          <Button
            className={"m-3"}
            type={"primary"}
            title={"Pesquisar"}
            icon={<FaSearch />}
            onClick={handlePesquisar}
            loadingText={"Pesquisando..."}
            usesLoading
          />
        </Col>
      </Row>

      <Alert type="danger">{Erro}</Alert>
    </Box>
  );
}