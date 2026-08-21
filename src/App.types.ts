/* A single <option> in any select field. */
export type Option = {
  value: string
  label: string
}

/* The shape of the registration form's state. */
export type RegistrationFormValues = {
  email: string
  firstName: string
  lastName: string
  country: string
  /* Shown only when country is 'us'. */
  state: string
  /* Shown only when country is 'outside-us'. */
  nonUsCountry: string
  governmentAffiliation: string
}
