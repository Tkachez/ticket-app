import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'

import Home from '../pages/Home'
import React from 'react'

const AppContent = () => (
    <main>
        <Router>
            <Switch>
                <Route path='/'>
                    <Home/>
                </Route>
            </Switch>
        </Router>
    </main>
)

export default AppContent