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
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  margin: 0.2rem;
  background-color: rgba(255, 255, 255, 0.1);

  &.answered {
    background-color: darkcyan;
  }

  /* background-color: ${(props) =>
    props.answered ? `darkcyan` : `rgba(255, 255, 255, 0.1)`}; */
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
    // const checkAnswered = (id, answerObj) => {
    //   for (let key in answerObj) {
    //     if (key === id) {
    //       return true;
    //       break;
    //     }
    //   }
    // if (answerObj.hasOwnProperty(id)) {
    //   for (let key in answerObj) {
    //     if (key === id) {
    //       return true;
    //       break;
    //     }
    //   }
    // }
    // };

    return (
      <StyledQNButton
        key={"qOption" + q}
        onClick={() => dispatch(specificQuiz(i))}
        active={current === i}
        className={answerSheet.hasOwnProperty(quizIds[current]) && "answered"}
      >
        {i + 1}
      </StyledQNButton>
    );
  });

  return <StyledQNWrapper>{totalQuestions}</StyledQNWrapper>;
};
