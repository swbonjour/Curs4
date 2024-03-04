import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':_id')
  @ApiResponse({ type: User })
  async getUserById(@Param() param: UserIdDto): Promise<User | HttpException> {
    return this.userService.getUserById(param);
  }
}
