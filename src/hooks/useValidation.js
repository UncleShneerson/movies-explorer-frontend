import { useState, useEffect } from "react";

function useValidation(startingValid = {}) {

  // const [errorMessages, setErrorMessages] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [validationData, setValidationData] = useState({});

  useEffect(() => {
    setValidationData(startingValid);
  }, []);

  function handleChange(e) {
    const { name, validationMessage, validity } = e.target;

    // Не используем сообщения в этом проекте
    // setErrorMessages({
    //   ...errorMessages,
    //   [name]: validationMessage,
    // });

    setValidationData({
      ...validationData,
      [name]: validity.valid,
    });

    checkValidity();
  }

  function checkValidity() {
    const allInputValidity = Object.keys(validationData).every((i) => {
      return validationData[i] === true;
    });

    setIsValid(allInputValidity);
  }

  return {
    handleChange,
    // errorMessages,
    // setErrorMessages,
    isValid,
    validationData,
    setIsValid,
  };
};

export default useValidation;
