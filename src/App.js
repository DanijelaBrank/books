import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { usePagedBookList, deleteBook} from "./accessHooks";
import './App.css';
import BookDetails from './BookDetails';
import AllBooksPage from './AllBooksPage';
import { BrowserRouter as Router, Link as RouterLink, 
  Switch, Route, useHistory, Redirect, 
  useLocation} from 'react-router-dom';

import { Button } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { addBook } from './accessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';
import BookSearchByAuthor from './BookSearchByAuthor';
import BookSearchByGenre from './BookSearchByGenre';
//import Sidebar from './Sidebar';

import { useAuth, ProvideAuth} from './useAuth';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { Toolbar } from '@mui/material';
import {Box} from '@mui/material';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';


const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if(login){
      return <Button variant="contained" onClick={() => {
          signout( () => history.push("/"));            
      }}>Sign out</Button>
  }else{
      return <span><Button variant="contained" component={RouterLink} to="/register" sx={{marginRight: "10px"}}>Register</Button>
      <Button variant="contained" component={RouterLink} to="/login">Log in</Button></span>
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const [login, error, signin, signout] = useAuth();
  return (
      <Route
          {...rest}
          render={({location}) => {
              if(login){
                  return children;
              }else{
                  return <Redirect
                      to={{pathname: "/login", state: {from: location}}}
                  />
              }
          }}
          />
  ); 
}

const LoginBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="loginBox">
      <h3>Login Forma</h3>
      <Formik
          initialValues={{username: "", password: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password, () => {
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
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Log in
                  </Button>
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}

const RegisterBox = () => {
  const history = useHistory();
  const location = useLocation();
  const [login, error, signin, signout] = useAuth();
  
  let {from} = location.state || { from : { pathname: "/"}};
  return <div className="registerBox">
      <h3>Register Forma</h3>
      <Formik
          initialValues={{username: "", password: "",confirmPassword: ""}}
          onSubmit={(values, { setSubmitting }) => {
              signin(values.username, values.password,values.confirmPassword, () => {
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
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="password" 
                    value={values.password} 
                    label="Lozinka" 
                    onChange={handleChange}
                    type="password"                    
                  /><br/>
                  <TextField 
                    fullWidth
                    variant="outlined" 
                    name="confirmPassword" 
                    value={values.confirmPassword} 
                    label=" Provera lozinke" 
                    onChange={handleChange}
                    type="confirmPassword"                    
                  /><br/>
                  <Button 
                    fullWidth 
                    variant="contained" 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    Sign in
                  </Button>
                  <div>{(error) ? error : ""}</div>
              </form>
          )}
      </Formik>
  </div>
}

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book, login)}/>
}

const Sidebar = () => {
   return (<div>
     <List>
    <ListItem  component={RouterLink} button to='/searchByGenre/ScienceFiction'>    
      <ListItemText primary="Science Fiction" />
    </ListItem>
    <ListItem component={RouterLink} button to= '/searchByGenre/Fantasy' >      
      <ListItemText primary="Fantasy" />
    </ListItem>
    <ListItem component={RouterLink} button to= '/searchByGenre/Computing'>     
      <ListItemText primary="Computing" />
    </ListItem>
    <ListItem component={RouterLink} button to= '/searchByGenre/Mystery'>      
      <ListItemText primary="Mystery" />
    </ListItem>
    <ListItem component={RouterLink} button to= '/searchByGenre/Horror' >
      <ListItemText primary="Horror" />
    </ListItem>
    </List>
  </div>
 
  )
}

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <ProvideAuth>
        <Router>
          <Box className="main">
          <Box className="title"> * * * S V E T * K NJ I G A * * *
          </Box>
          <Toolbar className="sidebar">
          <Sidebar/>
    </Toolbar>
            <nav className="mainNav">
              <Button component={RouterLink} to="/allbooks" variant="contained" sx={{marginRight: "10px"}}>
                  Sve knjige
              </Button>
              <Button component={RouterLink} to="/searchbooks" variant="contained" sx={{marginRight: "10px"}}>
                  Pretraga
              </Button>
              <Button component={RouterLink} to="/searchByAuthor" variant="contained" sx={{marginRight: "10px"}}>
                  Izaberi autora
              </Button>
              <Button component={RouterLink} to="/book/new" variant="contained">
                Dodaj knjigu
                </Button>
              <span style={{flexGrow: 1}}/>
              <AuthButton></AuthButton>
            </nav>
            <Box className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox/>
                </Route>
                <Route path="/register">
                  <RegisterBox/>
                </Route>
                <PrivateRoute  path="/allbooks">
                  <AllBooksPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage/>
                </PrivateRoute>
                <PrivateRoute path="/searchByAuthor">
                  <BookSearchByAuthor/>
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/ScienceFiction">
                  <BookSearchByGenre genre={"Science Fiction"}/> 
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/Fantasy">
                  <BookSearchByGenre genre={"Fantasy"}/> 
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/Computing">
                  <BookSearchByGenre genre={"Computing"}/> 
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/Mystery">
                  <BookSearchByGenre genre={"Mystery"}/> 
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/Horror">
                  <BookSearchByGenre genre={"Horror"}/> 
                </PrivateRoute>
                <PrivateRoute path="/book/new">
                  <AddBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage/>
                </PrivateRoute>
                <Route path="/">
                  <h1>Dobrodosli u nas svet knjiga</h1>
                </Route>
              </Switch>
            </Box>
            
          </Box>
        </Router>
      </ProvideAuth>
    </LocalizationProvider>
  );
}

export default App;
