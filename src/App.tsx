import './App.css'

function App() {
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
            <div className="form-field placeholder">full width</div>
          </div>

          <div className="form-row">
            <div className="form-field placeholder">half</div>
            <div className="form-field placeholder">half</div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--half placeholder">
              half, rest empty
            </div>
          </div>

          <div className="form-row">
            <div className="form-field form-field--half placeholder">
              half, rest empty
            </div>
          </div>
        </div>

        <hr className="card__divider" />
      </div>
    </main>
  )
}

export default App
