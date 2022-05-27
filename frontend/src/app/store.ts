import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import profileSlice from "../features/profile/profileSlice";
import storiesSlice from "../features/stories/storiesSlice";

export const rootReducer = {
  auth: authSlice,
  profile: profileSlice,
  stories: storiesSlice,
};

export const store = configureStore({
  reducer: {
    auth: authSlice,
    profile: profileSlice,
    stories: storiesSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
