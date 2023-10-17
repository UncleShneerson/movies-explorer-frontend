import { useState, useEffect } from "react";
import { patternName, patternEmail, patternPassword } from '../utils/configs/patterns';

function useValidation(startingValid = {}) {

  const [errorMessages, setErrorMessages] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [validationData, setValidationData] = useState({});

  useEffect(() => {
    setValidationData(startingValid);
  }, []);

  useEffect(() => {
    checkValidity();
  }, [ validationData ]);

  // ПАТТЕРН

  // получение паттерна
  async function checkPattern (name, value) {

    function setPattern () {
      if (name === 'name') {
        return patternName;
      }
      if (name === 'email') {
        return patternEmail;
      }
      if (name === 'password') {
        return patternPassword;
      } else {
        return '';
      }
    }

    let pattern = setPattern();

    const regex = new RegExp (pattern, 'gi');
    return regex.test(value);
  }

  // генерация сообщения ошибки
  async function getMessage (name) {
    switch (name) {
      case 'name':
        return 'Имя должно содержать латиницу, кириллицу, пробел или дефис.';

      case 'email':
        return 'Проверьте формат почты.';

      case 'password':
        return 'Только латиница, цифры и спецсимволы.';

      default:
        return 'Неверный формат';
    }
  }

  // установка сообщения
  function setCustomValid (element, text) {
    element.setCustomValidity(text);
  }

  // ОБРАБОТКА СОБЫТИЯ
  async function handleChange(e) {
    const { name, value, validationMessage, validity } = e.target;
    const isPattern = await checkPattern(name, value);

    if (!isPattern) {
      const message = await getMessage(name);
      setValidationData({
        ...validationData,
        [name]: false,
      });

      setErrorMessages({
        ...errorMessages,
        [name]: message,
      });

    } else {

      setCustomValid(e.target, '');
      setValidationData({
        ...validationData,
        [name]: validity.valid,
      });

      setErrorMessages({
        ...errorMessages,
        [name]: validationMessage,
      });
    }
  }

  // ПРОВЕРКА ВАЛИДАЦИИ
  async function checkValidity() {
    const allInputValidity = await Object.keys(validationData).every((i) => {
      return validationData[i] === true;
    });
    setIsValid(allInputValidity);
  }

  return {
    handleChange,
    errorMessages,
    isValid,
    validationData,
  };
};

export default useValidation;
