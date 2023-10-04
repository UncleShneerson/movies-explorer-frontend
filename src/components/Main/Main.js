import promoImg from '../../images/promo_img.svg';
import SectionWithPromo from '../SectionWithPromo/SectionWithPromo';
import SectionWithSubtitle from '../SectionWithSubtitle/SectionWithSubtitle';
import NavBar from '../NavBar/NavBar';
import AboutProject from '../AboutProject/AboutProject';
import Tech from '../Tech/Tech';
import AboutStudent from '../AboutStudent/AboutStudent';

function Main() {

  return (
    <>
      <SectionWithPromo
        promoImg={promoImg}
        title='Учебный проект студента факультета Веб-разработки.'
      / >
      <NavBar links={[
       { title: 'О проекте',
         link: 'project_section'
       },
       {
         title: 'Технологии',
         link: 'tech_section'
       },
       {
         title: 'Студент',
         link: 'student_section'
       }
      ]}/>
      <SectionWithSubtitle
        title='О проекте'
        id='project_section'
      >
        <AboutProject/>
      </SectionWithSubtitle>
      <SectionWithSubtitle
        title='Технологии'
        type='accent'
        id='tech_section'
      >
        <Tech/>
      </SectionWithSubtitle>
      <SectionWithSubtitle
        title='Студент'
        id='student_section'
      >
        <AboutStudent/>
      </SectionWithSubtitle>
    </>
  );
}

export default Main;
