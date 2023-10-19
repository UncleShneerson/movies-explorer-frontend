import "./SearchBar.scss";
import searchIcon from "../../images/search_icon_gray.svg";
import searchIconButton from "../../images/search_icon.svg";
import { useState, useEffect } from "react";
import useForm from "../../hooks/useForm";

function SearchBar({
  onOptionChange,
  option,
  onSubmit,
  inputValue = '',
  isLocalSave = false,
  isLoading = false,
}) {
  const [errorMessage, setЕrrorMessage] = useState('');
  const buttonStyle = { backgroundImage: `url(${searchIconButton})` };

  const {
    values,
    handleChange: handleInputChange,
    setValues,
  } = useForm({search: ''});

  useEffect(() => {
    if (!isLocalSave) {
      return
    } else {
      setValues({search: inputValue});
    }
  }, [inputValue]);

  function handleSliderClick() {
    onOptionChange();
  }

  function handleChange(e) {
    e.target.value === ''
      ? setЕrrorMessage('Необходимо ввести символ')
      : setЕrrorMessage('')
    handleInputChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = values.search;
    if(searchValue === ''){
      setЕrrorMessage('Заполните поле');
      return
    } else {
      onSubmit(searchValue);
    }
  }

  return (
    <>
    <div className='search'>
      <form className='search__bar'>
        <img className='search__bar-icon' src={searchIcon} alt='Поиск'/>
        <input
          className = { `search__bar-input ${errorMessage !== '' ? 'search__bar-input_invalid' : ''}`}
          type= 'text'
          name= 'search'
          value = {values.search}
          autoComplete='search'
          placeholder = 'Фильм'
          onChange={handleChange}
          disabled={isLoading}
        />
        <button
          className={`search__bar-button ${isLoading ? 'search__bar-button_invalid' : 'hover-button'}`}
          type="submit"
          style={buttonStyle}
          text='Поиск'
          onClick={handleSubmit}
          disabled={isLoading}
        />

      </form>
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
