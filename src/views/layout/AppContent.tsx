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

const AppContent = () => (
    <main>
        <Switch>
            <Route path='/' exact component={Home}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/login' component={SignIn}/>
            <Route path='/profile' component={Profile}/>
            <Route path='/forgot-password' component={ForgotPassword}/>
        </Switch>
    </main>
)

export default AppContent