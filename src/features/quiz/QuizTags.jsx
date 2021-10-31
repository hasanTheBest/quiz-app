import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchQuizAsyncThunk,
  selectAllQuizIds,
  selectCurrent,
  selectQuizById,
} from "./quizSlice";

export const QuizTags = () => {
  const [tag, setTag] = useState([]);
  const current = useSelector(selectCurrent);

  const ids = useSelector(selectAllQuizIds);
  const currentQuiz = useSelector((state) =>
    selectQuizById(state, ids[current])
  );
  const { tags } = currentQuiz ? currentQuiz : {};

  const dispatch = useDispatch();

  const filterByTags = (tag) => {
    dispatch(fetchQuizAsyncThunk({ tags: tag }));
  };

  const StyledTagsWrapper = styled.div`
    display: flex;
    flex-flow: row wrap;
    gap: 0.5rem 0.5rem;
    background-color: ${(p) => p.theme.color.white_a1};
    padding: 0.5rem 2rem;
  `;

  const TagTitle = styled.h5`
    letter-spacing: 1px;
    font-size: 1rem;
    align-self: center;
    color: ${(p) => p.theme.color.white_a3};
    font-weight: 500;
  `;

  const TagList = styled.div``;

  const TagLinkButton = styled.button`
    font-size: 0.7rem;
    letter-spacing: 1px;
    padding: 0.3rem;
    margin: 0.2rem;
    display: inline-block;
    border-radius: 0.2rem;
    border: none;
    background-color: ${(p) => p.theme.color.white_a1};
    color: teal;
    font-weight: 600;
    transition: all 200ms ease;

    &:hover,
    &:active {
      background-color: darkslateblue;
      color: ${(p) => p.theme.color.white_a8};
    }
  `;

  return (
    <StyledTagsWrapper>
      <TagTitle>Tags</TagTitle>

      <TagList>
        {tags &&
          tags.map(({ name }, i) => (
            <TagLinkButton
              key={i}
              onClick={() => filterByTags(name)}
              title="Single click to search tag"
            >
              {name}
            </TagLinkButton>
          ))}
      </TagList>
    </StyledTagsWrapper>
  );
};
