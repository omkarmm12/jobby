import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    id,
    title,
    rating,
    location,
    companyLogoUrl,
    employmentType,
    packagePerAnnum,
    jobDescription,
  } = jobDetails
  return (
    <Link to={`/jobs/${id}`} className="link">
      <li className="job-item-container">
        <div className="job-item-first-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-log-url"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-item-rating-container">
              <FaStar className="start-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-second-container">
          <div className="job-item-second-sub1-container">
            <MdLocationOn className="job-item-location" />
            <p>{location}</p>
            <MdWork className="job-item-work" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
