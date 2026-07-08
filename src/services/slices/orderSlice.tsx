import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  orderRequest: false,
  isLoading: false,
  error: null
};

const getOrderBurger = createAsyncThunk(
  'order/burger',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);
const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (number: number) => getOrderByNumberApi(number)
);
const getOrders = createAsyncThunk('order/getOrders', async () =>
  getOrdersApi()
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(getOrderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.orderModalData = action.payload.order;
      })

      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderModalData = action.payload.orders[0];
      })

      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      });
  }
});

export { getOrderBurger, getOrderByNumber, getOrders };
export const { clearOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
