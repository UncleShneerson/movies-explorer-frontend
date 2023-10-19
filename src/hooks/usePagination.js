import {useState, useEffect} from "react";
import { brakePoints, startQty, loadQty, } from "../utils/configs/filmConfig";

function usePagination(fullMovieArray) {
  // КОНСТАНТЫ
  const [deviceType, setDeviceType] = useState('');
  const [count, setCount] = useState(0);
  const [isBtnActive, setIsBtnActive] = useState(false);
  const [films, setFilms] = useState([]);

  // ЭФФЕКТЫ
  // window resizer
  useEffect(() => {
    setDevice(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  useEffect(() => {
    paginatedFilms();
  }, [deviceType, count, fullMovieArray]);


  useEffect(() => {
    checkBtnIsActive();
  }, [fullMovieArray, films]);


  // ФУНКЦИИ
  function setDevice(windowWidth) {
    const {laptop, tablet, mobile } = brakePoints;
    if (windowWidth > laptop) {
      setDeviceType ('desk');
      return
    }
    if (windowWidth > tablet ) {
      setDeviceType ('lapt');
      return
    }
    if (windowWidth > mobile ) {
      setDeviceType ('tabl');
      return
    } else {
      setDeviceType ('mob');
    }
  }

  // начальное количество карточек
  function setStartNumber () {
    if (deviceType === 'desk') {
      return { startQty: startQty.desktop, loadQty: loadQty.desktop};
    }
    if (deviceType === 'lapt') {
      return { startQty: startQty.laptop, loadQty: loadQty.laptop};
    }
    if (deviceType === 'tabl') {
      return { startQty: startQty.tablet, loadQty: loadQty.tablet};
    }
    if (deviceType === 'mob') {
      return { startQty: startQty.mobile, loadQty: loadQty.mobile};
    } else {
      return { startQty: 0, loadQty: 0};
    }
  }

  function paginatedFilms () {
    const {startQty, loadQty} = setStartNumber();
    const addedQty = loadQty * count;
    const finalQty = startQty + addedQty;
    const totalQty = fullMovieArray.length;

    let checkedQty;
    finalQty > totalQty
      ? checkedQty = totalQty
      : checkedQty = finalQty;
    const filmArray = [...fullMovieArray].slice(0, checkedQty)
    setFilms(filmArray);
  }

  function checkBtnIsActive () {
    if (fullMovieArray.length > films.length) {
      setIsBtnActive(true);
    } else {
      setIsBtnActive(false);
    }
  }

  function handleResize () {
    setTimeout(() => {
      setDevice(window.innerWidth)
    }, 1000);
  }

  function handleMoreClick () {
    setCount((c) => c + 1);
  };

  function countReset () {
    setCount(0);
  };

  return {
    countReset,
    films,
    handleMoreClick,
    isBtnActive,
  };
}

export default usePagination;
