import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { AsideLinks } from "../../components/aside/AsideLinks";
import { AsideTags } from "../../components/aside/AsideTags";
import { QuizContent } from "./QuizContent";
import { fetchQuizAsyncThunk } from "./quizSlice";

const StyledQuizContentWrapper = styled.main`
  display: flex;
  justify-content: center;
  padding: 1rem;
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
      <aside>
        <AsideLinks />
        <AsideTags />
      </aside>

      {status === "loading" ? (
        <h1>Await .....fetching data</h1>
      ) : (
        <QuizContent />
      )}
    </StyledQuizContentWrapper>
  );
};
