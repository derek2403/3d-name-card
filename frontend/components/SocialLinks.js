import styles from '../styles/SocialLinks.module.css';

export default function SocialLinks({
    name = "Daren Tan",
    website = "https://example.com",
    linkedin = "https://linkedin.com/in/yourprofile",
    email = "hello@example.com",
    calendar = "https://calendly.com/yourprofile"
}) {
    const links = [
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
            ),
            label: "Visit our website",
            href: website,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
            ),
            label: "Let's Connect over LinkedIn",
            href: linkedin,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
            ),
            label: "Shoot me an email",
            href: `mailto:${email}`,
        },
        {
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
                </svg>
            ),
            label: "Schedule a virtual meeting",
            href: calendar,
        },
    ];

    return (
        <div className={styles.container}>
            <h1 className={styles.name}>{name}</h1>
            <div className={styles.links}>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.linkButton}
                    >
                        <span className={styles.iconWrapper}>{link.icon}</span>
                        <span className={styles.label}>{link.label}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
