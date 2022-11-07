import React, { useEffect, useRef, useState } from "react";
import { WebCategoriaEntidade } from "@entidades";
import { ContaierBox, Container, ControllerBox, Title } from "./styles";
import { Button } from "../Button";
import { FaChevronCircleDown, FaChevronCircleRight, FaSearch } from "react-icons/fa";
import { CategoriaService } from "@services";
import { LoadingComponent } from "../LoadingComponent";
import { Alert } from "../Alert";
import { Breadcrumb } from "../Breadcrumb";
import { useHistory } from "react-router-dom";
import { Row } from "../Row";
import { Col } from "../Col";

interface IProps {
  categoria: WebCategoriaEntidade;
  categoriaAberta: boolean;
}

export const Collapse: React.FC<IProps> = ({
  categoria,
  categoriaAberta
}) => {
  const ref = useRef(null);
  const history = useHistory();

  const [Visivel, setVisivel] = useState<boolean>(false);
  const [Height, setHeight] = useState<number>(0);
  const [SubCategorias, setSubCategorias] = useState<WebCategoriaEntidade[]>([]);
  const [ArvoreCategorias, setArvoreCategorias] = useState<WebCategoriaEntidade[]>(new Array<WebCategoriaEntidade>());
  const [Loading, setLoading] = useState<boolean>(true);
  const [Erro, setErro] = useState<string>('');

  useEffect(() => {
    (async () => {
      setHeight(ref.current ? ref.current.clientHeight : 0);
    })();
  }, [ref.current, ArvoreCategorias]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      try {
        const subcategorias = await CategoriaService.BuscaSub(categoria.COD_CATEGORIA);
        setSubCategorias(subcategorias);

        const arvoreCategorias = await CategoriaService.BuscarArvorePelaSub(categoria.COD_CATEGORIA);
        setArvoreCategorias(arvoreCategorias);
      } catch (e: any) {
        setErro(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [categoria]);

  return (
    <>
      {Loading && <LoadingComponent />}

      {!Loading && Erro && <Alert type={"danger"}>{Erro}</Alert>}

      {!Loading && !Erro && <>
        <Container title={<>
          {SubCategorias.length > 0 && <Button
            type={"light"}
            className={"mb-2 ml-2"}
            onClick={() => {
              setVisivel(!Visivel);
            }}
            title={"Visualizar Todas Subcategorias"}
            icon={Visivel ? <FaChevronCircleDown /> : <FaChevronCircleRight />}
          />}
        </>}>
          <Title>{categoria.DS_CATEGORIA}</Title>

          <Breadcrumb categorias={ArvoreCategorias} />

          {SubCategorias.length > 0 &&
            <ControllerBox height={(Visivel ? Height : 0)}>
              <ContaierBox height={(Visivel ? 0 : Height)} ref={ref}>
                {!categoriaAberta &&
                  <Row>
                    <Col>
                      <Button
                        type={"secondary"}
                        icon={<FaSearch />}
                        title={"Detalhar Categoria"}
                        onClick={() => history.push(`/categorias/${categoria.COD_CATEGORIA}`)}
                        block
                      />
                    </Col>
                  </Row>}
                <ul className={"nav"}>
                  {SubCategorias.map((categoria, index) => {
                    return (
                      <li className={"nav-item"} key={index}>
                        <a className={"nav-link"} href={`/#/categorias/${categoria.COD_CATEGORIA}`}>{categoria.DS_CATEGORIA}</a>
                      </li>
                    )
                  })}
                </ul>
              </ContaierBox>
            </ControllerBox>
          }
        </Container>
      </>}
    </>
  );
}