import { User } from '../../entities/user.entity';

export const userStub = () => {
  const userStub = new User();

  userStub.id = '123456';
  userStub.createdAt = new Date('2022-01-01');
  userStub.updatedAt = new Date('2022-01-01');
  userStub.email = 'test@test.com';
  userStub.password = 'test';
  userStub.username = 'test';

  return userStub;
};
