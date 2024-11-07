import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import MainLayout from "./layout/MainLayout";
function App() {

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
