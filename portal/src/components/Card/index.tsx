import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Row, StaticField } from '@components';

import { Container, Img, Subtitle, Title } from './styles';
import { WebProdutosEntidade } from '@entidades';
import { FaCartPlus, FaFileAlt, FaTimes } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { CarrinhoContext } from '@contexts';
import { addDay } from '@helpers/date';

interface IProps {
  produto: WebProdutosEntidade;
}

export const Card: React.FC<IProps> = ({
  produto
}) => {
  const history = useHistory();
  const carrinho = useContext(CarrinhoContext);

  const [ProdutoCarrinho, setProdutoCarrinho] = useState<boolean>(false);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {

      try {
        const produtoCarrinho = await carrinho.localizarProduto(produto);
        setProdutoCarrinho(produtoCarrinho !== null && produtoCarrinho !== undefined);
      } catch (e: any) {
        setErro(e);
      }
    })();
  }, [carrinho]);

  return (
    <>
      {Erro && <Alert type={"danger"}>{Erro}</Alert>}

      {!Erro &&
        <Container titleSize={21} title={produto.NOM_PRODUTO}>

          <Img className={"mb-3"} src={produto.IMG_REF_PRODUTOS} alt={`foto ${produto.NOM_PRODUTO}`} />

          <Title>{produto.DS_PRODUTO}</Title>

          <StaticField
            fontSize={21}
            title={"Preço"}
            value={produto.VAL_PRODUTO}
            type={"money"}
            labelPosition={"left"}
            fieldClassName={"d-flex justify-content-end text-success"}
          />

          <Alert type={"warning"}>{`Prazo Máximo para Entrega: ${addDay(new Date(), produto.NUM_PRAZO_PRODUTO)}`}</Alert>

          <Subtitle>
            {"Categoria: "}
            <a href={`/#/categorias/${produto.COD_CATEGORIA}`}>{produto.DS_CATEGORIA}</a>
            {" | "}
            <a href={`/#/categorias/${produto.COD_SUB_CATEGORIA}`}>{produto.DS_SUB_CATEGORIA}</a>
          </Subtitle>

          <Row>
            <Col>
              <Button
                title={"Detalhar"}
                type={"secondary"}
                icon={<FaFileAlt />}
                onClick={() => history.push(`/produtos/${produto.PK_PRODUTO}`)}
              />
            </Col>

            <Col>
              {!ProdutoCarrinho &&
                <Button
                  title={"Adicionar"}
                  type={"primary"}
                  icon={<FaCartPlus />}
                  onClick={() => {
                    carrinho.adicionarProduto(produto);
                    setProdutoCarrinho(true);
                  }}
                />}

              {ProdutoCarrinho &&
                <Button
                  title={"Remover"}
                  type={"danger"}
                  icon={<FaTimes />}
                  onClick={() => {
                    carrinho.removerProduto(produto);
                    setProdutoCarrinho(false);
                  }}
                />}

            </Col>
          </Row>
        </Container>
      }
    </>
  )
}
