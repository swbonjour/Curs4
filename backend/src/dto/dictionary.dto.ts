import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class createDictionaryGroupDto {
  @ApiProperty({ type: String })
  @IsUUID()
  group_id: string;

  @ApiProperty({ type: String })
  @IsString()
  name: string;
}

export class getDictionaryGroupDto {
  @ApiProperty({ type: String })
  @IsUUID()
  group_id: string;
}

export class createDictionary {
  @ApiProperty({ type: String })
  @IsUUID()
  dictionary_group_id: string;

  @ApiProperty({ type: String })
  @IsString()
  eng_word: string;

  @ApiProperty({ type: String })
  @IsString()
  ru_word: string;

  @ApiProperty({ type: String })
  @IsString()
  description_word: string;
}

export class getDictionaryDto {
  @ApiProperty()
  @IsString()
  dictionary_group_id: string;
}
