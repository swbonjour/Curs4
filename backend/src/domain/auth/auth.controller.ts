import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginUserDto, SigninUserDto } from 'src/dto/auth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @ApiResponse({ type: AuthResponseDto })
  async signIn(@Body() body: SigninUserDto): Promise<AuthResponseDto> {
    return await this.authService.signIn(body);
  }

  @Get('login')
  @ApiResponse({ type: AuthResponseDto })
  async login(@Query() query: LoginUserDto): Promise<AuthResponseDto> {
    return await this.authService.logIn(query);
  }
}
