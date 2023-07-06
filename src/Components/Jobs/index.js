import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Empfilters from '../Empfilters'
import './index.css'
import Salfilter from '../Salfilter'

import Job from '../Job'

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

const status = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  nodata: 'NODATA',
}
const arr = []

class Jobs extends Component {
  state = {
    userinput: '',
    emptype: '',
    packagetype: 1000000,
    profileData: [],
    jobsdata: [],
    profilefailure: false,
    renderingstatus: status.loading,
  }

  componentDidMount() {
    this.getuser()
    this.getjobs()
  }

  update = amount => {
    console.log(amount)
    this.setState({packagetype: amount}, this.getjobs)
  }

  updateemp = empId => {
    // const bool = arr.find(empId)
    const index = arr.indexOf(empId)
    if (index > -1) {
      arr.splice(index, 1)
    } else {
      arr.push(empId)
    }
    console.log(arr)
    this.setState({emptype: arr}, this.getjobs)
  }

  getjobs = async () => {
    this.setState({renderingstatus: status.loading})
    const {emptype, packagetype, userinput} = this.state
    const token = Cookies.get('jwt_token')
    const jobsurl = `https://apis.ccbp.in/jobs?employment_type=${emptype}&minimum_package=${packagetype}&search=${userinput}`
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const res = await fetch(jobsurl, options)
    if (res.ok === true) {
      const jobsdata = await res.json()
      //   console.log(jobsdata)
      const Newjobsdata = jobsdata.jobs.map(i => ({
        logo: i.company_logo_url,
        employmentType: i.employment_type,
        id: i.id,
        jobDescription: i.job_description,
        location: i.location,
        packagePerAnnum: i.package_per_annum,
        rating: i.rating,
        title: i.title,
      }))
      this.setState({jobsdata: Newjobsdata, renderingstatus: status.success})
      if (Newjobsdata.length === 0) {
        this.setState({renderingstatus: status.nodata})
      }
    } else {
      this.setState({renderingstatus: status.failure})
    }
  }

  getuser = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${token}`},
    }
    const res = await fetch(url, options)
    const data = await res.json()
    if (res.ok) {
      const nameUser = data.profile_details.name
      const imgUrl = data.profile_details.profile_image_url
      const bio = data.profile_details.short_bio
      const d = {nameUser, imgUrl, bio}
      this.setState({profileData: d})
    } else {
      this.setState({profilefailure: true})
    }
  }

  renderProfilefailure1 = () => (
    <>
      <div>
        <button type="button" className="batton">
          Retry
        </button>
      </div>
    </>
  )

  searchButtton = () => {
    this.getjobs()
  }

  searchbar = event => {
    this.setState({userinput: event.target.value})
  }

  renderLoadingSection = () => (
    <div className="primedeals-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderNoJobSection = () => (
    <>
      <div className="failre-jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-lapi"
        />
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-job-mobile"
        />
        <h1>No Job Found</h1>
        <p>We could not find any job. find other filter </p>
      </div>
    </>
  )

  renderFailureJobSection = () => (
    <>
      <div className="failre-jobs">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1>Opps Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>

        <button type="button" className="failbt">
          Retry
        </button>
      </div>
    </>
  )

  renderJobSection = () => {
    const {jobsdata} = this.state
    return (
      <>
        <div className="jobs-section">
          <div className="lapi-search">
            <input
              type="search"
              className="input"
              placeholder="Search Job "
              onKeyPress={e => e.key === 'Enter' && this.searchButtton()}
              onChange={this.searchbar}
            />
            <BsSearch
              className="icon"
              onClick={this.searchButtton}
              data-testid="searchButton"
            />
          </div>
          <div className="jobs-display">
            {jobsdata.map(i => (
              <Job data={i} />
            ))}
          </div>
        </div>
      </>
    )
  }

  renderingMethod = () => {
    const {renderingstatus} = this.state

    switch (renderingstatus) {
      case status.success:
        return this.renderJobSection()
      case status.failure:
        return this.renderFailureJobSection()
      case status.nodata:
        return this.renderNoJobSection()
      case status.loading:
        return this.renderLoadingSection()
      default:
        return null
    }
  }

  render() {
    const {profileData, profilefailure} = this.state
    const {nameUser, imgUrl, bio} = profileData

    return (
      <>
        <Header />
        <div className="marginal">
          <div className="job-container">
            <div className="profile-section">
              <div className=" mobile-search ">
                <input
                  type="search"
                  className="input"
                  placeholder="Search Job "
                  onKeyPress={e => e.key === 'Enter' && this.searchButtton()}
                  onChange={this.searchbar}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.searchButtton}
                >
                  <BsSearch className="icon" />
                </button>
                {/* <BsSearch className="icon" onClick={this.searchButtton} /> */}
              </div>
              {profilefailure ? (
                this.renderProfilefailure1()
              ) : (
                <div className="profile">
                  <img src={imgUrl} alt="profile" className="profile-pic" />
                  <h1 className="user-heading">{nameUser}</h1>
                  <p className="bio">{bio}</p>
                </div>
              )}
              <hr className="line" />
              <div className="employee_type">
                <h1 className="head">Type of Employment</h1>
                {employmentTypesList.map(i => (
                  <Empfilters
                    data={i}
                    key={i.employmentTypeId}
                    updateemp={this.updateemp}
                  />
                ))}
              </div>
              <hr className="line" />
              <div className="sal_range">
                <h1 className="head">Salary Range</h1>
                {salaryRangesList.map(i => (
                  <Salfilter
                    data1={i}
                    key1={i.salaryRangeId}
                    update={this.update}
                  />
                ))}
              </div>
            </div>
            {this.renderingMethod()}
          </div>
        </div>
      </>
    )
  }
}
export default Jobs
