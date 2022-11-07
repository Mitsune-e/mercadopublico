import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px;
  border: 0px;
`;

export const Icon = styled.div<any>`
  align-items: center;
  background: rgba(0, 0, 0, 0.08);
  min-width: 31px;
  min-height: 31px;
  padding: 5px 10px;

  display: flex;
  justify-content: center;

  ${(props) => `
      border-top-left-radius: ${!props.iconRight ? "5px" : "0"};
      border-bottom-left-radius: ${!props.iconRight ? "5px" : "0"};

      border-top-right-radius: ${props.iconRight ? "5px" : "0"};
      border-bottom-right-radius: ${props.iconRight ? "5px" : "0"};
  `};
`;

export const Text = styled.div`
  flex: 1;
  padding: 7px 20px;
`;
