import './FormField.css'
import type {FormFieldProps} from './FormField.types';

const FormField = (props: FormFieldProps) => {
  const { id, label, required = false, placeholder,as } = props

  return (
    <div className="field">
      <label className="field__label" htmlFor={id}>
        {label}
        {required && (
          <span className="field__required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === 'select' ? (
        <select
          id={id}
          className="field__control"
          required={required}
        >
          <option value="">
            {placeholder ?? 'Select'}
          </option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className="field__control"
          type={props.type ?? 'text'}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}

export default FormField
