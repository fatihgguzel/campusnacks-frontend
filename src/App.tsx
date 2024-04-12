import React from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './store'
import AuthProvider from '../src/provider/authProvider'
import Routes from './routes'
import './index.css'

export const App: React.FC = () => {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default App
