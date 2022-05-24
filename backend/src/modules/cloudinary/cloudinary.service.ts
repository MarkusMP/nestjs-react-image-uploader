import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream');
@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: 'image-app',
        },
        (error, result) => {
          if (error) return reject(error);

          resolve(result);
        },
      );

      if (file.buffer) {
        toStream(file.buffer).pipe(upload);
      }
    });
  }

  async getImages() {
    return new Promise((resolve, reject) => {
      v2.api.resources((error, result) => {
        if (error) return reject(error);

        resolve(result);
      });
    });
  }

  async deleteImage(url: string) {
    return new Promise((resolve, reject) => {
      console.log(url);

      v2.api.delete_resources([url], (error, result) => {
        if (error) return reject(error);

        resolve(result);
      });
    });
  }
}
