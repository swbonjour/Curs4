import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserIdDto, UsersIdDto, UsersNotInSpaceDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { Group } from 'src/entities/group.entity';
import { DataSource, In, Not } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async getUserById(dto: UserIdDto): Promise<User> {
    const user = await this.dataSource.manager.findOne(User, {
      where: { _id: dto._id },
    });

    if (!user) {
      throw new BadRequestException('The user is not exist');
    }

    return user;
  }

  async getUsersById(dto: UsersIdDto): Promise<User[]> {
    const ids = JSON.parse(decodeURIComponent(dto._id));
    const users = await this.dataSource.manager.find(User, {
      where: { _id: In(ids) },
    });

    return users;
  }

  async getUsersNotInSpace(dto: UsersNotInSpaceDto): Promise<User[]> {
    const group = await this.dataSource.manager.findOne(Group, {
      where: { _id: dto.group_id },
    });

    if (!group) {
      throw new HttpException('The group doesnt exist', HttpStatus.BAD_REQUEST);
    }

    const allowedUsers = group.allowed_users;

    const users = await this.dataSource.manager.find(User, {
      where: { _id: Not(In(allowedUsers)), is_teacher: false },
    });

    return users;
  }
}
