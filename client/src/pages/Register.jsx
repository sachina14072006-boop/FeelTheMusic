import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import PageShell from "../components/PageShell";

function Register() {
    const [form, setForm] = useState({
        email: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        password: ""
    });

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

            await api.post("/auth/register", form);

            setMessage("Registration successful. Redirecting to login...");
            setTimeout(() => navigate("/"), 900);
        } catch (error) {
            setMessage(error.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageShell
            title="Create Account"
            subtitle="Join FeelTheMusic and build your mood-based music journey"
        >
            <div className="auth-layout">
                <div className="hero-panel glass">
                    <div className="hero-chip">Create Your Music Identity</div>
                    <h2 className="hero-title">Start your personalized mood journey.</h2>
                    <p className="hero-text">
                        Register to save your mood sessions, build playlists, rate songs,
                        and experience a stylish full-stack music platform built around emotions.
                    </p>

                    <div className="hero-points">
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Personalized emotion logs</p>
                        </div>
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Curated recommendations & player</p>
                        </div>
                        <div className="hero-point">
                            <span className="hero-dot" />
                            <p>Playlist and report management</p>
                        </div>
                    </div>
                </div>

                <div className="form-box glass auth-box">
                    <div className="auth-hero">
                        <div className="auth-badge">FeelTheMusic</div>
                        <h2 className="auth-title">Register New Account</h2>
                        <p className="auth-subtitle">
                            Create your profile to save moods, playlists, and ratings.
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
                            name="first_name"
                            placeholder="First name"
                            value={form.first_name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="last_name"
                            placeholder="Last name"
                            value={form.last_name}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="date_of_birth"
                            type="date"
                            value={form.date_of_birth}
                            onChange={handleChange}
                            required
                        />

                        <input
                            name="password"
                            type="password"
                            placeholder="Create password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button type="submit" disabled={loading}>
                            {loading ? "Creating account..." : "Register"}
                        </button>
                    </form>

                    {message && (
                        <p className={message.toLowerCase().includes("successful") ? "success-text" : "error-text"}>
                            {message}
                        </p>
                    )}

                    <p className="auth-footer">
                        Already have an account? <Link to="/">Login here</Link>
                    </p>
                </div>
            </div>
        </PageShell>
    );
}

export default Register;