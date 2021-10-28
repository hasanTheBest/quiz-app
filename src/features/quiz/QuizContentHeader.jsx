import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectAllQuizIds, selectCurrent, selectQuizById } from "./quizSlice";

const StyledQuizHeader = styled.h2`
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  flex: wrap;
  justify-content: space-between;

  & > div {
    padding: 0.5rem;
  }

  ${(p) => p.theme.breakpoints.md} {
    font-size: 1.2rem;
  }
`;

export const QuizContentHeader = () => {
  const current = useSelector(selectCurrent);
  const qIds = useSelector(selectAllQuizIds);
  const currentQuiz = useSelector((state) =>
    selectQuizById(state, qIds[current])
  );

  const { category } = currentQuiz ? currentQuiz : {};

  return (
    <StyledQuizHeader>
      <div>{category ? category : "Uncategorized"}</div>
      <div>
        {current + 1}/{qIds.length}
      </div>
    </StyledQuizHeader>
  );
};
