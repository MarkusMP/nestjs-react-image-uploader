import { Module } from '@nestjs/common';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseService } from './modules/database/database.service';

@Module({
  imports: [AuthModule],
  controllers: [AuthController],
  providers: [DatabaseService],
})
export class AppModule {}
