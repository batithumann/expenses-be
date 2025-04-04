import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseEntity } from './entities/expense.entity';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly expenseRepository: Repository<ExpenseEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const user = await this.userRepository.findOneBy({
      email: createExpenseDto.user,
    });
    if (!user)
      throw new BadRequestException(
        `No user found with email ${createExpenseDto.user}`,
      );

    const expense = this.expenseRepository.create({
      user,
      amount: createExpenseDto.amount,
      description: createExpenseDto.description,
      date: createExpenseDto.date,
      createdAt: new Date(),
    });

    if (createExpenseDto.category) {
      const category = await this.categoryRepository.findOneBy({
        name: createExpenseDto.category,
      });
      if (!category)
        throw new BadRequestException(
          `No category found with name ${createExpenseDto.category}`,
        );
      expense.category = category;
    }

    return this.expenseRepository.save(expense);
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
