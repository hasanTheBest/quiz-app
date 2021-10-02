import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

const resultAdapter = createEntityAdapter();

const resultSlice = createSlice({
  name: "result",
  initialState: resultAdapter.getInitialState({isFinished: false}),
  reducers: {
    submitQuiz: (state, action) => {
      resultAdapter.setAll(state, Object.values(action.payload))
      state.isFinished = true
    }
  },
})

export const {submitQuiz}  = resultSlice.actions;

export const {selectAll: selectAllQuizAns, selectById : selectQuizAnsById, selectEntities: selectResultEntities} = resultAdapter.getSelectors(state => state.result);

export default resultSlice.reducer;