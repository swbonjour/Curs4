import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {
  DeleteUserFromGroupDto,
  GetAllowedUsers,
  addUserToGroup,
  createGroupDto,
  deleteGroupDto,
  getGroupDto,
} from 'src/dto/group.dto';
import { GroupService } from './group.service';
import { Group } from 'src/entities/group.entity';
import { ApiResponse } from '@nestjs/swagger';
import { User } from 'src/entities/User.entity';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Get()
  @ApiResponse({ type: Group, isArray: true })
  async getGroups(@Query() query: getGroupDto): Promise<Group[]> {
    return await this.groupService.getGroups(query);
  }

  @Post('create')
  @ApiResponse({ type: Group })
  async createGroup(@Body() body: createGroupDto): Promise<Group> {
    return await this.groupService.createGroup(body);
  }

  @Post('add-user')
  @ApiResponse({ type: Group })
  async addUserToGroup(@Body() body: addUserToGroup): Promise<User> {
    return await this.groupService.addUserToGroup(body);
  }

  @Delete('delete')
  async deleteGroup(@Query() query: deleteGroupDto) {
    return await this.groupService.deleteGroup(query);
  }

  @Get('allowed')
  async getAllowedUsers(
    @Query() query: GetAllowedUsers,
  ): Promise<{ allowed_users: string[] }> {
    return await this.groupService.getAllowedUsers(query);
  }

  @Delete('delete-user')
  async deleteUserFromGroup(@Query() query: DeleteUserFromGroupDto) {
    return await this.groupService.deleteUserFromGroup(query);
  }
}
