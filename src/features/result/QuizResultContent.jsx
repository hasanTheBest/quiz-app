import React from "react";
import styled from "styled-components";
import {
  StyledQuestionList,
  StyledQuestionOptionsWrapper,
} from "../quiz/QuizQuestionOptions";
import {
  StQuestionNumber,
  StyledQuestionTitle,
} from "../quiz/QuizQuestionTitle";
import { QuizResultOption } from "./QuizResultOption";

const StyledQuestionWrapper = styled.div`
  flex: 1 0 46%;
  margin: 2%;
  background-color: ${(p) => p.theme.color.white_a1};
`;

const StyledAnsTitle = styled(StyledQuestionTitle)`
  padding: 2rem;
  background: linear-gradient(-45deg, darkslateblue, darkcyan, darkslateblue);

  ${(props) => props.classes.correct && `background: darkgreen`}
  ${(props) => props.classes.wrong && `background: darkred`}
  ${(props) => props.classes.skipped && `background: darkslateblue`}
`;
const StyledAnsOptionWrapper = styled(StyledQuestionOptionsWrapper)`
  background-color: transparent;
`;

export const QuizResultContent = ({
  props: {
    option: {
      id,
      answers,
      description,
      question,
      correct_answers,
      explanation,
      tip,
    },
    current,
    result,
    classes,
  },
}) => {
  return (
    <StyledQuestionWrapper>
      <StyledAnsTitle classes={classes}>
        <StQuestionNumber>{current + 1}.</StQuestionNumber> {question}
        {description && <span className="question-hint">{description}</span>}
      </StyledAnsTitle>
      <StyledAnsOptionWrapper>
        <StyledQuestionList className="result" type="A">
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
        </StyledQuestionList>
        {explanation && <div className="ans-explanation">{explanation}</div>}
        {tip && <div className="ans-explanation tip">{tip}</div>}
      </StyledAnsOptionWrapper>
    </StyledQuestionWrapper>
  );
};
