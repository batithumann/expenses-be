import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RequestWithUser } from 'src/common/interfaces/user';
import { BaseUser } from 'src/users/dto/base-user.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './public-strategy';
import { Role } from './roles/role.enmu';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User Signup' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  async register(@Res() response: Response, @Body() user: RegisterDto) {
    try {
      const payload = {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: new Date(),
      };
      const data = await this.authService.register(payload);

      return response.status(HttpStatus.OK).json(data);
    } catch (error) {
      throw error;
    }
  }

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User Login' })
  @ApiResponse({
    status: 200,
    description: 'The record found',
    type: [BaseUser],
  })
  login(@Body() { email, password }: LoginDto) {
    return this.authService.login({ email, password });
  }

  @Get('profile')
  @Auth(Role.USER)
  profile(@Req() req: RequestWithUser) {
    return this.authService.profile(req.user);
  }
}
