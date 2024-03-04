import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  _id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'uuid', array: true, default: [] })
  allowed_users: string[];

  @OneToOne(() => User, (u) => u._id, { cascade: true })
  @Column({ type: 'uuid' })
  owner: string;
}
