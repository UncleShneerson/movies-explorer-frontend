import './Cards.scss';
import Card from './Card/Card';
import { useState, useEffect, useCallback } from 'react';

function CardsWithPagination({
  cards = [],
  isCardsLoaded = true,
  type = '',
  onLike,
  onDisLike,
  likedList,
  pagination = false,
  onDelite,}) {

  // // Брейкпоинты
  const bpDesktop = 1229.5;
  const bpTablet = 929.5;
  const bpMob = 579.5;

  const [count, setCount] = useState(0);
  const [films, setFilms] = useState([]);

  const increment = () => {
    setCount((c) => c + 1);
  };

  const addFilms = useCallback(() => {
    const filmsArray = [...cards].splice(0,4);
    setFilms(filmsArray);
  }, [films]);

  // const windowWidth = window.innerWidth;

  // const [cardQty, setCardQty] = useState(0);
  // const [pagination, setPagination] = useState(false);

  // function checkPagination(qty) {
  //   const checkOverload = cardQty < cards.length;
  //   setPagination(checkOverload);
  // }

  // чтобы не загружать слушателем Ресайза,
  // проверяю карточки 1 раз при загрузки страницы

  // useEffect(() => {
  //   if (windowWidth >= desktop) {
  //     setCardQty(16);
  //     checkPagination(cardQty);
  //   }

  //   if (windowWidth >= tablet && windowWidth < desktop) {
  //     setCardQty(8);
  //     checkPagination(cardQty);
  //   }

  //   if (windowWidth < tablet) {
  //     setCardQty(5);
  //     checkPagination(cardQty);
  //   }
  // }, [cardQty]);

  // const movieCards = cards.slice(0,cardQty)

  return (
    <>
      {(cards.length === 0 && isCardsLoaded) && (<p className='cards__notice'>Ничего не найдено</p>)}
      <ul className={`cards ${!pagination ? 'cards_notPaginated' : ''}`}>
        {films.map((item) => (
          (<Card
            key={item.id}
            card={item}
            type={type}
            likedList={likedList}
            onLike={onLike}
            onDisLike={onDisLike}
            onDelite={onDelite}
          />)
        ))}
      </ul>
      <button type='button' className='movies__button hover-button' onClick={addFilms}> Ещё </button>
    </>
  );
}

export default CardsWithPagination;

