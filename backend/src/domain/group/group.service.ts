import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  DeleteUserFromGroupDto,
  GetAllowedUsers,
  addUserToGroup,
  createGroupDto,
  deleteGroupDto,
  getGroupDto,
} from 'src/dto/group.dto';
import { User } from 'src/entities/User.entity';
import { Group } from 'src/entities/group.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class GroupService {
  constructor(private readonly dataSource: DataSource) {}

  async createGroup(dto: createGroupDto): Promise<Group> {
    if (!dto.name) {
      throw new HttpException('The name cant be empty', HttpStatus.BAD_REQUEST);
    }

    try {
      const existingOwner = await this.dataSource.manager.findOne(User, {
        where: { _id: dto.owner, is_teacher: true },
      });

      if (!existingOwner) {
        throw new HttpException(
          'The user doesnt exist or doesnt has access',
          HttpStatus.BAD_REQUEST,
        );
      }

      const existingGroup = await this.dataSource.manager.findOne(Group, {
        where: { name: dto.name, owner: dto.owner },
      });

      if (existingGroup) {
        throw new HttpException(
          'The group is already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const group = this.dataSource.manager.create(Group, {
        name: dto.name,
        owner: dto.owner,
      });

      await this.dataSource.manager.save(group);

      return group;
    } catch (err: any) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteGroup(dto: deleteGroupDto) {
    const existingGroup = await this.dataSource.manager.findOne(Group, {
      where: { _id: dto._id },
    });

    if (!existingGroup) {
      throw new HttpException('The group doesnt exist', HttpStatus.BAD_REQUEST);
    }

    await this.dataSource.manager.delete(Group, {
      _id: dto._id,
    });
  }

  async getGroups(dto: getGroupDto): Promise<Group[]> {
    const owner = dto.owner === 'false' ? false : true;

    if (!owner) {
      const groups: Group[] = await this.dataSource.manager.query(
        `SELECT * FROM public.group WHERE '${dto.user_id}' = ANY(allowed_users)`,
      );

      return groups;
    } else {
      const groups = await this.dataSource.manager.find(Group, {
        where: { owner: dto.user_id },
      });

      return groups;
    }
  }

  async addUserToGroup(dto: addUserToGroup): Promise<User> {
    const existingUser = await this.dataSource.manager.findOne(User, {
      where: { _id: dto.user_id },
    });

    const existingGroup = await this.dataSource.manager.findOne(Group, {
      where: { _id: dto.group_id },
    });

    existingGroup.allowed_users.forEach((item) => {
      if (item === dto.user_id) {
        throw new HttpException(
          'You are trying to add already added user',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    if (existingUser._id === existingGroup.owner) {
      throw new HttpException(
        'You are trying to add owner to the group',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (existingUser && existingGroup) {
      await this.dataSource.manager.query(
        `UPDATE public.group
             SET allowed_users = ARRAY_APPEND(allowed_users, '${dto.user_id}')
             WHERE _id = '${dto.group_id}'`,
      );
    }

    return existingUser;
  }

  async getAllowedUsers(
    dto: GetAllowedUsers,
  ): Promise<{ allowed_users: string[] }> {
    const group = await this.dataSource.manager.findOne(Group, {
      where: { _id: dto.group_id },
    });

    if (!group) {
      throw new HttpException('There is no such group', HttpStatus.BAD_REQUEST);
    }

    return { allowed_users: group.allowed_users };
  }

  async deleteUserFromGroup(dto: DeleteUserFromGroupDto) {
    const group = await this.dataSource.manager.findOne(Group, {
      where: { _id: dto.group_id },
    });

    if (!group) {
      throw new HttpException('There is no such group', HttpStatus.BAD_REQUEST);
    }

    const user = await this.dataSource.manager.findOne(User, {
      where: { _id: dto.user_id },
    });

    if (!user) {
      throw new HttpException('Threr is no such user', HttpStatus.BAD_REQUEST);
    }

    await this.dataSource.manager.query(
      `UPDATE public.group
      SET allowed_users = ARRAY_REMOVE(allowed_users, '${dto.user_id}')
      WHERE _id = '${dto.group_id}'`,
    );
  }
}
