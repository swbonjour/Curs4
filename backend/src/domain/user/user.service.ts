import { BadRequestException, Injectable } from '@nestjs/common';
import { UserIdDto } from 'src/dto/user.dto';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';

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
}
