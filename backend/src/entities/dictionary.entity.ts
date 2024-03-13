import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dictionary {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'uuid' })
  dictionary_group_id: string;

  @Column({ type: 'text' })
  eng_word: string;

  @Column({ type: 'text' })
  ru_word: string;

  @Column({ type: 'text' })
  description_word: string;
}
