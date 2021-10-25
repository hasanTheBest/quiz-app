import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { submitQuiz } from "../result/resultSlice";
import { nextQuiz, prevQuiz, selectAnswerSheet } from "./quizSlice";

const StyledQuizNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
`;

const StyledNavigationBtn = styled.button`
  padding: 0.8rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0.2rem;
  letter-spacing: 1px;
  color: darkcyan;
  border: none;
`;

export const QuizNavigation = () => {
  const dispatch = useDispatch();
  const answerSheet = useSelector(selectAnswerSheet);
  const history = useHistory();

  // Next Quiz
  const onClickNextQuiz = () => {
    dispatch(nextQuiz());
  };

  // Goto Prev Quiz
  const onClickPrevQuiz = () => {
    dispatch(prevQuiz());
  };

  // Submit quiz
  const onClickSubmitQuiz = () => {
    dispatch(submitQuiz(answerSheet));

    history.push("/result");
  };

  return (
    <StyledQuizNavigation>
      <StyledNavigationBtn prev onClick={onClickPrevQuiz}>
        Previous
      </StyledNavigationBtn>
      <StyledNavigationBtn submit onClick={onClickSubmitQuiz}>
        submit
      </StyledNavigationBtn>
      <StyledNavigationBtn next onClick={onClickNextQuiz}>
        Next
      </StyledNavigationBtn>
    </StyledQuizNavigation>
  );
};
