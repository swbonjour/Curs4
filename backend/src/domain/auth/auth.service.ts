import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import {
  AuthResponseDto,
  JwtDto,
  LoginUserDto,
  SigninUserDto,
  WhoAmIDto,
} from 'src/dto/auth.dto';

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

    const accessToken = this.generateJwt(createdUser);

    return {
      userId: createdUser._id,
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
      const accessToken = this.generateJwt(user);
      return {
        userId: user._id,
        access_token: accessToken,
      };
    } else {
      throw new HttpException(`The password is wrong`, HttpStatus.BAD_REQUEST);
    }
  }

  async whoAmI(query: JwtDto): Promise<WhoAmIDto> {
    const data = query.jwt.split('.')[1];
    const parsedData: { _id: string; exp: number } = JSON.parse(atob(data));
    const exp = parsedData.exp * 1000;

    if (Date.now() < exp) {
      return { id: parsedData._id };
    } else {
      throw new UnauthorizedException();
    }
  }

  private generateJwt(user: User): string {
    const jwtData: Partial<User> = {
      _id: user._id,
    };

    return this.jwtService.sign(jwtData);
  }
}
