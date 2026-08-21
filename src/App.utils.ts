import type { RegistrationFormValues ,RegistrationPayload} from './App.types'
import { UNITED_STATES,NO_GOVERNMENT_AFFILIATION } from './constants/formOptions'

export const INITIAL_VALUES: RegistrationFormValues = {
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  state: '',
  nonUsCountry: '',
  governmentAffiliation: '',
  governmentLevel: '',
}

/* Treats whitespace-only input as empty, so " " does not pass as a name. */
export const isBlank = (value: string) => value.trim().length === 0

/* Deliberately loose: something@something.tld, no attempt to police TLDs. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/*
 * The government-level question only applies to the three "Yes" answers.
 * Used both to render the field and to validate it, so the two cannot drift.
 */
export const needsGovernmentLevel = (governmentAffiliation: string) =>
  governmentAffiliation !== '' &&
  governmentAffiliation !== NO_GOVERNMENT_AFFILIATION

/* Add the id when absent, drop it when present. */
export const toggleInList = (list: string[], item: string) =>
  list.includes(item)
    ? list.filter((entry) => entry !== item)
    : [...list, item]

/*
 * Returns the first validation failure as a message, or null when everything
 * passes.
 *
 * Pure on purpose: it reads values and returns a string rather than calling
 * setState itself. That keeps the rules testable without React, and leaves the
 * component to decide what to do with the message.
 *
 * Order matters - the first failure wins, so these run in the order the fields
 * appear on screen.
 */
export const getValidationError = (
  values: RegistrationFormValues,
  selectedSeries: string[],
): string | null => {

  

  if (
    isBlank(values.email) ||
    isBlank(values.firstName) ||
    isBlank(values.lastName)
  ) {
    return 'Please fill in all required fields (Email, First Name, Last Name).'
  }

  if (!EMAIL_PATTERN.test(values.email.trim())) {
    return 'Please enter a valid email address.'
  }

  if (isBlank(values.country)) {
    return 'Country is required.'
  }

  /* State only exists while the country is the US. */
  if (values.country === UNITED_STATES && isBlank(values.state)) {
    return 'State/Province is required.'
  }

  if (isBlank(values.governmentAffiliation)) {
    return 'Please tell us about your government affiliation.'
  }

  if (
    needsGovernmentLevel(values.governmentAffiliation) &&
    isBlank(values.governmentLevel)
  ) {
    return 'Please select your level of government.'
  }


  return null
}

export const buildRegistrationPayload = (
values: RegistrationFormValues,
  selectedSeries: string[],
  wantsNewsletter: boolean,
): RegistrationPayload => {
  return {email : "email"};
}
