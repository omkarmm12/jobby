import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <div className="not-found-content-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="not-found-img"
        />
      </div>
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you are requested could not found.</p>
    </div>
  </div>
)
export default NotFound
