import React from 'react'
import {Switch, Redirect, Route} from 'react-router-dom'
import LinksPage from './pages/LinksPage/LinksPage'
import CreatePage from './pages/CreatePage/CreatePage'
import DetailPage from './pages/DetailPage/DetailPage'
import AuthPage from './pages/AuthPage/AuthPage'

const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/links'>
          <LinksPage />
        </Route>
        <Route exact path='/create'>
          <CreatePage />
        </Route>
        <Route path='/detail/:id'>
          <DetailPage />
        </Route>
        <Redirect to='/links' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/'>
        <AuthPage />
      </Route>
      <Redirect to='/' />
    </Switch>
  )
}

export default useRoutes
