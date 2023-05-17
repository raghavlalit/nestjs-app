import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async login(email, password) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user || !argon2.verify(user.password, password)) {
          throw new UnauthorizedException();
        }
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
}