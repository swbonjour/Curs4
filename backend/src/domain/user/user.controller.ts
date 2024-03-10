import { Controller, Get, HttpException, Param, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDto, UsersIdDto, UsersNotInSpaceDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/get-by-id/:_id')
  @ApiResponse({ type: User })
  async getUserById(@Param() param: UserIdDto): Promise<User | HttpException> {
    return this.userService.getUserById(param);
  }

  @Get('users')
  @ApiResponse({ type: User })
  async getUsersById(
    @Query() query: UsersIdDto,
  ): Promise<User[] | HttpException> {
    return this.userService.getUsersById(query);
  }

  @Get('group')
  @ApiResponse({ type: User })
  async getUsersNotInSpace(
    @Query() query: UsersNotInSpaceDto,
  ): Promise<User[]> {
    return this.userService.getUsersNotInSpace(query);
  }
}
