import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler()) || this.reflector.get<string[]>(ROLES_KEY, context.getClass());
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authHeader.replace('Bearer ', '');
    try {
      const payload: any = this.jwtService.verify(token);
      const userRoles: string[] = payload.roles || [];
      const hasRole = requiredRoles.some(role => userRoles.includes(role));
      if (!hasRole) {
        throw new ForbiddenException('Insufficient role');
      }

      // attach user info for downstream handlers
      request.user = { id: payload.sub, email: payload.email, roles: userRoles };
      return true;
    } catch (err) {
      if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Invalid token');
      }
      throw err;
    }
  }
}
