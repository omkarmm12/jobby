import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }

  return (
    <div className="failed-view-container">
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failed-view-img"
        />
      </div>
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <div>
        <button type="button" className="retry-btn" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    </div>
  )
}
export default FailureView
