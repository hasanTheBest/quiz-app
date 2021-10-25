import React from "react";
import styled from "styled-components";
import { StyledQuestionOption } from "../quiz/QuizQuestionOptions";
// import classNames from "classnames";

const StyledAnsOption = styled(StyledQuestionOption)`
  ${(props) => props.correct && "background-color: darkgreen"}
  ${(props) => props.skipped && "background-color: darkslateblue"}
`;

export const QuizResultOption = ({
  answer,
  option: [key, value],
  correct: [ans_key, ans_value],
}) => {
  if (value === null) {
    return null;
  }

  //  const classes = classNames("question-option", {
  //    "correct" : ans_value === "true" && answer?.isCorrect,
  //    "wrong" : ans_value === "false" && answer?.key_ans === ans_key,
  //    "skipped" : ans_value === "true",
  //  })

  return (
    <StyledAnsOption
      key={key + ans_key}
      correct={ans_value === "true" && answer?.isCorrect}
      wrong={ans_value === "false" && answer?.key_ans === ans_key}
      skipped={ans_value === "true"}
    >
      {value}
    </StyledAnsOption>
  );
};
