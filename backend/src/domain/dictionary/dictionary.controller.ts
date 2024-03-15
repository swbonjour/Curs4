import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import {
  createDictionary,
  createDictionaryGroupDto,
  getDictionaryDto,
  getDictionaryGroupDto,
} from 'src/dto/dictionary.dto';
import { DictionaryGroup } from 'src/entities/dictionary.group.entity';
import { Dictionary } from 'src/entities/dictionary.entity';

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
    @Param() query: getDictionaryGroupDto,
  ): Promise<DictionaryGroup[]> {
    return this.dictionaryService.getDictionaryGroup(query);
  }

  @Post('create-dict')
  async createDictionary(@Body() body: createDictionary): Promise<Dictionary> {
    return this.dictionaryService.createDictionary(body);
  }

  @Get('dict/:dictionary_group_id')
  async getDictionary(@Param() query: getDictionaryDto): Promise<Dictionary[]> {
    return this.dictionaryService.getDictionary(query);
  }
}
