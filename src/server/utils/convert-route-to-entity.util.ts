const mapping: Record<string, string> = {
  dishes: 'dish',
  drivers: 'driver',
  orders: 'order',
  promocodes: 'promocode',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
