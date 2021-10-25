import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { selectAllQuizs } from "../quiz/quizSlice";
import { QuizResultContent } from "./QuizResultContent";
import { QuizResultHeader } from "./QuizResultHeader";
import { selectResultEntities } from "./resultSlice";

const StyledResultWrapper = styled.div`
  max-width: 900px;
  padding: 2rem;
  margin: 0 auto;
`;

const StyledQuizResultContent = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

export const QuizResult = () => {
  const quizs = useSelector(selectAllQuizs);
  const result = useSelector((state) => selectResultEntities(state));

  let correctCount = 0,
    wrongCount = 0,
    skippedCount = 0;

  const content =
    quizs &&
    quizs.map((option, current) => {
      const correct = result[option.id]?.isCorrect;
      const wrong = result[option.id]?.isCorrect === false;
      const skipped = result[option.id] === undefined;

      if (correct) {
        ++correctCount;
      }
      if (wrong) {
        ++wrongCount;
      }
      if (skipped) {
        ++skippedCount;
      }

      return (
        <QuizResultContent
          props={{
            option,
            current,
            result,
            classes: {
              correct,
              wrong,
              skipped,
            },
          }}
          key={option.id + current}
        />
      );
    });

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

  return (
    <StyledResultWrapper>
      <QuizResultHeader
        correctCount={correctCount}
        wrongCount={wrongCount}
        skippedCount={skippedCount}
      />
      <StyledQuizResultContent>{content}</StyledQuizResultContent>
      {/* <div className="quiz-header result">{headerContent}</div> */}
    </StyledResultWrapper>
  );
};
