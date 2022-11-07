import React from 'react';
import { WebCategoriaEntidade } from '@entidades';
import { Anchor } from './styles';

interface IProps {
  ative: boolean;
  categoria: WebCategoriaEntidade;
}

export const BreadcrumbItem: React.FC<IProps> = ({
  ative,
  categoria
}) => {

  return (
    <>
      <li className={`breadcrumb-item ${ative ? "ative" : ""}`}>
        {!ative && <Anchor href={`/#/categorias/${categoria.COD_CATEGORIA}`}>{categoria.DS_CATEGORIA}</Anchor>}

        {ative && <>{categoria.DS_CATEGORIA}</>}
      </li>
    </>
  )
}
