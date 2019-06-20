import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EventStatus } from './event-status.enum';
import { User } from '../users/user.entity';

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
  userId: number;
}

const alert = {
  id: 19203,
  userId: 234,
  title: 'Elle',
  description: 'Our apartment',
  status: 'ACTIVE',
  location: {
    latitude: 19.1209301923,
    longitude: 11.292329329,
  },
  distance: 50,
  frequency: 'ONCE',
};
