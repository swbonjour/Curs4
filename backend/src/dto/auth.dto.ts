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
  userId: string;

  @ApiProperty({ type: String })
  access_token: string;
}

export class JwtDto {
  @ApiProperty()
  @IsString()
  jwt: string;
}

export class WhoAmIDto {
  @ApiProperty()
  @IsString()
  id: string;
}
