import { useCallback, useEffect, useRef, useState } from 'react'
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
  UNITED_STATES,
  OUTSIDE_UNITED_STATES,
} from './constants/formOptions'
import { EVENT_SERIES } from './constants/eventSeries'
import {
  INITIAL_VALUES,
  buildRegistrationPayload,
  getSeriesIds,
  getValidationError,
  needsGovernmentLevel,
  orderSeriesBySelection,
  partitionSeries,
  scrollIntoViewRespectingMotion,
  toggleInList,
} from './App.utils'
import './App.css'

const App = () => {
  const [values, setValues] = useState<RegistrationFormValues>(INITIAL_VALUES)
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [registeredIds, setRegisteredIds] = useState<string[]>([])
  const [wantsNewsletter, setWantsNewsletter] = useState(false)
  const [errorNonce, setErrorNonce] = useState(0)
  const alertRef = useRef<HTMLParagraphElement>(null)

  const asksGovernmentLevel = needsGovernmentLevel(values.governmentAffiliation)
  const hasRegistered = registeredIds.length > 0
  const allSelected = selectedSeries.length === EVENT_SERIES.length

  const { registered: registeredSeriesItems, remaining: remainingSeries } =
    partitionSeries(EVENT_SERIES, registeredIds)

  const toggleSeries = useCallback((id: string) => {
    setErrorMessage('')
    setSelectedSeries((previous) => toggleInList(previous, id))
  }, [])

  const toggleAllSeries = () => {
    setSelectedSeries(allSelected ? [] : getSeriesIds(EVENT_SERIES))
  }

  const handleChange = (event: FieldChangeEvent) => {
    const { name, value } = event.target

    setValues((previous) => ({ ...previous, [name]: value }))
  }

  const clearField = useCallback((name: string) => {
    setValues((previous) => ({ ...previous, [name]: '' }))
  }, [])

  /*
   * Bring the banner into view after a failed submit. errorNonce is a
   * dependency so a repeat submit with the same message still scrolls.
   */
  useEffect(() => {
    if (!errorMessage) return

    scrollIntoViewRespectingMotion(alertRef.current)
  }, [errorNonce, errorMessage])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorMessage('')

    const validationError = getValidationError(values, selectedSeries)

    if (validationError) {
      setErrorMessage(validationError)
      setErrorNonce((previous) => previous + 1)
      return
    }

    /* Validation passed, so state is safe to shape for the backend. */
    const payload = buildRegistrationPayload(
      values,
      selectedSeries,
      wantsNewsletter,
    )

    console.log('Registration payload', payload)

    const nextRegisteredIds = [...registeredIds, ...selectedSeries]

    setRegisteredIds(nextRegisteredIds)

    /* Everything still on offer starts ticked, matching the reference. */
    setSelectedSeries(
      getSeriesIds(partitionSeries(EVENT_SERIES, nextRegisteredIds).remaining),
    )
  }

  return (
    <main className="page">
      {/*
        The success phase sits directly on the page background, so it swaps the
        card chrome for a bare width-constrained shell. Still a <form>, so the
        second Register button keeps working.
      */}
      <form
        className={hasRegistered ? 'success-shell' : 'card'}
        onSubmit={handleSubmit}
        noValidate
      >
        {hasRegistered ? (
          <section className="success">
            <div className="success-box">
              <p className="success-text">
                You successfully registered to the series:
              </p>
            </div>

            <div className="success-cards">
              {registeredSeriesItems.map((series) => (
                <div key={series.id} className="success-card">
                  <img
                    className="success-card-icon"
                    src={series.imageUrl}
                    alt=""
                    width="40"
                    height="40"
                  />
                  <span className="success-card-title">{series.title}</span>
                </div>
              ))}
            </div>

            {/* Once every series is registered there is nothing left to offer. */}
            {remainingSeries.length > 0 && (
              <>
                <hr className="card-divider" />

                <div className="other-series">
                  <h2 className="other-series-title">
                    Other InnovateUS Offerings you might be interested in
                  </h2>
                  <p className="other-series-description">
                    If you like to register for any of the series please select
                    below and click register
                  </p>

                  <div className="series-list other-series-list">
                    {remainingSeries.map((series) => (
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

                  <div className="form-actions">
                    <button type="submit" className="register-button">
                      Register for selected series
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        ) : (
          <>
            <header>
              <h1 id="registration-heading" className="card-heading">
                Registration Details
              </h1>
            </header>

            {errorMessage && (
              <p ref={alertRef} className="alert alert-error" role="alert">
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
                {orderSeriesBySelection(EVENT_SERIES, selectedSeries).map((series) => (
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

            <label className="optin">
              <input
                type="checkbox"
                checked={wantsNewsletter}
                onChange={(event) => setWantsNewsletter(event.target.checked)}
              />
              <span className="optin-label">
                Email me occasional updates about new event series (optional)
              </span>
            </label>

            <div className="form-actions">
              <button type="submit" className="register-button">
                Register
              </button>
            </div>

            <p className="registration-help">
              Having trouble registering? Contact us at{' '}
              <a href="mailto:hello@innovate-us.org">hello [at] innovate-us.org</a>
            </p>
          </>
        )}
      </form>
    </main>
  )
}

export default App
