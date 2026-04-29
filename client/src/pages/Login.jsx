import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import PageShell from "../components/PageShell";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setMessage("");

            const res = await api.post("/auth/login", form);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            setMessage("Login successful. Redirecting...");
            setTimeout(() => navigate("/dashboard"), 700);
        } catch (error) {
            setMessage(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell
            title="Welcome Back"
            subtitle="Log in to continue your emotion-based music experience"
        >
            <div className="auth-layout">
                <div className="hero-panel glass">
                    <div className="hero-chip">AI + Music + Emotion</div>
                    <h2 className="hero-title">Feel it. Detect it. Play it.</h2>
                    <p className="hero-text">
                        FeelTheMusic blends webcam emotion detection, smart recommendation logic,
                        playlists, reports, and local playback into one immersive music experience.
                    </p>

                    <div className="hero-points">
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Webcam-based emotion capture</p>
                        </div>
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Emotion-to-song recommendation engine</p>
                        </div>
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Beautiful playlists, ratings, and reports</p>
                        </div>
                    </div>
                </div>

                <div className="form-box glass auth-box">
                    <div className="auth-hero">
                        <div className="auth-badge">FeelTheMusic</div>
                        <h2 className="auth-title">Login to Your Account</h2>
                        <p className="auth-subtitle">
                            Detect your mood, get smart recommendations, and play instantly.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    {message && (
                        <p className={message.toLowerCase().includes("successful") ? "success-text" : "error-text"}>
                            {message}
                        </p>
                    )}

                    <p className="auth-footer">
                        New user? <Link to="/register">Create an account</Link>
                    </p>
                </div>
            </div>
        </PageShell>
    );
}

export default Login;