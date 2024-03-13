import { Injectable } from '@nestjs/common';
import {
  createDictionaryGroupDto,
  getDictionaryGroupDto,
} from 'src/dto/dictionary.dto';
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
}
