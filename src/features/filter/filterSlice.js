import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { fetchFilteredQuiz } from "./filterAPI";

const filterAdapter = createEntityAdapter();

const initialFilter = filterAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const filterAsyncThunk = createAsyncThunk(
  "filter/fetchFilterQuiz",
  async (category, difficulty, limit) => {
    const response = await fetchFilteredQuiz(category, difficulty, limit);
    return response.jokes;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState: initialFilter,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(filterAsyncThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(filterAsyncThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log("filterAdapter" );
        console.log(filterAdapter);
        filterAdapter.setAll(state, action.payload);
        state.status = "idle";
      })
      .addCase(filterAsyncThunk.rejected, (state, action) => {
        // console.log(action);
        state.error = action.error.message;
      });
  },
});

export const { selectAll, selectById, selectIds } = filterAdapter.getSelectors(
  (state) => state.filter
);

export default filterSlice.reducer;
