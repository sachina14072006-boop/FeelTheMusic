import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BackgroundParticles from "./components/BackgroundParticles";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Songs from "./pages/Songs";
import Recommendations from "./pages/Recommendations";
import MoodLogs from "./pages/MoodLogs";
import Playlists from "./pages/Playlists";
import Reports from "./pages/Reports";

function App() {
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBootLoading(false);
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  if (bootLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-root">
      <BackgroundParticles />
      <div className="app-overlay" />

      <div className="app-content">
        <Navbar />

        <main className="container">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/mood-logs" element={<MoodLogs />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;