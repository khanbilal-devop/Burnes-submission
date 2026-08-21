import type {
  EventSeries,
  RegistrationFormValues,
  RegistrationPayload,
} from './App.types'
import {
  UNITED_STATES,
  OUTSIDE_UNITED_STATES,
  NO_GOVERNMENT_AFFILIATION,
} from './constants/formOptions'

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

export const getValidationError = (
  values: RegistrationFormValues,
  selectedSeries: string[],
): string | null => {
  if (selectedSeries.length === 0) {
    return 'Please select at least one event series to register for.'
  }
  
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
  consentedAt: string = new Date().toISOString(),
): RegistrationPayload => ({
  email: values.email.trim().toLowerCase(),
  first_name: values.firstName.trim(),
  last_name: values.lastName.trim(),
  country:
    values.country === OUTSIDE_UNITED_STATES && !isBlank(values.nonUsCountry)
      ? values.nonUsCountry.trim()
      : values.country,
  gov_org: values.governmentAffiliation,
  gov_level: needsGovernmentLevel(values.governmentAffiliation)
    ? values.governmentLevel
    : null,
  state: values.country === UNITED_STATES ? values.state : null,
  workshop_series: JSON.stringify(selectedSeries),
  newsletter: wantsNewsletter,
  consent_at: wantsNewsletter ? consentedAt : null,
});


export const orderSeriesBySelection = (
  series: EventSeries[],
  selectedIds: string[],
): EventSeries[] => [
  ...selectedIds
    .map((id) => series.find((item) => item.id === id))
    .filter((item): item is EventSeries => item !== undefined),
  ...series.filter((item) => !selectedIds.includes(item.id)),
]

export const getSeriesIds = (series: EventSeries[]) =>
  series.map((item) => item.id)

/*
 * Split the catalogue into what has been registered and what is still on
 * offer.
 */
export const partitionSeries = (
  series: EventSeries[],
  registeredIds: string[],
) => ({
  registered: series.filter((item) => registeredIds.includes(item.id)),
  remaining: series.filter((item) => !registeredIds.includes(item.id)),
})

/*
 * Scroll an element into view, honouring the user's motion preference.
 */
export const scrollIntoViewRespectingMotion = (
  element: HTMLElement | null,
) => {
  if (!element) return

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  element.scrollIntoView({
    behavior: prefersReducedMotion ? 'auto' : 'smooth',
    block: 'center',
  })
}
