import classNames from "classnames";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  justifyQuizAnswer,
  selectAllQuizIds,
  selectCurrent,
  selectQuizById,
} from "./quizSlice";

export const StyledQuestionOptionsWrapper = styled.div`
  padding: 1rem 1rem 1rem 3.5rem;
  background-color: ${(p) => p.theme.color.white_a1};
  border-radius: 0 0 0.2rem 0.2rem;
`;

export const StyledQuestionList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  pointer-events: ${(props) => (props.disabledOptions ? "none" : "normal")};
`;

export const StyledQuestionOption = styled.li`
  padding: 0.8rem;
  margin-right: 3rem;
  background-color: #00001a;
  margin-bottom: 1rem;
  border-radius: 0.3rem;
  cursor: pointer;

  ${(props) => props.correct && "background-color: darkgreen;"}
  ${(props) => props.wrong && "background-color: darkred;"}
`;

export const QuizQuestionOptions = () => {
  const current = useSelector(selectCurrent);
  const quizIds = useSelector(selectAllQuizIds);
  const answerSheet = useSelector((state) => state.quiz.answerSheet);

  const dispatch = useDispatch();

  const singleQuiz = useSelector((state) =>
    selectQuizById(state, quizIds[current])
  );

  const { id, answers, correct_answers } = singleQuiz ? singleQuiz : {};

  const onClickQuizOption = (id, value_ans, option_i, key_ans) => {
    dispatch(justifyQuizAnswer({ id, value_ans, option_i, key_ans }));
  };

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

      const optionClasses = {
        correct:
          correct_answers[answerSheet[id]?.key_ans] === "true" &&
          answerSheet[id]?.index === option_i,
        wrong:
          correct_answers[answerSheet[id]?.key_ans] !== "true" &&
          answerSheet[id]?.index === option_i,
      };

      return (
        <StyledQuestionOption
          correct={optionClasses.correct}
          wrong={optionClasses.wrong}
          key={key}
          onClick={() => onClickQuizOption(id, value_ans, option_i, key_ans)}
        >
          {value}
        </StyledQuestionOption>
      );
    });

  // Disabled Options
  // const disabledOptions =
  //   Object.keys(answerSheet).indexOf(String(id)) !== -1
  //     ? "disabled-options"
  //     : "";

  return (
    <StyledQuestionOptionsWrapper>
      <StyledQuestionList
        type="A"
        disabledOptions={Object.keys(answerSheet).indexOf(String(id)) !== -1}
      >
        {quizOptions}
      </StyledQuestionList>
    </StyledQuestionOptionsWrapper>
  );
};
