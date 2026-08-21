import { useCallback, useState } from 'react'
import type { FormEvent } from 'react'
import FormField from './components/FormField/FormField'
import SeriesItem from './components/SeriesItem/SeriesItem'
import type { FieldChangeEvent } from './components/FormField/FormField.types'
import type { RegistrationFormValues } from './App.types'
import {
  COUNTRY_OPTIONS,
  GOVERNMENT_LEVEL_OPTIONS,
  GOVERNMENT_OPTIONS,
  US_STATE_OPTIONS,
} from './constants/formOptions'
import { EVENT_SERIES } from './constants/eventSeries'
import './App.css'

const INITIAL_VALUES: RegistrationFormValues = {
  email: '',
  firstName: '',
  lastName: '',
  country: '',
  state: '',
  nonUsCountry: '',
  governmentAffiliation: '',
  governmentLevel: '',
}

const UNITED_STATES = 'United States'
const OUTSIDE_UNITED_STATES = 'Outside the United States'
const NO_GOVERNMENT_AFFILIATION =
  'No, I do not work for or support a government or government-affiliated organization'

const App = () => {
  const [values, setValues] = useState<RegistrationFormValues>(INITIAL_VALUES);
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string>("string");
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  

  const asksGovernmentLevel =
    values.governmentAffiliation !== '' &&
    values.governmentAffiliation !== NO_GOVERNMENT_AFFILIATION

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



  const toggleSeries = useCallback((id: string) => {
    setErrorMessage('')
    setSelectedSeries((previous) =>
      previous.includes(id)
        ? previous.filter((seriesId) => seriesId !== id)
        : [...previous, id],
    )
  }, [])

  const allSelected = selectedSeries.length === EVENT_SERIES.length

  const toggleAllSeries = () => {
    setSelectedSeries(allSelected ? [] : EVENT_SERIES.map((series) => series.id))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Registration payload', { ...values, selectedSeries })
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit}>
        <header>
          <h1 id="registration-heading" className="card-heading">
            Registration Details
          </h1>
        </header>

        {errorMessage && (
          <p className="alert alert-error" role="alert">
            {errorMessage}
          </p>
        )}


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

            {asksGovernmentLevel && (
              <FormField
                as="select"
                span="half"
                id="government-level"
                name="governmentLevel"
                label="If a government employee or consultant: What level of government?"
                placeholder="Select"
                options={GOVERNMENT_LEVEL_OPTIONS}
                value={values.governmentLevel}
                onChange={handleChange}
                onUnmount={clearField}
                required
              />
            )}
          </div>
        </div>

        <hr className="card-divider" />

        <section className="series" aria-labelledby="series-heading">
          <div className="series-header">
            <h2 id="series-heading" className="series-title">
              Selected Event Series
            </h2>

            <p className="series-count">
              You are registering for <strong>{selectedSeries.length}</strong>{' '}
              event series.
            </p>
          </div>

          <div className="series-actions">
            <button
              type="button"
              className="series-select-all"
              onClick={toggleAllSeries}
            >
              {allSelected ? 'Unselect all series' : 'Select all series'}
            </button>

            {selectedSeries.length === 0 && (
              <span className="series-hint">
                Select at least one series to continue.
              </span>
            )}
          </div>

          <div className="series-list">
            {EVENT_SERIES.map((series) => (
              <SeriesItem
                key={series.id}
                id={series.id}
                title={series.title}
                imageUrl={series.imageUrl}
                checked={selectedSeries.includes(series.id)}
                onToggle={toggleSeries}
              />
            ))}
          </div>
        </section>

        <hr className="card-divider" />

        <div className="form-actions">
          <button
            type="submit"
            className="register-button"
            disabled={isFormSubmitted}
          >
            Register
          </button>
        </div>

        <p className="registration-help">
          Having trouble registering? Contact us at{' '}
          <a href="mailto:hello@innovate-us.org">hello [at] innovate-us.org</a>
        </p>
      </form>
    </main>
  )
}

export default App
