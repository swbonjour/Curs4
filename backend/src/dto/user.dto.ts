import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UserIdDto {
  @ApiProperty({ type: String })
  @IsUUID()
  _id: UUID;
}

export class UsersIdDto {
  @ApiProperty({ type: String })
  @IsString()
  _id: string;
}

export class UsersNotInSpaceDto {
  @ApiProperty({ type: String })
  @IsUUID()
  group_id: string;
}
