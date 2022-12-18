import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getListMovies} from '../services';

const initialState = {
  movies: [],
  loading: false,
};

export const getListMovieAsynTHunk = createAsyncThunk(
  'listmovie',
  async page => {
    const resMovies = await getListMovies(page);
    const resFormJson = await resMovies.json();
    return resFormJson;
  },
);

const movieSlice = createSlice({
  name: 'MOVIE_SLICE',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListMovieAsynTHunk.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getListMovieAsynTHunk.fulfilled, (state, action) => {
      state.loading = false;
      const res = action.payload;
      state.movies = [...state.movies, ...res.result];
    });
    builder.addCase(getListMovieAsynTHunk.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

const {reducer, actions} = movieSlice;

export default reducer;
