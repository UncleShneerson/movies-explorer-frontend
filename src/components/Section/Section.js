import './Section.scss';


function Section({children, type = 'normal', promoImg = 'none', style = {}, id = false, customClass='', aria=''}) {

  return (
    <section
       className={`content ${type === 'normal' ? 'content_size_s' : 'content_size_l'}  section section_type_${type} ${customClass}`}
       aria-label= {aria}
       style={style}
       id={id && `${id}`}
    >
      {children}
    </section>
  );
}

export default Section;
