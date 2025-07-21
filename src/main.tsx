import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// Import video and service card optimization utilities
import './utils/videoOptimizer.js';

createRoot(document.getElementById('root')!).render(<App />);
