import "./SearchBar.scss";
import searchIcon from "../../images/search_icon_gray.svg";
import searchIconButton from "../../images/search_icon.svg";
import { useState } from "react";

function SearchBar({
  onOptionChange,
  option,
  onSubmit,
  searchInputValue=''
}) {
  const [inputValue, setInputValue] = useState('');
  const [wasSearch, setWasSearch] = useState(false);
  const [errorMessage, setЕrrorMessage] = useState('');
  const buttonStyle = { backgroundImage: `url(${searchIconButton})` };

  function handleSliderClick() {
    onOptionChange();
  }

  function handleInputChange(e) {
    e.target.value === ''
      ? setЕrrorMessage('')
      : setЕrrorMessage('')
    setInputValue(e.target.value)
  }

  function handleSubmit() {
    if(!wasSearch && inputValue === '' && searchInputValue !== ''){
      setЕrrorMessage('Обновите поле поиска');
      return
    }
    if(inputValue === ''){
      setЕrrorMessage('Заполните поле');
      return
    } else {
      onSubmit(inputValue);
      setWasSearch(true);
    }
  }

  return (
    <>
    <div className='search'>
      <div className='search__bar'>
        <img className='search__bar-icon' src={searchIcon} alt='Поиск'/>
        <input
          className = { `search__bar-input ${errorMessage !== '' ? 'search__bar-input_invalid' : ''}`}
          type= 'text'
          name= 'search'
          defaultValue = {searchInputValue}
          autoComplete='search'
          placeholder = 'Фильм'
          onChange={handleInputChange}
        />
        <button
          className={`search__bar-button hover-button`}
          style={buttonStyle}
          text='Поиск'
          onClick={handleSubmit}
        />

      </div>
      <div className='search__option'>
        <div
          className={option ? 'search__option-slider search__option-slider_active' : 'search__option-slider'}
          onClick={handleSliderClick}
        >
          <div
            className={
              option
                ? "search__option-slider-bullet search__option-slider-bullet_active"
                : "search__option-slider-bullet"
            }
          />
        </div>
        <p className="search__option-text">Короткометражки</p>
      </div>
    </div>
    { errorMessage !== '' && (<p className="search__error">{errorMessage}</p>) }
    </>
  );
}

export default SearchBar;
