import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  SetMetadata,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { GetUser } from './decorator/get_user.decorator';
import { GetRawHeaders } from './decorator/get_raw_heraders.decorator';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { RoleProtected } from './decorator/role-protected.decorator';
import { ValidRoles } from './interface/valid_roles';
import { Auth } from './decorator/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request, Aqui obetengo todo el Req
    @GetUser() user: User,
    @GetUser('email') userEmail: string,
    @GetRawHeaders() rawHeaders,
  ) {
    return {
      user: user,
      userEmail: userEmail,
      rawHeaders: rawHeaders,
    };
  }

  @Get('private2')
  //@SetMetadata('roles', ['admin', 'super-user', 'user'])
  @RoleProtected(ValidRoles.ADMIN)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(@GetUser() user: User) {
    return user;
  }

  @Get('private3')
  @Auth(ValidRoles.ADMIN)
  privateRoute3(@GetUser() user: User) {
    return user;
  }
}
