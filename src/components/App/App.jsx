import "./App.scss";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import LayoutHeaderFooter from "../LayoutHeaderFooter/LayoutHeaderFooter";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import MoviesSaved from "../MoviesSaved/MoviesSaved";
import PageNotFound from "../PageNotFound/PageNotFound";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import Profile from "../Profile/Profile";


function App() {
  const navigate = useNavigate();

  /* --- ПЕРЕМЕННЫЕ --- */
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // массив сохраненных пользователем фильмов
  const [savedMovies, setSavedMovies] = useState([]);
  const [likedIdList, setLikedIdList] = useState([]);

  // ответы ошибок сервера
  const [apiError, setApiError] = useState('');

  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    _id: "",
    loggedIn: false,
  });

  // Переключение значения авторизации (для удобства)
  function setLoggedIn(value) {
    setCurrentUser((prevState) => ({
      ...prevState,
      loggedIn: value,
    }));
  }

  /* --- ЭФФЕКТЫ --- */
  // ПРОВЕРЯЕМ ТОКЕН
  useEffect(() => {
    checkToken();
  }, []);

  // ПОЛУЧАЕМ ДАННЫЕ ПОСЛЕ АВТОРИЗАЦИИ
  useEffect(() => {
    if (currentUser.loggedIn) {
      getAllInfo();
    } else {
      return;
    }
  }, [currentUser.loggedIn]);

  /* --- ПОЛУЧЕНИЕ ИНФОРМАЦИИ --- */
  // ВСЯ ИНФОРМАЦИЯ
  async function getAllInfo () {
    try {
      setIsAppLoaded(false);
      await Promise.all([
        getUser(),
        getSavedMovies(),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsAppLoaded(true);
    }
  }

  // ПОЛУЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
  async function checkToken() {
    try {
      const { _id } = await mainApi.getUserInfo();
      if (_id) {
        setLoggedIn(true);
      }
      return
    } catch (error) {
      console.log('Пожалуйста авторизируйтесь')
    } finally {
      setIsAppLoaded(true);
    }
  }

  async function getUser() {
    try {
      const { _id, name, email } = await mainApi.getUserInfo();
      setCurrentUser((prevState) => ({
        ...prevState,
        _id: _id,
        name: name,
        email: email,
        loggedIn: true,
      }));
    } catch (error) {
      console.log(error);
    }
  }

  // ВСЕ ФИЛЬМЫ С ВНЕШНЕГО АПИ
  async function getFilmList() {
    try {
      setIsLoading(true);
      setApiError('');
      const array = await moviesApi.getMovies();
      return array;
    } catch (error) {
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // СОХРАНЕННЫЕ ФИЛЬМЫ
  async function getSavedMovies () {
    try {
      const movies = await mainApi.getMovies();
      setSavedMovies(movies);
      createLikedList(movies);
    } catch (error) {
      console.log(error);
    }
  }

  // СОЗДАЕТ СПИСОК СОХРАНЕННЫХ ID (для удобства)
  async function createLikedList (movies) {
    const list = await movies.map(item => {
        return item.id;
    })
    setLikedIdList(list);
  }

  /* --- ПОЛЬЗОВАТЕЛЬ --- */
  // РЕГИСТРАЦИЯ
  async function handleSignUp(values) {
    try {
      return await mainApi.signUp(values);
    } catch (error) {
      return error;
    }
  }

  // АВТОРИЗАЦИЯ
  async function handleSignIn(values) {
    try {
      setIsLoading(true);
      setApiError("");
      await mainApi.signIn(values);
      setLoggedIn(true);
      navigate("/movies");
    } catch (error) {
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // АВТОМАТИЧЕСКАЯ АВТОРИЗАЦИЯ ПОСЛЕ РЕГИСТРАЦИИ
  async function signUpAndSignIn(values) {
    try {
      setIsLoading(true);
      const result = await handleSignUp(values);
      if (result._id !== undefined) {
        handleSignIn(values);
      } else {
        throw result;
      }
    } catch (error) {
      setApiError(error);
    } finally {
      setIsLoading(false);
    }
  }

  // РЕДАКТИРОВАНИЕ ПРОФАЙЛА
  async function handleEditProfile(values) {
    const { name, email } = values;

    // если данные не изменились,
    // заблокировал запрос, а не кнопку.
    // в этом случае - не надо перегружать страницу, если
    // пользователь нажал "редактировать", но передумал вносить правки

    if (name === currentUser.name && email === currentUser.email) {
      return '';
    } else {

      // если обновил данные
      try {
        setIsLoading(true);
        setApiError("");
        const newData = await mainApi.editUserInfo(values);
        setCurrentUser((prevState) => ({
          ...prevState,
          name: newData.name,
          email: newData.email,
        }));
        return 'Данные обновлены';
      } catch (error) {
        setApiError(error);
        return '';
      } finally {
        setIsLoading(false);
      }
    }
  }

  // ВЫХОД ПОЛЬЗОВАТЕЛЯ
  async function handleSignOut() {
    try {
      await mainApi.signOut();
      setCurrentUser({
        name: "",
        email: "",
        _id: "",
        loggedIn: false,
      });
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  /* --- ФИЛЬМЫ --- */

  // УСТАНОВКА ЛАЙКА
  async function cardLike(card) {
    try {
      const newCard = await mainApi.saveMovie(card);
      addMovieToArrays(newCard);
      return newCard;
    } catch (error) {
      console.log(error);
    }
  }

  // УДАЛЕНИЕ ЛАЙКА
  async function cardDisLike(movieOuterId) {
    try {
      await mainApi.deleteMovie(movieOuterId);
      deleteMovieFromArrays(movieOuterId);
    } catch (error) {
      console.log(error)
    }
  }

  // ДОБАВЛЕНИЕ КАРТОЧКИ
  async function addMovieToArrays (card) {
    // Обрабатываем массивы избегая доп. запросов
    const newSavedMovies = [...savedMovies, card];
    const newIdList = [...likedIdList, card.id];

    // обновляем значения
    setSavedMovies(newSavedMovies);
    setLikedIdList(newIdList);
  }

  // УДАЛЕНИЕ КАРТОЧКИ
  async function deleteMovieFromArrays (movieId) {
    // Обрабатываем массивы избегая доп. запросов
    const newSavedMovies = savedMovies.filter(item => item.id !== movieId);
    const newIdList = likedIdList.filter(item => item !== movieId);

    // обновляем значения
    setSavedMovies(newSavedMovies);
    setLikedIdList(newIdList);
  }

  return !isAppLoaded ? (
    <Preloader />
  ) : (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutHeaderFooter>
              <Main />
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/movies"
          element={
            <LayoutHeaderFooter>
              <Movies
                onLoad={getFilmList}
                apiLoading={isLoading}
                apiErrors={apiError}
                likedList={likedIdList}
                onLike={cardLike}
                onDisLike={cardDisLike}
              />
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/saved-movies"
          element={
            <LayoutHeaderFooter>
              <MoviesSaved
                cards={savedMovies}
                likedList={likedIdList}
                onLike={cardLike}
                onDisLike={cardDisLike}
              />
            </LayoutHeaderFooter>
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              onSubmit={signUpAndSignIn}
              apiErrors={apiError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn
              onSubmit={handleSignIn}
              apiErrors={apiError}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              onSignOut={handleSignOut}
              onSubmit={handleEditProfile}
              apiErrors={apiError}
              isLoading={isLoading}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
