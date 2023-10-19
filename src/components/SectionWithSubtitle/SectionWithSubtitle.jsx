import './SectionWithSubtitle.scss';
import Section from '../Section/Section';

function SectionWithSubtitle({children, type, title, id = false, customClass = '',}) {

  return (
    <Section type={type} id={id} customClass={customClass}>
      <h2 className='section__subtitle'>
        {title}
      </h2>
      {children}
    </Section>
  );
}

export default SectionWithSubtitle;
