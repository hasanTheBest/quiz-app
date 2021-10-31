import React from "react";
import styled from "styled-components";
import { QuizContentHeader } from "./QuizContentHeader";
import { QuizNavigation } from "./QuizNavigation";
import { QuizQuestionOptions } from "./QuizQuestionOptions";
import { QuizQuestionTitle } from "./QuizQuestionTitle";
import { QuizTotalQuestion } from "./QuizTotalQuestion";

const StyledQuestionWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 500px;
`;

export const QuizContent = () => {
  return (
    <>
      <StyledQuestionWrapper>
        <QuizContentHeader />
        <QuizTotalQuestion />
        <QuizQuestionTitle />
        <QuizQuestionOptions />
        <QuizNavigation />
      </StyledQuestionWrapper>
    </>
  );
};
