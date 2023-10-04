import Columnizer from '../Columnizer/Columnizer';
import Article from '../Article/Article';
import './AboutProject.scss';


function AboutProject() {
  return (
    <>
      <Columnizer>
        <Article
          title='Дипломный проект включал 5&nbsp;этапов'
          text='Составление плана, работу над бэкендом, вёрстку, добавление функциональности и&nbsp;финальные доработки.'
        />
        <Article
          title='На&nbsp;выполнение диплома ушло 5&nbsp;недель'
          text='У&nbsp;каждого этапа был мягкий и&nbsp;жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.'
        />
      </Columnizer>
      <div className='project-bar'>
        <p className='project-bar__header project-bar__header_accent'>1 неделя</p>
        <p className='project-bar__header'>4 недели</p>
        <p className='project-bar__description'>Back-end</p>
        <p className='project-bar__description'>Front-end</p>
      </div>
    </>
  );
}

export default AboutProject;
