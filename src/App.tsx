import FormField from './components/FormField/FormField'
import {
  COUNTRY_OPTIONS,
  GOVERNMENT_OPTIONS,
} from './constants/formOptions'
import './App.css'

const App = () => {
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
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <FormField
                id="first-name"
                label="First Name"
                placeholder="John"
                required
              />
            </div>
            <div className="form-field">
              <FormField
                id="last-name"
                label="Last Name"
                placeholder="Doe"
                required
              />
            </div>
            
          </div>

          <div className="form-row">
            <div className="form-field form-field--half">
              <FormField
                as="select"
                id="country"
                label="Country"
                placeholder="Select country (required)"
                options={COUNTRY_OPTIONS}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--half">
              <FormField
                as="select"
                id="government-affiliation"
                label="Do you work for or primarily support a government or government-affiliated organization?"
                placeholder="Select"
                options={GOVERNMENT_OPTIONS}
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
