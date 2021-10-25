import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchQuizAsyncThunk } from "../quiz/quizSlice";
import FilterItemCat from "./FilterItemCat";
import FilterItem from "./FilterItem";
// import { filterAsyncThunk } from "./filterSlice";

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const LIMIT = [5, 10, 15, 20, 25, 30, 40, 50];

const StyledFilter = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 1.5rem;
  background: linear-gradient(45deg, darkslateblue, darkcyan, darkslateblue);
  position: relative;
  z-index: 5;
  align-items: self-end;

  &::after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #00001a;
    z-index: -1;
    margin-top: -4px;
  }
`;

const FilterBtnWrapper = styled.div`
  margin-right: 1rem;
  display: flex;
  flex-direction: column;
`;
const FilterBtn = styled.button`
  padding: 0.8rem 2rem;
  border: 0;
  border-radius: 0.2rem;
  background: linear-gradient(-45deg, darkslateblue, darkcyan, darkslateblue);
  font-size: 1rem;
  letter-spacing: 1px;
  cursor: pointer;
`;

export const Filter = () => {
  const [category, setCategory] = useState("random");
  const [difficulty, setDifficulty] = useState("");
  const [limit, setLimit] = useState("");

  const dispatch = useDispatch();

  const changeCategory = (cat) => setCategory(cat);
  const changeDifficulty = (d) => setDifficulty(d);
  const changeLimit = (l) => setLimit(l);

  const clickFilterButton = () => {
    dispatch(fetchQuizAsyncThunk({ category, difficulty, limit }));
  };

  return (
    <StyledFilter>
      <FilterItemCat option={category} setOption={changeCategory} />
      <FilterItem
        label="Difficulties"
        options={DIFFICULTIES}
        option={difficulty}
        setOption={changeDifficulty}
      />
      <FilterItem
        label="Limit"
        options={LIMIT}
        value={limit}
        setOption={changeLimit}
      />
      <FilterBtnWrapper className="filter-item filter-button">
        <FilterBtn
          className="button-submit"
          type="button"
          onClick={clickFilterButton}
        >
          Filter
        </FilterBtn>
      </FilterBtnWrapper>
    </StyledFilter>
  );
};
