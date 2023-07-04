import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  quantity: yup.number().integer().required(),
  promocode: yup.string(),
  customer_id: yup.string().nullable(),
  dish_id: yup.string().nullable(),
});
