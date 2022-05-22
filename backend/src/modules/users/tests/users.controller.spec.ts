import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto, LoginUserDto } from '../dtos';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('controller and service should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
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
        msg = await usersController.register(createUserDto);
      });

      test('then it should call usersService with createUserDto', () => {
        expect(usersService.register).toHaveBeenCalledWith(createUserDto);
      });

      test('then it should return "User created successfully"', () => {
        expect(msg.message).toEqual('User created successfully');
      });
    });
  });
  describe('login', () => {
    describe('when login is called', () => {
      let loginUserDto: LoginUserDto;
      let msg: { message: string };
      beforeEach(async () => {
        loginUserDto = {
          email: userStub().email,
          password: userStub().password,
        };
        msg = await usersController.login(loginUserDto);
      });

      test('then it should call usersService with loginUserDto', () => {
        expect(usersService.login).toHaveBeenCalledWith(loginUserDto);
      });

      test('then it should return "User logged in successfully"', () => {
        expect(msg.message).toEqual('User logged in successfully');
      });
    });
  });
  describe('updateUser', () => {
    describe('when updateUser is called', () => {
      let updateUserDto: UpdateUserDto;
      let user;
      beforeEach(async () => {
        updateUserDto = {
          username: userStub().username,
        };
        user = await usersController.updateUser(updateUserDto, userStub());
      });

      test('then it should call usersService with updateUserDto and id', () => {
        expect(usersService.updateUser).toHaveBeenCalledWith(
          updateUserDto,
          userStub().id,
        );
      });

      test('then it should return the updated user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe('getUser', () => {
    describe('when getUser is called', () => {
      let user;
      beforeEach(async () => {
        user = await usersController.getUser(userStub());
      });

      test('then it should call usersService with id', () => {
        expect(usersService.getUser).toHaveBeenCalledWith(userStub().id);
      });

      test('then it should return the user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
});
