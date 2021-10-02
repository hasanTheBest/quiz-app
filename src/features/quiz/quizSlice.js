import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import {fetchQuiz} from "./quizAPI"

const quizAdapter = createEntityAdapter();

const initialQuiz = quizAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchQuizAsyncThunk = createAsyncThunk("quiz/fetchQuiz", async (endpoint) => {
  const response = await fetchQuiz(endpoint);
  return response;
})

const quizSlice = createSlice({
  name: "quiz", 
  initialState: initialQuiz,
  reducers:{},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizAsyncThunk.pending, state=>{
        state.status = "loading"
      })
      .addCase(fetchQuizAsyncThunk.fulfilled, (state, action) => {
        quizAdapter.setAll(state, action.payload)
        state.status = "idle"
      })
      .addCase(fetchQuizAsyncThunk.rejected, (state, action) => {
        state.error = action.error.message
      })
  }
})

export const {selectById : selectQuizById, selectAll : selectAllQuizs, selectIds } = quizAdapter.getSelectors(state => state.quiz);

export default quizSlice.reducer;