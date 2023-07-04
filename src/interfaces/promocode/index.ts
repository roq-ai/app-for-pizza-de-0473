import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface PromocodeInterface {
  id?: string;
  code: string;
  discount: number;
  restaurant_id?: string;
  created_at?: any;
  updated_at?: any;

  restaurant?: RestaurantInterface;
  _count?: {};
}

export interface PromocodeGetQueryInterface extends GetQueryInterface {
  id?: string;
  code?: string;
  restaurant_id?: string;
}
