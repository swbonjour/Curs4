import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AddQuizDto,
  DeleteQuizDto,
  QuizAnswerDto,
  QuizDto,
} from 'src/dto/quiz.dto';
import { User } from 'src/entities/User.entity';
import { Quiz } from 'src/entities/quiz.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class QuizService {
  constructor(private readonly dataSource: DataSource) {}

  async getQuestionsForGroup(dto: QuizDto): Promise<Quiz[]> {
    const quiz = await this.dataSource.manager.find(Quiz, {
      where: { group: dto.group },
    });

    if (quiz) {
      return quiz;
    } else {
      throw new HttpException('The quiz doesnt exist', HttpStatus.BAD_REQUEST);
    }
  }

  async addQuestionToGroup(dto: AddQuizDto): Promise<Quiz> {
    const user = await this.dataSource.manager.findOne(User, {
      where: { _id: dto.user_id },
    });

    if (user.is_teacher) {
      const question = this.dataSource.manager.create(Quiz, {
        group: dto.group,
        answers: dto.answers,
        correct_answer: dto.correct_answer,
        score: dto.score,
        question: dto.question,
      });

      await this.dataSource.manager.save(question);

      return question;
    } else {
      throw new HttpException(
        'The user is not the teacher',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteQuestionFromGroup(dto: DeleteQuizDto) {
    await this.dataSource.manager.delete(Quiz, {
      _id: dto.id,
    });
  }

  async sendCorrectAnswer(dto: QuizAnswerDto) {
    const quiz = await this.dataSource.manager.findOne(Quiz, {
      where: { _id: dto.id },
    });

    if (!quiz) {
      throw new HttpException('The quiz doesnt exist', HttpStatus.BAD_REQUEST);
    }

    const user = await this.dataSource.manager.findOne(User, {
      where: { _id: dto.user_id },
    });

    if (!user) {
      throw new HttpException('The user doesnt exist', HttpStatus.BAD_REQUEST);
    }

    await this.dataSource.manager.update(
      User,
      {
        _id: dto.user_id,
      },
      { score: user.score + quiz.score },
    );
  }
}
