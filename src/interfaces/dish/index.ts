import { OrderInterface } from 'interfaces/order';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface DishInterface {
  id?: string;
  name: string;
  size: string;
  options: string;
  restaurant_id?: string;
  created_at?: any;
  updated_at?: any;
  order?: OrderInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    order?: number;
  };
}

export interface DishGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  size?: string;
  options?: string;
  restaurant_id?: string;
}
