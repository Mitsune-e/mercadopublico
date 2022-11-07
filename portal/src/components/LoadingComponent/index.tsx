import React from 'react';
import { Box } from '@components';
import { FaSpinner } from 'react-icons/fa';
import { Container, LoaderText } from './styles';

interface IProps {
  className?: string;
  title?: string;
}

export const LoadingComponent: React.FC<IProps> = ({ className, title = 'Carregando...' }) => {
  return (
    <Box className={className}>
      <Container>
        <FaSpinner className="icon-spin" />

        <LoaderText>{title}</LoaderText>
      </Container>
    </Box>
  );
};
