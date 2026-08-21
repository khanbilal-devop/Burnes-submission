import type { Option } from '../App.types'

/* Select options for the registration form. */

export const COUNTRY_OPTIONS: Option[] = [
  { value: 'United States', label: 'United States' },
  { value: 'Outside the United States', label: 'Outside the United States' },
]

export const GOVERNMENT_OPTIONS: Option[] = [
  { value: "Yes, I'm an employee of a government agency", label: "Yes, I'm an employee of a government agency" },
  {
    value: "Yes, I'm a contractor or consultant working with a government agency",
    label: "Yes, I'm a contractor or consultant working with a government agency",
  },
  {
    value: 'Yes, I work for a government-affiliated organization (e.g., public university, nonprofit, or quasi-governmental organization)',
    label:
      'Yes, I work for a government-affiliated organization (e.g., public university, nonprofit, or quasi-governmental organization)',
  },
  {
    value: 'No, I do not work for or support a government or government-affiliated organization',
    label:
      'No, I do not work for or support a government or government-affiliated organization',
  },
]

/*
 * US states and territories. The reference uses the two-letter code as both
 * the value and the visible label, so derive the options from one list rather
 * than repeating each code twice.
 */
const US_STATE_CODES = [
  'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
  'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY',
  'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE',
  'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK',
  'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
  'VA', 'VI', 'WA', 'WV', 'WI', 'WY',
]

export const US_STATE_OPTIONS: Option[] = US_STATE_CODES.map((code) => ({
  value: code,
  label: code,
}))

/*
 * Shown only when the government-affiliation answer is one of the "Yes"
 * options. Values match their labels, as elsewhere in this form.
 */
const GOVERNMENT_LEVELS = [
  'International or Intergovernmental Organization (e.g. UN, OECD, EU)',
  'National or Federal Level',
  'State or Provincial level',
  'Tribal Government',
  'County or equivalent level',
  'Municipal, City, or Local level',
  'Other level not listed here',
]

export const GOVERNMENT_LEVEL_OPTIONS: Option[] = GOVERNMENT_LEVELS.map(
  (level) => ({ value: level, label: level }),
)


export const UNITED_STATES = 'United States'
export const OUTSIDE_UNITED_STATES = 'Outside the United States'
export const NO_GOVERNMENT_AFFILIATION =
  'No, I do not work for or support a government or government-affiliated organization'