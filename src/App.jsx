import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import NotFoundPage from "./pages/NotFoundPage"
import PrivateRoute from "./components/auth/PrivateRoute"


function App() {

  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/me" element={<ProfilePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
