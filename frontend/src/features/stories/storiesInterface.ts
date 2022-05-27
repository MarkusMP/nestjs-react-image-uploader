export interface IPhotosState {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  errorMessage: string;
  message: string;
  photos: IPhoto[];
}

export interface IPhoto {
  id: string;
  description: string;
  image: string;
  image_public_id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface IMessage {
  message: string;
}

export interface IPhotoData {
  description: string;
  image: File;
}

export interface IDeleteData {
  id: string;
  message: string;
}
