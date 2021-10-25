import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fetchQuizAsyncThunk,
  selectAllQuizIds,
  selectCurrent,
  selectQuizById,
} from "../../features/quiz/quizSlice";

export const AsideTags = () => {
  const [tag, setTag] = useState([]);
  const current = useSelector(selectCurrent);

  const ids = useSelector(selectAllQuizIds);
  const currentQuiz = useSelector((state) =>
    selectQuizById(state, ids[current])
  );
  const { tags } = currentQuiz ? currentQuiz : {};

  const dispatch = useDispatch();

  const addTag = (name) => {
    setTag((state) => {
      return [...state, name];
    });
  };

  const removeTag = (name) => {
    setTag((state) => state.filter((t) => t !== name));
  };

  const filterByTags = () => {
    const params = tag.join(",");
    dispatch(fetchQuizAsyncThunk({ tags: params }));
  };

  const StyledTagsWrapper = styled.div`
    text-align: left;
  `;

  const TagTitle = styled.h3`
    letter-spacing: 1px;
    margin-bottom: 1.5rem;
    color: darkcyan;
    margin-top: 0.5rem;
  `;

  const TagList = styled.div`
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 0.3rem;
    margin-bottom: 1rem;
  `;

  const TagLinkButton = styled.button`
    font-size: 0.8rem;
    padding: 0.5rem;
    margin: 0.3rem;
    background-color: #00001a;
    display: inline-block;
    border-radius: 0.2rem;
    color: darkcyan;
  `;

  const TagSearchButton = styled.button`
    padding: 0.7rem 1rem;
    border: none;
    border-radius: 0.3rem;
    font-weight: bold;
    letter-spacing: 1px;
    width: 100%;
    background-color: darkcyan;
  `;

  return (
    <StyledTagsWrapper>
      <TagTitle>Tags</TagTitle>

      <TagList>
        {tags &&
          tags.map(({ name }, i) => (
            <TagLinkButton
              key={i}
              onClick={() => addTag(name)}
              onDoubleClick={() => removeTag(name)}
              title="Single click to add. Double click to remove"
            >
              {name}
            </TagLinkButton>
          ))}
      </TagList>

      <TagSearchButton type="button" onClick={filterByTags}>
        Search
      </TagSearchButton>
    </StyledTagsWrapper>
  );
};
