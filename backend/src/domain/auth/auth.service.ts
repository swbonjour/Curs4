import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthResponseDto, LoginUserDto, SigninUserDto } from 'src/dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(dto: SigninUserDto): Promise<AuthResponseDto> {
    const user = await this.dataSource.manager.findOne(User, {
      where: { username: dto.username },
    });

    if (user) {
      throw new HttpException(
        `The username is already in use`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(dto.password, salt);

    const createdUser = await this.dataSource.manager.create(User, {
      username: dto.username,
      hash: hash,
    });
    await this.dataSource.manager.save(createdUser);

    const accessToken = await this.jwtService.signAsync({
      id: createdUser.id,
      username: createdUser.username,
    });

    return {
      username: createdUser.username,
      score: createdUser.score,
      access_token: accessToken,
    };
  }

  async logIn(dto: LoginUserDto): Promise<AuthResponseDto> {
    const user = await this.dataSource.manager.findOne(User, {
      where: { username: dto.username },
    });

    if (!user) {
      throw new HttpException(
        `The user is not registered`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const checkHash = await bcrypt.compare(dto.password, user.hash);

    if (checkHash) {
      const accessToken = await this.jwtService.signAsync({
        id: user.id,
        username: user.username,
      });
      return {
        username: user.username,
        score: user.score,
        access_token: accessToken,
      };
    } else {
      throw new HttpException(`The password is wrong`, HttpStatus.BAD_REQUEST);
    }
  }
}
