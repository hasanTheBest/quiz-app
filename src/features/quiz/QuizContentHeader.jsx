import React from "react";
import { useSelector } from "react-redux";
import { selectAllQuizIds, selectCurrent, selectQuizById } from "./quizSlice";

export const QuizContentHeader = () => {
  const current = useSelector(selectCurrent);
  const qIds = useSelector(selectAllQuizIds);
  const currentQuiz = useSelector((state) =>
    selectQuizById(state, qIds[current])
  );

  const { category } = currentQuiz ? currentQuiz : {};

  return (
    <h2 className="quiz-header">
      {category ? category : "Uncategorized"} -{" "}
      <div className="currect-quiz">
        {current + 1}/{qIds.length}
      </div>
    </h2>
  );
};
