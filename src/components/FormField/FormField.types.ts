import type { ChangeEvent } from 'react'
import type { Option } from '../../App.types'

/* One event type covers both controls, so the parent needs a single handler. */
export type FieldChangeEvent = ChangeEvent< HTMLInputElement | HTMLSelectElement>

type BaseProps = {
  id: string
  name: string
  label: string
  value: string
  onChange: (event: FieldChangeEvent) => void
  required?: boolean
  placeholder?: string
}

type InputProps = BaseProps & {
  as?: 'input'
  type?: 'text' | 'email' | 'tel' | 'url'
  options?: never
}

type SelectProps = BaseProps & {
  as: 'select'
  options: Option[]
  type?: never
}

export type FormFieldProps = InputProps | SelectProps
