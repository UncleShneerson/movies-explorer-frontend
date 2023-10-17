import "./Card.scss";
import deleteIcon from "../../../images/delete_icon.svg";
import { useEffect, useState, } from "react";
import { useNavigate, } from "react-router-dom";

function Card({ card, type = "", onLike, onDisLike, onDelite, likedList, }) {
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const [isError, setIsError] = useState(false);

  // Переводим продолжинельность в часы и минуты
  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - 60 * hours;
  const formatDuration =
    hours > 0 ? `${hours}ч. ${minutes}мин.` : `${minutes}мин.`;

  // Избавляемся от разницы в URL
  let imageUrl
  if(type === "saved") {
      imageUrl = card.url;
  } else {
      const { image } = card;
      imageUrl = `https://api.nomoreparties.co${image.url}`;
  }

  /* --- ЭФФЕКТЫ --- */
  // Проверяем статус лайка при монтировании или изменении списка
  useEffect(() => {
    checkIsLiked ();
  }, [likedList]);

  async function checkIsLiked () {
    const check = await likedList.some(item => {
      return item === card.id;
    });
    setIsLiked(check);
  }

  // лайк-дислайк
  async function handleLikeClick() {
    !isLiked ? setLike() : deleteLike();
  }

  async function setLike() {
    // Установка лайка
    try {
      const newCard = await onLike({
        id:           card.id,
        country:      card.country,
        director:     card.director,
        duration:     card.duration,
        year:         card.year,
        description:  card.description,
        image:        imageUrl,
        trailerLink:  card.trailerLink,
        url:          imageUrl,
        nameRU:       card.nameRU,
        nameEN:       card.nameEN,
      })
      // Меняем значок
      if (newCard._id) {
        setIsLiked(true);
      }
    } catch (error) {
      // Красим при ошибке
      setIsError(true);
    }
  }

  async function deleteLike() {
    // Удаляем лайк
    try {
      await onDisLike(card.id);
      // Меняем значок
      setIsLiked(false);
    } catch (error) {
      // Красим при ошибке
      setIsError(true);
    };
  }

  async function deleteCard() {
    // Удаляем лайк
    try {
      await deleteLike(card.id);
      onDelite(card);
    } catch (error) {
      // Красим при ошибке
      setIsError(true);
    };
  }

  function handleCardClick (e) {
    if (e.target.ariaLabel === 'Лайк' || e.target.alt === 'Удалить') {
      return
    };
    openInNewTab (card.trailerLink);
  }

  function openInNewTab (url) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <li className="card hover-button" onClick={handleCardClick}>
      <img
        className="card__image"
        alt={card.nameRU}
        src={imageUrl}
      />
      <div className="card__info">
        <h2 className="card__title">{card.nameRU}</h2>
        {type === "saved" ? (
          <img
            src={deleteIcon}
            alt="Удалить"
            className="card__delete hover-link"
            onClick={deleteCard}
          />
        ) : (
          <div
            className={
              isLiked
                ? `card__option card__option_active ${isError && 'card__option_error'}`
                : `card__option ${isError && 'card__option_error'}`
            }
            aria-label="Лайк"
            onClick={handleLikeClick}
          />
        )}
      </div>
      <p className="card__duration">{formatDuration}</p>
    </li>
  );
}

export default Card;
