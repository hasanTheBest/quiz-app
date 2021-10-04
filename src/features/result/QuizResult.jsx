import classNames from "classnames";
import React from "react";
import { useSelector } from "react-redux";
import { selectAllQuizs } from "../quiz/quizSlice";
import { QuizResultOption } from "./QuizResultOption";
import { selectResultEntities } from "./resultSlice";

export const QuizResult = () => {
  const quizs = useSelector(selectAllQuizs);
  const result = useSelector((state) => selectResultEntities(state));

  let correctCount = 0,
    wrongCount = 0,
    skippedCount = 0;

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
        const correct = result[id]?.isCorrect;
        const wrong = result[id]?.isCorrect === false;
        const skipped = result[id] === undefined;

        if (correct) {
          ++correctCount;
        }
        if (wrong) {
          ++wrongCount;
        }
        if (skipped) {
          ++skippedCount;
        }

        const classes = classNames("question main", {
          correct: correct,
          wrong: wrong,
          skipped: skipped,
          // "correct" : result[id]?.isCorrect,
          // "wrong" : result[id]?.isCorrect === false,
          // "skipped" : result[id] === undefined,
        });
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

  let resultLength = Object.keys(result).length;
  let remark, resultStatus;

  switch (correctCount) {
    case correctCount >= resultLength * 0.9:
      resultStatus = "Passed";
      remark = "Excellent";
      break;

    case correctCount >= resultLength * 0.8:
      resultStatus = "Passed";
      remark = "Very Good";
      break;

    case correctCount >= resultLength * 0.6:
      resultStatus = "Passed";
      remark = "Good";
      break;

    case correctCount < resultLength * 0.6 &&
      correctCount >= resultLength * 0.4:
      resultStatus = "Failed";
      remark = "Bad";
      break;

    default:
      resultStatus = "Failed";
      remark = "Very Bad";
      break;
  }

  const headerContent = (
    <>
      <div className="person-avatar-wrapper">
        <img
          className="result-person-avatar"
          src="#"
          alt="Result Person Avatar"
        />
      </div>
      <div className="result-person">
        <h5 className="result-person-name">A Perticitpiant</h5>

        <div className="result-person-content">
          <div className="person-result-info">
            <div className="result-info-group score">
              <span className="result-info-field">Score: </span>
              <span className="result-info-value">{correctCount * 1}</span>
            </div>
            <div className="result-info-group status">
              <span className="result-info-field">Status: </span>
              <span className="result-info-value">{resultStatus}</span>
            </div>
            <div className="result-info-group remark">
              <span className="result-info-field">Remark: </span>
              <span className="result-info-value">{remark}</span>
            </div>
          </div>

          <div className="restult-person-meta">
            <div className="result-info-group correct">
              <span className="result-info-field">Correct: </span>
              <span className="result-info-value">{correctCount}</span>
            </div>
            <div className="result-info-group wrong">
              <span className="result-info-field">Wrong: </span>
              <span className="result-info-value">{wrongCount}</span>
            </div>
            <div className="result-info-group skipped">
              <span className="result-info-field">Skipped: </span>
              <span className="result-info-value">{skippedCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Result - <b className="result status">Status:{resultStatus}</b>
    <b className="result remark">Remark:{remark}</b>
    <b className="result score">Score:{correctCount * 1}</b>
    <b className="result correct">Correct:{correctCount}</b>
    <b className="result wrong">Wrong:{wrongCount}</b>
    <b className="result skipped">Skipped:{skippedCount}</b> */}
    </>
  );

  return (
    <div className="quiz-result-wrapper">
      <div className="quiz-header result">{headerContent}</div>
      <div className="quiz-result-list-wraper">{content}</div>
    </div>
  );
};
