import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DictionaryGroup } from './dictionary.group.entity';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => DictionaryGroup, (d) => d._id, { onDelete: 'CASCADE' })
  dictionary_group_id: string;

  @Column({ type: 'text' })
  eng_word: string;

  @Column({ type: 'text' })
  ru_word: string;

  @Column({ type: 'text' })
  description_word: string;
}
