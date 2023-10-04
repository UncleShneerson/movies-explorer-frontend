import './Profile.scss';

import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";

import Header from "../Header/Header";


function Profile({signOut}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEditable, setIsEditable] = useState(false);

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

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function handleEditClick () {
    setIsEditable(true);
  }

  function handleSubmitClick () {
    setIsEditable(false);
  }

  return (
    <>
      <Header/>
      <main className="profile">
        <section className="profile__container">
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <form className='profile__form'>
            <div className='profile__form-fields'>
              <div className='profile__form-field'>
                <label className='profile__form-label'>Имя</label>
                { !isEditable ? (<p className='profile__form-value'>{ currentUser.name }</p>) :
                  (
                    <input
                      className = { `profile__form-input ${!validationData.name && 'profile__form-input_invalid'}`}
                      name = 'name'
                      minLength = '2'
                      maxLength = '30'
                      type = 'text'
                      value = { values.name }
                      placeholder = {currentUser.name}
                      onChange = { handleChange }
                    />
                  )
                }
              </div>
              <div className='profile__form-field'>
                <label className='profile__form-label'>E-mail</label>
                { !isEditable ? (<p className='profile__form-value'>{ currentUser.email }</p>) :
                  (
                    <input
                    className = { `profile__form-input ${!validationData.email && 'profile__form-input_invalid'}`}
                    name = 'email'
                    type = 'email'
                    minLength = '7'
                    maxLength = '30'
                    value = { values.email }
                    placeholder = { currentUser.email }
                    onChange = {handleChange}
                    disabled = {!isEditable}
                  />
                  )
                }
              </div>
            </div>
            {isEditable ? (
              <div className='profile__buttons'>
                <p className='profile__notice'>При обновлении профиля произошла ошибка.</p>
                <button
                  className={`profile__btn-submit ${!isValid && 'profile__btn-submit_invalid'}`}
                  type='submit'
                  onClick={handleSubmitClick}
                >
                  Сохранить
                </button>
              </div>
            ) : (
              <div className='profile__buttons'>
                <button className='profile__btn-text hover-link' type='button' onClick={handleEditClick}>
                  Редактировать
                </button>
                <button className='profile__btn-text_accent hover-link' type='button' onClick={signOut}>
                  Выйти из аккаунта
                </button>
              </div>
            )}
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;




