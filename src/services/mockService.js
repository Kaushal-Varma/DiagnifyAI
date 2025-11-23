export const getMockAnalysis = () => {
    return `[DEMO MODE: API Limit Reached]
  
Based on the image, this appears to be **Aloe Vera**.

**1. Name**: Aloe Vera (Aloe barbadensis miller)

**2. Medicinal Values**:
- Rich in antioxidants and vitamins (A, C, E).
- Anti-inflammatory properties.
- Accelerates wound healing.
- Improves skin health and hydration.

**3. Diseases it cures/treats**:
- **Burns & Sunburns**: Soothes and heals damaged skin.
- **Acne**: Reduces inflammation and bacteria.
- **Digestive Issues**: Latex can treat constipation (use with caution).
- **Psoriasis**: Reduces itching and scaling.`;
};

export const getMockSymptoms = (diseaseName) => {
    return `[DEMO MODE: API Limit Reached]

**Disease**: ${diseaseName}

**1. Common Symptoms**:
- Fever and chills.
- Fatigue and weakness.
- Headache.
- Muscle aches.
- (Note: Symptoms vary by specific condition).

**2. Suggested Medicinal Drugs/Treatments**:
- **Rest & Hydration**: Essential for recovery.
- **Paracetamol/Ibuprofen**: For pain and fever relief.
- **Consult a Doctor**: Specific antibiotics or antivirals may be needed depending on the exact diagnosis.

*Disclaimer: This is a simulation. Always consult a medical professional.*`;
};

export const getMockFact = () => {
    const facts = [
        "The human nose can detect about 1 trillion smells.",
        "Your heart beats about 100,000 times a day.",
        "The strongest muscle in the body is the masseter (jaw muscle).",
        "Human teeth are as strong as shark teeth.",
        "Your blood makes up about 8% of your body weight."
    ];
    return "[DEMO] " + facts[Math.floor(Math.random() * facts.length)];
};
