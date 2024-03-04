import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User.entity';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';
import { Group } from './entities/group.entity';
import { GroupModule } from './domain/group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [User, Group],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
