import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Role } from 'src/auth/roles/role.enmu';
import { RequestWithUser } from 'src/common/interfaces/user';
import { BaseExpense } from 'src/expenses/dto/base-expense.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: RegisterDto) {
    return this.userService.create(createUserDto);
  }

  @Auth(Role.USER)
  @Get('expenses')
  @ApiOperation({ summary: 'Get all expenses by user' })
  @ApiResponse({
    status: 200,
    description: 'Expenses retrieved',
    type: [BaseExpense],
  })
  async findAllExpenses(
    @Req() req: RequestWithUser,
    @Res() response: Response,
  ) {
    try {
      const user = req.user;
      const data = await this.userService.getUserlExpenses(user.id);
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
