import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'

import './index.css'
import { Home } from './pages/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)
