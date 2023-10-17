function signUpErrors(code) {
  switch (code) {
    case 500:
      return 'На сервере произошла ошибка. ';
    case 409:
      return 'Пользователь с таким email уже существует';
    default:
      return 'На сервере произошла ошибка';
  }
}

function signInErrors(code) {
  switch (code) {
    case 500:
      return 'На сервере произошла ошибка. '
    case 401:
      return 'Вы ввели неправильный логин или пароль. '
    default:
      return 'При авторизации произошла ошибка. Токен не передан или передан не в том формате.';
  }
}

function editProfileErrors(code) {
  switch (code) {
    case 500:
      return 'На сервере произошла ошибка.';
    case 409:
      return 'Пользователь с таким email уже существует.';
    default:
      return 'При обновлении профиля произошла ошибка.';
  }
}

export {
  signUpErrors,
  signInErrors,
  editProfileErrors,
}
