import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  login(@Query() query: LoginUserDto) {
    console.log(query);
    return this.authService.logIn({
      username: query.username,
      password: query.password,
    });
  }
}
