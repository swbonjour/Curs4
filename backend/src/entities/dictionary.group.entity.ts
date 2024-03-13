import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class DictionaryGroup {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'uuid' })
  @OneToOne(() => Group, (g) => g._id, { onDelete: 'CASCADE' })
  group_id: string;
}
