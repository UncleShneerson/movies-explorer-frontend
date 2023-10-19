import './Cards.scss';
import Card from './Card/Card';

function Cards({
  apiErrors = '',
  cards = [],
  isCardsLoaded = true,
  type = '',
  onLike,
  onMoreClick,
  onDisLike,
  likedList,
  pagination = false,
  isBtnActive = true,
  onDelite,}) {

  function handleMoreClick () {
    onMoreClick();
  };

  return apiErrors !== '' ? (<p className='cards__notice cards__notice_error'>{apiErrors}</p>) : (
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
      {pagination && cards.length !== 0 && isBtnActive && (
        <button
          type='button'
          className={`movies__button hover-button`}
          onClick={handleMoreClick}
        >
          Ещё
        </button>
      )}
    </>
  );
}

export default Cards;

