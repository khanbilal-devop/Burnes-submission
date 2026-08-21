import FormField from './components/FormField/FormField'
import type { Option } from './components/FormField/FormField.types'
import './App.css'

/* Dummy options until the real data is wired up. */
const COUNTRY_OPTIONS: Option[] = [
  { value: 'us', label: 'United States' },
  { value: 'outside-us', label: 'Outside the United States' },
]

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
          {/* Input variant, full width */}
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

          {/* Select variant, full width */}
          <div className="form-row">
            <div className="form-field">
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
        </div>

        <hr className="card__divider" />
      </div>
    </main>
  )
}

export default App
