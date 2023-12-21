import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  public async getAllUsers() {
    return await this.dataSource.manager.find(User);
  }
}
