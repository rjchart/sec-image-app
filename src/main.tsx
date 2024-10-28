import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';

import './index.css';
import { Home } from './pages/Home.tsx';
import { SecImageDetailView } from './pages/SecImageDetailView.tsx';
import { TotalImageViewer } from './pages/TotalImageViewer.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<TotalImageViewer />}/>
      <Route path="/detail" element={<SecImageDetailView />}/>
    </Routes>
  </BrowserRouter>
);
