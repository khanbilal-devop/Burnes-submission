import type { Option } from '../components/FormField/FormField.types'

/* Select options for the registration form. */

export const COUNTRY_OPTIONS: Option[] = [
  { value: 'us', label: 'United States' },
  { value: 'outside-us', label: 'Outside the United States' },
]

export const GOVERNMENT_OPTIONS: Option[] = [
  { value: 'employee', label: "Yes, I'm an employee of a government agency" },
  {
    value: 'contractor',
    label: "Yes, I'm a contractor or consultant working with a government agency",
  },
  {
    value: 'affiliated',
    label:
      'Yes, I work for a government-affiliated organization (e.g., public university, nonprofit, or quasi-governmental organization)',
  },
  {
    value: 'none',
    label:
      'No, I do not work for or support a government or government-affiliated organization',
  },
]
