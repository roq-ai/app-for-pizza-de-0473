import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createDish } from 'apiSdk/dishes';
import { Error } from 'components/error';
import { dishValidationSchema } from 'validationSchema/dishes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { DishInterface } from 'interfaces/dish';

function DishCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: DishInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createDish(values);
      resetForm();
      router.push('/dishes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<DishInterface>({
    initialValues: {
      name: '',
      size: '',
      options: '',
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: dishValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Dish
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="size" mb="4" isInvalid={!!formik.errors?.size}>
            <FormLabel>Size</FormLabel>
            <Input type="text" name="size" value={formik.values?.size} onChange={formik.handleChange} />
            {formik.errors.size && <FormErrorMessage>{formik.errors?.size}</FormErrorMessage>}
          </FormControl>
          <FormControl id="options" mb="4" isInvalid={!!formik.errors?.options}>
            <FormLabel>Options</FormLabel>
            <Input type="text" name="options" value={formik.values?.options} onChange={formik.handleChange} />
            {formik.errors.options && <FormErrorMessage>{formik.errors?.options}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<RestaurantInterface>
            formik={formik}
            name={'restaurant_id'}
            label={'Select Restaurant'}
            placeholder={'Select Restaurant'}
            fetcher={getRestaurants}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'dish',
    operation: AccessOperationEnum.CREATE,
  }),
)(DishCreatePage);
