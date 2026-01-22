import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "dev-clerk-key";

function RootApp() {
  return (
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
}

const root = createRoot(document.getElementById("root"));

// Always render a ClerkProvider so components that call Clerk hooks
// do not throw when the publishable key is not set in dev.
// In production provide a real `VITE_CLERK_PUBLISHABLE_KEY`.
root.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RootApp />
  </ClerkProvider>
);
