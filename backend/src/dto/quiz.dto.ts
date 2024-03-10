import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, IsUUID } from 'class-validator';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';

export class QuizDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  group: string;
}

export class AddQuizDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  group: string;

  @ApiProperty({ type: String })
  @IsString()
  question: string;

  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  answers: string[];

  @ApiProperty({ type: String })
  @IsString()
  correct_answer: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  score: number;

  @ApiProperty({ type: UUID })
  @IsUUID()
  user_id: string;
}

export class DeleteQuizDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  id: string;
}

export class QuizAnswerDto {
  @ApiProperty({ type: UUID })
  @IsUUID()
  id: string;

  @ApiProperty({ type: UUID })
  @IsUUID()
  user_id: string;
}

export class QuizAnswerResponseDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  score: number;
}
