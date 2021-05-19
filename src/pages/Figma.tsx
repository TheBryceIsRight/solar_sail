import React from 'react';
import {TextField, Button, Container} from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Form from '../../components/FigmaLoginForm';

export default function Figma() {

  return (
    <React.Fragment>
      <Grid container spacing={2} direction='column' justify='center' alignItems='center'>
      <Grid item>
      <Container>
        <Form />
      </Container>
      </Grid>
    </Grid>
    </React.Fragment>
  );
}