import {Route, Switch} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Register from './components/Register'
import Remove from './components/Remove'
import NotFound from './components/NotFound'
import 'bootstrap/dist/css/bootstrap.css'

import './App.css'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <Switch>
    <Route exact path="/login/" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/new-student/" component={Register} />
    <ProtectedRoute exact path="/remove-student/" component={Remove} />
    <Route component={NotFound} />
  </Switch>
)
export default App