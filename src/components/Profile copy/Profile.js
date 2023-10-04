import { useState, useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import './Profile.scss';

function Profile({signOut}) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [inputNameValue, setInputNameValue] = useState(name);
  const [inputEmailValue, setInputEmailValue] = useState(email);
  const [placeholderNameValue, setPlaceholderNameValue] = useState('');
  const [placeholderEmailValue, setPlaceholderEmailValue] = useState('');
  const [isEditable, setIsEditable] = useState(false);



  function handleEditClick () {
    setIsEditable(true);
    setInputNameValue('');
    setInputEmailValue('');
    setPlaceholderNameValue(name);
    setPlaceholderEmailValue(email);
  }

  function handleSubmitClick () {
    setIsEditable(false);
  }

  return (
    <>
      <Header/>
      <main>
        <section className="content profile">
          <h1 className='profile__title'>Привет, {currentUser.name}!</h1>
          <form className='form'>
            <div className='form__fields'>
              <div className='form__field'>
                <label className='form__field-label'>Имя</label>
                <input
                  className='form__field-input'
                  type='text' value={inputNameValue} placeholder={placeholderNameValue}
                  disabled={!isEditable}
                />
              </div>
              <div className='form__field'>
                <label className='form__field-label'>E-mail</label>
                <input
                  className='form__field-input'
                  type='text' value={inputEmailValue} placeholder={placeholderEmailValue}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className={`profile__buttons ${isEditable && 'profile__buttons_disable'}`} >
              <button className='profile__btn-text hover-link' type='button' onClick={handleEditClick}>
                Редактировать
              </button>
              <button className='profile__btn-text_accent hover-link' type='button' onClick={signOut}>
                Выйти из аккаунта
              </button>
            </div>
            <div className={`profile__buttons ${!isEditable && 'profile__buttons_disable'}`} >
              <p className='profile__notice'>При обновлении профиля произошла ошибка.</p>
              <button className='profile__btn-submit' type='submit' onClick={handleSubmitClick}>Сохранить</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default Profile;
