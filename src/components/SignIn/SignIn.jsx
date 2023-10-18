import { useState, useEffect } from "react";
import { signInErrors } from "../../utils/configs/errorMessages";
import FormPage from "../FormPage/FormPage";
import Input from "../Input/Input";
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";

function SignIn({isLoading = false, onSubmit, apiErrors = '' }) {
  const [apiErrorMessage, setApiMessage] = useState('');

  useEffect(() => {
    apiErrors !== '' && setApiMessage(signInErrors(apiErrors));
  }, [apiErrors])

  const {
    values,
    handleChange: handleInputChange
  } = useForm({});

  const {
    handleChange: handleValidation,
    validationData,
    isValid,
    errorMessages,
  } = useValidation({ email: false, password: false });

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function handleSignIn() {
    onSubmit(values);
  }

  return (
    <FormPage
      title="Рады видеть!"
      formName="signin"
      btnTxt="Войти"
      onSubmit={handleSignIn}
      redirectText="Еще не зарегистрированы? "
      redirectLinkText="Регистрация"
      redirectLink="/signup"
      isValid={isValid}
      apiErrors={apiErrorMessage}
      isLoading={isLoading}
    >
      <Input
        label="Email"
        type="email"
        name="email"
        autocomplete="email"
        placeholder="Ваш e-mail"
        minLength="7"
        maxLength="30"
        value={values}
        errors={errorMessages}
        onChange={handleChange}
        isValid={validationData}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        autocomplete="password current-password"
        placeholder="Пароль"
        minLength="3"
        value={values}
        errors={errorMessages}
        onChange={handleChange}
        isValid={validationData}
      />
    </FormPage>
  );
}

export default SignIn;
