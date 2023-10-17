import './Menu.scss';
import account_ico from '../../images/account_ico.svg'
import { useNavigate } from 'react-router-dom';
import MenuItem from './MenuItem/MenuItem';


function Menu({type = 'all',}) {
  const navigate = useNavigate();

  const menuItems = [
    { title: 'Главная',
      link: '/'
    },
    {
      title: 'Фильмы',
      link: '/movies'
    },
    {
      title: 'Сохраненные фильмы',
      link: '/saved-movies'
    }
  ];

  let actualItems;
  type === 'desk' ? actualItems = menuItems.slice(1,) : actualItems = menuItems;

  function handleProfileClick () {
    navigate('/profile');
  }

  return (
    <div className={`menu menu_type_${type}`}>
      <menu className='menu__items'>
        {
          actualItems.map((item) => (
            <MenuItem title={item.title} link={item.link} key={item.title}/>
          ))
        }
      </menu>
      <button className='menu__acc-btn hover-button' onClick={handleProfileClick}>
            <img src={account_ico} alt="Smile_logo" className="menu__acc-ico" />
            Аккаунт
      </button>
    </div>
  );
}

export default Menu;
