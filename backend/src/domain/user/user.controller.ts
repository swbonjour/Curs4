import { Controller, Get, HttpException, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @ApiResponse({ type: User })
  async getUserById(@Query() query: UserIdDto): Promise<User | HttpException> {
    return this.userService.getUserById(query);
  }
}
