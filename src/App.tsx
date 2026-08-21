import { useState } from 'react'
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

const App = () => {
  const [values, setValues] = useState<RegistrationFormValues>(INITIAL_VALUES)

  /*
   * One handler for every field. Each control carries its own `name`, which
   * doubles as the key in the state object, so adding a field needs no new
   * handler.
   */
  const handleChange = (event: FieldChangeEvent) => {
    const { name, value } = event.target

    setValues((previous) => ({
      ...previous,
      [name]: value,
      // /*
      //  * Country decides which follow-up field is shown. Clear both whenever it
      //  * changes, so a value entered under one country cannot survive into the
      //  * other and get submitted invisibly.
      //  */
      // ...(name === 'country' ? { stateProvince: '', nonUsCountry: '' } : {}),
    }))
  }

  return (
    <main className="page">
      <div className="card">
        <header>
          <h1 id="registration-heading" className="card__heading">
            Registration Details
          </h1>
        </header>

        <div className="form-layout">
          {/* Email spans the full width */}
          <div className="form-row">
            <div className="form-field">
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
          </div>

          <div className="form-row">
            <div className="form-field">
              <FormField
                id="first-name"
                name="firstName"
                label="First Name"
                placeholder="John"
                value={values.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
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
          </div>

          <div className="form-row">
            <div className="form-field form-field--half">
              <FormField
                as="select"
                id="country"
                name="country"
                label="Country"
                placeholder="Select country (required)"
                options={COUNTRY_OPTIONS}
                value={values.country}
                onChange={handleChange}
                required
              />
            </div>

            {/* The other half of this row depends on the chosen country */}
            {values.country  &&  values.country === 'United States' ? 
             <div className="form-field form-field--half">
                <FormField
                  as="select"
                  id="state-province"
                  name="stateProvince"
                  label="State/Province"
                  placeholder="Select state (required)"
                  options={US_STATE_OPTIONS}
                  value={values.state}
                  onChange={handleChange}
                  required
                />
              </div>
            : <div className="form-field form-field--half">
                <FormField
                  id="non-us-country"
                  name="nonUsCountry"
                  label="Country (Non US only)"
                  placeholder="Enter your answer (optional)"
                  value={values.nonUsCountry}
                  onChange={handleChange}
                />
              </div>}
          </div>

          {/* Same half-width treatment, with a label that wraps */}
          <div className="form-row">
            <div className="form-field form-field--half">
              <FormField
                as="select"
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
        </div>

        <hr className="card__divider" />
      </div>
    </main>
  )
}

export default App
