import ButtonRound from "components/atomics/buttons/ButtonRound";
import Header from "components/atomics/sections/Header";
import styled from "styled-components";
import { ReactComponent as Logo } from "assets/icons/logo.svg";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  padding: 16px;
  flex-direction: column;
  text-align: left;
  justify-content: flex-start;
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    padding: 0;
    margin-left: 240px;
    margin-right: 170px;
    margin: 0 auto;
    width: 80%;
  }
`;

export const Icon = styled(Logo)`
  display: none;
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    display: flex;
    margin-top: 50px;
    width: 53px;
    height: 53px;
  }
`;

export const ImpactHeader = styled(Header)``;

export const Title = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.colors.ribonBlack};
  font-weight: 900;
  line-height: 1.6;
  margin: 30px 0 0 0;
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 36px;
  }
`;

export const Subtitle = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darkGray};
  @media (min-width: ${({ theme }) => theme.breakpoints.pad}) {
    font-size: 16px;
  }
`;

export const CardsButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

export const Wrapper = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  gap: 8px;
  @media (min-width: ${({ theme }) => theme.breakpoints.desktop}) {
    justify-content: flex-start;
  }
`;

export const Button = styled(ButtonRound)`
  width: 100px;
  align-self: center;
  margin: 16px 0;
`;
