import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const EXTENSION_CHANNEL_ERROR = 'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received';

window.addEventListener('unhandledrejection', (event) => {
  const message = String(event.reason?.message || event.reason || '');
  if (message.includes(EXTENSION_CHANNEL_ERROR)) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
