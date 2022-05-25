import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IMessage, IUserData } from "./authInterface";
import authService from "./authService";

const initialState: IAuthState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  isAuthenticated: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (userData: IUserData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData: IUserData, thunkAPI) => {
    try {
      return await authService.login(userData);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const authenticated = createAsyncThunk(
  "auth/authenticated",
  async (_, thunkAPI) => {
    try {
      return await authService.authenticated();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    return await authService.logout();
  } catch (error: any) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state: IAuthState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<IMessage>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<IMessage>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(authenticated.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authenticated.fulfilled, (state, action: { payload: true }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAuthenticated = action.payload;
      })
      .addCase(authenticated.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.isAuthenticated = false;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action: PayloadAction<IMessage>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
