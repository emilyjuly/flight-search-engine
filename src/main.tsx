import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    background: {
      default: '#f7f8fa',
    },
    primary: {
      main: '#1976d2',
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
