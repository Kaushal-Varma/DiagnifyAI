import React, { useState } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { analyzeImage } from '../services/openaiService';

const ImageAnalyzer = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [analysis, setAnalysis] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setAnalysis(''); // Clear previous analysis
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedImage) return;

        setLoading(true);
        try {
            const result = await analyzeImage(selectedImage);
            setAnalysis(result);
        } catch (error) {
            setAnalysis(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '20px', textAlign: 'center' }}>Drug & Herb Analyzer</h2>

            <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="image-upload"
                />

                {!selectedImage ? (
                    <label htmlFor="image-upload" style={{ cursor: 'pointer', display: 'block', padding: '40px', border: '2px dashed var(--glass-border)', borderRadius: '12px' }}>
                        <Upload size={48} style={{ marginBottom: '10px', color: 'var(--primary-color)' }} />
                        <p>Click to upload an image of a drug or herb</p>
                    </label>
                ) : (
                    <div style={{ position: 'relative' }}>
                        <img src={selectedImage} alt="Upload" style={{ maxWidth: '100%', borderRadius: '12px', marginBottom: '20px' }} />
                        <button
                            onClick={() => setSelectedImage(null)}
                            style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer' }}
                        >
                            X
                        </button>
                    </div>
                )}

                {selectedImage && (
                    <button
                        className="btn-primary"
                        onClick={handleAnalyze}
                        disabled={loading}
                        style={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}
                    >
                        {loading ? <><Loader2 className="spin" size={20} /> Analyzing...</> : 'Analyze Image'}
                    </button>
                )}
            </div>

            {analysis && (
                <div className="glass-panel animate-fade-in" style={{ marginTop: '20px', padding: '20px' }}>
                    <h3>Analysis Result</h3>
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {analysis}
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

export default ImageAnalyzer;
