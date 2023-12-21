import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from 'src/dto/signin.user.dto';
import { LoginUserDto } from 'src/dto/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() body: SigninUserDto) {
    return this.authService.signIn({
      username: body.username,
      password: body.password,
    });
  }

  @Get('login')
  login(@Body() body: LoginUserDto) {
    return this.authService.logIn({
      username: body.username,
      password: body.password,
    });
  }
}
