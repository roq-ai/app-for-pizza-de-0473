import { DishInterface } from 'interfaces/dish';
import { PromocodeInterface } from 'interfaces/promocode';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  dish?: DishInterface[];
  promocode?: PromocodeInterface[];
  user?: UserInterface;
  _count?: {
    dish?: number;
    promocode?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
