import React, { useState } from 'react';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { checkSymptoms } from '../services/openaiService';

const DiseaseChecker = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        try {
            const response = await checkSymptoms(query);
            setResult(response);
        } catch (error) {
            setResult(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>Symptom Checker</h2>

            <div className="glass-panel" style={{ padding: '30px' }}>
                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Enter a disease name (e.g., Malaria)"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? <Loader2 className="spin" size={20} /> : <Search size={20} />}
                    </button>
                </form>
            </div>

            {result && (
                <div className="glass-panel animate-fade-in" style={{ marginTop: '20px', padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', color: 'var(--secondary-color)' }}>
                        <AlertCircle size={20} />
                        <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>Medical Disclaimer: Consult a doctor for professional advice.</span>
                    </div>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {result}
                    </div>
                </div>
            )}

            <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
        </div>
    );
};

export default DiseaseChecker;
