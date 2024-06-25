import Header from '../Header'
import './index.css'

const Home = props => {
  const onFindJobs = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <div className="home-text-container">
          <h1 className="home-heading">Find The Job That Fits Your Life</h1>
          <p className="home-para">
            Millions of people searching for a jobs, salary information, company
            reviews. Find the job that fits your abilities and potential.
          </p>
          <button type="button" className="find-jobs-btn" onClick={onFindJobs}>
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}
export default Home
