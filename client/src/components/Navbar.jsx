import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("token");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            className="navbar glass"
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
        >
            <div className="brand-wrap">
                <div className="brand-orb" />
                <div>
                    <h2 className="brand-title">FeelTheMusic</h2>
                    <p className="brand-subtitle">Emotion-based music experience</p>
                </div>
            </div>

            <div className="nav-links">
                {token && (
                    <Link className={isActive("/dashboard") ? "active" : ""} to="/dashboard">
                        Dashboard
                    </Link>
                )}
                {token && (
                    <Link className={isActive("/songs") ? "active" : ""} to="/songs">
                        Songs
                    </Link>
                )}
                {token && (
                    <Link className={isActive("/recommendations") ? "active" : ""} to="/recommendations">
                        Recommendations
                    </Link>
                )}
                {token && (
                    <Link className={isActive("/mood-logs") ? "active" : ""} to="/mood-logs">
                        Mood Logs
                    </Link>
                )}
                {token && (
                    <Link className={isActive("/playlists") ? "active" : ""} to="/playlists">
                        Playlists
                    </Link>
                )}
                {token && (
                    <Link className={isActive("/reports") ? "active" : ""} to="/reports">
                        Reports
                    </Link>
                )}

                {!token && (
                    <Link className={isActive("/") ? "active" : ""} to="/">
                        Login
                    </Link>
                )}
                {!token && (
                    <Link className={isActive("/register") ? "active" : ""} to="/register">
                        Register
                    </Link>
                )}

                {token && (
                    <button className="danger-btn" onClick={logout}>
                        Logout
                    </button>
                )}
            </div>
        </motion.nav>
    );
}

export default Navbar;