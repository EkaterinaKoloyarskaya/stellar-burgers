import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    }
  }
});

export default constructorSlice.reducer;
export const { addBun, addIngredient, removeIngredient, clearConstructor } =
  constructorSlice.actions;
