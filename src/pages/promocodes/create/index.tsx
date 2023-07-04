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
import { createPromocode } from 'apiSdk/promocodes';
import { Error } from 'components/error';
import { promocodeValidationSchema } from 'validationSchema/promocodes';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { RestaurantInterface } from 'interfaces/restaurant';
import { getRestaurants } from 'apiSdk/restaurants';
import { PromocodeInterface } from 'interfaces/promocode';

function PromocodeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PromocodeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPromocode(values);
      resetForm();
      router.push('/promocodes');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PromocodeInterface>({
    initialValues: {
      code: '',
      discount: 0,
      restaurant_id: (router.query.restaurant_id as string) ?? null,
    },
    validationSchema: promocodeValidationSchema,
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
            Create Promocode
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="code" mb="4" isInvalid={!!formik.errors?.code}>
            <FormLabel>Code</FormLabel>
            <Input type="text" name="code" value={formik.values?.code} onChange={formik.handleChange} />
            {formik.errors.code && <FormErrorMessage>{formik.errors?.code}</FormErrorMessage>}
          </FormControl>
          <FormControl id="discount" mb="4" isInvalid={!!formik.errors?.discount}>
            <FormLabel>Discount</FormLabel>
            <NumberInput
              name="discount"
              value={formik.values?.discount}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('discount', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.discount && <FormErrorMessage>{formik.errors?.discount}</FormErrorMessage>}
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
    entity: 'promocode',
    operation: AccessOperationEnum.CREATE,
  }),
)(PromocodeCreatePage);
