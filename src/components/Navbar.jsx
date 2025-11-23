import React from 'react';
import { Activity, Search, BookOpen, MapPin } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'analyze', label: 'Analyze Drug', icon: <Search size={20} /> },
        { id: 'symptoms', label: 'Symptom Checker', icon: <Activity size={20} /> },
        { id: 'facts', label: 'Medical Facts', icon: <BookOpen size={20} /> },
        { id: 'emergency', label: 'Emergency', icon: <MapPin size={20} /> },
    ];

    return (
        <nav className="glass-panel" style={{
            position: 'fixed',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '10px 20px',
            display: 'flex',
            gap: '20px',
            zIndex: 1000,
            width: 'max-content'
        }}>
            {navItems.map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                        background: activeTab === item.id ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        border: 'none',
                        color: activeTab === item.id ? '#fff' : 'var(--text-dim)',
                        padding: '10px',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease'
                    }}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>
    );
};

export default Navbar;
