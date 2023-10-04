import './SectionWithPromo.scss';
import Section from '../Section/Section';

function SectionWithPromo({children, promoImg = 'none', title}) {

  const sectionStyle = {backgroundImage: `url(${promoImg})`};

  return (
    <Section type='promo' style={sectionStyle}>
      <h1 className='section__promo-title'>
        {title}
      </h1>
    </Section>
  );
}

export default SectionWithPromo;
