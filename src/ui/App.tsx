import { I18nextProvider } from 'react-i18next'
import i18n from '../common/utils/translations/i18next.config'
import AlertSnackbar from './components/AlertSnackbar'
import Spinner from './components/Spinner'
import AppRouters from './routers/AppRouters'

const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <AlertSnackbar />
      <Spinner />
      <AppRouters />
    </I18nextProvider>
  )
}

export default App
