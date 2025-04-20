import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ToastProvider } from './context/ToastContext.jsx';

import ProtectedRoute from './routers/ProtectedRoute.jsx';
import RedirectRoute from './routers/RedirectRoute.jsx';

import Register from './pages/Register.jsx';
import BlogMain from './pages/BlogMain.jsx';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectRoute />} />
          <Route path="/login" element={<Register activeTab="login" />} />
          <Route element={<ProtectedRoute />} >
            <Route path="/main" element={<BlogMain />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}

export default App;
