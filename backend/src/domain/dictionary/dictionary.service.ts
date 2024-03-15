import { Injectable } from '@nestjs/common';
import {
  createDictionary,
  createDictionaryGroupDto,
  getDictionaryDto,
  getDictionaryGroupDto,
} from 'src/dto/dictionary.dto';
import { Dictionary } from 'src/entities/dictionary.entity';
import { DictionaryGroup } from 'src/entities/dictionary.group.entity';
import { DataSource } from 'typeorm';

@Injectable()
export class DictionaryService {
  constructor(private readonly datasource: DataSource) {}

  async createDictonaryGroup(
    dto: createDictionaryGroupDto,
  ): Promise<DictionaryGroup> {
    const dictionaryGroup = this.datasource.manager.create(DictionaryGroup, {
      group_id: dto.group_id,
      name: dto.name,
    });

    await this.datasource.manager.save(dictionaryGroup);

    return dictionaryGroup;
  }

  async getDictionaryGroup(
    dto: getDictionaryGroupDto,
  ): Promise<DictionaryGroup[]> {
    const dictionaryGroup = await this.datasource.manager.find(
      DictionaryGroup,
      {
        where: { group_id: dto.group_id },
      },
    );

    return dictionaryGroup;
  }

  async createDictionary(dto: createDictionary): Promise<Dictionary> {
    const dictionary = await this.datasource.manager.create(Dictionary, {
      dictionary_group_id: dto.dictionary_group_id,
      eng_word: dto.eng_word,
      ru_word: dto.ru_word,
      description_word: dto.description_word,
    });

    await this.datasource.manager.save(dictionary);

    return dictionary;
  }

  async getDictionary(dto: getDictionaryDto): Promise<Dictionary[]> {
    const dictionary = await this.datasource.manager.find(Dictionary, {
      where: { dictionary_group_id: dto.dictionary_group_id },
    });

    return dictionary;
  }
}
