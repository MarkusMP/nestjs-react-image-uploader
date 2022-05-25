import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../auth/authInterface";
import { IProfile, IProfileState } from "./profileInterface";
import profileService from "./profileService";

const initialState: IProfileState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  profile: null,
};

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, thunkAPI) => {
    try {
      return await profileService.getProfile();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateUsername = createAsyncThunk(
  "profile/updateUsername",
  async (username: string, thunkAPI) => {
    try {
      return await profileService.updateUsername(username);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProfile = createAsyncThunk(
  "profile/deleteProfile",
  async (_, thunkAPI) => {
    try {
      return await profileService.deleteProfile();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state: IProfileState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
      state.profile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getProfile.fulfilled,
        (state, action: PayloadAction<IProfile>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(getProfile.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(updateUsername.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        updateUsername.fulfilled,
        (state, action: PayloadAction<IProfile>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.profile = action.payload;
        }
      )
      .addCase(updateUsername.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteProfile.fulfilled,
        (state, action: PayloadAction<IMessage>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload.message;
        }
      )
      .addCase(deleteProfile.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = profileSlice.actions;
export default profileSlice.reducer;
