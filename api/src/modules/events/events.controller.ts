import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
  Query,
  UsePipes,
  UseGuards,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { GetEventsFilterDto } from './dto/get-events-filter.dto';
import { Event } from './event.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { ApiUseTags } from '@nestjs/swagger';
// import { LocationDto } from './dto/location.dto';

@ApiUseTags('Event')
@Controller('events')
@UseGuards(AuthGuard())
export class EventsController {
  constructor(private eventsService: EventsService) { }

  // @Post('/check')
  // @UsePipes(ValidationPipe)
  // checkLocation(
  //   @Body() locationDto: LocationDto,
  //   @GetUser() user: User,
  // ): Promise<Event[]> {
  //   return this.eventsService.checkLocation(locationDto, user);
  // }

  @Post()
  @UsePipes(ValidationPipe)
  createEvent(
    @Body() createEventDto: CreateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.createEvent(createEventDto, user);
  }

  @Get()
  getEvents(
    @Query(ValidationPipe) filterDto: GetEventsFilterDto,
    @GetUser() user: User,
  ): Promise<Event[]> {
    return this.eventsService.getEvents(filterDto, user);
  }

  @Get('/:id')
  getEventById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.getEventById(id, user);
  }

  @Patch('/:id')
  updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateEventDto: UpdateEventDto,
    @GetUser() user: User,
  ): Promise<Event> {
    return this.eventsService.updateEvent(id, updateEventDto, user);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.eventsService.deleteEvent(id, user);
  }
}
