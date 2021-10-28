import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  specificQuiz,
  selectAllQuizIds,
  selectAnswerSheet,
  selectCurrent,
} from "./quizSlice";

const StyledQNButton = styled.button`
  width: 40px;
  height: 40px;
  line-height: 40px;
  background-color: ${(props) =>
    props.answered ? `darkcyan` : `rgba(255, 255, 255, 0.1)`};
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  margin: 0.5rem;

  ${(props) => props.active && `border-color: darkcyan`}
`;

const StyledQNWrapper = styled.div`
  padding: 0.8rem 0;
  margin-bottom: 1rem;
  text-align: center;
`;

export const QuizTotalQuestion = () => {
  const quizIds = useSelector(selectAllQuizIds);
  const current = useSelector(selectCurrent);
  const answerSheet = useSelector(selectAnswerSheet);
  const dispatch = useDispatch();

  const totalQuestions = quizIds.map((q, i) => {
    return (
      <StyledQNButton
        key={"qOption" + q}
        onClick={() => dispatch(specificQuiz(i))}
        active={current === i}
        answered={answerSheet.hasOwnProperty(quizIds[current])}
      >
        {i + 1}
      </StyledQNButton>
    );
  });

  return <StyledQNWrapper>{totalQuestions}</StyledQNWrapper>;
};
