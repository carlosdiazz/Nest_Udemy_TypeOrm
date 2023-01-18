import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { CreateUserDto, LoginUserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interface/jwt_payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;
      const newUser = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      //TODO retorna JWT
      return await this.userRepository.save(newUser);
    } catch (error) {
      this.logger.error(error?.message);
      throw new BadRequestException(error?.message);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: {
        password: false,
        email: true,
      },
    });
    return user;
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
  }
}
