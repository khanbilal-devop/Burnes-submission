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
