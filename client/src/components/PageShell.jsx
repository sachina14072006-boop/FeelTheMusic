import { motion } from "framer-motion";

function PageShell({ title, subtitle, children, rightContent }) {
    return (
        <motion.div
            className="page-shell"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
        >
            <div className="page-header">
                <div>
                    <h1 className="page-title">{title}</h1>
                    {subtitle && <p className="page-subtitle">{subtitle}</p>}
                </div>
                {rightContent && <div>{rightContent}</div>}
            </div>

            <div className="page-content">{children}</div>
        </motion.div>
    );
}

export default PageShell;