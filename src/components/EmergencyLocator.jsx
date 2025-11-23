import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const EmergencyLocator = () => {
    const [locating, setLocating] = useState(false);
    const [error, setError] = useState('');

    const handleFindHelp = () => {
        setLocating(true);
        setError('');

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Open Google Maps with the query for nearest hospital
                const url = `https://www.google.com/maps/search/hospitals+near+me/@${latitude},${longitude},15z`;
                window.open(url, '_blank');
                setLocating(false);
            },
            () => {
                setError('Unable to retrieve your location. Please enable location services.');
                setLocating(false);
            }
        );
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--error-color)' }}>Emergency Help</h2>

            <div className="glass-panel" style={{ padding: '40px' }}>
                <div style={{
                    width: '100px',
                    height: '100px',
                    background: 'rgba(239, 68, 68, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 30px auto',
                    border: '2px solid var(--error-color)'
                }}>
                    <MapPin size={48} color="var(--error-color)" />
                </div>

                <p style={{ marginBottom: '30px', fontSize: '1.1rem' }}>
                    If you are in a medical emergency, click the button below to find the nearest hospitals and medical centers immediately.
                </p>

                <button
                    className="btn-primary"
                    onClick={handleFindHelp}
                    disabled={locating}
                    style={{
                        background: 'var(--error-color)',
                        width: '100%',
                        fontSize: '1.2rem',
                        padding: '16px'
                    }}
                >
                    {locating ? 'Locating...' : 'Find Nearest Hospital'}
                </button>

                {error && (
                    <p style={{ color: 'var(--error-color)', marginTop: '20px' }}>{error}</p>
                )}
            </div>
        </div>
    );
};

export default EmergencyLocator;
