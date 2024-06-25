import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  process: 'IN_PROCESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class UserProfile extends Component {
  state = {profileData: '', apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.process})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch('https://apis.ccbp.in/profile', options)
    if (response.ok) {
      const responseData = await response.json()
      const formattedData = this.formattingData(responseData.profile_details)
      this.setState({
        profileData: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failed})
    }
  }

  formattingData = data => {
    const formatted = {
      name: data.name,
      profileImgUrl: data.profile_image_url,
      shortBio: data.short_bio,
    }
    return formatted
  }

  onRetry = () => {
    this.getProfile()
  }

  rederProfile = () => {
    const {profileData} = this.state
    const {name, profileImgUrl, shortBio} = profileData
    return (
      <div className="userprofile-container">
        <div>
          <img src={profileImgUrl} alt={name} className="profile-pic" />
        </div>
        <h1 className="profile-heading">{name}</h1>
        <p className="profile-para">{shortBio}</p>
      </div>
    )
  }

  rederLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailedView = () => (
    <div>
      <button type="button" className="retry-btn" onClick={this.onRetry}>
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    const result = () => {
      switch (apiStatus) {
        case apiStatusConstant.process:
          return this.rederLoader()
        case apiStatusConstant.success:
          return this.rederProfile()
        case apiStatusConstant.failed:
          return this.renderFailedView()
        default:
          return null
      }
    }
    return <div className="profile-main-container">{result()}</div>
  }
}
export default UserProfile
