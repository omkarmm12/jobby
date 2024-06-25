import {Component} from 'react'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobFiltersGroup from '../JobFiltersGroup'
import JobsSearch from '../JobsSearch'
import JobItemList from '../JobItemList'
import './index.css'

class Jobs extends Component {
  state = {salary: '1000000', searchValue: '', employmentTypeList: []}

  onEmploymentTypeChecks = list => {
    this.setState({employmentTypeList: list})
  }

  onSalaryChange = salary => {
    this.setState({salary})
  }

  onJobSearch = inputValue => {
    this.setState({searchValue: inputValue})
  }

  render() {
    const {salary, searchValue, employmentTypeList} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-first-container">
            <UserProfile />
            <JobFiltersGroup
              onSalaryChange={this.onSalaryChange}
              onEmploymentTypeChecks={this.onEmploymentTypeChecks}
            />
          </div>
          <div className="jobs-second-container">
            <JobsSearch onJobSearch={this.onJobSearch} />
            <JobItemList
              salary={salary}
              searchInput={searchValue}
              employmentTypeList={employmentTypeList}
            />
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
