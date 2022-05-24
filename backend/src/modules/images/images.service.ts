import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateImageDto } from './dtos';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    private cloudinary: CloudinaryService,
    @InjectRepository(Image)
    private readonly imagesRespository: Repository<Image>,
  ) {}

  async upload(
    userId: string,
    file: Express.Multer.File,
    dto: CreateImageDto,
  ): Promise<Image> {
    const image = await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });

    const newImagePost = this.imagesRespository.create({
      description: dto.description,
      image: image.secure_url,
      userId,
      image_public_id: image.public_id,
    });

    return this.imagesRespository.save(newImagePost);
  }

  async getAllImages(): Promise<Image[]> {
    return this.imagesRespository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async deleteImage(userId: string, id: string): Promise<{ message: string }> {
    const image = await this.imagesRespository.findOne({
      where: {
        id,
        userId,
      },
    });

    if (!image) {
      throw new BadRequestException('Image not found.');
    }

    await this.cloudinary.deleteImage(image.image_public_id);
    await this.imagesRespository.delete(id);

    return { message: 'Image deleted.' };
  }
}
