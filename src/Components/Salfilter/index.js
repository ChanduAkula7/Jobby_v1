import './index.css'

const Salfilter = props => {
  const {data1, update} = props
  const {salaryRangeId, label} = data1

  const salarypick = () => {
    console.log(salaryRangeId)
    update(salaryRangeId)
  }
  return (
    <>
      <ul>
        <input
          type="radio"
          className="radio"
          name="salary"
          id="rad"
          onClick={salarypick}
        />
        <label htmlFor="rad" className="radio t">
          {label}
        </label>
      </ul>
    </>
  )
}
export default Salfilter
