import React from 'react';
import { Construction } from 'lucide-react';

const MaintenancePage = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '20px',
            background: 'rgba(0,0,0,0.8)',
            backdropFilter: 'blur(10px)',
            color: 'var(--text-light)'
        }}>
            <div style={{
                padding: '40px',
                borderRadius: '24px',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                boxShadow: 'var(--glass-shadow)',
                maxWidth: '500px'
            }}>
                <Construction size={64} color="var(--primary-color)" style={{ marginBottom: '20px' }} />
                <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: 'var(--primary-color)' }}>Under Maintenance</h1>
                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: 'var(--text-dim)' }}>
                    DiagnifyAI is currently undergoing some upgrades to serve you better.
                    <br /><br />
                    We'll be back online shortly!
                </p>
            </div>
        </div>
    );
};

export default MaintenancePage;
