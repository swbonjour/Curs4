import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  AddQuizDto,
  DeleteQuizDto,
  QuizAnswerDto,
  QuizDto,
} from 'src/dto/quiz.dto';
import { Quiz } from 'src/entities/quiz.entity';
import { QuizService } from './quiz.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Get('')
  @ApiResponse({ type: Quiz, isArray: true })
  async getQuestionsForGroup(@Query() query: QuizDto): Promise<Quiz[]> {
    return await this.quizService.getQuestionsForGroup(query);
  }

  @Post('add')
  @ApiResponse({ type: Quiz })
  async addQuestionToGroup(@Body() body: AddQuizDto): Promise<Quiz> {
    return await this.quizService.addQuestionToGroup(body);
  }

  @Delete('delete')
  async deleteQuestionFromGroup(@Query() query: DeleteQuizDto) {
    return await this.quizService.deleteQuestionFromGroup(query);
  }

  @Put('answer')
  async sendCorrectAnswer(@Body() body: QuizAnswerDto) {
    return await this.quizService.sendCorrectAnswer(body);
  }
}
