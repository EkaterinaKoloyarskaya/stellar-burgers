import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isLoading: boolean;
  isAuthChecked: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  isLoading: false,
  isAuthChecked: false,
  error: null
};

export const getUser = createAsyncThunk('user', async () => getUserApi());
export const getLoginUser = createAsyncThunk(
  'user/loginUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
export const getRegisterUser = createAsyncThunk(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);
export const getLogoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});
export const getUpdateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);
export const getForgotPassword = createAsyncThunk(
  'user/forgotUser',
  async (data: { email: string }) => forgotPasswordApi(data)
);
export const getResetPassword = createAsyncThunk(
  'user/resetUser',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      .addCase(getLoginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(getLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      .addCase(getRegisterUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = false;
      })
      .addCase(getRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })

      .addCase(getLogoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLogoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = false;
      })
      .addCase(getLogoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = true;
      })

      .addCase(getUpdateUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUpdateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = false;
      })
      .addCase(getUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })

      .addCase(getForgotPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getForgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = false;
      })
      .addCase(getForgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })

      .addCase(getResetPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? null;
        state.isAuthChecked = false;
      })
      .addCase(getResetPassword.fulfilled, (state) => {
        state.isLoading = false;
      });
  }
});

export default userSlice.reducer;
export const { logout } = userSlice.actions;
