import { IsNotEmpty, IsOptional, IsIn, IsInstance, ValidateNested } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { EventStatus } from '../types/event-status.enum';
import { Criteria } from '../types/criteria.interface';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @ApiModelProperty()
  @IsNotEmpty()
  title: string;

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsNotEmpty()
  description: string;

  @ApiModelPropertyOptional({ enum: ['ACTIVE', 'INACTIVE', 'COMPLETE'] })
  @IsOptional()
  @IsIn([EventStatus.ACTIVE, EventStatus.INACTIVE, EventStatus.COMPLETE])
  status: EventStatus;

  @ApiModelPropertyOptional()
  @IsOptional()
  @ValidateNested()
  @Type(() => Criteria)
  criteria: Criteria;

}
