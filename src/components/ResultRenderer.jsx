import React from 'react';
import { Pill, Leaf, Shield, Activity, Stethoscope, AlertTriangle, Info, CheckCircle, Dot } from 'lucide-react';

const ResultRenderer = ({ text }) => {
    if (!text) return null;

    // Helper to parse sections based on common patterns
    const parseSections = (inputText) => {
        const sections = [];
        const lines = inputText.split('\n');
        let currentSection = { title: 'General Info', content: [], icon: <Info size={20} /> };

        lines.forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine) return;

            // Detect headers (bold text ending with colon, or numbered lists like "1. Name:")
            const headerMatch = trimmedLine.match(/^(\*\*|\d+\.\s+)?(Name|Medicinal Values|Diseases|Symptoms|Treatments|Common Symptoms|Suggested Medicinal Drugs\/Treatments)(:|\*\*:)/i);

            if (headerMatch) {
                // Push previous section if it has content
                if (currentSection.content.length > 0) {
                    sections.push(currentSection);
                }

                // Start new section
                const title = headerMatch[2];
                let icon = <Info size={20} />;

                if (/Name/i.test(title)) icon = <Leaf size={20} color="#4ade80" />;
                else if (/Medicinal/i.test(title)) icon = <Pill size={20} color="#f472b6" />;
                else if (/Diseases/i.test(title)) icon = <Shield size={20} color="#60a5fa" />;
                else if (/Symptoms/i.test(title)) icon = <Activity size={20} color="#fbbf24" />;
                else if (/Treatments/i.test(title)) icon = <Stethoscope size={20} color="#a78bfa" />;

                currentSection = {
                    title: title,
                    content: [trimmedLine.replace(headerMatch[0], '').trim()].filter(Boolean),
                    icon: icon
                };
            } else {
                // Add to current section
                currentSection.content.push(trimmedLine);
            }
        });

        // Push last section
        if (currentSection.content.length > 0) {
            sections.push(currentSection);
        }

        return sections;
    };

    const sections = parseSections(text);

    return (
        <div className="result-container" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {sections.map((section, index) => (
                <div key={index} className="glass-panel" style={{
                    padding: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    borderLeft: `4px solid ${section.icon.props.color || '#fff'}`,
                    background: 'rgba(255, 255, 255, 0.05)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                        {section.icon}
                        <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{section.title}</h4>
                    </div>
                    <div style={{ color: 'var(--text-light)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {section.content.map((line, i) => {
                            // Check for list items or bold headers in lines
                            const isListItem = line.trim().startsWith('-') || line.trim().startsWith('•');
                            const cleanLine = line.replace(/^[-•]\s*/, '').trim();

                            // Check for bold key-value pairs like "**Key**: Value"
                            const keyMatch = cleanLine.match(/^\*\*(.*?)\*\*:(.*)/);

                            if (keyMatch) {
                                return (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '8px 0' }}>
                                        <CheckCircle size={16} color="var(--primary-color)" style={{ marginTop: '4px', flexShrink: 0 }} />
                                        <span>
                                            <span style={{ fontWeight: '700', color: '#fff' }}>{keyMatch[1]}:</span>
                                            <span style={{ color: 'var(--text-dim)' }}>{keyMatch[2]}</span>
                                        </span>
                                    </div>
                                );
                            }

                            return (
                                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', margin: '6px 0' }}>
                                    {isListItem ? (
                                        <Dot size={24} color="var(--text-dim)" style={{ marginTop: '-4px', flexShrink: 0 }} />
                                    ) : null}
                                    <span style={{ color: isListItem ? 'var(--text-light)' : 'var(--text-dim)' }}>
                                        {cleanLine.replace(/\*\*/g, '')}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ResultRenderer;
