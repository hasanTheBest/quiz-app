import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectResultEntities } from "./resultSlice";

const StyledQuizResultHeader = styled.div`
  display: flex;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0.5rem 0.5rem 0;
  margin: 2rem 1rem;
`;

const StyledResultPerson = styled.div`
  display: flex;
`;

const StyledRPName = styled.h5`
  font-size: 1.1rem;
  padding: 2rem 1rem 0 2rem;
`;

const StyledRPAvatarWrapper = styled.div`
  background-color: darkslateblue;
  border-radius: 0 0.5rem 0.5rem 0;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledRPAvatar = styled.img`
  display: block;
  border-radius: 50%;
  height: auto;
  border: 0.5rem solid;
  height: 150px;
  width: 150px;
`;

const StyledResultInfo = styled.div`
  padding-left: 1rem;
`;

const StyledResultInfoGroup = styled.div`
  padding: 1rem 1.5rem;
  background-color: darkslateblue;
  margin: 1rem 0;
  border-radius: 0.3rem;

  &.correct {
    background-color: darkgreen;
  }
  &.wrong {
    background-color: darkred;
  }
  &.skipped {
    background-color: teal;
  }
  &.score {
    background: linear-gradient(60deg, teal, darkslateblue);
  }
  &.status {
    background: linear-gradient(60deg, darkcyan, darkorchid);
  }
  &.remark {
    background: linear-gradient(60deg, darkslateblue, teal);
  }
`;

const StyledPersonMeta = styled.div`
  padding: 1rem;
`;

// const StyledPersonInfo = styled.div`
//   padding: 1rem;
// `;

export const QuizResultHeader = ({
  correctCount,
  wrongCount,
  skippedCount,
}) => {
  const result = useSelector((state) => selectResultEntities(state));

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
    <StyledQuizResultHeader>
      <StyledResultPerson>
        <StyledRPAvatarWrapper>
          <StyledRPAvatar src="#" alt="Result Person Avatar" />
          <StyledRPName>Jhon Jony</StyledRPName>
        </StyledRPAvatarWrapper>

        <StyledResultInfo>
          <StyledResultInfoGroup className="score">
            <span>Score: </span>
            <span>{correctCount * 1}</span>
          </StyledResultInfoGroup>
          <StyledResultInfoGroup className="status">
            <span>Status: </span>
            <span>{resultStatus}</span>
          </StyledResultInfoGroup>
          <StyledResultInfoGroup className="remark">
            <span>Remark: </span>
            <span>{remark}</span>
          </StyledResultInfoGroup>
        </StyledResultInfo>
      </StyledResultPerson>

      <StyledPersonMeta>
        <StyledResultInfoGroup className="correct">
          <span>Correct: </span>
          <span>{correctCount}</span>
        </StyledResultInfoGroup>
        <StyledResultInfoGroup className="wrong">
          <span>Wrong: </span>
          <span>{wrongCount}</span>
        </StyledResultInfoGroup>
        <StyledResultInfoGroup className="skipped">
          <span>Skipped: </span>
          <span>{skippedCount}</span>
        </StyledResultInfoGroup>
      </StyledPersonMeta>
      {/* Result - <b className="result status">Status:{resultStatus}</b>
    <b className="result remark">Remark:{remark}</b>
    <b className="result score">Score:{correctCount * 1}</b>
    <b className="result correct">Correct:{correctCount}</b>
    <b className="result wrong">Wrong:{wrongCount}</b>
    <b className="result skipped">Skipped:{skippedCount}</b> */}
    </StyledQuizResultHeader>
  );
};
