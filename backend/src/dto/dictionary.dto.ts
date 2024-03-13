import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class createDictionaryGroupDto {
  @ApiProperty({ type: String })
  @IsUUID()
  group_id: string;
}

export class getDictionaryGroupDto {
  @ApiProperty({ type: String })
  @IsUUID()
  group_id: string;
}
