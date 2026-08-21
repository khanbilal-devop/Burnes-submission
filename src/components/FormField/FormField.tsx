import './FormField.css'
import type { FormFieldProps } from './FormField.types'

const FormField = (props: FormFieldProps) => {
  const {
    id,
    name,
    label,
    value,
    onChange,
    required = false,
    placeholder,
    span = 'full',
    as,
  } = props

  const className = span === 'half' ? 'field field--half' : 'field'

  return (
    <div className={className}>
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
          name={name}
          className="field__control"
          value={value}
          onChange={onChange}
          required={required}
        >
          <option value="">{placeholder ?? 'Select'}</option>
          {props.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={name}
          className="field__control"
          type={props.type ?? 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  )
}

export default FormField
