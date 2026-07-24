import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  orders: TOrder[];
  orderModalData: TOrder | null;
  orderDetails: TOrder | null;
  orderRequest: boolean;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderModalData: null,
  orderDetails: null,
  orderRequest: false,
  isLoading: false,
  error: null
};

const orderBurger = createAsyncThunk(
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
      .addCase(orderBurger.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
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
        state.orderDetails = action.payload.orders[0];
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

export { orderBurger, getOrderByNumber, getOrders };
export const { clearOrderModal } = orderSlice.actions;
export default orderSlice.reducer;
