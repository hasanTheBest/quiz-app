import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchQuiz } from "./quizAPI";

const quizAdapter = createEntityAdapter();

const initialQuiz = quizAdapter.getInitialState({
  status: "idle",
  error: null,
  answerSheet: {},
  current: 0,
  score: 0,
});

export const fetchQuizAsyncThunk = createAsyncThunk(
  "quiz/fetchQuiz",
  async (endpoint) => {
    const response = await fetchQuiz(endpoint);
    return response;
  }
);

const quizSlice = createSlice({
  name: "quiz",
  initialState: initialQuiz,
  reducers: {
    justifyQuizAnswer: (state, action) => {
      const { qid, ans, oid, key_ans } = action.payload;

      // Add new field into answershet object
      state.answerSheet[qid] = {
        isCorrect: ans === "true",
        index: oid,
        id: qid,
        key_ans,
      };

      // answer is correct, increase score
      if (ans === "true") {
        state.score++;
      }

      // Increase Current value
      state.current++;
    },

    nextQuiz: (state, action) => {
      if (action.payload) {
        state.current = action.payload;
      } else if (state.current < state.ids.length - 1) {
        state.current++;
      }
    },

    prevQuiz: (state) => {
      if (state.current > 0) {
        state.current++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizAsyncThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchQuizAsyncThunk.fulfilled, (state, action) => {
        quizAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(fetchQuizAsyncThunk.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { justifyQuizAnswer, nextQuiz, prevQuiz } = quizSlice.actions;
export const selectCurrent = (state) => state.current;
export const selectScore = (state) => state.score;
export const selectAnswerSheet = (state) => state.answerSheet;

export const {
  selectById: selectQuizById,
  selectAll: selectAllQuizs,
  selectIds: selectAllQuizIds,
  selectEntities: selectQuizEntities,
} = quizAdapter.getSelectors((state) => state.quiz);

export default quizSlice.reducer;
