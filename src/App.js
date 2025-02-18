import { Route, Routes, Navigate } from "react-router-dom";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home"
import Favorites from "./pages/Favorites";
import { AppProvider } from "./contexts/AppContext";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/myAccount" element={<MyAccount />} />
      </Routes>
    </AppProvider>
  );
}

export default App;
