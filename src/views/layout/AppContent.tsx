import React from 'react'
import {
    Route,
    Switch
} from 'react-router-dom'

import Home from '../pages/Home'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import ForgotPassword from '../pages/ForgotPassword'
import Profile from '../pages/Profile'
import PageNotFound from '../pages/PageNotFound'
import Events from '../pages/Events'
import EventPage from '../pages/EventPage'

const AppContent = () => (
    <main>
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={SignIn}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/events' exact component={Events}/>
            <Route path='/events/:id' component={EventPage}/>
            <Route path='/forgot-password' component={ForgotPassword}/>
            <Route path='*' component={PageNotFound}/>
        </Switch>
    </main>
)

export default AppContent