import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';

type TIngredientState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientState = {
  ingredients: [],
  isLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredient/getAll', async () =>
  getIngredientsApi()
);

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export default ingredientSlice.reducer;
