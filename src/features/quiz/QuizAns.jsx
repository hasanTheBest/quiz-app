import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { QuizContent } from "./QuizContent";
import { fetchQuizAsyncThunk } from "./quizSlice";

const StyledQuizContentWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 2rem;
`;

const StyledAside = styled.aside`
  ${(p) => p.theme.breakpoints.md} {
    display: none;
  }
`;

export const QuizAns = () => {
  const dispatch = useDispatch();

  const status = useSelector((state) => state.quiz.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuizAsyncThunk());
    }
  }, [dispatch]);

  return (
    <StyledQuizContentWrapper>
      {status === "loading" ? (
        <h1>Await .....fetching data</h1>
      ) : (
        <QuizContent />
      )}
    </StyledQuizContentWrapper>
  );
};
