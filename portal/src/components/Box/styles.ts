import styled from "styled-components";

export const Container = styled.div<any>`
  background: #fff;
  margin-bottom: 25px;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

export const Header = styled.div<any>`
  display: flex;
  flex-direction: row;
  padding: 14px 15px 7px;
`;

export const HeaderText = styled.div<any>`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

interface ITitleProps {
  titleSize: number;
}

export const Title = styled.div<any & ITitleProps>`
  font-size: ${props => props.titleSize}px;
  font-weight: bold;
`;

export const Subtitle = styled.div<any>`
  font-size: 16px;
`;

export const BadgeContainer = styled.div<any>`
  align-items: flex-end;
  margin-left: 0.5rem !important;
`;

export const Content = styled.div<any>`
  padding: ${(p) => (p.noPadding ? "0px" : "15px")};
`;
