import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 0 14%;
    }
  `}
`;

export const BodyContainer = styled.div`
  width: 100%;
  padding: 0 16px 16px 16px;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 36px;
    }
  `}
`;

export const Text = styled.h3`
  ${({ theme }) => css`
    color: ${theme.colors.darkGray};
  `}
`;

export const CausesContainer = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    column-gap: 8px;
    row-gap: 8px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin-top: 56px;
      width: 70%;
      row-gap: 16px;
      column-gap: 12px;
    }
  `}
`;

export const CausesCardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
