import React from 'react'
import AuthProvider from './provider/authProvider'
import Routes from './routes'
import { ThemeProvider } from '@emotion/react'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from './store'
import { theme } from './theme'
import './index.css'
import './iziToast.css'

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ReduxProvider store={store}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ReduxProvider>
    </ThemeProvider>
  )
}

export default App
