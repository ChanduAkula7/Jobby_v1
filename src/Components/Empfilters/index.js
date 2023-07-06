import {withRouter} from 'react-router-dom'
import './index.css'

const Empfilters = props => {
  const {data, updateemp} = props
  const {label, employmentTypeId} = data

  const emppicking = () => {
    // console.log(employmentTypeId)
    updateemp(employmentTypeId)
  }
  return (
    <>
      <ul>
        <input
          type="checkbox"
          className="check"
          id="checkid1"
          onClick={emppicking}
        />
        <label htmlFor="checkid1" className="check t">
          {label}
        </label>
      </ul>
    </>
  )
}
export default withRouter(Empfilters)
