import './Input.scss';
function Input({
  name,
  label,
  value = '',
  minLength = '',
  maxLength = '30',
  type = 'text',
  placeholder = '',
  isValid = true,
  errors = '',
  autocomplete = '',
  onChange
}) {

  return (
    <div className='input'>
      <label className='input__label'>
        {label}
      </label>
        <input
        type={type}
        name={name}
        placeholder = {placeholder}
        minLength={minLength}
        maxLength={maxLength}
        value={value[name] || ""}
        className={`input__input ${!isValid[name] ? 'input__input_invalid' : ''}`}
        onChange={onChange}
        autoComplete={autocomplete}
        required
      />
      <span className='input__error'>{errors[name]}</span>
    </div>
  );
}

export default Input;
