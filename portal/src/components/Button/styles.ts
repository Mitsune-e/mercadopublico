import styled from "styled-components";

export const Container = styled.button<any>`
  padding: 0;
  font-size: 14px;
  border-width: 0px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s, box-shadow 0.2s;
  width: auto;

  &:focus {
    box-shadow: none;
  }

  &.btn-borderless {
    border: none;
  }

  &.btn-block {
    width: 100%;
  }

  &.btn-outline-default,
  &.btn-outline-primary,
  &.btn-outline-secondary,
  &.btn-outline-success,
  &.btn-outline-danger,
  &.btn-outline-warning,
  &.btn-outline-info,
  &.btn-outline-light,
  &.btn-outline-dark {
    border-width: 1px;
  }

  &.btn-default,
  &.btn-outline-default,
  &.btn-default:focus {
    color: #7c7e80;
    background-color: #fff;
    border: 1px solid #d2d2d2;

    &:hover {
      background-color: #fafafac0;
      border-color: rgba(98, 98, 98, 0.27);
      color: #1a1a1a;
    }

    &:disabled:hover {
      color: #7c7e80;
      background-color: #fff;
      border-color: #d2d2d2;
      opacity: 0.65;
    }

    &:active {
      background-color: #f0f0f0;
      border-color: #e6e6e6;
      color: #2c2c2c;
    }
  }

  &.btn-lg .btn-text {
    padding: 10px 25px;
  }

  &.btn-md .btn-text {
    padding: 5px 20px;
  }

  &.btn-sm .btn-text {
    padding: 5px 12px;
    font-size: 10px;
  }

  &.btn-xs .btn-text {
    padding: 5px 12px;
    font-size: 9px;
  }
`;

export const Content = styled.div<any>`
  display: flex;
  flex-direction: row;
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

export const Text = styled.div<any>`
  flex: 1;
  padding: 7px 20px;
`;
