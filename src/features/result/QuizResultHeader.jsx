import React from "react"
import { useSelector } from "react-redux";
import { selectResultEntities } from "./resultSlice";

export const QuizResultHeader = ({correctCount, wrongCount, skippedCount}) => {
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


  return(
    <div className="quiz-header">
    <div className="result-person">
      <div className="avatar-wrapper">
        <img
          className="result-person-avatar"
          src="#"
          alt="Result Person Avatar"
        />
        <h5 className="result-person-name">A Perticitpiant</h5>
      </div>
      <div className="person-result-info">
        <div className="result-info-group">
          <span className="result-info-field">Score: </span>
          <span className="result-info-value">{correctCount * 1}</span>
        </div>
        <div className="result-info-group">
          <span className="result-info-field">Status: </span>
          <span className="result-info-value">{resultStatus}</span>
        </div>
        <div className="result-info-group">
          <span className="result-info-field">Remark: </span>
          <span className="result-info-value">{remark}</span>
        </div>
      </div>
    </div>
    <div className="restult-person-meta">
      <div className="result-info-group">
        <span className="result-info-field">Correct: </span>
        <span className="result-info-value">{correctCount}</span>
      </div>
      <div className="result-info-group">
        <span className="result-info-field">Wrong: </span>
        <span className="result-info-value">{wrongCount}</span>
      </div>
      <div className="result-info-group">
        <span className="result-info-field">Skipped: </span>
        <span className="result-info-value">{skippedCount}</span>
      </div>
    </div>
    {/* Result - <b className="result status">Status:{resultStatus}</b>
    <b className="result remark">Remark:{remark}</b>
    <b className="result score">Score:{correctCount * 1}</b>
    <b className="result correct">Correct:{correctCount}</b>
    <b className="result wrong">Wrong:{wrongCount}</b>
    <b className="result skipped">Skipped:{skippedCount}</b> */}
  </div>

  )
}