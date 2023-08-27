import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  centerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: "#fff",
  },
});

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post("/api/v1/login", values);
      console.log(response.data);
      navigate("/recording")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.centerContainer}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={classes.form}>
          <div>
            <Field as={TextField} label="Email" name="email" fullWidth />
            <ErrorMessage name="email" component="div" />
          </div>
          <div>
            <Field
              as={TextField}
              label="Password"
              type="password"
              name="password"
              fullWidth
            />
            <ErrorMessage name="password" component="div" />
          </div>
          <Button type="submit" variant="contained" color="primary">
            Log In
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default LoginForm;
