import { BrowserRouter,router } from 'react-router-dom';

import ReactDOM from 'react-dom/client';
import App from './App';
import UserProvider from './Components/UserContext/userProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <App />
    </UserProvider>
  </BrowserRouter> 
);
