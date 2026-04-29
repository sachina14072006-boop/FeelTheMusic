import { useEffect } from "react";

function BackgroundParticles() {
    useEffect(() => {
        const scriptId = "particles-js-script";

        const loadParticles = () => {
            if (window.particlesJS) {
                window.particlesJS("particles-js", {
                    particles: {
                        number: {
                            value: 80,
                            density: { enable: true, value_area: 800 }
                        },
                        color: { value: "#ffffff" },
                        shape: {
                            type: "circle",
                            stroke: { width: 0, color: "#000000" }
                        },
                        opacity: {
                            value: 0.45,
                            random: true,
                            anim: { enable: false, speed: 0.8, opacity_min: 0.1, sync: false }
                        },
                        size: {
                            value: 3,
                            random: true,
                            anim: { enable: false, speed: 30, size_min: 0.1, sync: false }
                        },
                        line_linked: {
                            enable: true,
                            distance: 140,
                            color: "#7dd3fc",
                            opacity: 0.28,
                            width: 1
                        },
                        move: {
                            enable: true,
                            speed: 2.2,
                            direction: "none",
                            random: true,
                            straight: false,
                            out_mode: "out",
                            bounce: false
                        }
                    },
                    interactivity: {
                        detect_on: "canvas",
                        events: {
                            onhover: { enable: false, mode: "repulse" },
                            onclick: { enable: false, mode: "push" },
                            resize: true
                        }
                    },
                    retina_detect: true
                });
            }
        };

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js";
            script.onload = loadParticles;
            document.body.appendChild(script);
        } else {
            loadParticles();
        }
    }, []);

    return <div id="particles-js" className="particles-layer"></div>;
}

export default BackgroundParticles;