import { Html } from '@react-three/drei';

export default function SocialLinks3D({
    name = "Your Name",
    website = "https://example.com",
    linkedin = "https://linkedin.com/in/yourprofile",
    email = "hello@example.com",
    calendar = "https://calendly.com/yourprofile"
}) {
    const links = [
        {
            icon: "🌐",
            label: "Visit our website",
            href: website,
        },
        {
            icon: "in",
            label: "Let's Connect over LinkedIn",
            href: linkedin,
            isLinkedIn: true,
        },
        {
            icon: "✉️",
            label: "Shoot me an email",
            href: `mailto:${email}`,
        },
        {
            icon: "📅",
            label: "Schedule a virtual meeting",
            href: calendar,
        },
    ];

    const buttonStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
        color: 'white',
        padding: '14px 24px',
        borderRadius: '50px',
        textDecoration: 'none',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 15px rgba(211, 47, 47, 0.4)',
        transition: 'all 0.3s ease',
        minWidth: '250px',
        cursor: 'pointer',
    };

    const iconWrapperStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '28px',
        height: '28px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        fontSize: '14px',
    };

    const linkedInIconStyle = {
        ...iconWrapperStyle,
        fontWeight: 'bold',
        fontSize: '12px',
    };

    const nameStyle = {
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '42px',
        fontWeight: '700',
        color: '#333',
        margin: '0 0 20px 0',
        textShadow: '2px 2px 4px rgba(255, 255, 255, 0.8)',
    };

    return (
        <Html
            position={[2.2, 0, 0]}
            center
            transform
            scale={0.35}
            occlude={false}
            style={{ pointerEvents: 'auto' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px' }}>
                <h1 style={nameStyle}>{name}</h1>
                {links.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={buttonStyle}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateX(-8px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 8px 25px rgba(211, 47, 47, 0.5)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'none';
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(211, 47, 47, 0.4)';
                        }}
                    >
                        <span style={link.isLinkedIn ? linkedInIconStyle : iconWrapperStyle}>
                            {link.icon}
                        </span>
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </Html>
    );
}
