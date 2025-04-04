import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { ExpenseEntity } from 'src/expenses/entities/expense.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExpenseEntity)
    private readonly expensesRepository: Repository<ExpenseEntity>,
  ) {}

  async findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, user: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findOneByEmail(email: string): Promise<UserEntity | undefined> {
    return await this.userRepository.findOneBy({ email: email });
  }

  async findOneByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<UserEntity | undefined> {
    return await this.userRepository.findOne({
      where: [{ email }, { username }],
    });
  }

  async create(createUserDto: RegisterDto) {
    return this.userRepository.save({
      ...createUserDto,
      createdAt: new Date(),
    });
  }

  async getUserlExpenses(id: string) {
    const user = await this.userRepository.findOneBy({ id: id });
    const expenses = await this.expensesRepository.find({
      where: {
        user: { id: user.id },
      },
    });

    return expenses;
  }
}
