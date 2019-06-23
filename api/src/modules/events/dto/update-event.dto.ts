import { IsOptional, IsIn } from 'class-validator';
import { EventStatus } from '../types/event-status.enum';
import { ApiModelPropertyOptional } from '@nestjs/swagger';

export class UpdateEventDto {
  @IsOptional()
  id: number;

  @ApiModelPropertyOptional()
  @IsOptional()
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  description: string;

  @ApiModelPropertyOptional({ enum: ['ACTIVE', 'INACTIVE', 'COMPLETE'] })
  @IsOptional()
  @IsIn([EventStatus.ACTIVE, EventStatus.INACTIVE, EventStatus.COMPLETE])
  status: EventStatus;

}
