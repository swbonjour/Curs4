import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UserIdDto {
  @ApiProperty({ type: String })
  @IsUUID()
  id: UUID;
}
