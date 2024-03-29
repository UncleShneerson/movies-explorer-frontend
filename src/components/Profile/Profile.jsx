import './Profile.scss';
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";
import Header from "../Header/Header";

function Profile({
    apiErrors,
    onSignOut,
    onSubmit,
    btnTxt = 'Сохранить',
    loadingText = 'Подождите...',
    isLoading = false,
  }) {
  /* --- КОНСТАНТЫ --- */
  const currentUser = useContext(CurrentUserContext);
  const [isBtnLock, setIsBtnLock] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [okMessage, setOkMessage] = useState('');

  const {
    values,
    handleChange: handleInputChange,
  } = useForm({name: currentUser.name, email: currentUser.email});

  const {
    handleChange: handleValidation,
    validationData,
    isValid,
    errorMessages,
  } = useValidation({ name: true, email: true, pass: true });

  useEffect(() => {
    if (isEditable) {
    const isName = (values.name === currentUser.name);
    const isEmail = (values.email === currentUser.email);

    isName && isEmail ? setIsBtnLock(true) : setIsBtnLock(false);
    }
  }, [values, currentUser]);

  /* --- ФУНКЦИИ --- */
  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function handleEditClick () {
    setOkMessage('');
    setIsEditable(true);
  }

  async function handleSubmitClick (e) {
    e.preventDefault();
    try {
      await onSubmit(values);
      setOkMessage('Данные обновлены');
      setIsEditable(false);
    } catch (error) {
      setIsEditable(true);
    }
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
                      className = { `profile__form-input ${!validationData.name ? 'profile__form-input_invalid' : ''}`}
                      name = 'name'
                      autoComplete='name'
                      minLength = '2'
                      maxLength = '30'
                      type = 'text'
                      value = { values.name }
                      placeholder = {currentUser.name}
                      onChange = { handleChange }
                      disabled = {!isEditable || isLoading}
                    />
                  )
                }
              </div>
              <div className='profile__form-field'>
                <label className='profile__form-label'>E-mail</label>
                { !isEditable ? (<p className='profile__form-value'>{ currentUser.email }</p>) :
                  (
                    <input
                    className = { `profile__form-input ${!validationData.email ? 'profile__form-input_invalid' : ''}`}
                    name = 'email'
                    type = 'email'
                    autoComplete='email'
                    minLength = '7'
                    maxLength = '30'
                    value = { values.email }
                    placeholder = { currentUser.email }
                    onChange = {handleChange}
                    disabled = {!isEditable || isLoading}
                  />
                  )
                }
              </div>
              {(okMessage !== '') && (<p className='profile__form-notice'>{okMessage}</p>)}
              {(isEditable && isBtnLock) && (<p className='profile__form-notice profile__form-notice_invalid'>Пожалуйста, обновите данные</p>)}
            </div>
            {isEditable ? (
              <div className='profile__buttons'>
                <p className='profile__notice'>{apiErrors} {errorMessages.name} {errorMessages.email}</p>
                <button
                  className={`profile__btn-submit ${!isValid || isBtnLock || isLoading ? 'profile__btn-submit_invalid' : 'hover-button'}`}
                  type='submit'
                  onClick={handleSubmitClick}
                  disabled={!isValid || isBtnLock || isLoading}
                >
                  {!isLoading ? btnTxt : loadingText}
                </button>
              </div>
            ) : (
                <div className='profile__buttons'>
                <button
                  className='profile__btn-text hover-link'
                  type='button'
                  onClick={handleEditClick}
                >
                  Редактировать
                </button>
                <button
                  className='profile__btn-text profile__btn-text_accent hover-link'
                  type='button'
                  onClick={onSignOut}
                >
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




