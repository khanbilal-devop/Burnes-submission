import { useClearOnUnmount } from '../../hooks/useClearOnUnmount'
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
    onUnmount,
    span = 'full',
    as,
  } = props

  useClearOnUnmount(name, onUnmount)

  const className = span === 'half' ? 'field field-half' : 'field'

  return (
    <div className={className}>
      <label className="field-label" htmlFor={id}>
        {label}
        {required && (
          <span className="field-required" aria-hidden="true">
            *
          </span>
        )}
      </label>

      {as === 'select' ? (
        <select
          id={id}
          name={name}
          className="field-control"
          value={value}
          onChange={onChange}
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
          className="field-control"
          type={props.type ?? 'text'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default FormField
