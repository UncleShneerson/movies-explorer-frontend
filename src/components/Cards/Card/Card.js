import './Card.scss';
import deleteIcon from '../../../images/delete_icon.svg';

function Card({link, title, duration, option, type }) {
  return (
    <li className='card'>
      <img
        className='card__image'
        alt={title}
        src={link}
      />
      <div className='card__info'>
        <h2 className='card__title'>{title}</h2>
        {type === 'saved'
          ? <img src={deleteIcon} alt='Удалить' className='card__delete hover-link'/>
          : <div className={option === 'true' ? 'card__option card__option_active' : 'card__option'}/>
        }
      </div>
      <p className='card__duration'>{duration}</p>
    </li>

  );
}

export default Card;

