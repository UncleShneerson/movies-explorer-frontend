import './NavBarItem.scss';
import { useLocation } from 'react-router-dom';

function NavBarItem({title, link}) {
  const location = useLocation().pathname;
  return (
        <a href={`${location}#${link}`} className='navbar__item hover-link'>{title}</a>
  );
}

export default NavBarItem;
