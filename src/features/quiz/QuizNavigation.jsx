import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { submitQuiz } from "../result/resultSlice";
import { QuizPopUp } from "./QuizPopUp";
import { nextQuiz, prevQuiz, selectAnswerSheet } from "./quizSlice";

const StyledNavigationBox = styled.div`
  position: relative;
`;

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

  &.submit {
    background-color: darkslateblue;
    color: ${(p) => p.theme.color.white_a8};
  }
`;

export const QuizNavigation = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [sureSubmit, setSureSubmit] = useState(false);
  const answerSheet = useSelector(selectAnswerSheet);
  const dispatch = useDispatch();
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
  const handleSubmitQuiz = () => {
    setShowPopup(true);
  };

  if (sureSubmit) {
    dispatch(submitQuiz(answerSheet));
    history.push("/result");
  }

  return (
    <>
      <StyledQuizNavigation>
        <StyledNavigationBtn onClick={onClickPrevQuiz}>
          Previous
        </StyledNavigationBtn>
        <StyledNavigationBtn className="submit" onClick={handleSubmitQuiz}>
          submit
        </StyledNavigationBtn>
        <StyledNavigationBtn onClick={onClickNextQuiz}>
          Next
        </StyledNavigationBtn>
      </StyledQuizNavigation>

      {showPopup && (
        <QuizPopUp setShowPopup={setShowPopup} setSureSubmit={setSureSubmit} />
      )}
    </>
  );
};
