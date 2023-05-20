import { 
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards 
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private readonly usersService: UsersService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    login(@Body() createUserDto: CreateUserDto) {
      return this.authService.login(createUserDto);
    }

    @HttpCode(HttpStatus.OK)
    @Post('sign-up')
    signUp(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
}