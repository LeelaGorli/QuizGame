import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Questions from './components/Questions'
import ProtectedRoute from './components/ProtectedRoute'
import GameResults from './components/GameResults'
import Report from './components/Report'
import NotFound from './components/NotFound'

import './App.css'

// write your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/quiz-game" component={Questions} />
    <ProtectedRoute exact path="/game-results" component={GameResults} />
    <ProtectedRoute exact path="/game-report" component={Report} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
