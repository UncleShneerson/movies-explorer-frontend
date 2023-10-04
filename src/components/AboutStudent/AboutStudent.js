import './AboutStudent.scss';
import studentPhoto from '../../images/student.jpg';
import LinkOuter from '../LinkOuter/LinkOuter';

function AboutStudent() {
  return (
    <>
      {/* Пока не менял данные, чтобы было легче оценить верстку */}
      <div className='student'>
        <div className='student__info'>
          <h3 className='student__name'>
            Виталий
          </h3>
          <p className='student__description'>
            Фронтенд-разработчик, 30&nbsp;лет
          </p>
          <p className='student__about'>
            Я&nbsp;родился и&nbsp;живу в&nbsp;Саратове, закончил факультет экономики СГУ.
            У&nbsp;меня есть жена и&nbsp;дочь. Я&nbsp;люблю слушать музыку, а&nbsp;ещё увлекаюсь бегом.
            Недавно начал кодить. С&nbsp;2015 года работал в&nbsp;компании &laquo;СКБ Контур&raquo;.
            После того, как прошёл курс по&nbsp;веб-разработке, начал заниматься фриланс-заказами
            и&nbsp;ушёл с&nbsp;постоянной работы.
          </p>
          <a className='student__link' href='https://github.com/UncleShneerson/' target='_blank' rel="noreferrer">
            Github
          </a>
        </div>
        <img className='student__photo' src={studentPhoto} alt='Фото студента'/>
      </div>
      <div className='student__portfolio'>
        <p className='student__portfolio-title'>
          Портфолио
        </p>
        <LinkOuter
          title='Статичный сайт'
          link='https://github.com/UncleShneerson/how-to-learn'
        />
        <LinkOuter
          title='Адаптивный сайт'
          link='https://github.com/UncleShneerson/russian-travel'
        />
        <LinkOuter
          title='Одностраничное приложение'
          link='https://github.com/UncleShneerson/react-mesto-api-full-gha'
        />
      </div>
    </>
  );
}

export default AboutStudent;
