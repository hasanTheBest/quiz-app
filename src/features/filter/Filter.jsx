import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQuizAsyncThunk } from "../quiz/quizSlice";
// import { filterAsyncThunk } from "./filterSlice";

export const Filter = () => {
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [limit, setLimit] = useState("");

  const dispatch = useDispatch();

  const changeCategory = (cat) => setCategory(cat);
  const changeDifficulty = (d) => setDifficulty(d);
  const changeLimit = (l) => setLimit(l);

  const clickFilterButton = () => {
    dispatch(fetchQuizAsyncThunk({ category, difficulty, limit }));
  };

  const catOptions = [
    ["Linux", 99],
    ["Bash", 77],
    ["PHP", 181],
    ["Docker", 125],
    ["HTML", 139],
    ["MySQL", 153],
    ["WordPress", 66],
    ["Laravel", 10],
    ["Kubernetes", 136],
    ["Javascript", 25],
    ["DevOps", 23],
  ].map(([name, count]) => (
    <option key={name} value={name} onClick={() => changeCategory(name)}>
      {`${name} (${count})`}
    </option>
  ));

  const difficultyOptions = ["Easy", "Medium", "Hard"].map((d) => (
    <option key={d} value={d} onClick={() => changeDifficulty(d)}>
      {d}
    </option>
  ));

  const limitOptions = [5, 10, 15, 20, 25, 30, 40, 50].map((l) => (
    <option key={l} value={l} onClick={() => changeLimit(l)}>
      {l}
    </option>
  ));

  return (
    <div className="filter">
      <div className="filter-item categories">
        <label className="input-label" htmlFor="categories">
          Category
        </label>
        <select className="filter-input" name="categories" id="categories">
          <option value="random">All</option>
          {catOptions}
        </select>
      </div>
      <div className="filter-item difficulties">
        <label className="input-label" htmlFor="difficulties">
          Difficulty
        </label>
        <select className="filter-input" name="difficulties" id="difficulties">
          <option value="easy">All</option>
          {difficultyOptions}
        </select>
      </div>
      <div className="filter-item limit">
        <label className="input-label" htmlFor="limit">
          Limit
        </label>
        <select className="filter-input" name="limit" id="limit">
          <option value="5">All</option>
          {limitOptions}
        </select>
      </div>
      <div className="filter-item filter-button">
        <button
          className="button-submit"
          type="button"
          onClick={clickFilterButton}
        >
          Filter
        </button>
      </div>
    </div>
  );
};
