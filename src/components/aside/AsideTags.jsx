import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchQuizAsyncThunk } from "../../features/quiz/quizSlice";

export const AsideTags = ({tags}) => {
  const [tag, setTag] =  useState([])

  const dispatch = useDispatch();

  const addTag = (name) => {
    setTag(state => {
      return[
        ...state,
        name
      ]
    })
  }

  const removeTag = (name) => {
    setTag(state => state.filter(t => t !== name))
  }
  
  const filterByTags = () => {
    const params  = tag.join(",");
    dispatch(fetchQuizAsyncThunk({tags: params}))
  }

  return(
  <div className="tags-wrapper">
    <h3 className="tags-title">Tags</h3>

    <div className="taglist">
      {tags && tags.map(({name}, i) =>(
      <button key={i} className="tag-link" onClick={() => addTag(name)} onDoubleClick={() => removeTag(name)} title="Single click to add. Double click to remove">
        {name}
      </button>
      ))}
    </div>

    <button type="button" className="tag-search-button" onClick={filterByTags}>
      Search
    </button>
  </div>
)};