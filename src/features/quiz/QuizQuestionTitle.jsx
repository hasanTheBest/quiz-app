import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllQuizIds, selectCurrent, selectQuizById } from "./quizSlice";

export const StyledQuestionTitle = styled.h6`
  font-size: 1.1rem;
  letter-spacing: 1px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.2rem 0.2rem 0 0;

  &.main {
    padding: 2rem;
    background: linear-gradient(-45deg, darkslateblue, darkcyan, darkslateblue);
  }
`;
export const StQuestionNumber = styled.span`
  padding: 0.8rem 0;
  margin-bottom: 1rem;
  text-align: center;
`;

export const QuizQuestionTitle = () => {
  const current = useSelector(selectCurrent);
  const id = useSelector(selectAllQuizIds)[current];
  const currentQuiz = useSelector((state) => selectQuizById(state, id));
  const { question, description } = currentQuiz ? currentQuiz : {};

  return (
    <StyledQuestionTitle className="main">
      <StQuestionNumber>{current + 1}.</StQuestionNumber> {question}{" "}
      <span className="question-hint">{description && description}</span>
    </StyledQuestionTitle>
  );
};
