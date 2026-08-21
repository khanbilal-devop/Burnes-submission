import { useCallback, useState } from 'react'
import FormField from './components/FormField/FormField'
import type { FieldChangeEvent } from './components/FormField/FormField.types'
import type { RegistrationFormValues } from './App.types'
import {
  COUNTRY_OPTIONS,
  GOVERNMENT_OPTIONS,
  US_STATE_OPTIONS,
} from './constants/formOptions'
import './App.css'

const INITIAL_VALUES: RegistrationFormValues = {
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  state: '',
  nonUsCountry: '',
  governmentAffiliation: '',
}

/* Country values that decide which follow-up field appears. */
const UNITED_STATES = 'United States'
const OUTSIDE_UNITED_STATES = 'Outside the United States'

const App = () => {
  const [values, setValues] = useState<RegistrationFormValues>(INITIAL_VALUES)

  /*
   * One handler for every field. Each control carries its own `name`, which
   * doubles as the key in the state object, so adding a field needs no new
   * handler.
   */
  const handleChange = (event: FieldChangeEvent) => {
    const { name, value } = event.target

    setValues((previous) => ({ ...previous, [name]: value }))
  }


  const clearField = useCallback((name: string) => {
    setValues((previous) => ({ ...previous, [name]: '' }))
  }, [])

  return (
    <main className="page">
      <div className="card">
        <header>
          <h1 id="registration-heading" className="card__heading">
            Registration Details
          </h1>
        </header>


        <div className="form-layout">
          <div className="form-row">
            <FormField
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={values.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* --- Names: two fields on one row, so they split it 50/50 --- */}
          <div className="form-row">
            <FormField
              id="first-name"
              name="firstName"
              label="First Name"
              placeholder="John"
              value={values.firstName}
              onChange={handleChange}
              required
            />
            <FormField
              id="last-name"
              name="lastName"
              label="Last Name"
              placeholder="Doe"
              value={values.lastName}
              onChange={handleChange}
              required
            />
          </div>


          <div className="form-row">
            <FormField
              as="select"
              span="half"
              id="country"
              name="country"
              label="Country"
              placeholder="Select country (required)"
              options={COUNTRY_OPTIONS}
              value={values.country}
              onChange={handleChange}
              required
            />

            {values.country === UNITED_STATES && (
              <FormField
                as="select"
                span="half"
                id="state"
                name="state"
                label="State/Province"
                placeholder="Select state (required)"
                options={US_STATE_OPTIONS}
                value={values.state}
                onChange={handleChange}
                onUnmount={clearField}
                required
              />
            )}

            {values.country === OUTSIDE_UNITED_STATES && (
              <FormField
                span="half"
                id="non-us-country"
                name="nonUsCountry"
                label="Country (Non US only)"
                placeholder="Enter your answer (optional)"
                value={values.nonUsCountry}
                onChange={handleChange}
                onUnmount={clearField}
              />
            )}
          </div>

          <div className="form-row">
            <FormField
              as="select"
              span="half"
              id="government-affiliation"
              name="governmentAffiliation"
              label="Do you work for or primarily support a government or government-affiliated organization?"
              placeholder="Select"
              options={GOVERNMENT_OPTIONS}
              value={values.governmentAffiliation}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <hr className="card__divider" />
      </div>
    </main>
  )
}

export default App
