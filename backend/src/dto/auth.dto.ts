import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SigninUserDto {
  @ApiProperty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class AuthResponseDto {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: Number })
  score: number;

  @ApiProperty({ type: String })
  access_token: string;
}
