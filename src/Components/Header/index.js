import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {MdExitToApp} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onLogout = () => {
    // console.log('clicked')
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-bar">
        <div className="lg-container">
          <Link to="/" className="LINK t">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="logo"
              alt="website logo"
            />
          </Link>

          <div className="inside-items">
            <li className="list-item">
              <Link to="/" className="LINK">
                Home
              </Link>
            </li>
            <li className="list-item">
              <Link to="/jobs" className="LINK">
                Jobs
              </Link>
            </li>
          </div>
          <div className="button">
            <button type="button" className="btn2" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="mobile-container">
          <Link to="/" className="LINK1">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="mobile-logo"
              alt="website logo"
            />
          </Link>
          <div className="LINK2">
            <Link to="/" className="t1">
              <AiFillHome className="icon" />
            </Link>
            <Link to="/jobs" className="t1">
              <BsFillBriefcaseFill className="icon" />
            </Link>
            <MdExitToApp className="icon icon-button" onClick={onLogout} />
          </div>
        </div>
      </nav>
    </>
  )
}
export default withRouter(Header)
