import './SearchBar.scss';
import searchIcon from '../../images/search_icon_gray.svg';
import searchIconButton from '../../images/search_icon.svg';
import { useState } from 'react';
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";

function SearchBar() {
  const [active, setActive] = useState(false);
  const buttonStyle = {backgroundImage: `url(${searchIconButton})`};

  const {
    values,
    handleChange: handleInputChange,
    // setValues
  } = useForm({});

  const {
    handleChange: handleValidation,
    validationData,
    isValid,
  } = useValidation({ name: true, email: true, pass: true });

  function handleSliderClick() {
    setActive(!active);
  }

  function handleSearchChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  console.log(isValid);

  return (
    <div className='search'>
      <div className='search__bar'>
        <img className='search__bar-icon' src={searchIcon} alt='Поиск'/>
        <input
          className = { `search__bar-input ${!validationData.search && 'search__bar-input_invalid'}`}
          type= 'text'
          name= 'search'
          placeholder = 'Фильм'
          minLength = '2'
          maxLength = '30'
          value = { values.search }
          onChange={handleSearchChange}
          required
        />
        <button
          className={`search__bar-button ${!isValid ? 'search__bar-button_invalid' : 'hover-button'}`}
          style={buttonStyle}
          disabled={!isValid}
        />

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
