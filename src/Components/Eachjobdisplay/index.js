import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'
import {RiExternalLinkFill} from 'react-icons/ri'
import './index1.css'

class Eachjobdisplay extends Component {
  state = {JOBS: [], SIMILARJOBS: [], SKILLDATA: []}

  componentDidMount() {
    this.getInfo()
  }

  getInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const urlid = `https://apis.ccbp.in/jobs/${id}`
    const options = {method: 'GET', headers: {Authorization: `Bearer ${token}`}}
    const res1 = await fetch(urlid, options)

    if (res1.ok) {
      const t = await res1.json()
      const i = t.job_details
      console.log(i)
      const jobdata = {
        companylogourl: i.company_logo_url,
        companywebsiteurl: i.company_website_url,
        employmenttype: i.employment_type,
        jobdescription: i.job_description,
        id: i.id,
        skills: i.skills,
        title: i.title,
        location: i.location,
        packageperannum: i.package_per_annum,
        rating: i.rating,
        lifeatcompany: i.life_at_company,
        // lifeatcompanydes: i.life_at_company.description,
        // lifeatcompanyimage: i.life_at_company.image_url,
        lifetatdescription: i.life_at_company.description,
        lifeaturl: i.life_at_company.image_url,
      }
      //   console.log(jobdata.skills[2].name)
      const skillsdata = jobdata.skills.map(k => ({
        name: k.name,
        imageurl: k.image_url,
      }))
      //   console.log(skillsdata[2].name)

      const similarjobs = t.similar_jobs.map(q => ({
        companylogourl: q.company_logo_url,
        employmenttype: q.employment_type,
        id: q.id,
        jobdescription: q.job_description,
        location: q.location,
        rating: q.rating,
        title: q.title,
      }))
      //   console.log(similarjobs)
      this.setState({
        JOBS: jobdata,
        SKILLDATA: skillsdata,
        SIMILARJOBS: similarjobs,
      })
    }
  }

  render() {
    const {SIMILARJOBS, SKILLDATA, JOBS} = this.state
    // console.log(SIMILARJOBS)

    const {
      companylogourl,
      companywebsiteurl,
      employmenttype,
      lifetatdescription,
      jobdescription,
      //   id,
      location,
      packageperannum,
      //   lifeatcompany,
      rating,
      lifeaturl,
      title,
    } = JOBS
    return (
      <>
        <div className="fullDetailed-section">
          <div className="bio-container">
            <div className="logo-section">
              <img
                src={companylogourl}
                alt="job details company logo"
                className="c-logo"
              />
              <div className="title">
                <h3>{title}</h3>
                <p className="rate">
                  <AiFillStar className="star" />
                  {rating}
                </p>
              </div>
            </div>
            <div className="location-section">
              <div className="location">
                <p className="icon">
                  <span>
                    <MdLocationOn className="icon1" />
                  </span>
                  {location}
                </p>
                <p className="icon">
                  <span>
                    <BsBriefcaseFill className="icon1" />
                  </span>
                  {employmenttype}
                </p>
              </div>
              <p>{packageperannum}</p>
            </div>
            <hr />
            <div className="description">
              <div className="dis">
                <h2>Description </h2>
                <a href={companywebsiteurl} className="link">
                  Visit
                  <span className="span">
                    <RiExternalLinkFill />
                  </span>
                </a>
              </div>
              <p>{jobdescription}</p>
            </div>
            <div className="skills-container">
              <h3>Skills</h3>
              <div className="skills">
                {SKILLDATA.map(i => (
                  <div className="each-box">
                    <img
                      src={i.imageurl}
                      alt="skill-pic"
                      className="skill-pic"
                    />
                    <p className="skill-name">{i.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="life-at-company">
              <h3>Life at Company</h3>
              <div className="life-bio">
                <p className="lifet-at-para">{lifetatdescription}</p>
                <img src={lifeaturl} alt="life" className="life-at-pic" />
              </div>
            </div>
          </div>
          <h2 className="heading-of-similar">Similar jobs</h2>
          <div className="similar-jobs">
            <div className="TT">
              {SIMILARJOBS.map(w => (
                <div className="each-job">
                  <div className="similar-logo">
                    <img
                      src={w.companylogourl}
                      alt="website logo"
                      className="similar-logo"
                    />
                    <div className="similar-title">
                      <h3>{w.title}</h3>
                      <p>
                        <AiFillStar className="star" />
                        {w.rating}
                      </p>
                    </div>
                  </div>
                  <h2 className="dis-heading1">Description</h2>
                  <p className="dis-para">{w.jobdescription}</p>
                  <div className="location-similar">
                    <p className="icon">
                      <span>
                        <MdLocationOn className="icon1" />
                      </span>
                      {w.location}
                    </p>
                    <p className="icon">
                      <span>
                        <BsBriefcaseFill className="icon1" />
                      </span>
                      {w.employmenttype}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default Eachjobdisplay
