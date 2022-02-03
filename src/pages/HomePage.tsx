import React, { FC, useEffect } from 'react';
import SampleStores from '../models/Stores/SampleStores';
import HttpResult from '../helpers/http/HttpResult';
import HttpStatus from '../models/utils/HttpResult';
import SampleServices from '../services/SampleService';
import { Stack } from '@mui/material';

const HomePage: FC = () => {
  const a = 10;
  useEffect(() => {
    SampleServices.getAllStores()
      .then((response: HttpResult<SampleStores[]>) => {
        if (response.status === HttpStatus.Success) {
          // access the data through `response.data`
        }
      })
      .catch((error) => {
        // Used console log for demonstration purpose. Do not use console.log when you're
        // developing the app.
        // eslint-disable-next-line no-console
        console.log((error as Error).message);
      });
  });
  return (
    <Stack>
      <h1>Hello World</h1>
    </Stack>
  );
};
export default HomePage;
