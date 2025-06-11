import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ExpensesModule } from './expenses/expenses.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '925837',
      database: 'expenses',
      entities: [UserEntity],
      autoLoadEntities: true, // Automatically load entities
      synchronize: true, // Automatically sync schema with DB (disable in production)
    }),
    AuthModule,
    UsersModule,
    CategoriesModule,
    ExpensesModule,
    AccountsModule,
  ],
})
export class AppModule {}
