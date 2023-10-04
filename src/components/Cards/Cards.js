import './Cards.scss';
import Card from './Card/Card';
import { useState, useEffect } from 'react';

function Cards({cards, type}) {
  // Брейкпоинты
  const desktop = 1280;
  const tablet = 768;
  const windowWidth = window.innerWidth;

  const [cardQty, setCardQty] = useState(0);
  const [pagination, setPagination] = useState(false);

  function checkPagination(qty) {
    const checkOverload = cardQty < cards.length;
    setPagination(checkOverload);
  }

  // чтобы не загружать слушателем Ресайза,
  // проверяю карточки 1 раз при загрузки страницы

  useEffect(() => {
    if (windowWidth >= desktop) {
      setCardQty(16);
      checkPagination(cardQty);
    }

    if (windowWidth >= tablet && windowWidth < desktop) {
      setCardQty(8);
      checkPagination(cardQty);
    }

    if (windowWidth < tablet) {
      setCardQty(5);
      checkPagination(cardQty);
    }
  }, [cardQty]);

  const movieCards = cards.slice(0,cardQty)

  return (
    <>
      <ul className={`cards ${!pagination && 'cards_notPaginated'}`}>
        {movieCards.map((item) => (
          <Card
            key={`blabla${item.cardIid}`}
            title={item.title}
            link={item.url}
            duration={item.duration}
            option={item.option}
            type={type}
          />
        ))}
      </ul>
      {pagination && (<button type='button' className='movies__button hover-button'> Ещё </button>)}
    </>
  );
}

export default Cards;

