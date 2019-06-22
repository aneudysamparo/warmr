import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventStatus } from './event-status.enum';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

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
  location: { latitude: number, longitude: number };

  @Column()
  distance: number;

  @ManyToOne((type) => User, (user) => user.events, { eager: false })
  user: User;

  @Column()
  @Exclude()
  userId: number;
}
