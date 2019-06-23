import { Injectable, NotFoundException, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { GetEventsFilterDto } from './dto/get-events-filter.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EventRepository } from './event.repository';
import { Event } from './event.entity';
import { EventStatus } from './types/event-status.enum';
import { User } from '../users/user.entity';
import { getDistance } from './util/location';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventRepository)
    private eventRepository: EventRepository,
  ) { }

  // async checkLocation(checkLocationDto: CheckLocationDto, user: User): Promise<Event[]> {
  //   const { latitude, longitude } = checkLocationDto;

  //   const events = await this.getEvents(null, user);

  //   const nearbyEvents = events.filter((event) => {
  //     const { latitude: eventLat, longitude: eventLon } = event.location;
  //     const distance = getDistance(latitude, longitude, eventLat, eventLon);
  //     return distance < event.distance;
  //   });
  //   return nearbyEvents;
  // }

  async createEvent(createEventDto: CreateEventDto, user: User): Promise<Event> {
    return this.eventRepository.createEvent(createEventDto, user);
  }

  async getEvents(
    filterDto: GetEventsFilterDto,
    user: User,
  ): Promise<Event[]> {
    return this.eventRepository.getEvents(filterDto, user);
  }

  async getEventById(
    id: number,
    user: User,
  ): Promise<Event> {
    const found = await this.eventRepository.findOne({ where: { id, userId: user.id } });
    if (!found) {
      throw new NotFoundException();
    }
    return found;
  }

  async updateEvent(
    id: number,
    updateEventDto: UpdateEventDto,
    user: User,
  ): Promise<Event> {
    if (updateEventDto.id !== id) {
      throw new BadRequestException(`ID of entity cannot be updated. Check that URL and request payload ID match`);
    }
    const event = await this.getEventById(id, user);
    Object.entries(updateEventDto).forEach(([key, value]) => {
      event[key] = value;
    });
    await event.save();
    return event;
  }

  async deleteEvent(
    id: number,
    user: User,
  ): Promise<void> {
    const result = await this.eventRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Event with ID: '${id} not found`);
    }
  }
}
