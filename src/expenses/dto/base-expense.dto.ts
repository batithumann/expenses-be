import { ApiProperty } from '@nestjs/swagger';
export class BaseExpense {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  user?: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  category: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  date: string;
}
