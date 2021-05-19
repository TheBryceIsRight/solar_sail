import { Box, Button, Card, CardContent, Checkbox, CheckboxProps, FormControlLabel, FormGroup, MenuItem, TextField, Typography, Container, Grid } from '@material-ui/core';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import React, {useState} from 'react';
import { array, boolean, mixed, number, object, string } from 'yup';
import { LoginDetail } from './LoginDetail';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import axios from "axios";

// async function FigmaLogin(req, res) {
//   const state = '0e900be10ac54e6abf4b38f8b21a189b';
//   const url = `https://www.figma.com/oauth?client_id=:LP0W6v8LjJ0MVonK3Ct0AT&redirect_uri=:https://solar-sail-chi.vercel.app/Figma&scope=file_read&state=:0e900be10ac54e6abf4b38f8b21a189b&response_type=code`;
//   const xFigmaToken = '190114-46a6f35c-d869-4e2e-8663-5a33f8c38a96';

//   await axios
//     .get(url)
//     .then(({ data }) => {
//       res.status(200).json({ data })
//     })
//     .catch(({ err }) => {
//       res.status(400).json({ err })
//     })
// }


const initialValues: LoginDetail = {
email: "",
password: "",
};

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));



export default function FigmaLoginForm() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorOpen, setErrorOpen] = React.useState(false);

    const [message, setMessage] = useState<any>(null);
    async function handleLogin() {
      const url = `https://www.figma.com/oauth?client_id=:LP0W6v8LjJ0MVonK3Ct0AT&redirect_uri=:https://solar-sail-chi.vercel.app/Figma&scope=file_read&state=:0e900be10ac54e6abf4b38f8b21a189b&response_type=code`;
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Figma-Token': '190114-46a6f35c-d869-4e2e-8663-5a33f8c38a96'
        }
      });
      const json = await resp.json();
      setMessage(json);
      console.log(json.message);
      if (!json.message) {
        setOpen(true);
      } else {
        setErrorOpen(true);
      }
    }  
    
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

    setOpen(false);
    setErrorOpen(false);
    };

  return (
    <React.Fragment>
    <Card>
      <CardContent>
      <Grid container direction="column" spacing={2} justify='center' alignItems='center'>
        <Grid item>
        <Typography variant="h4">Figma Sign on</Typography>
        </Grid>
        <Grid item>
        <Formik
          validationSchema={
            object({
            //   email: string().email('Invalid Email').required('Your email is required').min(5, 'Too short!').max(100,'Too long!'),
            //   password: string().required('Your password is required').min(2, 'Too short!').max(100, 'Too long!'),
            })
          }
        initialValues={initialValues} onSubmit={(values, formikHelpers) => {
          return new Promise(res => {
            setTimeout(() => {
              console.log(values);
              console.log("Firing API call")
              handleLogin()
              res("onSubmitHandler complete");
            }, 2000);
          })
        }}>
          {({ values, errors, isSubmitting, isValidating }) => (
            <Form>

              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="email" as={TextField} label="Email" variant='outlined' />
                  <ErrorMessage name="email" />
                </FormGroup>
              </Box>
              <Box marginBottom={2}>
                <FormGroup>
                  <Field name="password" type='password' as={TextField} label="Password" variant='outlined' />
                  <ErrorMessage name="password" />
                </FormGroup>
              </Box>

              <Button variant='contained' color='primary' type="submit" disabled={isSubmitting || isValidating}>Submit</Button>

            <pre>{JSON.stringify(errors, null, 4)}</pre>
              <pre>{JSON.stringify(values, null, 4)}</pre>
            </Form>
          )}
        </Formik>
        </Grid>
          <Grid item>
            <Typography variant='body1'>Don't have an account?</Typography>
          </Grid>
          <Grid item>
          <Link href='/Signup' passHref>
            <Button variant='outlined' color='primary'>Sign up</Button>
          </Link>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="success">
      Successfully logged in
    </Alert>
  </Snackbar>
  <Snackbar open={errorOpen} autoHideDuration={6000} onClose={handleClose}>
    <Alert onClose={handleClose} severity="error">
      Your username and/or password is incorrect
    </Alert>
  </Snackbar>

  </React.Fragment>
  );
}

export interface MyCheckboxProps extends CheckboxProps {
  name: string;
  value?: string | number;
  label?: string;
}

export function MyCheckbox(props: MyCheckboxProps) {
  const [field] = useField({
    name: props.name,
    type: 'checkbox',
    value: props.value
  });
  return (
    <FormControlLabel
      control={<Checkbox {...props} {...field} />}
      label={props.label}
    />
  );
}
