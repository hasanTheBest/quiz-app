import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;

  ${(p) => p.theme.breakpoints.md} {
    display: none;
  }
`;
const Title = styled.h1``;
const Subtitle = styled.h6``;

export const HeroTitle = () => {
  return (
    <StyledHeader>
      <Title>The Ultimate Tech Quiz</Title>
      <Subtitle>Test your CS Web Tech knowledge</Subtitle>
    </StyledHeader>
  );
};
