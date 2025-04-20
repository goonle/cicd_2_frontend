import './App.css';
import Register from './pages/Register.jsx';
import { ToastProvider } from './context/ToastContext.jsx';

function App() {
  return (
    <ToastProvider>
      <Register/>
    </ToastProvider>
  );
}

export default App;
