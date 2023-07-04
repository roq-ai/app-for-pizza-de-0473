import * as yup from 'yup';

export const promocodeValidationSchema = yup.object().shape({
  code: yup.string().required(),
  discount: yup.number().integer().required(),
  restaurant_id: yup.string().nullable(),
});
