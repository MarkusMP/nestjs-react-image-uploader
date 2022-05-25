export interface IProfileState {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  profile: IProfile | null;
}

export interface IProfile {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
