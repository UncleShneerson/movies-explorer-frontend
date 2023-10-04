import './Input.scss';

function Input({
  name,
  label,
  value = '',
  minLength = '',
  maxLength = '',
  type = 'text',
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
      minLength={minLength}
      maxLength={maxLength}
      value={value[name] || ""}
      className={`input ${!isValid[name] && 'input_invalid'}`}
      required
      onChange={onChange}
    />
    </>
  );
}

export default Input;
