import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import './index.css'

class JobsSearch extends Component {
  state = {searchText: ''}

  onSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onSearchText = () => {
    const {onJobSearch} = this.props
    const {searchText} = this.state
    onJobSearch(searchText)
  }

  render() {
    return (
      <div className="jobsearch-container">
        <input
          type="search"
          placeholder="Search"
          className="job-search-input"
          onChange={this.onSearch}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          aria-label="close"
          onClick={this.onSearchText}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }
}
export default JobsSearch
