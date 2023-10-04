import './SectionWithSubtitle.scss';
import Section from '../Section/Section';

function SectionWithPromo({children, type, title, id = false}) {

  return (
    <Section type={type} id={id}>
      <h2 className='section__subtitle'>
        {title}
      </h2>
      {children}
    </Section>
  );
}

export default SectionWithPromo;
