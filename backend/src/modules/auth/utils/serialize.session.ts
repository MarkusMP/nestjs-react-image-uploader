import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: User,
    done: (err, user: { id: string }) => void,
  ) {
    const user = await this.userRepository.findOne({ id: payload.id });
    return user ? done(null, user) : done(null, null);
  }
}
