/* A single <option> in any select field. */
export type Option = {
  value: string
  label: string
}

export type EventSeries = {
  id: string
  title: string
  imageUrl: string
}

/* The shape of the registration form's state. */
export type RegistrationFormValues = {
  email: string
  firstName: string
  lastName: string
  country: string
  /* Shown only when country is 'United States'. */
  state: string
  /* Shown only when country is 'Outside the United States'. */
  nonUsCountry: string
  governmentAffiliation: string
  /* Shown only when governmentAffiliation is one of the "Yes" answers. */
  governmentLevel: string
}



export type RegistrationPayload = {
  email: string
  first_name: string
  last_name: string
  country: string
  gov_org: string
  gov_level: string | null
  state: string | null
  workshop_series: string
  newsletter: boolean
  consent_at: string | null
}
