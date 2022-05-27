import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  IDeleteData,
  IPhoto,
  IPhotoData,
  IPhotosState,
} from "./storiesInterface";
import storiesSlice from "./storiesService";

const initialState: IPhotosState = {
  isError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  message: "",
  photos: [],
};

export const createStory = createAsyncThunk(
  "stories/createStory",
  async (data: IPhotoData, thunkAPI) => {
    try {
      return await storiesSlice.createStory(data);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStories = createAsyncThunk(
  "stories/getStories",
  async (_, thunkAPI) => {
    try {
      return await storiesSlice.getStories();
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteStory = createAsyncThunk(
  "stories/deleteStory",
  async (id: string, thunkAPI) => {
    try {
      return await storiesSlice.deleteStory(id);
    } catch (error: any) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    reset: (state: IPhotosState) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.errorMessage = "";
      state.photos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        createStory.fulfilled,
        (state, action: PayloadAction<IPhoto>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.photos.unshift(action.payload);
        }
      )
      .addCase(createStory.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(getStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        getStories.fulfilled,
        (state, action: PayloadAction<IPhoto[]>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.photos = action.payload;
        }
      )
      .addCase(getStories.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      })
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        deleteStory.fulfilled,
        (state, action: PayloadAction<IDeleteData>) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.photos = state.photos.filter(
            (photo: IPhoto) => photo.id !== action.payload.id
          );
          state.message = action.payload.message;
        }
      )
      .addCase(deleteStory.rejected, (state, { payload }: any) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = payload;
      });
  },
});

export const { reset } = photosSlice.actions;
export default photosSlice.reducer;
