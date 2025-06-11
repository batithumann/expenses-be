import { Controller, Get } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) { }

  @Get()
  findAll() {
    return this.accountsService.findAll()
  }

  @Get()
  findAllByUserId(id: string) {
    return this.accountsService.findAllByUserId(id)
  }
}
