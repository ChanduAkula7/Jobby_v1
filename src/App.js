import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import Home from './Components/Home'

import Login from './Components/Login'
import './App.css'
import Jobs from './Components/Jobs'
import ProtectedRoute from './Components/ProtectedRoute'
import Notfound from './Components/Notfound'
import Eachjobdisplay from './Components/Eachjobdisplay'
// These are the lists used in the application. You can move them to any component needed.
// const employmentTypesList = [
//   {
//     label: 'Full Time',
//     employmentTypeId: 'FULLTIME',
//   },
//   {
//     label: 'Part Time',
//     employmentTypeId: 'PARTTIME',
//   },
//   {
//     label: 'Freelance',
//     employmentTypeId: 'FREELANCE',
//   },
//   {
//     label: 'Internship',
//     employmentTypeId: 'INTERNSHIP',
//   },
// ]

// const salaryRangesList = [
//   {
//     salaryRangeId: '1000000',
//     label: '10 LPA and above',
//   },
//   {
//     salaryRangeId: '2000000',
//     label: '20 LPA and above',
//   },
//   {
//     salaryRangeId: '3000000',
//     label: '30 LPA and above',
//   },
//   {
//     salaryRangeId: '4000000',
//     label: '40 LPA and above',
//   },
// ]

// Replace your code here
const App = () => (
  <>
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <ProtectedRoute exact path="/jobs" component={Jobs} />
        <ProtectedRoute exact path="/jobs/:id" component={Eachjobdisplay} />
        <Route path="/bad-path" component={Notfound} />
        <Redirect to="/bad-path" />
      </Switch>
    </BrowserRouter>
  </>
)

export default App
