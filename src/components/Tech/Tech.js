import './Tech.scss';

function Tech() {
  return (
    <>
      <h3 className='tech__title'>
        7 технологий
      </h3>
      <p className='tech__description'>
        На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили в&nbsp;дипломном проекте.
      </p>
      <ul className='tech__list'>
        <li className='tech__list-item'>HTML</li>
        <li className='tech__list-item'>CSS</li>
        <li className='tech__list-item'>JS</li>
        <li className='tech__list-item'>React</li>
        <li className='tech__list-item'>Git</li>
        <li className='tech__list-item'>Express.js</li>
        <li className='tech__list-item'>mongoDB</li>
      </ul>
    </>
  );
}

export default Tech;
