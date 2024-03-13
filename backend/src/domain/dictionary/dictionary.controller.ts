import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import {
  createDictionaryGroupDto,
  getDictionaryGroupDto,
} from 'src/dto/dictionary.dto';
import { DictionaryGroup } from 'src/entities/dictionary.group.entity';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Post('create-group')
  async createDictonaryGroup(
    @Body() body: createDictionaryGroupDto,
  ): Promise<DictionaryGroup> {
    return this.dictionaryService.createDictonaryGroup(body);
  }

  @Get('group/:group_id')
  async getDictionaryGroup(
    @Query() query: getDictionaryGroupDto,
  ): Promise<DictionaryGroup[]> {
    return this.dictionaryService.getDictionaryGroup(query);
  }
}
