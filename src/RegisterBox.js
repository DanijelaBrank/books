import React, { useState } from 'react';
import {
    BrowserRouter as Router, Switch, Route, useHistory, useLocation, Link as RouterLink, Redirect,
    useRouteMatch
} from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import newUser, { addNewUser } from './accessHooks';
import { useAuth,ProvideAuth } from './useAuth';

const RegisterBox = () => {
    const history = useHistory();
    const location = useLocation();
    
    const [login, error, signin, addNewUser, signout, isExistUsername, check] = useAuth();
    let { from } = location.state || { from: { pathname: "/" } };
    return <div className="registerBox">
        <h3>Register Forma</h3>
        <Formik
            initialValues={{ username: "", password: "", confirmPassword: "" }}
            validate={(values) => {
                const errors = {};
                if (!values.username) {
                    errors.username = "Username je obavezno polje";
                }
                isExistUsername(values.username);
                if (check) {
                    errors.username = "Username vec postoji. Izaberite drugo."
                }
                if (values.password != values.confirmPassword) {
                    errors.password = "Password i ConfirmPassword moraju da budu iste."
                }

            }}
            onSubmit={(values, { setSubmitting }) => {
                addNewUser(values.username, values.password, values.confirmPassword, () => {
                    setSubmitting(false);
                }, () => {
                    history.replace(from);
                });
            }}

        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                setFieldTouched,
                validateField,
                isSubmitting
            }) => (
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="username"
                        value={values.username}
                        label="Korisničko ime"
                        onChange={handleChange}
                    /><br />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={values.password}
                        label="Lozinka"
                        onChange={handleChange}
                        type="password"
                    /><br />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        label=" Provera lozinke"
                        onChange={handleChange}
                        type="confirmPassword"
                    /><br />
                    <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        Register
                    </Button>
                    <div>{(error) ? error : ""}</div>
                </form>
            )}
        </Formik>
    </div>
}

    // RegisterBox.defaultProps = {
    //     newUser: { id: null, username: "", password: "", confirmPassword: "" }
    // }
    export default RegisterBox;

