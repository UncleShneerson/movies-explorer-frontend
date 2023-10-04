import './App.scss';
import { Routes, Route, useNavigate} from "react-router-dom";
import { useState, } from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import LayoutHeaderFooter from "../LayoutHeaderFooter/LayoutHeaderFooter";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import PageNotFound from "../PageNotFound/PageNotFound";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";

// временные данные
import {fakeData, fakeSavedData} from '../../vendor/fakeData.js';


function App() {
  const navigate = useNavigate();
  // Временные значения для этапа верстки
  const [currentUser, setCurrentUser] = useState({
    name: "Виталий",
    email: "pochta@yandex.ru",
    _id: "",
    loggedIn: false,
  });

  function signIn () {
    setCurrentUser((prevState) => ({
      ...prevState,
      loggedIn: true,
    }));
    navigate('/', {replace: true})
  }

  function signOut () {
    setCurrentUser((prevState) => ({
      ...prevState,
      loggedIn: false,
    }));
    navigate('/', {replace: true})
  }
  /////////////

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutHeaderFooter>
              <Main/>
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/movies"
          element={
            <LayoutHeaderFooter>
              <Movies cards={fakeData}/>
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <LayoutHeaderFooter>
              <Movies cards={fakeSavedData} type='saved'/>
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/signup"
          element={<SignUp/>}
        />
        <Route
          path="/signin"
          element={<SignIn signIn={ signIn } />}
        />
        <Route
          path="/profile"
          element={<Profile signOut={ signOut } />}
        />
        <Route
          path="*"
          element={<PageNotFound/>}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
