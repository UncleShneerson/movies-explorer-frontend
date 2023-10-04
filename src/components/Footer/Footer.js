import './Footer.scss';
const thisYear = new Date().getFullYear();

function Footer() {
  return (
    <footer className='content content_size_l footer'>
      <p className='footer__about'>
        Учебный проект Яндекс.Практикум&nbsp;х&nbsp;BeatFilm.
      </p>
      <div className='footer__data'>
        <p className='footer__copy'>
          © {thisYear}
        </p>
        <ul className='footer__menu'>
          <li className='footer__menu-item'>
            <a
              className='footer__menu-link hover-link'
              href='https://practicum.yandex.ru/'
              target='_blank' rel='noreferrer'
            >
              Яндекс.Практикум
            </a>
          </li>
          <li className='footer__menu-item'>
            <a
              className='footer__menu-link hover-link'
              href='https://github.com/UncleShneerson/'
              target='_blank' rel='noreferrer'
            >
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
