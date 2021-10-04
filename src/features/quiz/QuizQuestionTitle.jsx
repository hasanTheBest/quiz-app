import React from "react";
import { useSelector } from "react-redux";
import { selectAllQuizIds, selectCurrent, selectQuizById } from "./quizSlice";

export const QuizQuestionTitle = () => {
  const current = useSelector(selectCurrent)
  const id = useSelector(selectAllQuizIds)[current]
  const currentQuiz = useSelector((state) =>
    selectQuizById(state, id)
  );
  const {question, description} = currentQuiz ? currentQuiz : {};

  return (
    <h6 className="question main">
      <span className="question-number">{current + 1}.</span> {question}{" "}
      <span className="question-hint">{description && description}</span>
    </h6>
  );
};
