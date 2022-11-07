import React from 'react';
import { WebCategoriaEntidade } from '@entidades';
import { BreadcrumbItem } from './BreadcrumbItem';
import { Container } from './styles';

interface IProps {
  categorias: WebCategoriaEntidade[];
}

export const Breadcrumb: React.FC<IProps> = ({
  categorias
}) => {

  return (
    <>
      <nav>
        <Container className={"breadcrumb"}>
          {categorias.map((categoria, index) => {
            return (
              <BreadcrumbItem
                key={index}
                categoria={categoria}
                ative={index === (categorias.length - 1)}
              />
            )
          })}
        </Container>
      </nav>
    </>
  )
}
