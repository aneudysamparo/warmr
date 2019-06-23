import { Location } from './location.interface';
import { Place } from './place.interface';

export interface Criteria {
  locations?: Location[];

  places?: Place[];
}
