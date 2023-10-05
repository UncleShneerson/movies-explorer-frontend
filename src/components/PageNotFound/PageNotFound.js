import { useNavigate, Link } from 'react-router-dom';
import './PageNotFound.scss';

function PageNotFound () {
  const navigate = useNavigate();

  function handleLinkClick () {
    navigate(-1);
  }

  return(
    <main>
      <section className='not-found'>
        <h1 className='not-found__title'>
          404
        </h1>
        <p className='not-found__text'>
          Страница не найдена
        </p>
        <a className='not-found__link hover-link' onClick={handleLinkClick}>
          Назад
        </a>
      </section>
    </main>
  )
}

export default PageNotFound;
