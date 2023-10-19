import { useNavigate } from 'react-router-dom';
import logotype from '../../images/logotype.svg';
import './Logo.scss'

function Logo() {
  const navigate = useNavigate();

  function handleLogoClick () {
    navigate('/');
  }

  return (
    <button
      className='logo hover-button'
      style={{backgroundImage: `url(${logotype})`}}
      aria-label="На главную"
      onClick={handleLogoClick}
    />
  );
}

export default Logo;
