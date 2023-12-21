import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ type: 'text' })
  username: string;

  @Column({ type: 'text' })
  hash: string;

  @Column({ default: false, type: 'boolean' })
  is_admin: boolean;
}
