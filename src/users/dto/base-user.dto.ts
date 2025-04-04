import { ApiProperty } from '@nestjs/swagger';
export class BaseUser {
  @ApiProperty()
  id?: string;
  @ApiProperty()
  username?: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
