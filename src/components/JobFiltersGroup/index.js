import {Component} from 'react'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class JobFiltersGroup extends Component {
  state = {
    employmentTypeCheck: [],
    salaryRange: salaryRangesList[0].salaryRangeId,
  }

  onEmployeTypeChack = event => {
    const {value} = event.target
    const {onEmploymentTypeChecks} = this.props
    if (event.target.checked) {
      this.setState(
        prevState => ({
          employmentTypeCheck: [...prevState.employmentTypeCheck, value],
        }),
        () => {
          const {employmentTypeCheck} = this.state
          return onEmploymentTypeChecks(employmentTypeCheck)
        },
      )
    } else {
      const {employmentTypeCheck} = this.state
      const filteredChecks = employmentTypeCheck.filter(
        check => check !== value,
      )
      this.setState({employmentTypeCheck: filteredChecks}, () =>
        onEmploymentTypeChecks(employmentTypeCheck),
      )
    }
  }

  onSalaryChange = event => {
    const {onSalaryChange} = this.props
    onSalaryChange(event.target.value)
    this.setState({salaryRange: event.target.value})
  }

  renderEmployeeType = () => (
    <div>
      <hr />
      <h1 className="employment-type-heading">Type of Employement</h1>
      <ul className="employment-type-list">
        {employmentTypesList.map(item => {
          const {label, employmentTypeId} = item
          return (
            <li key={employmentTypeId}>
              <input
                type="checkbox"
                className="input-type-filter"
                id={`checkbox ${employmentTypeId}`}
                value={employmentTypeId}
                onChange={this.onEmployeTypeChack}
              />
              <label
                htmlFor={`checkbox ${employmentTypeId}`}
                className="input-label"
              >
                {label}
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )

  renderSalaryRange = () => {
    const {salaryRange} = this.state
    return (
      <div>
        <hr />
        <h1 className="employment-type-heading">Salary Range</h1>
        <ul className="employment-type-list">
          {salaryRangesList.map(item => {
            const {label, salaryRangeId} = item
            return (
              <li key={salaryRangeId}>
                <input
                  type="radio"
                  name="salary"
                  className="input-type-filter"
                  id={`radio ${salaryRangeId}`}
                  value={salaryRangeId}
                  checked={salaryRange === salaryRangeId}
                  onChange={this.onSalaryChange}
                />
                <label
                  htmlFor={`radio ${salaryRangeId}`}
                  className="input-label"
                >
                  {label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div className="job-filters-container">
        {this.renderEmployeeType()}
        {this.renderSalaryRange()}
      </div>
    )
  }
}
export default JobFiltersGroup
