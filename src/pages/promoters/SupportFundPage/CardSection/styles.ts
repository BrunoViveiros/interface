import styled, { css } from "styled-components";
import Button from "components/atomics/Button";

export const CardSectionContainer = styled.div`
  margin-top: 24px;
`;

export const Subtitle = styled.p`
  margin-top: 20px;
  font-weight: 700;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 18px;
    }
  `}
`;

export const ValuesContainer = styled.div`
  ${() => css`
    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    }
    grid-template-columns: 1fr 1fr 1fr 1fr;
    display: grid;
    grid-gap: 8px;
    width: 100%;
    margin-top: 12px;
    margin-bottom: 36px;
  `}
`;

export const CardValueButton = styled(Button)`
  ${() => css`
    border-radius: 66px;
    height: 30px;
    max-width: 112px;
  `}
`;

export const ButtonContainer = styled.div`
  ${() => css`
    box-shadow: 0px -4px 4px rgba(24, 86, 105, 0.15);
    height: 80px;
    background-color: white;
    width: 100%;
    padding: 12px 16px;
    align-self: end;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;

    @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
      box-shadow: none;
      padding: 0;
      position: static;
      height: 60px;

      button {
        height: 40px;
      }
    }
  `}
`;

export const FinishButton = styled(Button)`
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    height: 56px;
  }
`;
