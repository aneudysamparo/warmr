import { Event } from './event.entity';
import { Repository, EntityRepository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { EventStatus } from './types/event-status.enum';
import { GetEventsFilterDto } from './dto/get-events-filter.dto';
import { User } from '../users/user.entity';

@EntityRepository(Event)
export class EventRepository extends Repository<Event> {

  async getEvents(
    filterDto: GetEventsFilterDto,
    user: User,
  ): Promise<Event[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('event');

    query.where('event.userId = :userId', { userId: user.id });

    if (status) {
      query.andWhere('event.status = :status', { status });
    }

    if (search) {
      query.andWhere('event.title LIKE :search OR event.description LIKE :search', { search: `%${search}%` });
    }

    const events = await query.getMany();
    return events;
  }

  async createEvent(
    createEventDto: CreateEventDto,
    user: User,
  ): Promise<Event> {
    const { title, description } = createEventDto;
    const event = new Event();
    event.title = title;
    event.description = description;
    event.status = EventStatus.ACTIVE;
    event.user = user;
    await event.save();
    delete event.user;
    return event;
  }
}
