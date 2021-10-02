import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllQuizs } from "../quiz/quizSlice";
import { QuizResultOption } from "./QuizResultOption";
import { selectResultEntities } from "./resultSlice";

export const QuizResult = () => {
  const quizs = useSelector(selectAllQuizs);
  const result = useSelector((state) => selectResultEntities(state));

  const content =
    quizs &&
    quizs.map(
      (
        {
          id,
          question,
          answers,
          correct_answers,
          explanation,
          tip,
          description,
        },
        current
      ) => {
        const classes = classNames("question main", {
          "correct" : result[id]?.isCorrect,
          "wrong" : result[id]?.isCorrect === false,
          "skipped" : result[id] === undefined,
        })
        return (
          <>
            <div className="question-wrapper" key={id + current}>
              <h6 className={classes}>
                <span className="question-number">{current + 1}.</span>{" "}
                {question}
                {description && (
                  <span className="question-hint">{description}</span>
                )}
              </h6>
              <div className="question-options-wrapper">
                <ol type="A" className="option-list">
                  {Object.entries(answers).map((option, i) => {
                    const correctOption = Object.entries(correct_answers)[i];

                    return (
                      <React.Fragment key={"option" + id + i}>
                      <QuizResultOption
                        answer={result[id]}
                        option={option}
                        correct={correctOption}
                      />
                      </React.Fragment>
                    );
                  })}
                </ol>
                {explanation && (
                  <div className="ans-explanation">{explanation}</div>
                )}
                {tip && <div className="ans-explanation tip">{tip}</div>}
              </div>
            </div>
          </>
        );
      }
    );

  return (
    <div className="quiz-result-wrapper">
      <h2 className="quiz-header">
        Result - <b>Score:</b>
      </h2>

      <div className="quiz-result-list-wraper">{content}</div>
    </div>
  );
};
