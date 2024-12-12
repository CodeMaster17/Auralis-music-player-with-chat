import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import HomePage from "./pages/home/HomePage";
import AuthCallBackPage from "./pages/auth-callback/AuthCallBackPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth-callback" element={<AuthCallBackPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
