import styled from "styled-components";
import { Box } from "../Box";

export const Container = styled(Box)`
  width: 400px;
`;

export const Title = styled.h4`
  fontWeight: bold;
`;

export const Subtitle = styled.p`
  fontSize: 12px;
`;

export const Img = styled.img<any>`
  width: 100%;
  max-width: 300px;
`;
