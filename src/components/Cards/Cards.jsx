import './Cards.scss';
import Card from './Card/Card';

function Cards({
  cards = [],
  isCardsLoaded = true,
  type = '',
  onLike,
  onMoreClick,
  onDisLike,
  likedList,
  pagination = true,
  isBtnActive = true,
  onDelite,}) {

  function handleMoreClick () {
    onMoreClick();
  }

  return (
    <>
      {(cards.length === 0 && isCardsLoaded) && (<p className='cards__notice'>Ничего не найдено</p>)}
      <ul className={`cards ${!pagination ? 'cards_notPaginated' : ''}`}>
        {cards.map((item) => (
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
      {pagination && (
        <button
          type='button'
          className={`movies__button ${isBtnActive ? 'hover-button' : 'movies__button_inactiv'}`}
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default Cards;

