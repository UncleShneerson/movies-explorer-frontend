import { useState, useEffect, useContext } from "react";
import Section from "../Section/Section";
import SearchBar from '../SearchBar/SearchBar';
import Divider from '../Divider/Divider';
import Cards from "../Cards/Cards";
import useSearch from "../../hooks/useSearch";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import usePagination from "../../hooks/usePagination";

function Movies({
  likedList,
  onLoad,
  isLoading = false,
  apiErrors = '',
  onLike,
  onDisLike,
  beatMovies = [],
  isLoaded = false,
}) {

  /* --- КОНСТАНТЫ --- */
  // добавляем id для защиты локальных данных
  const { _id } = useContext(CurrentUserContext);
  const [isShort, setIsShort] = useState(false);
  const [searchLocalValue, setSearchLocalValue] = useState('');

  // Поиск
  const {
    onSearchSubmit,
    filteredFilms,
    setFilmsArray,
    setFilteredFilms,
  } = useSearch({mainArray: beatMovies, isShort: isShort, preload: false, isLocal: true});

  // pagination
  const {
    countReset,
    films,
    handleMoreClick,
    isBtnActive
  } = usePagination(filteredFilms);

  /* --- ЭФФЕКТЫ --- */
  // localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('searchdata'));
    // защита от чужих данных
    if (data !== null && data.userId === _id) {
      // установка варифицированных данных
      const { arrayValue, inputValue, isShortValue } = data;
      setIsShort(isShortValue);
      setFilmsArray(arrayValue);
      setFilteredFilms(arrayValue);
      setSearchLocalValue(inputValue);
    }
  }, [ _id]);



  /* --- ФУНКЦИИ --- */
  async function getMovies() {
    try {
      const movies = await onLoad();
      return movies;
    } catch (error) {
      console.log(error)
    }
  }

   /* --- ОБРАБОТЧИКИ --- */
  function handeOptionChange () {
    setIsShort(!isShort)
  }

  async function handleSubmit (value) {
    if (!isLoaded) {
      try {
        const movieList = await getMovies();
        onSearchSubmit(value, movieList);
      } catch (error) {
        console.log(error)
      }
    } else {
      countReset();
      onSearchSubmit(value, beatMovies);
    }
  }

  return (
    <main>
      <Section
        type='inner'
        customClass='movies'
        aria='Поиск фильмов'
      >
        <SearchBar
          onSubmit={handleSubmit}
          onOptionChange={handeOptionChange}
          option={isShort}
          inputValue={searchLocalValue}
          isLocalSave={true}
          isLoading={isLoading}
        />
        <Divider/>
        { isLoading
          ? (<Preloader type='inner'/>)
          : (<Cards
              cards={films}
              isCardsLoaded={isLoaded}
              likedList={likedList}
              onLike={onLike}
              onDisLike={onDisLike}
              isBtnActive={isBtnActive}
              onMoreClick={handleMoreClick}
              apiErrors={apiErrors}
              pagination='true'
            />)
        }
      </Section>
    </main>
  );
}

export default Movies;
