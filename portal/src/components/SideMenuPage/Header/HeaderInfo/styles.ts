import styled from "styled-components";
import { device } from "../../../../device";

export const Info = styled.div<any>`
  position: relative;
  margin: 0 auto;
  overflow: hidden;
  line-height: 1.25;
  color: #fff;

  @media ${device.tablet} {
    display: none;
  }
`;

export const MenuButton = styled.button<any>`
  @media ${device.tablet} {
    display: none;
  }
  color: #fff;
`;

export const HeaderTitle = styled.div`
  border-bottom: 1px solid #fff;
`;

export const HeaderUsername = styled.div`
  text-align: right;
`;