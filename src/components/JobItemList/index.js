import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  process: 'IN_PROCESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobItemList extends Component {
  state = {jobsList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.fetchJobs()
  }

  componentDidUpdate(prevProps) {
    console.log('DidUpdate')
    if (prevProps !== this.props) {
      this.fetchJobs()
      console.log('did true')
    }
  }

  fetchJobs = async () => {
    const {salary, searchInput, employmentTypeList} = this.props
    const employmentTypesString = employmentTypeList.join(',')
    this.setState({apiStatus: apiStatusConstant.process})
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${employmentTypesString}&minimum_package=${salary}&search=${searchInput}`,
      options,
    )
    try {
      if (response.ok) {
        const responseData = await response.json()
        const formattedData = this.formattingData(responseData)
        this.setState({
          jobsList: formattedData,
          apiStatus: apiStatusConstant.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstant.failed})
      }
    } catch (error) {
      console.log(error)
    }
  }

  formattingData = list => {
    const formattedList = list.jobs.map(job => {
      const formatted = {
        id: job.id,
        rating: job.rating,
        title: job.title,
        location: job.location,
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        jobDescription: job.job_description,
        packagePerAnnum: job.package_per_annum,
      }
      return formatted
    })
    return formattedList
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.length < 1 ? (
      this.renderNoJobsView()
    ) : (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobItem key={job.id} jobDetails={job} />
        ))}
      </ul>
    )
  }

  rederLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailedView = () => (
    <div className="failed-view-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failed-view-img"
        />
      </div>
      <h1 className="failure-heading">Oops! Somthing Went Wrong</h1>
      <p className="failure-para">
        We cannont seem to find the page your looking for.
      </p>
      <div>
        <button type="button" className="retry-btn">
          Retry
        </button>
      </div>
    </div>
  )

  renderNoJobsView = () => (
    <div className="failed-view-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="failed-view-img"
        />
      </div>
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    const result = () => {
      switch (apiStatus) {
        case apiStatusConstant.process:
          return this.rederLoader()
        case apiStatusConstant.success:
          return this.renderJobsList()
        case apiStatusConstant.failed:
          return this.renderFailedView()
        default:
          return null
      }
    }
    return <div className="joblist-container">{result()}</div>
  }
}
export default JobItemList
