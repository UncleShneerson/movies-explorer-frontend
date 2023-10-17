import { useNavigate } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./FormPage.scss";

function FormPage({
  children,
  title,
  formName,
  btnTxt,
  redirectText,
  redirectLinkText,
  redirectLink,
  onSubmit,
  apiErrors,
  isValid = false,
  isLoading,
  loadingText = 'Подождите...',
}) {

  const navigate = useNavigate();
  function navigeteTo() {
    navigate(redirectLink);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main>
      <section className="form-page">
        <div className="form-page__container">
          <Logo />
          <h1 className="form-page__title">{title}</h1>
          <form
            className="form-page__form"
            name={`form-${formName}`}
            noValidate
          >
            <div className="form-page__form-inputs">
              {children /* {add labels} */}
              {/* заменить подгрузку сообщения в следующем этапе */}
              <p className="form-page__form-notice">{apiErrors}</p>
            </div>
            <button
              type="submit"
              className={`
                form-page__btn
                ${!isValid ? `form-page__btn_disabled` : ''}
                hover-button
              `}
              disabled={!isValid}
              onClick={handleSubmit}
            >
              {!isLoading ? btnTxt : loadingText}
            </button>
          </form>
          <p className="form-page__notice">
            {redirectText}
            <span
              className="form-page__notice-link hover-link"
              onClick={navigeteTo}
            >
              {redirectLinkText}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
}

export default FormPage;
