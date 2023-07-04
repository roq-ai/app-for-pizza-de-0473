import * as yup from 'yup';

export const dishValidationSchema = yup.object().shape({
  name: yup.string().required(),
  size: yup.string().required(),
  options: yup.string().required(),
  restaurant_id: yup.string().nullable(),
});
