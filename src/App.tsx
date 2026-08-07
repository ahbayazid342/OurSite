import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FontTheme } from './components/FontTheme'
import { ContentProvider } from './context/ContentContext'
import { AdminPage } from './pages/AdminPage'
import { HomePage } from './pages/HomePage'

export default function App() {
  return (
    <ContentProvider>
      <FontTheme />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ContentProvider>
  )
}
