export interface IAuthState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  isAuthenticated: boolean;
}

export interface IUserData {
  email: string;
  password: string;
  username?: string;
}

export interface IMessage {
  message: string;
}
