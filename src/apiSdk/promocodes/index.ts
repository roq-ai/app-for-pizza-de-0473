import axios from 'axios';
import queryString from 'query-string';
import { PromocodeInterface, PromocodeGetQueryInterface } from 'interfaces/promocode';
import { GetQueryInterface } from '../../interfaces';

export const getPromocodes = async (query?: PromocodeGetQueryInterface) => {
  const response = await axios.get(`/api/promocodes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPromocode = async (promocode: PromocodeInterface) => {
  const response = await axios.post('/api/promocodes', promocode);
  return response.data;
};

export const updatePromocodeById = async (id: string, promocode: PromocodeInterface) => {
  const response = await axios.put(`/api/promocodes/${id}`, promocode);
  return response.data;
};

export const getPromocodeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/promocodes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePromocodeById = async (id: string) => {
  const response = await axios.delete(`/api/promocodes/${id}`);
  return response.data;
};
