import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectResultEntities } from "./resultSlice";

const StyledQuizResultHeader = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  margin: 2rem 1rem;

  ${(p) => p.theme.breakpoints.md} {
    flex-direction: column;
  }
`;

const StyledResultPerson = styled.div`
  display: flex;
  flex: 1 0 60%;

  ${(p) => p.theme.breakpoints.sm} {
    flex-direction: column;
  }
`;

const StyledRPName = styled.h5`
  font-size: 1.1rem;
  padding: 2rem 1rem 0 2rem;
`;

const StyledRPAvatarWrapper = styled.div`
  align-items: center;
  background-color: darkslateblue;
  border-radius: 0 0.5rem 0.5rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem;
  width: 200px;

  ${(p) => p.theme.breakpoints.sm} {
    width: 100%;
  }
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
  display: flex;
  flex-flow: row wrap;
  padding: 1.5rem 0 1.5rem 1.5rem;

  ${(p) => p.theme.breakpoints.md} {
    padding-right: 1.5rem;
  }
`;

const StyledResultInfoGroup = styled.div`
  background-color: darkslateblue;
  flex: 1 0 50%;
  padding: 1rem 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  font-family: ${(p) => p.theme.color.white_a3};

  & > span:last-child {
    font-size: 1.2rem;
  }

  &.score {
    background: linear-gradient(60deg, teal, darkslateblue);
    flex-basis: 100%;
    & > span:last-child {
      font-size: 2rem;
      font-weight: 700;
      margin-left: 0.5rem;
    }
  }
  &.status {
    background: linear-gradient(60deg, darkcyan, darkorchid);
  }
  &.remark {
    background: linear-gradient(60deg, darkslateblue, teal);
  }
`;

const StyledPersonMeta = styled.div`
  display: flex;
  flex: 1 0 40%;
  flex-flow: column wrap;
  padding: 1.5rem;

  ${(p) => p.theme.breakpoints.md} {
    flex-flow: row-reverse wrap;
  }

  & > .result {
    flex: 1 0 50%;

    &.correct {
      flex-basis: 100%;
      background-color: darkgreen;
      & > span {
        display: block;
        &:last-child {
          font-size: 2rem;
          text-align: center;
        }
      }
    }
    &.wrong {
      background-color: darkred;
    }
    &.skipped {
      background-color: darkslateblue;
    }

    ${(p) => p.theme.breakpoints.md} {
      flex: 1 0 50%;
    }

    /* ${(p) => p.theme.breakpoints.sm} {
      flex-basis: 33.3%;

      &.correct {
        flex-grow: 2;
      }
    } */
  }
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
        <StyledResultInfoGroup className="result correct">
          <span>Correct: </span>
          <span>{correctCount}</span>
        </StyledResultInfoGroup>
        <StyledResultInfoGroup className="result wrong">
          <span>Wrong: </span>
          <span>{wrongCount}</span>
        </StyledResultInfoGroup>
        <StyledResultInfoGroup className="result skipped">
          <span>Skipped: </span>
          <span>{skippedCount}</span>
        </StyledResultInfoGroup>
      </StyledPersonMeta>
    </StyledQuizResultHeader>
  );
};
