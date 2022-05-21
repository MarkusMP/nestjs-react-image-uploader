import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../users.service';
import * as bcrypt from 'bcryptjs';
import { userStub } from './stubs/user.stub';
import { CreateUserDto } from '../dtos';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn().mockImplementation((dto) => dto),
            save: jest.fn(),
            delete: jest.fn(),
            update: jest.fn().mockImplementation((dto) => dto),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('service and repository should be defined', () => {
    expect(usersService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('register', () => {
    describe('when register is called', () => {
      let createUserDto: CreateUserDto;
      let msg: { message: string };
      beforeEach(async () => {
        createUserDto = {
          username: userStub().username,
          email: userStub().email,
          password: userStub().password,
        };
        jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hashedPassword');

        msg = await usersService.register(createUserDto);
      });

      test('then it should call findOne, create, and save', () => {
        expect(userRepository.findOne).toHaveBeenCalledTimes(2);

        expect(userRepository.create).toHaveBeenCalledWith({
          username: userStub().username,
          email: userStub().email,
          password: 'hashedPassword',
        });
        expect(userRepository.save).toHaveBeenCalledTimes(1);
      });
      test('then it should return a message', () => {
        expect(msg).toEqual({ message: 'User created successfully' });
      });
    });
  });
});
