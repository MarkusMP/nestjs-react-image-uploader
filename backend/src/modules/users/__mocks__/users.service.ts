import { userStub } from '../tests/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  register: jest
    .fn()
    .mockResolvedValue({ message: 'User created successfully' }),
  login: jest
    .fn()
    .mockResolvedValue({ message: 'User logged in successfully' }),
  updateUser: jest.fn().mockResolvedValue(userStub()),
  getUser: jest.fn().mockResolvedValue(userStub()),
});
