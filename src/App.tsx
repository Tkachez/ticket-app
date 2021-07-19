import React, {FC} from 'react'

//Material imports
import {ThemeProvider} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './theme'

//Pages imports
import AppHeader from './views/layout/AppHeader'
import AppContent from './views/layout/AppContent'
import {BrowserRouter as Router} from 'react-router-dom'

const App: FC = () => {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AppHeader/>
                <AppContent/>
            </ThemeProvider>
        </Router>
    )
}

export default App
