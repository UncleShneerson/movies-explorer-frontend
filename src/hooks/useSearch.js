import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function useSearch({mainArray, isShort, preload = true}) {
  const { _id } = useContext(CurrentUserContext);

  // сохраняем базовые фильмы
  // все фильтрованые фильмы
  const [filmArray, setFilmsArray] = useState([]);
  // фильтр по переключателя
  const [filteredFilms, setFilteredFilms] = useState([]);

  // не смог избавиться от замедленности при useState
  // вынес в переменную
  let inputValue = '';

  // Сохраняем исходный пассив в фильтрованные фильмы
  // если отображение сразу
  useEffect(() => {
    if (preload) {
      setFilmsArray(mainArray);
    } else {
      return
    }
  }, []);

  // фильтрация по опции
  useEffect(() => {
    if (!isShort) {
      setFilteredFilms(filmArray);
    } else {
      setFilteredFilms(createShortArray(filmArray));
    }
  }, [isShort, filmArray]);

  // ФИЛЬТРАЦИЯ МАССИВА
  async function onSearchSubmit(inValue, baseArray) {
    const array = await createArray(inValue, baseArray)
    setFilmsArray (array);
    setFilteredFilms (array);
    setLocalStorage(array, inValue, isShort);
  }

  async function createArray(inValue, baseArray) {
    inputValue = inValue
    return baseArray.filter(checkValues);
  }

   // ПРОВЕРКА ОБЪЕКТА В МАССИВЕ
   function checkValues(objectItem) {
    // деструктуризируем данные (без служебных)
    const {
      // country = '',
      // director = '',
      // description = '',
      year ='',
      nameRU = '',
      nameEN = ''
    } = objectItem;

    // oпределяем, по каким полям будем искать
    const objectForSearch = { nameRU, nameEN, year, };

    // проверяем все значение на соответствие запросу
    const regEx = new RegExp (inputValue, 'gi');
    return Object.values(objectForSearch).some(i => regEx.test(i));
  }

  function createShortArray(array) {
    const shortArray = array.filter(i => i.duration < 40)
    return shortArray;
  }

  function deleteFromArray (card) {
    const newFilteredArray = filteredFilms.filter(item => item !== card);
    setFilteredFilms(newFilteredArray);
  }

  async function setLocalStorage ( array, inputValue, isShort, ) {
    let newArray;
    isShort ? newArray = await createShortArray(array) : newArray = array;

    localStorage.setItem('searchdata', JSON.stringify({
      arrayValue: newArray,
      inputValue: inputValue,
      isShortValue: isShort,
      userId: _id,
    }));
  }

  return {
    filteredFilms,
    setFilteredFilms,
    setFilmsArray,
    onSearchSubmit,
    deleteFromArray,
  };
};

export default useSearch;
