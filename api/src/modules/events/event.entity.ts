import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from '../users/user.entity';
import { EventStatus } from './types/event-status.enum';
import { Criteria } from './types/criteria.interface';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: EventStatus;

  @Column('simple-json')
  criteria: Criteria;

  @ManyToOne((type) => User, (user) => user.events, { eager: false })
  user: User;

  @Column()
  @Exclude()
  userId: number;
}
