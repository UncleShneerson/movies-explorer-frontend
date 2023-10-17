import './LinkOuter.scss';
import linkIcon from '../../images/link_icon.svg';

function LinkOuter({title, link}) {
  return (
    <div className="link-outer">
      <a className='link-outer__link hover-link' href={link} target='_blank' rel='noreferrer'>
        <p className="link-outer__title">{title}</p>
      </a>
      <a className='link-outer__link hover-link' href={link} target='_blank' rel='noreferrer'>
        <img src={linkIcon} className="link-outer__icon" alt='Переход по ссылке'/>
      </a>
    </div>
  );
}

export default LinkOuter;
