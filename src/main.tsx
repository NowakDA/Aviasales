import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from './store/store.ts'
import './scss/index.scss'
import App from './App/App.tsx'

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
       <App />
    </Provider>
   

)
