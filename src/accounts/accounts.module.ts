import { Module } from '@nestjs/common';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';

@Module({
  controllers: [AccountsController],
  providers: [AccountsService],
  imports: [
    TypeOrmModule.forFeature([AccountEntity])
  ]
})
export class AccountsModule {}
