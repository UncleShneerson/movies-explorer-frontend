import FormPage from "../FormPage/FormPage";
import Input from "../Input/Input";
import useValidation from "../../hooks/useValidation";
import useForm from "../../hooks/useForm";

function SignIn ({signIn}) {

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
      title = 'Рады видеть!'
      formName = 'signin'
      btnTxt = 'Войти'
      submit = {signIn}
      redirectText = 'Еще не зарегистрированы? '
      redirectLinkText = 'Регистрация'
      redirectLink = '/signup'
      isValid = {isValid}
    >
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
        name = 'pass'
        minLength = '3'
        value = {values}
        onChange = {handleChange}
        isValid= {validationData}
      />
    </FormPage>
  )
}

export default SignIn;
