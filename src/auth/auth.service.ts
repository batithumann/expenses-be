import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, email, password }: RegisterDto) {
    const exists = await this.usersService.findOneByEmailOrUsername(
      email,
      username,
    );

    if (exists?.username === username)
      throw new BadRequestException('Username already exists');
    if (exists?.email === email)
      throw new BadRequestException('Email already registered');

    const user = await this.usersService.create({
      username,
      email,
      password: await bcryptjs.hash(password, 10),
    });
    return user;
  }

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new UnauthorizedException('Email not found');

    const checkCredentials = await bcryptjs.compare(password, user.password);
    if (!checkCredentials) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { id: user.id, email: user.email, role: user.role };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }
}
