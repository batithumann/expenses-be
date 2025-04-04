import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { Role } from '../roles/role.enmu';
import { RoleGuard } from '../roles/role.guard';
import { Roles } from './role.decorator';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RoleGuard));
}
