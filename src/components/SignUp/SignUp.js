import FormPage from "../FormPage/FormPage";
import Input from "../Input/Input";
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";

function SignUp () {
  const { values, handleChange: handleInputChange, setValues } = useForm({});

  const {
    handleChange: handleValidation,
    validationData,
    isValid,
  } = useValidation({ name: true, email: true, pass: true });

  function handleChange(e) {
    handleInputChange(e);
    handleValidation(e);
  }

  return(
    <FormPage
      title = 'Добро пожаловать!'
      formName = 'signup'
      btnTxt = 'Зарегистрироваться'
      redirectText = 'Уже зарегистрированы? '
      redirectLinkText = 'Войти'
      redirectLink = '/signin'
      isValid = {isValid}
    >
      <Input
        label = 'Имя'
        name = 'name'
        minLength = '2'
        maxLength = '30'
        value = {values}
        onChange = {handleChange}
        isValid = {validationData}
      />
      <Input
        label = 'Email'
        type = 'email'
        name = 'email'
        minLength = '7'
        maxLength = '30'
        value = {values}
        onChange = {handleChange}
        isValid = {validationData}
      />
      <Input
        label = 'Пароль'
        type = 'password'
        name = 'password'
        minLength = '3'
        value = {values}
        onChange = {handleChange}
        isValid = {validationData}
      />
    </FormPage>
  )
}

export default SignUp;
