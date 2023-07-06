import {Link} from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'

const Job = props => {
  const {data} = props
  const {
    logo,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = data
  return (
    <>
      <Link to={`/jobs/${id}`} className="clickbio">
        <div className="job-box ">
          <div className="logo-section">
            <img src={logo} alt="company logo" className="logo-1" />
            <div className="heading-1">
              <h3>{title}</h3>
              <p className="star">
                <AiFillStar className="st" />
                {rating}
              </p>
            </div>
          </div>
          <div className="location-section">
            <div className="location">
              <p className="location-1">
                <MdLocationOn className="pt" />
                {location}
              </p>
              <p>
                <BsBriefcaseFill className="pt" />
                {employmentType}
              </p>
            </div>
            <p className="pack">{packagePerAnnum}</p>
          </div>
          <hr className="break" />
          <div className="about">
            <h3>Description</h3>
            <p className="dis">{jobDescription}</p>
          </div>
        </div>
      </Link>
      {/* </p> */}
    </>
  )
}
export default Job
