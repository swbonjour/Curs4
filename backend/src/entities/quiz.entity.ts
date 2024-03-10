import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'text' })
  question: string;

  @Column({ type: 'text', array: true })
  answers: string[];

  @Column({ type: 'text' })
  correct_answer: string;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'uuid' })
  @OneToOne(() => Group, (g) => g._id, { cascade: true })
  group: string;
}
