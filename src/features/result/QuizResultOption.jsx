import React from "react";
import styled from "styled-components";
import { StyledQuestionOption } from "../quiz/QuizQuestionOptions";

const StyledAnsOption = styled(StyledQuestionOption)`
  background-color: ${(p) => p.theme.color.black_a3};
  ${(props) => props.correct && "background-color: darkgreen"}
  ${(props) => props.skipped && "background-color: darkslateblue"};
`;

export const QuizResultOption = ({
  answer,
  option: [key, value],
  correct: [ans_key, ans_value],
}) => {
  if (value === null) {
    return null;
  }

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
