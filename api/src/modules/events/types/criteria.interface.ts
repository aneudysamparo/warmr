import { IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { Location } from './location.interface';
import { Place } from './place.interface';

export class Criteria {
  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Location)
  location: Location[];

  @ApiModelPropertyOptional()
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Place)
  place: Place[];
}
