import React, { useState } from 'react';
import {
    BrowserRouter as Router, Switch, Route, useHistory, useLocation, Link as RouterLink, Redirect,
    useRouteMatch
} from 'react-router-dom';
import { Button, Link } from '@mui/material';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { useAuth, ProvideAuth } from './useAuth';
import { useParams } from 'react-router';

const Ponovljen = (p) => {
    console.log(p);
    let pass = p;
    let l = pass.length;
    pass = pass.split("");
    let k = 0;
    for (let i = 0; i < l; i++) {
        for (let j = i; j < l; j++) {
            if (pass[i] === pass[j]) {
                k++;
            }
            if (k > 0.25 * l) return (true);
        } k = 0;
    }
    return (false);
}





const RegisterBox = () => {
    const history = useHistory();
    const location = useLocation();
    const [login, error, signin, addNewUser, signout, isExistUsername, check] = useAuth();
    const validPass1 = new RegExp('^.*([A-Z]).*([A-Z]).*$');
    const validPass2 = new RegExp('^.*([a-z]).*([a-z]).*$');
    const validPass3 = new RegExp('^.*([0-9]).*$');
    const validPass4 = new RegExp('[*@!#%&()^~{}]+');
    let validNo = 0;
    let { from } = location.state || { from: { pathname: "/" } };
    return <div className="registerBox">
        <h3>Register Forma</h3>
        <Formik
            initialValues={{ username: "", password: "", confirmPassword: "" }}
            validate={(values) => {
                const errors = {};
                let e = "";
                if (!values.username) {
                    errors.username = "Username je obavezno polje";
                } else {
                    isExistUsername(values.username);
                    if (check) {
                        errors.username = "Username vec postoji. Izaberite drugo."
                    }
                    else {
                        if (validPass1.test(values.password))
                            validNo++;
                        else e += "Password mora da ima bar dva velika slova.";

                        if (validPass2.test(values.password))
                            validNo++;
                        else e += "Password mora da ima bar dva mala slova.";

                        if (validPass3.test(values.password))
                            validNo++;
                        else e += "Password mora da ima bar jednu cifru.";

                        if (validPass4.test(values.password))
                            validNo++;
                        else e += "Password mora da ima bar jedan specijalni karakter.";

                        if (values.password.length >= 12)
                            validNo++;
                        else e += "Password mora da ima bar 12 karaktera.";

                        if (!Ponovljen(values.password))
                            validNo++;
                        else e += "Previse ponavljanja istog karaktera u password-u.";
                        
                    }}
                    if ((validNo) < 4) errors.password = "Lozinka nije dovoljno jaka. " + e;
                if (values.password != values.confirmPassword) {
                    errors.confirmPassword = "Password i ConfirmPassword moraju da budu iste."
                }
                return errors
            }
            }
            onSubmit={(values, { setSubmitting }) => {
                addNewUser(values.username, values.password, () => {
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
                        onBlur={handleBlur}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}

                    /><br />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="password"
                        value={values.password}
                        label="Lozinka"
                        onChange={handleChange}
                        type="password"
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}

                    /><br />
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        label=" Provera lozinke"
                        onChange={handleChange}
                        type="confirmPassword"
                        onBlur={handleBlur}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}

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

export default RegisterBox;

