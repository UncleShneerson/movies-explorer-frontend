import './MenuMobile.scss';
import Menu from "../Menu/Menu";
import closeBtn from '../../images/close_btn.svg';

function MenuMobile ({isOpen, onClose }) {

  return (
    <div className={`mobile-menu ${isOpen ? "mobile-menu_opened" : ''}`}>
      <div className={`mobile-menu__container ${isOpen ? "mobile-menu__container_opened" : ''}`}>
        <button
          type="button"
          className="mobile-menu__close-btn hover-link"
          style={{backgroundImage: `url(${closeBtn})`}}
          aria-label="Закрыть"
          onClick={onClose}
        />
        <Menu type='mob'/>
      </div>
    </div>
  );
}

export default MenuMobile;
