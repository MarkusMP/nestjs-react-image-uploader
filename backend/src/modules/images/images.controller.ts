import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from '../../common/decorators';
import { AuthenticatedGuard } from '../../common/guards';
import { User } from '../users/entities/user.entity';
import { CreateImageDto } from './dtos';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';
import { imageFileFilter } from './utils/file-helper';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(AuthenticatedGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  @Post()
  uploadUserImage(
    @GetCurrentUser() user: User,
    @UploadedFile() file,
    @Body() dto: CreateImageDto,
  ): Promise<Image> {
    return this.imagesService.upload(user.id, file, dto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getAllImages(): Promise<Image[]> {
    return this.imagesService.getAllImages();
  }

  @UseGuards(AuthenticatedGuard)
  @Delete('/:id')
  deleteImage(
    @GetCurrentUser() user: User,
    @Param('id') id: string,
  ): Promise<{ message: string }> {
    return this.imagesService.deleteImage(user.id, id);
  }
}
