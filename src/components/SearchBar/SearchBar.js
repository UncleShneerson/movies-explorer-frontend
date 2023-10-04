import './SearchBar.scss';
import searchIcon from '../../images/search_icon_gray.svg';
import searchIconButton from '../../images/search_icon.svg';
import { useState } from 'react';

function SearchBar() {
  const [active, setActive] = useState(false);
  const buttonStyle = {backgroundImage: `url(${searchIconButton})`};

  function handleSliderClick() {
    setActive(!active);
  }

  return (
    <div className='search'>
      <div className='search__bar'>
        <img className='search__bar-icon' src={searchIcon} alt='Поиск'/>
        <input className='search__bar-input' placeholder='Фильм'/>
        <button className='search__bar-button hover-button' style={buttonStyle}/>
      </div>
      <div className='search__option'>
        <div
          className={active ? 'search__option-slider search__option-slider_active' : 'search__option-slider'}
          onClick={handleSliderClick}
        >
          <div className={active ? 'search__option-slider-bullet search__option-slider-bullet_active' : 'search__option-slider-bullet'}/>
        </div>
        <p className='search__option-text'>
          Короткометражки
        </p>
      </div>
    </div>
  );
}

export default SearchBar;
