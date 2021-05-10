import { Button, FormControl, Grid, InputLabel, makeStyles, MenuItem, Paper, Select, SelectProps, Typography } from '@material-ui/core';
import { Field, Form, Formik, useField, useFormikContext } from 'formik';
import { GetServerSideProps } from 'next';
import router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { getTaxID, TaxID } from '../database/getTaxID';
import { getDBA, BusinessAs } from '../database/getDBA';
import { getRegion, Region } from '../database/getRegion';
import { getCities, City } from '../database/getCities';

import { getAsString } from '../getAsString';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";


export interface UserSearchProps {
  dba: BusinessAs[];
  taxID: TaxID[];
  region: Region[];
  city: City[];
  singleColumn?: boolean;
}

export const cities = [{
    state: "Illinois",
    name: "Chicago",
    id: 3,
}, {
    state: "Texas",
    name: "Houston",
    id: 2
}, {
    state: "California",
    name: "Los Angeles",
    id: 1
}, {
    state: "New York",
    name: "New York City",
    id: 4
}];


const useStyles = makeStyles((theme) => ({
  paper: {
    margin: 'auto',
    maxWidth: 500,
    padding: theme.spacing(3),
  },
}));

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Search({ dba, taxID, region, city,  singleColumn }: UserSearchProps) {
  const classes = useStyles();
  const { query } = useRouter();
  const smValue = singleColumn ? 12 : 6;

  const [initialValues] = useState({
    dba: getAsString(query.dba) || 'all',
    taxID: getAsString(query.taxID) || 'all',
    region: getAsString(query.region) || 'all',
    city: getAsString(query.region) || 'all',
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        router.push(
          {
            pathname: '/users',
            query: { ...values, page: 1 },
          },
          undefined,
          { shallow: true }
        );
      }}
    >
      {({ values }) => (
        <Form>
          <Paper elevation={5} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-users">DBA</InputLabel>
                  <Field
                    name="dba"
                    as={Select}
                    labelId="search-users"
                    label="DBA"
                  >
                    <MenuItem value="all">
                      <em>All Businesses</em>
                    </MenuItem>
                    {dba.map((dba) => (
                      <MenuItem key={dba.dba} value={dba.dba}>
                        {dba.dba}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-taxID">Tax ID</InputLabel>
                  <Field
                    name="taxID"
                    as={Select}
                    labelId="search-taxid"
                    label="Tax ID"
                  >
                    <MenuItem value="all">
                      <em>All IDs</em>
                    </MenuItem>
                    {taxID.map((taxID) => (
                      <MenuItem key={taxID.taxID} value={taxID.taxID}>
                      {taxID.taxID}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-city">City</InputLabel>
                  <Field
                    name="city"
                    as={Select}
                    labelId="search-city"
                    label="City"
                  >
                    <MenuItem value="all">
                      <em>All Cities</em>
                    </MenuItem>
                    {city.map((city) => (
                      <MenuItem key={city.city} value={city.city}>
                      {city.city}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={smValue}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel id="search-region">State</InputLabel>
                  <Field
                    name="region"
                    as={Select}
                    labelId="search-region"
                    label="State"
                  >
                    <MenuItem value="all">
                      <em>All States</em>
                    </MenuItem>
                    {region.map((region) => (
                      <MenuItem key={region.region} value={region.region}>
                      {region.region}
                    </MenuItem>
                    ))}
                  </Field>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
}

// export interface ModelSelectProps extends SelectProps {
//   name: string;
//   models: Model[];
//   make: string;
//   initialMake: string;
// }

// export function ModelSelect({ initialMake, models, make, ...props }: ModelSelectProps) {
//   const { setFieldValue } = useFormikContext();
//   const [field] = useField({
//     name: props.name
//   });

//   const initialModelsOrUndefined = make === initialMake ? models : undefined;

//   const { data: newModels } = useSWR<Model[]>('/api/models?make=' + make, {
//     dedupingInterval: 60000,
//     initialData: make === 'all' ? [] : initialModelsOrUndefined 
//   });

//   useEffect(() => {
//     if (!newModels?.map((a) => a.model).includes(field.value)) {
//       setFieldValue('model', 'all');
//     }
//   }, [make, newModels]);

//   return (
//     <FormControl fullWidth variant="outlined">
//       <InputLabel id="search-model">Model</InputLabel>
//       <Select
//         name="model"
//         labelId="search-model"
//         label="Model"
//         {...field}
//         {...props}
//       >
//         <MenuItem value="all">
//           <em>All Models</em>
//         </MenuItem>
//         {newModels?.map((model) => (
//           <MenuItem key={model.model} value={model.model}>
//             {`${model.model} (${model.count})`}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// }

export const getServerSideProps: GetServerSideProps<UserSearchProps> = async (
  ctx
) => {

  const [taxID, dba, region, city] = await Promise.all([getTaxID(), getDBA(), getRegion(), getCities()]);

  return { props: { taxID, dba, region, city } };
};
