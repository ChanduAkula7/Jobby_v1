import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const gotoJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="container">
        <h1 className="heading">Find The Job That Fits Your Life</h1>
        <p className="para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <div className="bt">
          <button className="btns" type="button" onClick={gotoJobs}>
            Find Jobs
          </button>
        </div>
      </div>
      <div className="mobile-container1">
        <h1 className="mobile-heading">Find The Job That Fits Your Life</h1>
        <p className="mobile-para">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <div className="mobile-bt">
          <Link to="/jobs">
            <button className="btns" type="button">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
export default Home
