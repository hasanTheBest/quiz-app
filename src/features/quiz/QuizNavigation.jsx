import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { submitQuiz } from "../result/resultSlice";
import { nextQuiz, prevQuiz, selectAnswerSheet } from "./quizSlice";

export const QuizNavigation = () => {
  const dispatch = useDispatch();
  const answerSheet = useSelector(selectAnswerSheet)
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
    <div className="question-prev-next">
      <button className="link prev" onClick={onClickPrevQuiz}>
        Previous
      </button>
      <button className="link submit" onClick={onClickSubmitQuiz}>
        submit
      </button>
      <button className="link next" onClick={onClickNextQuiz}>
        Next
      </button>
    </div>
  );
};
