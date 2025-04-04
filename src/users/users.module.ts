import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from 'src/expenses/entities/expense.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([UserEntity, ExpenseEntity])],
})
export class UsersModule {}
