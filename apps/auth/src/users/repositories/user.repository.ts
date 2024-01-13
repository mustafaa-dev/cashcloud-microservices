import { AbstractRepository } from '@app/common/database/abstract.repository';
import { User } from '../entites/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

export class UserRepository extends AbstractRepository<User> {
  constructor(
    @InjectRepository(User) userRepository: Repository<User>,
    entityManager: EntityManager,
  ) {
    super(userRepository, entityManager);
  }
}
