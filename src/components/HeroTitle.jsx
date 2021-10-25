import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
