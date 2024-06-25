import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {FiExternalLink} from 'react-icons/fi'
import Header from '../Header'
import SkillItem from '../SkillItem'
import JobItem from '../JobItem'
import FailureView from '../FailureView'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  process: 'IN_PROCESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lifeAtCompany: {},
    skills: [],
    similarJobs: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.process})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(`https://apis.ccbp.in/jobs/${id}`, options)
      const responseData = await response.json()
      if (response.ok) {
        const jobDetails = responseData.job_details
        const similarJobs = responseData.similar_jobs
        const formattedjobDetails = this.formatteJobDetails(jobDetails)
        const formattedLifeAtCompany = this.formatteLifeAtCompany(
          jobDetails.life_at_company,
        )
        const formattedSkills = this.formatteSkills(jobDetails.skills)
        const formattedSimilarJobs = this.formatteSimilarJobs(similarJobs)
        this.setState({
          jobDetails: formattedjobDetails,
          lifeAtCompany: formattedLifeAtCompany,
          skills: formattedSkills,
          similarJobs: formattedSimilarJobs,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstant.failed})
      }
    } catch (error) {
      console.log(error)
    }
  }

  formatteJobDetails = details => {
    const formatted = {
      id: details.id,
      title: details.title,
      rating: details.rating,
      location: details.location,
      companyLogoUrl: details.company_logo_url,
      companyWebsiteUrl: details.company_website_url,
      employmentType: details.employment_type,
      jobDescription: details.job_description,
      packagePerAnnum: details.package_per_annum,
    }
    return formatted
  }

  formatteLifeAtCompany = company => {
    const formatted = {
      description: company.description,
      imgUrl: company.image_url,
    }
    return formatted
  }

  formatteSkills = skills => {
    const formattedSkills = skills.map(skill => {
      const formatted = {
        name: skill.name,
        imgUrl: skill.image_url,
      }
      return formatted
    })
    return formattedSkills
  }

  formatteSimilarJobs = jobs => {
    const formattedJobs = jobs.map(job => {
      const formatted = {
        id: job.id,
        title: job.title,
        location: job.location,
        rating: job.rating,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
      }
      return formatted
    })
    return formattedJobs
  }

  renderLifeAtCompany = lifeAtCompany => {
    const {description, imgUrl} = lifeAtCompany
    return (
      <>
        <p className="life-at-comapy-description">{description}</p>
        <img
          src={imgUrl}
          alt="life-comapy-img"
          className="life-at-company-img"
        />
      </>
    )
  }

  onRetry = () => {
    this.getJobDetails()
  }

  renderJobItemDetails = () => {
    const {jobDetails, skills, lifeAtCompany} = this.state
    const {
      id,
      title,
      location,
      rating,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      packagePerAnnum,
    } = jobDetails
    return (
      <div className="job-item-details-container">
        <div className="job-item-details-first-container">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-log-url"
          />
          <div>
            <h1 className="job-title">{title}</h1>
            <div className="job-item-details-rating-container">
              <FaStar className="start-icon" />
              <p className="job-rating">{rating}</p>
            </div>
          </div>
        </div>
        <div className="job-item-details-second-container">
          <div className="job-item-details-second-sub1-container">
            <MdLocationOn className="job-item-details-location" />
            <p>{location}</p>
            <MdWork className="job-item-details-work" />
            <p>{employmentType}</p>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="description-heading-container">
          <h1 className="job-description-heading">Description</h1>
          <a href={companyWebsiteUrl} className="company-link">
            Visit
            <FiExternalLink className="external-link-logo" />
          </a>
        </div>
        <p className="job-description">{jobDescription}</p>
        <div className="skills-container">
          <h1 className="skills-heading">Skills</h1>
          <ul className="skills-list">
            {skills.map(skill => (
              <SkillItem key={skill.name} skillData={skill} />
            ))}
          </ul>
        </div>
        <div>
          <h1 className="life-at-comapy-heading">Life At company</h1>
          <div className="life-at-company-container">
            {this.renderLifeAtCompany(lifeAtCompany)}
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div>
        <h1>Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(job => (
            <JobItem key={job.id} jobDetails={job} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  rendersuccessView = () => (
    <>
      {this.renderJobItemDetails()}
      {this.renderSimilarJobs()}
    </>
  )

  render() {
    const {apiStatus} = this.state
    const result = () => {
      switch (apiStatus) {
        case apiStatusConstant.process:
          return this.renderLoader()
        case apiStatusConstant.success:
          return this.rendersuccessView()
        case apiStatusConstant.failed:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <div>
        <Header />
        <div className="job-item-details-main-container">{result()}</div>
      </div>
    )
  }
}
export default JobItemDetails
