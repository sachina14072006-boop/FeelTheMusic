import { motion } from "framer-motion";

function LoadingScreen() {
    return (
        <div className="boot-screen">
            <motion.div
                className="boot-card glass"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
            >
                <div className="boot-orb" />
                <h1 className="boot-title">FeelTheMusic</h1>
                <p className="boot-subtitle">Tuning into your emotion-driven music world...</p>

                <div className="boot-bar">
                    <motion.div
                        className="boot-bar-fill"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                    />
                </div>
            </motion.div>
        </div>
    );
}

export default LoadingScreen;