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
  onChange
}) {


  return (
    <>
    <label className='input-label'>
      {label}
    </label>
      <input
      type={type}
      name={name}
      placeholder = {placeholder}
      minLength={minLength}
      maxLength={maxLength}
      value={value[name] || ""}
      className={`input ${!isValid[name] && 'input_invalid'}`}
      onChange={onChange}
      required
    />
    </>
  );
}

export default Input;
