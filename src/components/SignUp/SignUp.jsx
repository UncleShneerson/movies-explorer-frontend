import { useEffect, useState } from "react";
import { signUpErrors } from "../../utils/configs/errorMessages";
import FormPage from "../FormPage/FormPage";
import Input from "../Input/Input";
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";


function SignUp({
  isLoading = false,
  onSubmit,
  apiErrors
}) {
  const [apiErrorMessage, setApiMessage] = useState('');
  useEffect(() => {
    apiErrors !== '' && setApiMessage(signUpErrors(apiErrors));
  }, [apiErrors, setApiMessage])


  const {
    values,
    handleChange: handleInputChange
  } = useForm({});

  const {
    handleChange: handleValidation,
    validationData,
    isValid,
    errorMessages,
  } = useValidation({ name: false, email: false, password: false });

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  function handleSubmit() {
    onSubmit(values);
  }

  return (
    <FormPage
      title="Добро пожаловать!"
      formName="signup"
      btnTxt="Зарегистрироваться"
      redirectText="Уже зарегистрированы? "
      redirectLinkText="Войти"
      redirectLink="/signin"
      isValid={isValid}
      errors={errorMessages}
      onSubmit={handleSubmit}
      apiErrors={apiErrorMessage}
      isLoading={isLoading}
    >
      <Input
        label="Имя"
        name="name"
        autocomplete='name'
        minLength="2"
        maxLength="30"
        placeholder="Имя"
        value={values}
        errors={errorMessages}
        onChange={handleChange}
        isValid={validationData}
        disabled = {isLoading}

      />
      <Input
        label="Email"
        type="email"
        name="email"
        autocomplete='email'
        placeholder="Ваш e-mail"
        minLength="7"
        maxLength="30"
        value={values}
        errors={errorMessages}
        onChange={handleChange}
        isValid={validationData}
        disabled = {isLoading}
      />
      <Input
        label="Пароль"
        type="password"
        name="password"
        autocomplete="password"
        placeholder="Пароль"
        minLength="3"
        value={values}
        errors={errorMessages}
        onChange={handleChange}
        isValid={validationData}
        disabled = {isLoading}
      />
    </FormPage>
  );
}

export default SignUp;
