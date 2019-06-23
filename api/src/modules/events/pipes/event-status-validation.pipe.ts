import { PipeTransform, BadRequestException } from '@nestjs/common';
import { EventStatus } from '../types/event-status.enum';

export class EventStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    EventStatus.ACTIVE,
    EventStatus.INACTIVE,
    EventStatus.COMPLETE,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`'${value}' is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
