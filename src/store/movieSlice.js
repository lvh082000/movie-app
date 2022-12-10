import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getListMovies} from '../services';

const initialState = {
  movies: [],
};

export const getListMovieAsynTHunk = createAsyncThunk('listmovie', async () => {
  const resMovies = await getListMovies();
  const resFormJson = await resMovies.json();
  return resFormJson;
});

const movieSlice = createSlice({
  name: 'MOVIE_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListMovieAsynTHunk.pending, (state, action) => {});
    builder.addCase(getListMovieAsynTHunk.fulfilled, (state, action) => {
      const res = action.payload;
      state.movies = res.results;
    });
    builder.addCase(getListMovieAsynTHunk.rejected, (state, action) => {});
  },
});

const {reducer, actions} = movieSlice;

export default reducer;
