import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { META_ROLES } from '../../decorator/role-protected.decorator';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Aqui obtengo todos los roles que viene en el Req
    const validRoles: string = this.reflector.get(
      META_ROLES,
      context.getHandler(),
    );

    //Esto es si no especifico que la ruta tenga un rol especifico, puede entrar si verificar el rol
    if (!validRoles) {
      return true;
    }
    if (validRoles.length === 0) return true;

    //Aqui obtengo el user del Req
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user) {
      throw new BadRequestException('User not found');
    }

    //Aqui valido que el rol que estoty pasando el useuario lo tenga
    for (const role of user.roles) {
      if (validRoles.includes(role)) {
        return true;
      }
    }
    throw new UnauthorizedException('No tiene el rol');
  }
}
