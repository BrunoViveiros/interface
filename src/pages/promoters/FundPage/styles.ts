import styled, { css } from "styled-components";

export const Container = styled.div`
  ${() => css``}
`;

export const CardContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      max-width: 328px;
      margin-bottom: 30px;
    }
  `}
`;

export const CarouselCardContainer = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      max-width: 206px;
    }
  `}
`;

export const CardCarousel = styled.div`
  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      max-width: 206px;
    }
  `}
`;

export const Title = styled.h1`
  text-transform: uppercase;
  margin: 4px 0;
  font-weight: 900;

  ${({ theme }) => css`
    @media (min-width: ${theme.breakpoints.pad}) {
      font-size: 24px;
    }
  `}
`;

export const GivingText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlack};
    font-weight: 400;
    font-size: 14px;
    text-align: center;
    margin-bottom: 14px;
    margin-top: 4px;
  `}
`;

export const FundText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 36px;
    font-weight: 900;
    margin-bottom: 8px;
  `}
`;

export const ValueGivingText = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 8px;
  `}
`;

export const DateGivingText = styled.p`
  ${({ theme }) => css`
    font-style: italic;
    font-size: 12px;
    color: ${theme.colors.darkGray};
  `}
`;

export const FundTextCoin = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.ribonBlue};
    font-size: 14px;
    font-weight: 400;
  `}
`;

export const Subtitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    font-size: 14px;
    color: ${theme.colors.darkGray};
    margin-bottom: 28px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 8px 0 28px 0;
      font-size: 16px;
    }
  `}
`;

export const SectionTitle = styled.p`
  ${({ theme }) => css`
    font-weight: 700;
    color: ${theme.colors.ribonBlack};
    margin-bottom: 8px;

    @media (min-width: ${theme.breakpoints.pad}) {
      margin: 8px 0;
    }
  `}
`;
