import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="nav-bar-container">
      <nav className="nav-container">
        <Link to="/" className="link">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="nav-web-logo"
          />
        </Link>
        <ul className="nav-unorderlist">
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <Link to="/jobs" className="link">
            <li>Jobs</li>
          </Link>
        </ul>
        <div>
          <button type="button" className="Logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}
export default withRouter(Header)
