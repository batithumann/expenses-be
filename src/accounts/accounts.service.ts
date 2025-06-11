import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(AccountEntity)
    accountsRepository: Repository<AccountEntity>
  ) {}

  findAll() {
    return 'find all accounts'
  }

  findAllByUserId(userId: string) {
    return `all accounts from user ${userId}`
  }
}
