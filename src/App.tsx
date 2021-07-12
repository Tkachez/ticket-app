import React, {FC} from 'react'

//Material imports
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

//Pages imports
import AppHeader from './views/layout/AppHeader'
import AppFooter from './views/layout/AppFooter'
import AppContent from './views/layout/AppContent'
import {BrowserRouter as Router} from 'react-router-dom'

import {UserStoreImpl} from './stores/UserStore'

const App: FC = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppHeader userStore={UserStoreImpl}/>
                <AppContent/>
                <AppFooter/>
            </ThemeProvider>
        </Router>
    )
}

export default App
