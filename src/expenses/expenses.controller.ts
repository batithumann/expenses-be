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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/roles/role.enmu';
import { RequestWithUser } from 'src/common/interfaces/user';
import { BaseExpense } from './dto/base-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';

@Controller('expenses')
@ApiTags('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Auth(Role.USER)
  @Post('create')
  @ApiOperation({ summary: 'Create new expense' })
  @ApiResponse({
    status: 200,
    description: 'Expense created',
    type: [BaseExpense],
  })
  async create(
    @Req() req: RequestWithUser,
    @Res() response: Response,
    @Body() expense: CreateExpenseDto,
  ) {
    try {
      const user = req.user;
      const payload = {
        user: user.email,
        category: expense.category,
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
      };
      const data = await this.expensesService.create(payload);
      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
