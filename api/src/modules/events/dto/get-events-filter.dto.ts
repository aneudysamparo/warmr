import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { EventStatus } from '../event-status.enum';


export class GetEventsFilterDto {
  @IsOptional()
  @IsIn([EventStatus.ACTIVE, EventStatus.INACTIVE, EventStatus.COMPLETE])
  status: EventStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
