import { motion } from "motion/react";

export default function Footer() {
  return (
    <motion.footer
      className="site-footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <span className="footer-line" />
      <p>
        Established by <strong>Femi Ajala</strong>, 2026
      </p>
    </motion.footer>
  );
}