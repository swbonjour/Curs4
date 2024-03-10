import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class createGroupDto {
  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: UUID })
  @IsUUID()
  owner: string;
}

export class deleteGroupDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  _id: string;
}

export class getGroupDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  user_id: string;

  @ApiProperty({ type: String })
  @IsString()
  owner: string;
}

export class addUserToGroup {
  @ApiProperty({ type: UUID })
  @IsUUID()
  user_id: string;

  @ApiProperty({ type: UUID })
  @IsUUID()
  group_id: string;
}

export class GetAllowedUsers {
  @ApiProperty({ type: UUID })
  @IsUUID()
  group_id: string;
}
