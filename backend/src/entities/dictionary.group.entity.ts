import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class DictionaryGroup {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'uuid' })
  @ManyToOne(() => Group, (g) => g._id, { onDelete: 'CASCADE' })
  group_id: string;

  @Column({ type: 'text' })
  name: string;
}
