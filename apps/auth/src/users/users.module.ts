import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { User } from './entites/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [DatabaseModule, DatabaseModule.forFeature([User])],
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
