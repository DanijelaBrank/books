import AdapterLuxon from '@mui/lab/AdapterLuxon';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { usePagedBookList, deleteBook, newUser } from "./accessHooks";
import './App.css';
import BookDetails from './BookDetails';
import AllBooksPage from './AllBooksPage';
import {
  BrowserRouter as Router, Link as RouterLink,
  Switch, Route, useHistory, Redirect,
  useLocation
} from 'react-router-dom';

import { Button } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { addBook,addNewUser } from './accessHooks';
import BookDetailsPage from './BookDetailsPage';
import BookSearchPage from './BookSearchPage';
import BookSearchByAuthor from './BookSearchByAuthor';
import BookSearchByGenre from './BookSearchByGenre';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import { useAuth, ProvideAuth } from './useAuth';
import { Formik } from 'formik';
import { TextField } from '@mui/material';
import { Toolbar } from '@mui/material';
import { Box } from '@mui/material';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useParams } from 'react-router';


const AuthButton = () => {
  const [login, error, signin, signout] = useAuth();
  const history = useHistory();
  if (login) {
    return <Button variant="contained" onClick={() => {
      signout(() => history.push("/"));
    }}>Sign out</Button>
  } else {
    return <span><Button variant="contained" component={RouterLink} to="/register" sx={{ marginRight: "10px" }}>Register</Button>
      <Button variant="contained" component={RouterLink} to="/login">Log in</Button></span>
  }
}

const PrivateRoute = ({ children, ...rest }) => {
  const [login, error, signin, signout] = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (login) {
          return children;
        } else {
          return <Redirect
            to={{ pathname: "/login", state: { from: location } }}
          />
        }
      }}
    />
  );
}


// const AddNewUserPage = () => {  
//   return <RegisterBox  action={(newUser) => addNewUser(newUser)}/>
  
// }

const AddBookPage = () => {
  const [login] = useAuth();
  return <BookDetails startingMode="create" action={(book) => addBook(book, login)}/>
}

const Sidebar = () => {
  const genres = ["Science Fiction", "Fantasy", "Computing", "Mystery", "Horror"];
  const listGenre = genres.map((genre) =>
    <ListItem key={genre} component={RouterLink} button to={`/searchByGenre/${genre}`}>
      <ListItemText primary={genre} />
    </ListItem>);
  return (<div>
    <List variant="contained">
      {listGenre}
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
              <Sidebar />
            </Toolbar>
            <nav className="mainNav">
              <Button component={RouterLink} to="/allbooks" variant="contained" sx={{ marginRight: "10px" }}>
                Sve knjige
              </Button>
              <Button component={RouterLink} to="/searchbooks" variant="contained" sx={{ marginRight: "10px" }}>
                Pretraga
              </Button>
              <Button component={RouterLink} to="/searchByAuthor" variant="contained" sx={{ marginRight: "10px" }}>
                Izaberi autora
              </Button>
              <Button component={RouterLink} to="/book/new" variant="contained">
                Dodaj knjigu
              </Button>
              <span style={{ flexGrow: 1 }} />
              <AuthButton></AuthButton>
            </nav>
            <Box className="mainContent">
              <Switch>
                <Route path="/login">
                  <LoginBox />
                </Route>
                <Route path="/register">
                  <RegisterBox />
                </Route>
                <PrivateRoute path="/allbooks">
                  <AllBooksPage />
                </PrivateRoute>
                <PrivateRoute path="/searchbooks">
                  <BookSearchPage />
                </PrivateRoute>
                <PrivateRoute path="/searchByAuthor">
                  <BookSearchByAuthor />
                </PrivateRoute>
                <PrivateRoute path="/searchByGenre/:genre">
                  <BookSearchByGenre/> 
                </PrivateRoute>                
                <PrivateRoute path="/book/new">
                  <AddBookPage/>
                </PrivateRoute>
                <PrivateRoute path="/book/:cid/:operation">
                  <BookDetailsPage />
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
