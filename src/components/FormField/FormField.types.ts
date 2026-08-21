

export type Option = {
  value: string
  label: string
}

type BaseProps = {
  id: string
  label: string
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
