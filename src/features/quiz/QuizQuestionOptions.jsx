import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { justifyQuizAnswer, selectAllQuizIds, selectCurrent, selectQuizById } from "./quizSlice";

export const QuizQuestionOptions = () => {
  const quizIds = useSelector(selectAllQuizIds);
  const current = useSelector(selectCurrent);
  const answerSheet = useSelector((state) => state.quiz.answerSheet);

  const singleQuiz = useSelector((state) =>
    selectQuizById(state, quizIds[current])
  );

  const { id, answers, correct_answers } = singleQuiz ? singleQuiz : {};

  // // Justify Quiz Answer
  //   const justifyQuizAnswer = (qid, ans, oid, key_ans) => {
  //       setAnswerSheet((state) => {
  //     return {
  //       ...state,
  //       [qid]: {
  //         isCorrect: ans === "true",
  //         index: oid,
  //         id: qid,
  //         key_ans,
  //       },
  //     };
  //   });

  // // Increase Score
  // if (ans === "true") {
  //   setScore(score + 1);
  // }

  // // Show next question
  // setTimeout(() => {
  //   onClickNextQuiz(current + 1);
  // }, 300);

  // Quiz options
  const quizOptions =
    singleQuiz &&
    Object.entries(answers).map(([key, value], option_i) => {
      if (value === null) {
        return null;
      }

      const [key_ans, value_ans] =
        singleQuiz && Object.entries(correct_answers)[option_i];

      const optionClasses = classNames("question-option", {
        correct:
          correct_answers[answerSheet[id]?.key_ans] === "true" &&
          answerSheet[id]?.index === option_i,
        wrong:
          correct_answers[answerSheet[id]?.key_ans] !== "true" &&
          answerSheet[id]?.index === option_i,
      });

      return (
        <li
          className={optionClasses}
          key={key}
          onClick={() => justifyQuizAnswer(id, value_ans, option_i, key_ans)}
        >
          {value}
        </li>
      );
    });

  // Disabled Options
  const disabledOptions =
    Object.keys(answerSheet).indexOf(String(id)) !== -1
      ? "disabled-options"
      : "";

  return (
    <div className="question-options-wrapper">
      <ol type="A" className={`option-list ${disabledOptions}`}>
        {quizOptions}
      </ol>
    </div>
  );
};
