import { useNavigate, useLocation } from "react-router-dom";

function MenuItem({title, link}) {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  function handleItemClick () {
    navigate(link);
  }

  return (
    <li
      className='menu__item hover-link'
      onClick={handleItemClick}
    >
      <span className={`${location === link && 'menu__item menu__item_active'}`}>{title}</span>
    </li>
  );
}

export default MenuItem;
