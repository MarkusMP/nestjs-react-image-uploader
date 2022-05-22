import {
  ConflictException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dtos';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async register(dto: CreateUserDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ email: dto.email });
    const usernameExists = await this.userRepository.findOne({
      username: dto.username,
    });

    if (user) {
      throw new ConflictException('User already exists');
    }

    if (usernameExists) {
      throw new ConflictException('Username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);
    const newUser = this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: hashedPassword,
    });

    await this.userRepository.save(newUser);

    return { message: 'User created successfully' };
  }

  async login(dto: LoginUserDto): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ email: dto.email });

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return { message: 'User logged in successfully' };
  }

  async updateUser(dto: UpdateUserDto, id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    const usernameExists = await this.userRepository.findOne({
      username: dto.username,
    });

    if (usernameExists && usernameExists.id !== id) {
      throw new ConflictException('Username already exists');
    }

    user.username = dto.username;

    await this.userRepository.save(user);

    return user;
  }

  async getUser(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    return user;
  }

  async deleteUser(id: string): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new ForbiddenException('User does not exist');
    }

    await this.userRepository.delete({ id });

    return { message: 'User deleted successfully' };
  }
}
