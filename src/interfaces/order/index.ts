import { UserInterface } from 'interfaces/user';
import { DishInterface } from 'interfaces/dish';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  customer_id?: string;
  dish_id?: string;
  quantity: number;
  promocode?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  dish?: DishInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  dish_id?: string;
  promocode?: string;
}
