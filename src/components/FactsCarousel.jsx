import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { getMedicalFact } from '../services/aiService';

const FactsCarousel = () => {
    const [fact, setFact] = useState("Loading amazing fact...");
    const [loading, setLoading] = useState(false);

    const fetchFact = async () => {
        setLoading(true);
        const newFact = await getMedicalFact();
        setFact(newFact);
        setLoading(false);
    };

    useEffect(() => {
        fetchFact();
    }, []);

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Did You Know?</h2>

            <div className="glass-panel" style={{ padding: '40px', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Lightbulb size={48} style={{ color: 'var(--accent-color)', marginBottom: '20px' }} />

                <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px' }}>
                    {fact}
                </p>

                <button
                    className="btn-primary"
                    onClick={fetchFact}
                    disabled={loading}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <RefreshCw size={18} className={loading ? "spin" : ""} />
                    Next Fact
                </button>
            </div>

            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default FactsCarousel;
