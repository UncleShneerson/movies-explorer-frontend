import { useState, useEffect, useContext } from "react";
import Section from "../Section/Section";
import SearchBar from '../SearchBar/SearchBar';
import Divider from '../Divider/Divider';
import Cards from "../Cards/Cards";
import useSearch from "../../hooks/useSearch";
import Preloader from "../Preloader/Preloader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Movies({
  likedList,
  onLoad,
  apiLoading = false,
  apiErrors = '',
  onLike,
  onDisLike,
}) {
  /* --- КОНСТАНТЫ --- */
  // добавляем id для защиты локальных данных
  const { _id } = useContext(CurrentUserContext);
  const [beatMovies, setBeatMovies] = useState([]);
  const [isShort, setIsShort] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState('');

  // pagination
  const [films, setFilms] = useState([]);
  // Устройства 'desk' 'lapt' 'tabl' 'mob'
  const [deviceType, setDeviceType] = useState('');
  const [count, setCount] = useState(0);
  const [isBtnActive, setIsBtnActive] = useState(false);

  // Брейкпоинты
  // Десктоп более 1229.5
  const bpLaptop = 1229.5;
  const bpTablet = 929.5;
  const bpMob = 579.5;

  const {
    onSearchSubmit,
    filteredFilms,
    setFilmsArray,
    setFilteredFilms,
  } = useSearch({mainArray: beatMovies, isShort: isShort, preload: false});

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
      setSearchInputValue(inputValue);
    }
  }, [_id]);

  // window resizer
  useEffect(() => {
    setDevice(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  // pagination
  useEffect(() => {
    paginatedFilms();
  }, [deviceType, count, filteredFilms]);

  useEffect(() => {
    if (filteredFilms.length > films.length) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }, [filteredFilms, films]);


  /* --- ФУНКЦИИ --- */
  async function getMovies() {
    try {
      const allMovies = await onLoad();
      setBeatMovies(allMovies);
      return allMovies;
    } catch (error) {
      console.log(error)
    }
  }

  function setDevice(windowWidth) {
    if (windowWidth > bpLaptop) {
      setDeviceType ('desk');
      return
    }
    if (windowWidth > bpTablet ) {
      setDeviceType ('lapt');
      return
    }
    if (windowWidth > bpMob ) {
      setDeviceType ('tabl');
      return
    } else {
      setDeviceType ('mob');
    }
  }

  // начальное количество карточек
  function setStartNumber () {
    if (deviceType === 'desk') {
      return { startQty: 16, loadQty: 4};
    }
    if (deviceType === 'lapt') {
      return { startQty: 12, loadQty: 3};
    }
    if (deviceType === 'tabl') {
      return { startQty: 8, loadQty: 2};
    }
    if (deviceType === 'mob') {
      return { startQty: 5, loadQty: 2};
    } else {
      return { startQty: 0, loadQty: 0};
    }
  }

  function paginatedFilms () {
    const {startQty, loadQty} = setStartNumber();
    const addedQty = loadQty * count;
    const finalQty = startQty + addedQty;
    const totalQty = filteredFilms.length;

    let checkedQty;
    finalQty > totalQty
      ? checkedQty = totalQty
      : checkedQty = finalQty;
    const filmArray = [...filteredFilms].slice(0, checkedQty)
    setFilms(filmArray);
  }

  /* --- ОБРАБОТЧИКИ --- */
  function handeOptionChange () {
    setIsShort(!isShort)
  }

  function handleResize () {
    setTimeout(() => {
      setDevice(window.innerWidth)
    }, 1000);
  }

  function handleMoreClick () {
    setCount((c) => c + 1);
  };

  async function handleSubmit (inValue) {
    if (!isLoaded) {
      try {
        const movieList = await getMovies();
        setBeatMovies(movieList);
        setIsLoaded(true);
        onSearchSubmit(inValue, movieList);
      } catch (error) {
        console.log(error)
      }
    } else {
      setCount(0);
      onSearchSubmit(inValue, beatMovies);
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
          searchInputValue={searchInputValue}
        />
        <Divider/>
        { apiLoading
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
